import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";
import { products } from "@/lib/products";

type CheckoutItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  slug: string;
  image: string;
};

type CheckoutBody = {
  items: CheckoutItem[];
  customer?: {
    name?: string;
    email?: string;
    phone?: string;
  };
};

type CheckoutCatalogItem = {
  id: string;
  slug: string;
  name: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
};

const productsById = new Map(products.map((product) => [product.id, product]));
const productsBySlug = new Map(products.map((product) => [product.slug, product]));

const normalizeCheckoutItems = (items: CheckoutItem[]) => {
  const normalized: CheckoutCatalogItem[] = [];

  for (const item of items) {
    const quantity = Number(item.quantity);
    if (!Number.isInteger(quantity) || quantity <= 0) {
      return { error: "Cantidad inválida en el carrito." as const };
    }

    const catalogProduct = productsById.get(item.id) ?? productsBySlug.get(item.slug);
    if (!catalogProduct) {
      return { error: "Uno de los productos del carrito ya no está disponible." as const };
    }

    const unitPrice = Number(catalogProduct.price);
    normalized.push({
      id: catalogProduct.id,
      slug: catalogProduct.slug,
      name: catalogProduct.name,
      quantity,
      unitPrice,
      subtotal: unitPrice * quantity,
    });
  }

  return { items: normalized };
};

const getSiteUrl = () => {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (envUrl) return envUrl.replace(/\/$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "";
};

export async function POST(request: NextRequest) {
  const payload = (await request.json().catch(() => null)) as CheckoutBody | null;

  if (!payload?.items?.length) {
    return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
  }

  const normalizedResult = normalizeCheckoutItems(payload.items);
  if ("error" in normalizedResult) {
    return NextResponse.json({ error: normalizedResult.error }, { status: 400 });
  }
  const catalogItems = normalizedResult.items;

  const mpAccessToken = process.env.MP_ACCESS_TOKEN ?? "";
  const mpPublicKey = process.env.NEXT_PUBLIC_MP_PUBLIC_KEY ?? "";

  const orderId = crypto.randomUUID();
  const currency = "UYU";
  const totalAmount = catalogItems.reduce((sum, item) => sum + item.subtotal, 0);

  const supabase = getSupabaseServer();
  let orderStored = false;

  if (supabase) {
    const orderInsert = await supabase.from("orders").insert({
      id: orderId,
      status: "pending",
      currency,
      total_amount: totalAmount,
      customer_name: payload.customer?.name ?? null,
      customer_email: payload.customer?.email ?? null,
      customer_phone: payload.customer?.phone ?? null,
      metadata: {
        source: "checkout",
        pricing: "server-authoritative",
        items: catalogItems.map((item) => ({
          id: item.id,
          slug: item.slug,
          qty: item.quantity,
          unit_price: item.unitPrice,
        })),
      },
    });

    if (!orderInsert.error) {
      const itemsInsert = await supabase.from("order_items").insert(
        catalogItems.map((item) => ({
          order_id: orderId,
          product_id: item.id,
          name: item.name,
          qty: item.quantity,
          unit_price: item.unitPrice,
          subtotal: item.subtotal,
        }))
      );
      orderStored = !itemsInsert.error;

      if (itemsInsert.error) {
        await supabase
          .from("orders")
          .update({ status: "error" })
          .eq("id", orderId);
      }
    }
  }

  if (!mpAccessToken || !mpPublicKey) {
    return NextResponse.json({
      demo: true,
      message: "Faltan credenciales de Mercado Pago.",
      orderId,
      orderStored,
    });
  }

  const siteUrl = getSiteUrl();
  const preferencePayload = {
    items: catalogItems.map((item) => ({
      id: item.id,
      title: item.name,
      quantity: item.quantity,
      unit_price: item.unitPrice,
      currency_id: currency,
    })),
    external_reference: orderId,
    back_urls: siteUrl
      ? {
          success: `${siteUrl}/checkout?status=success`,
          failure: `${siteUrl}/checkout?status=failure`,
          pending: `${siteUrl}/checkout?status=pending`,
        }
      : undefined,
    notification_url: siteUrl ? `${siteUrl}/api/webhooks/mercadopago` : undefined,
    auto_return: "approved",
    statement_descriptor: "N95 GLOVES",
    binary_mode: true,
  };

  const mpResponse = await fetch("https://api.mercadopago.com/checkout/preferences", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${mpAccessToken}`,
      "Content-Type": "application/json",
      "X-Idempotency-Key": crypto.randomUUID(),
    },
    body: JSON.stringify(preferencePayload),
  });

  if (!mpResponse.ok) {
    const errorBody = await mpResponse.text();
    if (supabase) {
      await supabase.from("orders").update({ status: "error" }).eq("id", orderId);
    }
    return NextResponse.json(
      { error: "No se pudo crear la preferencia.", details: errorBody },
      { status: 500 }
    );
  }

  const mpData = await mpResponse.json();
  const preferenceId = mpData.id as string;

  if (supabase && preferenceId) {
    await supabase.from("orders").update({ preference_id: preferenceId }).eq("id", orderId);
  }

  return NextResponse.json({
    preferenceId,
    orderId,
    initPoint: mpData.init_point ?? null,
    sandboxInitPoint: mpData.sandbox_init_point ?? null,
    orderStored,
  });
}
