/**
 * Filigrana stilizzata: il logo gigante, centrato e a opacità bassissima,
 * usato come texture "dark premium" dietro le Hero Section.
 * Va inserito dentro un contenitore `relative overflow-hidden`; il contenuto
 * della hero deve stare su un layer superiore (es. `relative z-10`).
 */
export function LogoWatermark({ className = "" }: { className?: string }) {
  return (
    <img
      src="/logo.png"
      alt=""
      aria-hidden
      className={
        "pointer-events-none select-none absolute left-1/2 top-1/2 " +
        "-translate-x-1/2 -translate-y-1/2 w-[200%] sm:w-[120%] max-w-none " +
        "opacity-[0.09] z-0 " +
        className
      }
    />
  );
}
