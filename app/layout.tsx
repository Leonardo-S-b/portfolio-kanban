import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Leonardo — Backend, arquitetura e produtos",
  description:
    "Portfólio de Leonardo: APIs, produtos full-stack, aplicações mobile, arquitetura e dados.",
  authors: [{ name: "Leonardo Souza Bezerra", url: "https://www.linkedin.com/in/leonardo-souza-bezerra-15247a355/" }],
  creator: "Leonardo Souza Bezerra",
  category: "technology",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
