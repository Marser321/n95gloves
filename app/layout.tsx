import type { Metadata } from "next";
import { Space_Grotesk, Teko } from "next/font/google";
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

const teko = Teko({
  subsets: ["latin"],
  variable: "--font-teko",
  display: "swap",
  weight: ["400", "500", "600", "700"],
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
        className={`${spaceGrotesk.variable} ${teko.variable} antialiased bg-cyber-black text-cyber-gray`}
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
