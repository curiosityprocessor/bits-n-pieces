import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MainLayout } from "@/components/layout/main-layout";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Batch Monitoring",
  description: "OpenLineage-compatible batch job monitoring dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
