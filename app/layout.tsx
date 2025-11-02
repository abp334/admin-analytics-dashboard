import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // This imports your global Tailwind styles

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Analytics Dashboard",
  description: "Admin dashboard for platform analytics",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* 'children' will be your pages (e.g., login, admin) */}
        {children}
      </body>
    </html>
  );
}
