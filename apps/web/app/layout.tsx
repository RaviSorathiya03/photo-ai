import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI Photo Generator - Create stunning images with AI",
  description:
    "Generate beautiful, unique images with our cutting-edge AI technology. Perfect for designers, marketers, and creatives.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
       
          {children}
     
      </body>
    </html>
  )
}

