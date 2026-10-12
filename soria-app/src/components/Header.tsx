// src/components/Header.tsx
// Server Component. Sticky arriba, con blur y borde dorado sutil.

import { NOMBRE_ESTUDIO } from "../lib/config";

export default function Header() {
  return (
    <header className='sticky top-0 z-50 bg-ink/80 backdrop-blur border-b border-ink-line'>
      <div className='max-w-6xl mx-auto px-6 h-16 flex items-center justify-between'>
        {/* Logo / nombre del estudio */}
        <a
          href='#top'
          className='font-display text-xl md:text-2xl text-gold tracking-widest hover:text-gold-light transition-colors'
          aria-label={`Ir al inicio de ${NOMBRE_ESTUDIO}`}
        >
          {NOMBRE_ESTUDIO}
        </a>

        {/* CTA Reservar */}
        <a
          href='#reservar'
          className='bg-gold text-ink px-5 py-2 rounded-md text-sm font-medium tracking-wide hover:bg-gold-light transition-colors'
        >
          Reservar
        </a>
      </div>
    </header>
  );
}
