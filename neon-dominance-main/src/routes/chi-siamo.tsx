import { createFileRoute, redirect } from "@tanstack/react-router";

// L'URL canonico di questa pagina è ora /about (vedi about.tsx).
// La rotta italiana resta in vita solo per non rompere i link già condivisi
// o indicizzati: un 301 trasferisce il ranking su /about ed evita che le due
// URL vengano viste come contenuto duplicato.
export const Route = createFileRoute("/chi-siamo")({
  beforeLoad: () => {
    throw redirect({ to: "/about", statusCode: 301 });
  },
});
