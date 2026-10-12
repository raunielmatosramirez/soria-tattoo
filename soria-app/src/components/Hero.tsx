// src/components/Hero.tsx
// Server Component. Hero responsive con dirección de arte.
// Usa next/image y next/link. Mobile-first.

import Image from "next/image";
import Link from "next/link";
import { NOMBRE_ESTUDIO, UBICACION, INSTAGRAM_URL } from "../lib/config";

export default function Hero() {
  return (
    <section
      id='top'
      className='relative min-h-[100svh] flex items-center overflow-hidden'
    >
      {/* ─── FONDO ─── */}
      <Image
        src='/hero.jpeg'
        alt=''
        fill
        priority
        quality={85}
        sizes='100vw'
        className='object-cover object-center'
        aria-hidden='true'
      />

      {/* Gradiente principal: más oscuro abajo, más claro arriba */}
      <div
        className='absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/80 to-ink'
        aria-hidden='true'
      />

      {/* Gradiente lateral: oscuro a la izquierda (donde va el texto) */}
      <div
        className='absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent'
        aria-hidden='true'
      />

      {/* Viñeta radial para enfocar */}
      <div
        className='absolute inset-0'
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(10,10,10,0.5) 100%)",
        }}
        aria-hidden='true'
      />

      {/* ─── CONTENIDO ─── */}
      <div className='relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 md:px-10 py-24 sm:py-28 md:py-32'>
        <div className='max-w-2xl'>
          {/* Etiqueta ubicación */}
          <div className='flex items-center gap-3 mb-5 sm:mb-6'>
            <span
              className='w-8 sm:w-10 h-px bg-gold flex-shrink-0'
              aria-hidden='true'
            />
            <p className='text-gold text-[10px] sm:text-xs md:text-sm tracking-[0.25em] sm:tracking-[0.35em] uppercase'>
              {UBICACION}
            </p>
          </div>

          {/* Título — tipografía fluida con clamp() */}
          <h1
            className='font-display text-smoke leading-[0.95] mb-5 sm:mb-6 whitespace-nowrap'
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
            }}
          >
            {NOMBRE_ESTUDIO}
          </h1>

          {/* Subtítulo serif itálica */}
          <p
            className='font-display italic text-gold/90 mb-6 sm:mb-8'
            style={{
              fontSize: "clamp(1.25rem, 3.5vw, 1.875rem)",
            }}
          >
            Tinta que cuenta tu historia.
          </p>

          {/* Descripción */}
          <p className='text-muted text-sm sm:text-base md:text-lg max-w-lg mb-8 sm:mb-10 leading-relaxed'>
            Cada pieza se diseña contigo, desde cero, y se tatúa con dedicación.
            Reserva tu turno online en menos de un minuto.
          </p>

          {/* CTAs */}
          <div className='flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4'>
            <a
              href='#reservar'
              className='group inline-flex items-center justify-center gap-2 bg-gold text-ink px-6 sm:px-8 py-4 rounded-md font-medium tracking-wide hover:bg-gold-light active:bg-gold-light transition-all touch-manipulation'
            >
              Reservar turno
              <span
                className='transition-transform group-hover:translate-x-1'
                aria-hidden='true'
              >
                →
              </span>
            </a>

            <Link
              href={INSTAGRAM_URL}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center justify-center gap-2 text-smoke border border-smoke/20 px-6 py-4 rounded-md text-sm font-medium tracking-wide hover:border-gold hover:text-gold active:border-gold active:text-gold transition-colors touch-manipulation'
            >
              Ver trabajos
            </Link>
          </div>

          {/* Nota WhatsApp */}
          <p className='text-muted text-xs mt-5 sm:mt-6 flex items-center gap-2'>
            <span
              className='w-1.5 h-1.5 rounded-full bg-gold animate-pulse flex-shrink-0'
              aria-hidden='true'
            />
            Confirmación directa por WhatsApp.
          </p>
        </div>
      </div>

      {/* ─── SCROLL HINT (solo desktop) ─── */}
      <div
        className='hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-muted'
        aria-hidden='true'
      >
        <span className='text-[10px] tracking-[0.3em] uppercase'>Scroll</span>
        <span className='w-px h-8 bg-gradient-to-b from-gold to-transparent' />
      </div>
    </section>
  );
}
