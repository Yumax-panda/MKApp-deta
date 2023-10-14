import { CssBaseline } from "@mui/material"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import AuthProvider from "./AuthProvider"
import ToastProvider from "./ToastProvider"
import Auth from "@/components/Auth/Auth"
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
    <AuthProvider>
      <html lang="ja">
        <CssBaseline />
        <body
          className={inter.className}
          style={{ backgroundColor: "#F8F9FA" }}
          suppressHydrationWarning
        >
          <ToastProvider>
            <Auth>
              <Template>{children}</Template>
            </Auth>
          </ToastProvider>
        </body>
      </html>
    </AuthProvider>
  )
}
