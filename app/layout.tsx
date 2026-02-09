import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import { CartProvider } from "@/providers/cart-provider";
import CartDrawer from "@/components/cart/cart-drawer";
import PageTransition from "@/components/motion/page-transition";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/providers/theme-provider";

export const metadata: Metadata = {
  title: "N95 Gloves | High-End Goalkeeper Gear",
  description: "E-commerce de guantes de portero profesionales con estética high-end.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark" data-theme="emerald" data-theme-mode="auto">
      <body className="antialiased bg-cyber-black text-cyber-gray">
        <ThemeProvider>
          <CartProvider>
            <Navbar />
            <CartDrawer />
            <main className="min-h-screen">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
