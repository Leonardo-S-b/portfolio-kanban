import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Leonardo — Backend, arquitetura e produtos",
  description:
    "Portfólio de Leonardo: APIs, produtos full-stack, aplicações mobile, arquitetura e dados.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
