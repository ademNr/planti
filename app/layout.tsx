import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Suspense } from "react"
import { CartProvider } from "@/contexts/CartContext"
import { Analytics } from "@vercel/analytics/next"
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Planti - Recevez et Plantez Votre Conserve",
  description:
    "Découvrez nos plantes en conserve prêtes à pousser. Basilic, Origan, Œillet d'Inde et plus encore. Livraison en Tunisie.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} font-sans antialiased`}>
        <CartProvider>
          <Suspense fallback={null}>
            {children}
            <Analytics />
          </Suspense>
        </CartProvider>
      </body>
    </html>
  )
}
