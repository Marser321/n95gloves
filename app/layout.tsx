import type { Metadata } from "next";
import { Bebas_Neue, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { CartProvider } from "@/providers/cart-provider";
import CartDrawer from "@/components/cart/cart-drawer";
import PageTransition from "@/components/motion/page-transition";
import Footer from "@/components/footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
  weight: "400",
});

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
    <html lang="es" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${bebasNeue.variable} antialiased bg-cyber-black text-cyber-gray`}
      >
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main className="min-h-screen">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
