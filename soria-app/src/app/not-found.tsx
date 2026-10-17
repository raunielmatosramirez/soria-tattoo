// src/app/not-found.tsx
// Página 404 personalizada.

import Link from "next/link";

export default function NotFound() {
  return (
    <main className='min-h-screen bg-ink flex items-center justify-center px-5 sm:px-8'>
      <div className='max-w-lg w-full text-center'>
        {/* ─── NÚMERO 404 ─── */}
        <p className='font-display text-[120px] sm:text-[160px] text-gold/20 leading-none mb-2 select-none'>
          404
        </p>

        {/* ─── LÍNEA DECORATIVA ─── */}
        <div className='flex items-center justify-center gap-3 mb-8'>
          <span className='w-10 h-px bg-gold' aria-hidden='true' />
          <p className='text-gold text-xs tracking-[0.35em] uppercase'>
            No encontrado
          </p>
          <span className='w-10 h-px bg-gold' aria-hidden='true' />
        </div>

        {/* ─── TÍTULO ─── */}
        <h1 className='font-display text-3xl sm:text-4xl md:text-5xl text-smoke leading-tight mb-4'>
          Esta página <span className='text-gold'>no existe</span>.
        </h1>

        {/* ─── DESCRIPCIÓN ─── */}
        <p className='text-muted text-sm sm:text-base leading-relaxed mb-10 max-w-md mx-auto'>
          Puede que el link esté roto, que la obra ya no esté disponible, o que
          hayas escrito mal la dirección.
        </p>

        {/* ─── BOTONES ─── */}
        <div className='flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3'>
          <Link
            href='/'
            className='inline-flex items-center justify-center gap-2 bg-gold text-ink px-6 py-3 rounded-md font-medium tracking-wide hover:bg-gold-light transition-colors touch-manipulation'
          >
            Volver al inicio
            <span aria-hidden='true'>→</span>
          </Link>

          <Link
            href='/shop'
            className='inline-flex items-center justify-center gap-2 text-smoke border border-smoke/20 px-6 py-3 rounded-md text-sm font-medium tracking-wide hover:border-gold hover:text-gold transition-colors touch-manipulation'
          >
            Ir a la tienda
          </Link>
        </div>
      </div>
    </main>
  );
}
