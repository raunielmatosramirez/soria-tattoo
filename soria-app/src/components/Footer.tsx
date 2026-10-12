// src/components/Footer.tsx
// Server Component. Footer con identidad visual fuerte.

import {
  NOMBRE_ESTUDIO,
  INSTAGRAM_URL,
  UBICACION,
  MAPS_URL,
  HORARIOS_ATENCION,
  WHATSAPP_NUMERO,
} from "../lib/config";

type FooterProps = {
  year: number;
};

export default function Footer({ year }: FooterProps) {
  return (
    <footer className='relative bg-ink-soft border-t border-ink-line overflow-hidden'>
      {/* ─── MARCA DE AGUA DECORATIVA ─── */}
      {/* Nombre del estudio gigante, casi invisible, de fondo */}
      <div
        className='pointer-events-none select-none absolute -bottom-10 left-1/2 -translate-x-1/2 font-display text-[120px] md:text-[220px] text-gold/[0.04] whitespace-nowrap leading-none'
        aria-hidden='true'
      >
        {NOMBRE_ESTUDIO}
      </div>

      <div className='relative max-w-6xl mx-auto px-6 md:px-10'>
        {/* ─── BLOQUE 1: MARCA + CTA ─── */}
        <div className='py-16 md:py-24 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-20 items-end'>
          {/* Marca */}
          <div>
            <div className='flex items-center gap-3 mb-6'>
              <span className='w-10 h-px bg-gold' aria-hidden='true' />
              <p className='text-gold text-xs tracking-[0.35em] uppercase'>
                Estudio de tatuajes
              </p>
            </div>

            <p className='font-display text-5xl md:text-7xl text-smoke leading-[0.95] mb-6'>
              Tu próxima <br />
              <span className='text-gold'>historia</span> empieza acá.
            </p>

            <p className='text-muted text-base md:text-lg max-w-md leading-relaxed'>
              Diseños personalizados, hechos a mano, pensados para durar toda la
              vida.
            </p>
          </div>

          {/* CTA grande */}
          <div className='lg:pb-2'>
            <a
              href='#reservar'
              className='group relative block bg-gold text-ink hover:bg-gold-light transition-colors'
              style={{
                clipPath:
                  "polygon(0% 12%, 8% 0%, 100% 0%, 100% 88%, 92% 100%, 0% 100%)",
              }}
            >
              <div className='p-8 md:p-10'>
                <div className='flex items-center justify-between mb-8'>
                  <span className='text-xs tracking-[0.3em] uppercase opacity-70'>
                    Turnos
                  </span>
                  <span
                    className='text-2xl transition-transform group-hover:translate-x-1'
                    aria-hidden='true'
                  >
                    →
                  </span>
                </div>
                <p className='font-display text-3xl md:text-4xl leading-tight'>
                  Reservá tu
                  <br />
                  turno online
                </p>
                <p className='text-sm mt-4 opacity-70'>
                  Confirmación por WhatsApp.
                </p>
              </div>
            </a>
          </div>
        </div>

        {/* ─── BLOQUE 2: INFO EN GRID ─── */}
        <div className='py-12 md:py-16 border-t border-ink-line grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10'>
          {/* Estudio */}
          <div>
            <p className='text-gold text-[10px] tracking-[0.3em] uppercase mb-5'>
              Estudio
            </p>
            <p className='font-display text-xl text-smoke leading-tight'>
              {NOMBRE_ESTUDIO}
            </p>
          </div>

          {/* Contacto */}
          <div>
            <p className='text-gold text-[10px] tracking-[0.3em] uppercase mb-5'>
              Contacto
            </p>
            <ul className='space-y-3 text-sm'>
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-muted hover:text-gold transition-colors'
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMERO}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-muted hover:text-gold transition-colors'
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Ubicación */}
          <div>
            <p className='text-gold text-[10px] tracking-[0.3em] uppercase mb-5'>
              Ubicación
            </p>
            <a
              href={MAPS_URL}
              target='_blank'
              rel='noopener noreferrer'
              className='text-muted text-sm hover:text-gold transition-colors leading-relaxed'
            >
              {UBICACION}
            </a>
          </div>

          {/* Horarios */}
          <div>
            <p className='text-gold text-[10px] tracking-[0.3em] uppercase mb-5'>
              Horarios
            </p>
            <p className='text-muted text-sm leading-relaxed'>
              {HORARIOS_ATENCION}
            </p>
            <p className='text-muted/60 text-xs mt-2'>Con turno previo.</p>
          </div>
        </div>

        {/* ─── BLOQUE 3: COPYRIGHT ─── */}
        <div className='py-6 border-t border-ink-line flex flex-col md:flex-row md:items-center md:justify-between gap-3'>
          <p className='text-muted/70 text-xs'>
            © {year} {NOMBRE_ESTUDIO}
          </p>
          <p className='text-muted/70 text-xs'>Hecho con tinta y dedicación.</p>
        </div>
      </div>
    </footer>
  );
}
