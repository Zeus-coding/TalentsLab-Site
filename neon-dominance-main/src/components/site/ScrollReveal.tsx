import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

// ─── SCROLL REVEAL — COMPARSA FLUIDA ALLO SCROLL ─────────────────────────────
//
// Avvolgi QUALSIASI sezione per farla comparire dolcemente quando entra nello
// schermo: parte invisibile e 30px più in basso, poi sale sfumando.
// L'animazione parte una sola volta (once: true) e con 100px di anticipo
// (margin "-100px"), così il movimento è già finito quando l'occhio arriva.
//
//   <ScrollReveal>
//     <section>...</section>
//   </ScrollReveal>
//
// delay → per far comparire più elementi "a cascata" uno dopo l'altro:
//   {items.map((item, i) => (
//     <ScrollReveal key={item.id} delay={i * 0.1}>...</ScrollReveal>
//   ))}

type ScrollRevealProps = {
  children: ReactNode;
  /** Ritardo in secondi prima dell'inizio dell'animazione (effetto a cascata). */
  delay?: number;
  /** Classi Tailwind applicate al contenitore dell'animazione. */
  className?: string;
};

export function ScrollReveal({ children, delay = 0, className }: ScrollRevealProps) {
  // Se l'utente ha attivato "riduci animazioni" nelle impostazioni del sistema
  // operativo, mostriamo il contenuto subito e fermo: nessun movimento.
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
