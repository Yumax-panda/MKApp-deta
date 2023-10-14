import { CssBaseline } from "@mui/material"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import AuthProvider from "./Provider"
import Template from "@/components/Template/Template"

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
    <html lang="ja">
      <CssBaseline />
      <AuthProvider>
        <body
          className={inter.className}
          style={{ backgroundColor: "#F8F9FA" }}
        >
          <Template titile="test">{children}</Template>
        </body>
      </AuthProvider>
    </html>
  )
}
