import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";

const mpAccessToken = process.env.MP_ACCESS_TOKEN ?? "";

type MpWebhookPayload = {
  data?: { id?: string | number };
  id?: string | number;
};

const resolveOrderStatus = (status: unknown) => {
  const normalized = typeof status === "string" ? status : "unknown";

  if (normalized === "approved") return "approved";
  if (normalized === "authorized") return "authorized";
  if (normalized === "pending" || normalized === "in_process") return "pending";
  if (normalized === "in_mediation") return "pending_review";
  if (normalized === "rejected") return "rejected";
  if (normalized === "cancelled") return "cancelled";
  if (normalized === "refunded") return "refunded";
  if (normalized === "charged_back") return "charged_back";
  return "unknown";
};

const getPaymentId = (request: NextRequest, payload: MpWebhookPayload) => {
  if (payload?.data?.id) return String(payload.data.id);
  if (payload?.id) return String(payload.id);
  const queryId = request.nextUrl.searchParams.get("data.id") || request.nextUrl.searchParams.get("id");
  return queryId ? String(queryId) : null;
};

export async function POST(request: NextRequest) {
  if (!mpAccessToken) {
    return NextResponse.json({ ok: true, skipped: "missing_mp_access_token" });
  }

  const payload = (await request.json().catch(() => ({}))) as MpWebhookPayload;
  const paymentId = getPaymentId(request, payload);

  if (!paymentId) {
    return NextResponse.json({ ok: true, skipped: "missing_payment_id" });
  }

  let paymentResponse: Response;
  try {
    paymentResponse = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: {
        Authorization: `Bearer ${mpAccessToken}`,
      },
    });
  } catch {
    return NextResponse.json({ ok: true, skipped: "payment_fetch_network_error" });
  }

  if (!paymentResponse.ok) {
    return NextResponse.json({ ok: true, skipped: "payment_fetch_failed" });
  }

  const payment = (await paymentResponse.json().catch(() => null)) as
    | { external_reference?: string | number; preference_id?: string | null; status?: string; id?: string | number }
    | null;
  if (!payment) {
    return NextResponse.json({ ok: true, skipped: "invalid_payment_payload" });
  }

  const orderId = payment.external_reference ? String(payment.external_reference) : null;
  const status = resolveOrderStatus(payment.status);

  const supabase = getSupabaseServer();
  if (!supabase) {
    return NextResponse.json({ ok: true, skipped: "missing_supabase_credentials" });
  }

  let resolvedOrderId: string | null = null;
  if (orderId) {
    const orderLookup = await supabase.from("orders").select("id").eq("id", orderId).maybeSingle();
    if (orderLookup.data?.id) {
      resolvedOrderId = orderLookup.data.id;
      await supabase
        .from("orders")
        .update({
          status,
          payment_id: paymentId,
          preference_id: payment.preference_id ?? null,
        })
        .eq("id", resolvedOrderId);
    }
  }

  const paymentRaw = {
    webhook: payload,
    payment,
    received_at: new Date().toISOString(),
    order_resolution: resolvedOrderId ? "linked" : "order_not_found",
  };

  const existingPayment = await supabase
    .from("payments")
    .select("id")
    .eq("payment_id", paymentId)
    .limit(1)
    .maybeSingle();

  if (existingPayment.data?.id) {
    await supabase
      .from("payments")
      .update({
        order_id: resolvedOrderId,
        status,
        raw: paymentRaw,
      })
      .eq("id", existingPayment.data.id);
  } else {
    await supabase.from("payments").insert({
      order_id: resolvedOrderId,
      provider: "mercadopago",
      payment_id: paymentId,
      status,
      raw: paymentRaw,
    });
  }

  return NextResponse.json({ ok: true });
}
