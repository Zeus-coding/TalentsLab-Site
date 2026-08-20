import { useState } from "react";

/**
 * Copertina di un articolo con fallback automatico: se il file non è ancora
 * stato caricato in "public/news/", al posto dell'immagine rotta viene mostrato
 * un placeholder con il logo TALENTS LAB.
 */
export function NewsCover({
  src,
  alt,
  className = "",
  imgClassName = "",
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
}) {
  const [imgOk, setImgOk] = useState(true);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {imgOk ? (
        <img
          src={src}
          alt={alt}
          onError={() => setImgOk(false)}
          loading="lazy"
          decoding="async"
          className={`w-full h-full object-cover ${imgClassName}`}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-primary/25 via-background to-background flex items-center justify-center">
          <img src="/logo.png" alt="TALENTS LAB" className="h-16 sm:h-24 w-auto opacity-30" />
        </div>
      )}
    </div>
  );
}
