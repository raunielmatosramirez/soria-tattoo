// src/components/Header.tsx
// Server Component. Sticky, con blur, borde inferior sutil y link a la tienda.

import Link from "next/link";
import { NOMBRE_ESTUDIO } from "../lib/config";

export default function Header() {
  return (
    <header className='sticky top-0 z-50 bg-ink/80 backdrop-blur border-b border-ink-line'>
      <div className='max-w-6xl mx-auto px-5 sm:px-8 md:px-10 h-16 flex items-center justify-between'>
        {/* ─── IZQUIERDA: LOGO + TIENDA ─── */}
        <div className='flex items-center gap-6 sm:gap-10'>
          <Link
            href='/'
            className='font-display text-xl md:text-2xl text-gold tracking-widest hover:text-gold-light transition-colors'
            aria-label={`Ir al inicio de ${NOMBRE_ESTUDIO}`}
          >
            {NOMBRE_ESTUDIO}
          </Link>

          <Link
            href='/shop'
            className='text-sm tracking-wide text-muted hover:text-gold transition-colors'
          >
            Shop
          </Link>
        </div>

        {/* ─── DERECHA: CTA RESERVAR (vuelve al home con ancla) ─── */}
        <Link
          href='/#reservar'
          className='bg-gold text-ink px-5 py-2 rounded-md text-sm font-medium tracking-wide hover:bg-gold-light transition-colors touch-manipulation'
        >
          Reservar
        </Link>
      </div>
    </header>
  );
}
