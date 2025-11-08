import type { Metadata } from "next";
import { ThemeProvider } from "@/contexts/ThemeContext";
import "./globals.css";

export const metadata: Metadata = {
  title: 'Nexus - Project Management Platform',
  description: 'Modern project management platform for teams',
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