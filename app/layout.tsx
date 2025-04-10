import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ReduxProvider } from "@/lib/redux/provider"
import { WebSocketProvider } from "@/components/websocket/websocket-provider"
import { Toaster } from "@/components/ui/toaster"
import { NotificationToast } from "@/components/notifications/notification-toast"
import Navbar from "@/components/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Dashboard App",
  description: "A modern dashboard application",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ReduxProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <WebSocketProvider>
              <div className="flex min-h-screen flex-col max-w-7xl mx-auto">
                <Navbar />
                <main className="flex-1 px-4 md:px-6 py-4 md:py-6">{children}</main>
              </div>
              <NotificationToast />
              <Toaster />
            </WebSocketProvider>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}



import './globals.css'