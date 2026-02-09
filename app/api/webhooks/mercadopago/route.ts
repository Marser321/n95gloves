import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";

const mpAccessToken = process.env.MP_ACCESS_TOKEN ?? "";

type MpWebhookPayload = {
  data?: { id?: string | number };
  id?: string | number;
};

const getPaymentId = (request: NextRequest, payload: MpWebhookPayload) => {
  if (payload?.data?.id) return String(payload.data.id);
  if (payload?.id) return String(payload.id);
  const queryId = request.nextUrl.searchParams.get("data.id") || request.nextUrl.searchParams.get("id");
  return queryId ? String(queryId) : null;
};

export async function POST(request: NextRequest) {
  if (!mpAccessToken) {
    return NextResponse.json({ ok: true });
  }

  const payload = (await request.json().catch(() => ({}))) as MpWebhookPayload;
  const paymentId = getPaymentId(request, payload);

  if (!paymentId) {
    return NextResponse.json({ ok: true });
  }

  const paymentResponse = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
    headers: {
      Authorization: `Bearer ${mpAccessToken}`,
    },
  });

  if (!paymentResponse.ok) {
    return NextResponse.json({ ok: false }, { status: 200 });
  }

  const payment = await paymentResponse.json();
  const orderId = payment.external_reference ? String(payment.external_reference) : null;
  const status = payment.status ? String(payment.status) : "unknown";

  const supabase = getSupabaseServer();
  if (supabase && orderId) {
    await supabase.from("orders").update({
      status,
      payment_id: paymentId,
      preference_id: payment.preference_id ?? null,
    }).eq("id", orderId);

    await supabase.from("payments").upsert({
      order_id: orderId,
      provider: "mercadopago",
      payment_id: paymentId,
      status,
      raw: payment,
    }, { onConflict: "payment_id" });
  }

  return NextResponse.json({ ok: true });
}
