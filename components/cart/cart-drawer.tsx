"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/providers/cart-provider";
import Image from "next/image";
import Link from "next/link";

export default function CartDrawer() {
  const { open, closeCart, items, increment, decrement, removeItem, total } = useCart();

  return (
    <Sheet open={open} onOpenChange={(v) => (!v ? closeCart() : null)}>
      <SheetContent side="right" className="space-y-6">
        <SheetTitle className="text-lg font-semibold text-cyber-gray">Carrito</SheetTitle>
        {items.length === 0 ? (
          <p className="text-sm text-white/60">Aún no hay productos en tu bolso.</p>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-[4px] border border-white/10 bg-white/5">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold">{item.name}</p>
                      <p className="text-xs text-white/50">Talla estándar</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-xs text-white/50 hover:text-white/80"
                    >
                      Quitar
                    </button>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button type="button" variant="ghost" size="icon" onClick={() => decrement(item.id)}>
                        -
                      </Button>
                      <span className="text-sm">{item.quantity}</span>
                      <Button type="button" variant="ghost" size="icon" onClick={() => increment(item.id)}>
                        +
                      </Button>
                    </div>
                    <p className="text-sm font-semibold">${(item.price * item.quantity).toFixed(0)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-auto space-y-3 border-t border-white/10 pt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/60">Subtotal</span>
            <span className="font-semibold">${total.toFixed(0)}</span>
          </div>
          <Button asChild className="w-full">
            <Link href="/checkout">Finalizar compra</Link>
          </Button>
          <p className="text-xs text-white/50">Checkout mock listo para conectar a tu gateway.</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
