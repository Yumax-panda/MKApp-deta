import type { Metadata } from "next"
import { Inter } from "next/font/google"
import AuthProvider from "./Provider"
import { CssBaseline } from "@mui/material"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MK8dx for Web",
  description: "A web service for Mario Kart 8 Deluxe",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='ja'>
      <AuthProvider>
        <CssBaseline />
        <body className={inter.className}>{children}</body>
      </AuthProvider>
    </html>
  )
}
