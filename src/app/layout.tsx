import { CssBaseline } from "@mui/material"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import AuthProvider from "../components/Provider/AuthProvider"
import GoogleAnalytics from "../components/Provider/GoogleAnalytics"
import LocalizationProvider from "../components/Provider/LocalizationProvider"
import ThemeProvider from "../components/Provider/ThemeProvider"
import ToastProvider from "../components/Provider/ToastProvider"
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
    <ThemeProvider>
      <LocalizationProvider>
        <AuthProvider>
          <html lang="ja">
            <head>
              <GoogleAnalytics />
            </head>
            <CssBaseline />
            <body className={inter.className} suppressHydrationWarning>
              <ToastProvider>
                <Auth>
                  <Template>{children}</Template>
                </Auth>
              </ToastProvider>
            </body>
          </html>
        </AuthProvider>
      </LocalizationProvider>
    </ThemeProvider>
  )
}
