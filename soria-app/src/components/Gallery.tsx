// src/components/Gallery.tsx
// Server Component. Grid de trabajos con hover elegante.

import Image from "next/image";

const TRABAJOS = [
  { id: 1, alt: "Tatuaje realismo en brazo" },
  { id: 2, alt: "Tatuaje blackwork en pierna" },
  { id: 3, alt: "Tatuaje fine line en costilla" },
  { id: 4, alt: "Tatuaje tradicional en antebrazo" },
  { id: 5, alt: "Tatuaje geométrico en espalda" },
  { id: 6, alt: "Tatuaje floral en hombro" },
];

export default function Gallery() {
  return (
    <section id='trabajos' className='py-24 md:py-32 bg-ink-soft'>
      <div className='max-w-6xl mx-auto px-6 md:px-10'>
        {/* ─── ENCABEZADO ─── */}
        <div className='mb-12 md:mb-16'>
          <div className='flex items-center gap-3 mb-6'>
            <span className='w-10 h-px bg-gold' aria-hidden='true' />
            <p className='text-gold text-xs tracking-[0.35em] uppercase'>
              Trabajos
            </p>
          </div>

          <div className='flex flex-col md:flex-row md:items-end md:justify-between gap-4'>
            <h2 className='font-display text-4xl md:text-5xl text-smoke leading-tight max-w-xl'>
              Algunas piezas <span className='text-gold'>recientes</span>.
              <p className='text-muted text-sm md:text-base max-w-sm'>
                Cada tatuaje es único. Estos son solo algunos ejemplos de lo que
                hacemos.
              </p>
            </h2>
          </div>
        </div>

        {/* ─── GRID ─── */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {TRABAJOS.map((trabajo) => (
            <div
              key={trabajo.id}
              className='group relative aspect-square overflow-hidden rounded-sm border border-ink-line hover:border-gold transition-colors'
            >
              <Image
                src={`https://picsum.photos/seed/tattoo-${trabajo.id}/600/600?grayscale`}
                alt={trabajo.alt}
                fill
                sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                className='object-cover object-center transition-transform duration-500 group-hover:scale-105'
              />

              {/* Overlay sutil al hover */}
              <div
                className='absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                aria-hidden='true'
              />

              {/* Etiqueta (opcional, aparece al hover) */}
              <div className='absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300'>
                <p className='text-smoke text-sm font-medium'>{trabajo.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
