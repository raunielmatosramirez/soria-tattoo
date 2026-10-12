// src/components/TimeSlots.tsx
// Client Component. Muestra los horarios del día seleccionado.

"use client";

import type { DayInfo } from "../lib/types";
import { formatFechaLarga, formatHora } from "../lib/booking";

type TimeSlotsProps = {
  day: DayInfo;
  horarios: string[];
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
};

export default function TimeSlots({
  day,
  horarios,
  selectedTime,
  onSelectTime,
}: TimeSlotsProps) {
  const libres = horarios.filter((h) => !day.occupiedSlots.includes(h));
  const ocupados = horarios.filter((h) => day.occupiedSlots.includes(h));

  return (
    <div className='bg-ink-soft border border-ink-line rounded-md p-4 sm:p-6 md:p-8'>
      {/* ─── ENCABEZADO ─── */}
      <div className='mb-6'>
        <div className='flex items-center gap-3 mb-3'>
          <span className='w-10 h-px bg-gold' aria-hidden='true' />
          <p className='text-gold text-xs tracking-[0.35em] uppercase'>
            Horarios
          </p>
        </div>

        <h3 className='font-display text-xl sm:text-2xl md:text-3xl text-smoke'>
          {formatFechaLarga(day.iso)}
        </h3>

        <p className='text-muted text-sm mt-1'>
          {libres.length === 0
            ? "No quedan horarios disponibles para este día."
            : `${libres.length} ${
                libres.length === 1
                  ? "horario disponible"
                  : "horarios disponibles"
              }`}
        </p>
      </div>

      {/* ─── GRID DE HORARIOS ─── */}
      <div className='grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3'>
        {horarios.map((hora) => {
          const ocupado = day.occupiedSlots.includes(hora);
          const seleccionado = selectedTime === hora;

          if (ocupado) {
            return (
              <button
                key={hora}
                type='button'
                disabled
                aria-label={`${formatHora(hora)} — no disponible`}
                className='py-4 sm:py-3 rounded-md bg-ink text-disabled line-through cursor-not-allowed text-sm touch-manipulation'
              >
                {formatHora(hora)}
              </button>
            );
          }

          return (
            <button
              key={hora}
              type='button'
              onClick={() => onSelectTime(hora)}
              aria-label={`Seleccionar ${formatHora(hora)}`}
              className={`py-4 sm:py-3 rounded-md text-sm font-medium transition-colors touch-manipulation select-none ${
                seleccionado
                  ? "bg-gold text-ink"
                  : "border border-gold/60 text-smoke hover:bg-gold/10 hover:border-gold active:bg-gold/20"
              }`}
            >
              {formatHora(hora)}
            </button>
          );
        })}
      </div>

      {/* ─── NOTA ─── */}
      {ocupados.length > 0 && (
        <p className='text-muted text-xs mt-6'>
          Los horarios tachados ya están reservados.
        </p>
      )}
    </div>
  );
}
