import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "Your Re.Align Profile",
  description:
    "Re.Align helps you create simple, regular rituals to restore clarity, energy, and balance.",
  icons: { icon: "/icon.png" },
  openGraph: {
    title: "Your Re.Align Profile",
    description: "Simple rituals for clarity and energy.",
    images: [{ url: "/brand/logo.png", width: 512, height: 512, alt: "Re.Align Logo" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
