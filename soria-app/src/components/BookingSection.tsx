// src/components/BookingSection.tsx
// Server Component. Contenedor de la sección de reservas.
// Recibe data y todayISO desde page.tsx y delega el flujo a BookingFlow.

import type { TurnosData } from "../lib/types";
import BookingFlow from "./BookingFlow";

type BookingSectionProps = {
  data: TurnosData;
  todayISO: string;
};

export default function BookingSection({
  data,
  todayISO,
}: BookingSectionProps) {
  return (
    <section id='reservar' className='py-24 md:py-32 bg-ink'>
      <div className='max-w-6xl mx-auto px-6 md:px-10'>
        {/* ─── ENCABEZADO ─── */}
        <div className='mb-12 md:mb-16'>
          <div className='flex items-center gap-3 mb-6'>
            <span className='w-10 h-px bg-gold' aria-hidden='true' />
            <p className='text-gold text-xs tracking-[0.35em] uppercase'>
              Reservas
            </p>
          </div>

          <div className='flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6'>
            <h2 className='font-display text-4xl md:text-5xl text-smoke leading-tight max-w-xl'>
              Reservá tu <span className='text-gold'>turno</span>.
            </h2>
            <p className='text-muted text-sm md:text-base max-w-sm'>
              Elige el día y horario que más te convenga. Confirmamos por
              WhatsApp.
            </p>
          </div>

          {/* Aviso sobre disponibilidad */}
          <p className='text-muted text-sm max-w-2xl border-l-2 border-gold/40 pl-4'>
            La disponibilidad puede variar hasta la confirmación por WhatsApp.
          </p>
        </div>

        {/* ─── FLUJO DE RESERVA ─── */}
        <BookingFlow data={data} todayISO={todayISO} />
      </div>
    </section>
  );
}
