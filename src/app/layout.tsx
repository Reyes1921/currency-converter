import type {Metadata} from "next"
import localFont from "next/font/local"
import "./globals.css"
import {Footer, Header} from "@/components"
import {ThemeProvider} from "../components/ui/theme-provider"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "Currency Converter",
  description: "Convert currencies quickly and easily",
  alternates: {
    canonical: "https://currency-converter-3000.netlify.app",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <link
        rel="icon"
        href="/white-favicon.ico"
        media="(prefers-color-scheme: dark)"
      />
      <link
        rel="icon"
        href="/black-favicon.ico"
        media="(prefers-color-scheme: light)"
      />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased footer-bottom grid grid-cols-1 dark:bg-[#1B1B1B]`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
