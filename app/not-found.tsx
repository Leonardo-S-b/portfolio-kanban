import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <div>
        <span>404 / CARD MOVIDO</span>
        <h1>Esse Post-it não está mais no quadro.</h1>
        <Link href="/">voltar ao portfólio</Link>
      </div>
    </main>
  );
}
