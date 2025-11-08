import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/contexts/ThemeContext";
import "./globals.css";

export const metadata: Metadata = {
  title: 'Nexus - Project Management Platform',
  description: 'Modern project management platform for teams',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html suppressHydrationWarning>
            <body>
                <ThemeProvider>{children}</ThemeProvider>
            </body>

        </html>
    )
}