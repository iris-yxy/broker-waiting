// app/layout.tsx
import "./globals.css";
import Script from "next/script";
import { Toaster } from "@/components/ui/sonner";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Broker AI – Waitlist",
  description:
    "Broker AI waitlist landing page. Commission clarity, stickier clients, simpler growth.",
  openGraph: {
    title: "Broker AI – Waitlist",
    description:
      "Commission clarity, stickier clients, simpler growth. Join the early access list.",
    images: ["/og.png"], // 占位，后面换成你们的
  },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>

      </head>
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}