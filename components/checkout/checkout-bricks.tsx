/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CartItem = {
  id: string;
  name: string;
  price: number;
  slug: string;
  image: string;
  quantity: number;
};

type CheckoutResponse = {
  preferenceId?: string;
  orderId?: string;
  initPoint?: string | null;
  sandboxInitPoint?: string | null;
  orderStored?: boolean;
  demo?: boolean;
  message?: string;
};

const currencyFormatter = new Intl.NumberFormat("es-UY", {
  style: "currency",
  currency: "UYU",
  maximumFractionDigits: 0,
});

const loadCart = () => {
  if (typeof window === "undefined") return [] as CartItem[];
  const stored = localStorage.getItem("n95-cart");
  if (!stored) return [] as CartItem[];
  try {
    return JSON.parse(stored) as CartItem[];
  } catch {
    return [] as CartItem[];
  }
};

const loadMpScript = () =>
  new Promise<void>((resolve, reject) => {
    if (document.getElementById("mp-sdk")) return resolve();
    const script = document.createElement("script");
    script.id = "mp-sdk";
    script.src = "https://sdk.mercadopago.com/js/v2";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("No se pudo cargar Mercado Pago SDK."));
    document.body.appendChild(script);
  });

export default function CheckoutBricks() {
  const [items] = useState<CartItem[]>(() => loadCart());
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error" | "demo" | "empty">("idle");
  const [response, setResponse] = useState<CheckoutResponse | null>(null);
  const total = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);

  useEffect(() => {
    if (!items.length) {
      setStatus("empty");
      return;
    }

    const initCheckout = async () => {
      setStatus("loading");
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = (await res.json().catch(() => null)) as CheckoutResponse | null;
      if (!data) {
        setStatus("error");
        return;
      }

      if (data.demo) {
        setResponse(data);
        setStatus("demo");
        return;
      }

      if (!data.preferenceId) {
        setStatus("error");
        return;
      }

      setResponse(data);
      setStatus("ready");
    };

    initCheckout();
  }, [items]);

  useEffect(() => {
    if (status !== "ready" || !response?.preferenceId) return;
    const publicKey = process.env.NEXT_PUBLIC_MP_PUBLIC_KEY;
    if (!publicKey) {
      setStatus("demo");
      return;
    }

    let controller: { unmount?: () => void } | null = null;
    const mount = async () => {
      try {
        await loadMpScript();
        if (!window.MercadoPago) {
          setStatus("error");
          return;
        }
        const mp = new window.MercadoPago(publicKey, { locale: "es-UY" });
        const bricksBuilder = mp.bricks();
        controller = await bricksBuilder.create("wallet", "wallet_container", {
          initialization: {
            preferenceId: response.preferenceId,
          },
          customization: {
            visual: {
              buttonBackground: "#39FF14",
              borderRadius: "2px",
              valuePropColor: "#f5f5f5",
            },
          },
        });
      } catch {
        setStatus("error");
      }
    };

    mount();

    return () => {
      if (controller?.unmount) {
        controller.unmount();
      } else {
        const container = document.getElementById("wallet_container");
        if (container) container.innerHTML = "";
      }
    };
  }, [status, response?.preferenceId]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-4">
        <div className="rounded-[12px] border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-white/50">Resumen</p>
          <div className="mt-4 space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-sm text-white/70">
                <span>{item.name} × {item.quantity}</span>
                <span>{currencyFormatter.format(item.price * item.quantity)}</span>
              </div>
            ))}
            <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3 text-sm font-semibold">
              <span>Total</span>
              <span>{currencyFormatter.format(total)}</span>
            </div>
          </div>
        </div>

        <div className="rounded-[12px] border border-white/10 bg-black/50 p-4 text-xs text-white/60">
          <p className="uppercase tracking-[0.24em] text-white/50">Uruguay · UYU</p>
          <p className="mt-2">Pago seguro procesado por Mercado Pago.</p>
        </div>
      </div>

      <div className="rounded-[12px] border border-white/10 bg-white/5 p-5">
        <p className="text-xs uppercase tracking-[0.28em] text-white/50">Checkout</p>

        {status === "empty" && (
          <div className="mt-4 text-sm text-white/70">
            Tu carrito está vacío. Volvé al lineup y elegí tu modelo.
          </div>
        )}

        {status === "loading" && (
          <div className="mt-4 text-sm text-white/70">Preparando pago seguro…</div>
        )}

        {status === "demo" && (
          <div className="mt-4 space-y-3 text-sm text-white/70">
            <p>Checkout en modo demo. Faltan credenciales de Mercado Pago.</p>
            <p className="text-xs text-white/50">
              {response?.message ?? "Configura NEXT_PUBLIC_MP_PUBLIC_KEY y MP_ACCESS_TOKEN."}
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="mt-4 space-y-3 text-sm text-white/70">
            <p>No pudimos iniciar el checkout. Probá nuevamente en unos minutos.</p>
          </div>
        )}

        <div
          id="wallet_container"
          className={cn("mt-4 min-h-[180px]", status !== "ready" && "opacity-60")}
        />

        {response?.orderId && (
          <div className="mt-4 text-xs text-white/50">Orden #{response.orderId}</div>
        )}

        {status !== "ready" && (
          <Button type="button" variant="outline" className="mt-4 w-full" onClick={() => window.history.back()}>
            Volver al carrito
          </Button>
        )}
      </div>
    </div>
  );
}
