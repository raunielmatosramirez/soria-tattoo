// src/components/Calendar.tsx
// Client Component. Calendario basado en react-day-picker (v9+).

"use client";

import { useState, useMemo } from "react";
import { es } from "date-fns/locale";
import type { TurnosData, DayInfo } from "../lib/types";
import {
  getDayInfo,
  isDaySelectable,
  canNavigateToMonth,
} from "../lib/booking";
import CalendarClient from "./CalendarClient";

// ─────────────────────────────────────────────
// PROPS
// ─────────────────────────────────────────────

type CalendarProps = {
  data: TurnosData;
  todayISO: string;
  selectedISO: string | null;
  onSelectDay: (day: DayInfo) => void;
};

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

function isoToDate(iso: string): Date {
  return new Date(iso + "T00:00:00");
}

function dateToISO(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** "octubre 2026" → "Octubre 2026" */
function capitalizar(texto: string): string {
  if (!texto) return texto;
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

// ─────────────────────────────────────────────
// COMPONENTE
// ─────────────────────────────────────────────

export default function Calendar({
  data,
  todayISO,
  selectedISO,
  onSelectDay,
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState<Date>(() =>
    isoToDate(todayISO),
  );

  // Calcular los DayInfo del mes visible
  const dayInfos = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const map = new Map<string, DayInfo>();
    for (let d = 1; d <= daysInMonth; d++) {
      const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      map.set(iso, getDayInfo(iso, data, todayISO));
    }
    return map;
  }, [currentMonth, data, todayISO]);

  // Días no clickeables
  const isDayDisabled = (date: Date): boolean => {
    const iso = dateToISO(date);
    const info = dayInfos.get(iso);
    if (!info) return true;
    return !isDaySelectable(info.status);
  };

  // Navegación de meses
  const prevMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() - 1,
    1,
  );
  const nextMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    1,
  );
  const canPrev = canNavigateToMonth(
    prevMonth.getFullYear(),
    prevMonth.getMonth(),
    data,
    todayISO,
  );
  const canNext = canNavigateToMonth(
    nextMonth.getFullYear(),
    nextMonth.getMonth(),
    data,
    todayISO,
  );

  const today = isoToDate(todayISO);
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + data.config.maxDiasFuturo);

  return (
    <div className='bg-ink-soft border border-ink-line rounded-md p-4 sm:p-6 md:p-8'>
      <CalendarClient
        mode='single'
        locale={es}
        month={currentMonth}
        onMonthChange={setCurrentMonth}
        selected={selectedISO ? isoToDate(selectedISO) : undefined}
        onSelect={(date) => {
          if (!date) return;
          const iso = dateToISO(date);
          const info = dayInfos.get(iso);
          if (!info) return;
          if (!isDaySelectable(info.status)) return;
          onSelectDay(info);
        }}
        disabled={isDayDisabled}
        // 👇 Formatters: capitalizar el mes
        formatters={{
          formatCaption: (date) => {
            const mes = date.toLocaleDateString("es-AR", {
              month: "long",
              year: "numeric",
              timeZone: "UTC",
            });
            return capitalizar(mes);
          },
        }}
        // La prop modifiers ahora es un objeto de funciones Matcher
        modifiers={{
          available: (date: Date) => {
            const iso = dateToISO(date);
            const info = dayInfos.get(iso);
            return info?.status === "available";
          },
          partial: (date: Date) => {
            const iso = dateToISO(date);
            const info = dayInfos.get(iso);
            return info?.status === "partial";
          },
          unavailable: (date: Date) => {
            const iso = dateToISO(date);
            const info = dayInfos.get(iso);
            if (!info) return false;
            return (
              info.status === "full" ||
              info.status === "closed" ||
              info.status === "past" ||
              info.status === "future-limit"
            );
          },
        }}
        modifiersClassNames={{
          available: "rdp-available",
          partial: "rdp-partial",
          unavailable: "rdp-unavailable",
        }}
        showOutsideDays={false}
        weekStartsOn={1}
        startMonth={today}
        endMonth={maxDate}
        // Claves de classNames actualizadas a v9/v10
        classNames={{
          root: "rdp-custom-root",
          months: "rdp-custom-months",
          month: "rdp-custom-month",
          month_caption: "rdp-custom-caption",
          caption_label: "rdp-custom-caption-label",
          nav: "rdp-custom-nav",
          button_previous: `rdp-custom-nav-button ${
            canPrev ? "rdp-custom-nav-enabled" : "rdp-custom-nav-disabled"
          }`,
          button_next: `rdp-custom-nav-button ${
            canNext ? "rdp-custom-nav-enabled" : "rdp-custom-nav-disabled"
          }`,
          month_grid: "rdp-custom-grid",
          weekdays: "rdp-custom-weekdays",
          weekday: "rdp-custom-weekday",
          week: "rdp-custom-week",
          day: "rdp-custom-day",
          day_button: "rdp-custom-day-button",
          selected: "rdp-custom-selected",
          today: "rdp-custom-today",
          disabled: "rdp-custom-disabled",
          outside: "rdp-custom-outside",
          hidden: "rdp-custom-hidden",
        }}
      />

      <div className='mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-ink-line flex flex-wrap gap-3 sm:gap-6 text-[10px] sm:text-xs text-muted'>
        <div className='flex items-center gap-2'>
          <span className='w-3 h-3 rounded-sm border border-gold' />
          Disponible
        </div>
        <div className='flex items-center gap-2'>
          <span className='w-3 h-3 rounded-sm border border-gold/60 bg-gold/15' />
          Parcial
        </div>
        <div className='flex items-center gap-2'>
          <span className='w-3 h-3 rounded-sm bg-disabled' />
          Sin turno
        </div>
      </div>
    </div>
  );
}
