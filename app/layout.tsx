
import type React from "react"
import "./globals.css"
import "./date-picker.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Londoners - Premium London Accommodations",
  description: "Find your perfect stay in London with Londoners premium accommodations",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <Header/>
          {children}
          <Footer/>
        </ThemeProvider>
      </body>
    </html>
  )
}

