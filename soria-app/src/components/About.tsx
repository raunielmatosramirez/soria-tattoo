// src/components/About.tsx
// Server Component. Sección "Sobre el estudio" con texto + imagen.

import Image from "next/image";
import { NOMBRE_ESTUDIO, UBICACION, MAPS_URL } from "../lib/config";

const DIFERENCIALES = [
  "Diseños 100% personalizados",
  "Materiales descartables y esterilizados",

  "Turnos flexibles, coordinados por WhatsApp",
];

export default function About() {
  return (
    <section id='estudio' className='py-24 md:py-32 bg-ink'>
      <div className='max-w-6xl mx-auto px-6 md:px-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center'>
          {/* ─── COLUMNA TEXTO ─── */}
          <div>
            <div className='flex items-center gap-3 mb-6'>
              <span className='w-10 h-px bg-gold' aria-hidden='true' />
              <p className='text-gold text-xs tracking-[0.35em] uppercase'>
                El estudio
              </p>
            </div>

            <h2 className='font-display text-4xl md:text-5xl text-smoke leading-tight mb-6'>
              Un espacio para <span className='text-gold'>crear</span> tu
              próxima historia.
            </h2>

            <p className='text-muted text-base md:text-lg leading-relaxed mb-4'>
              En {NOMBRE_ESTUDIO} se trabaja con dedicación y detalle. Cada
              pieza se piensa desde cero contigo, respetando tu idea y
              adaptándola al estilo que mejor te represente.
            </p>

            <p className='text-muted text-base md:text-lg leading-relaxed mb-8'>
              Estamos en{" "}
              <a
                href={MAPS_URL}
                target='_blank'
                rel='noopener noreferrer'
                className='text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold transition-colors'
              >
                {UBICACION}
              </a>
              , en un espacio cómodo y privado, con toda la atención puesta en
              que la experiencia y el resultado sean impecables.
            </p>

            <ul className='space-y-3'>
              {DIFERENCIALES.map((item) => (
                <li key={item} className='flex items-start gap-3 text-smoke'>
                  <span
                    className='mt-2 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0'
                    aria-hidden='true'
                  />
                  <span className='text-sm md:text-base'>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ─── COLUMNA IMAGEN ─── */}
          <div className='relative'>
            <div
              className='absolute -inset-4 border border-gold/20 rounded-sm'
              aria-hidden='true'
            />
            <div className='relative aspect-[4/5] overflow-hidden rounded-sm'>
              <Image
                src='/studio-soria.jpeg'
                alt='Interior del estudio de tatuajes'
                fill
                sizes='(max-width: 768px) 90vw, 50vw'
                className='object-cover object-center'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
