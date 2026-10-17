// src/lib/booking.ts
// Funciones PURAS (sin hooks, sin side-effects) que calculan
// disponibilidad, formatean fechas y arman el mensaje de WhatsApp.

import type { TurnosData, DayInfo, DayStatus } from "./types";

// ─────────────────────────────────────────────
// HELPERS INTERNOS
// ─────────────────────────────────────────────

/** Suma N días a una fecha ISO (YYYY-MM-DD) y devuelve ISO. */
function addDaysISO(iso: string, days: number): string {
  const d = new Date(iso + "T00:00:00");
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

/** Convierte ISO (YYYY-MM-DD) a Date local a medianoche. */
function isoToDate(iso: string): Date {
  return new Date(iso + "T00:00:00");
}

// ─────────────────────────────────────────────
// DÍA INDIVIDUAL
// ─────────────────────────────────────────────

/**
 * Calcula el estado y los slots de un día concreto.
 *
 * Reglas (en orden de prioridad):
 *  1. past        → iso < todayISO + anticipacionMinimaDias
 *  2. future-limit→ iso > todayISO + maxDiasFuturo
 *  3. closed      → weekday ∈ diasCerrado
 *  4. full        → todos los horarios ocupados
 *  5. partial     → algunos ocupados
 *  6. available   → ninguno ocupado
 */
export function getDayInfo(
  iso: string,
  data: TurnosData,
  todayISO: string,
): DayInfo {
  const { config, turnos } = data;
  const date = isoToDate(iso);

  const minISO = addDaysISO(todayISO, config.anticipacionMinimaDias);
  const maxISO = addDaysISO(todayISO, config.maxDiasFuturo);

  // Slots ocupados de ese día (solo importa fecha + hora)
  const ocupadosDelDia = turnos
    .filter((t) => t.fecha === iso)
    .map((t) => t.hora);

  const freeSlots = config.horarios.filter((h) => !ocupadosDelDia.includes(h));
  const occupiedSlots = config.horarios.filter((h) =>
    ocupadosDelDia.includes(h),
  );

  // Determinar status
  let status: DayStatus;

  if (iso < minISO) {
    status = "past";
  } else if (iso > maxISO) {
    status = "future-limit";
  } else if (config.diasCerrado.includes(date.getDay())) {
    status = "closed";
  } else if (occupiedSlots.length === config.horarios.length) {
    status = "full";
  } else if (occupiedSlots.length > 0) {
    status = "partial";
  } else {
    status = "available";
  }

  return {
    iso,
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
    weekday: date.getDay(),
    status,
    freeSlots,
    occupiedSlots,
  };
}

// ─────────────────────────────────────────────
// GRILLA DEL MES
// ─────────────────────────────────────────────

/**
 * Devuelve 42 celdas (6 semanas × 7 días) para el mes dado.
 * La grilla empieza en LUNES (weekday 1).
 * Las celdas fuera del mes son `null` (relleno).
 */
export function getMonthGrid(
  year: number,
  month: number,
  data: TurnosData,
  todayISO: string,
): (DayInfo | null)[] {
  const firstOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // getDay(): 0=dom, 1=lun, ... 6=sáb
  // Queremos lunes=0 → (getDay() + 6) % 7
  const startWeekday = (firstOfMonth.getDay() + 6) % 7;

  const cells: (DayInfo | null)[] = [];

  // Relleno antes del día 1
  for (let i = 0; i < startWeekday; i++) cells.push(null);

  // Días reales del mes
  for (let d = 1; d <= daysInMonth; d++) {
    const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    cells.push(getDayInfo(iso, data, todayISO));
  }

  // Relleno hasta 42
  while (cells.length < 42) cells.push(null);

  return cells;
}

// ─────────────────────────────────────────────
// NAVEGACIÓN DE MESES
// ─────────────────────────────────────────────

/** ¿Este día se puede clickear? Solo `available` y `partial`. */
export function isDaySelectable(status: DayStatus): boolean {
  return status === "available" || status === "partial";
}

/**
 * ¿Podemos navegar al mes (year, month)?
 * Permitimos ver desde el mes actual hasta el mes que contiene
 * todayISO + maxDiasFuturo.
 */
export function canNavigateToMonth(
  year: number,
  month: number,
  data: TurnosData,
  todayISO: string,
): boolean {
  const target = new Date(year, month, 1).getTime();

  const today = isoToDate(todayISO);
  const minMonth = new Date(today.getFullYear(), today.getMonth(), 1).getTime();

  const maxDate = isoToDate(addDaysISO(todayISO, data.config.maxDiasFuturo));
  const maxMonth = new Date(
    maxDate.getFullYear(),
    maxDate.getMonth(),
    1,
  ).getTime();

  return target >= minMonth && target <= maxMonth;
}

// ─────────────────────────────────────────────
// FORMATEO DE FECHAS
// ─────────────────────────────────────────────

const MESES = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

const DIAS = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

/** "2026-10-17" → "17/10/2026" */
export function formatFecha(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

/** "2026-10-17" → "Sábado 17 de octubre" */
export function formatFechaLarga(iso: string): string {
  const date = isoToDate(iso);
  const dia = DIAS[date.getDay()];
  const mes = MESES[date.getMonth()];
  return `${dia} ${date.getDate()} de ${mes}`;
}

/** "15:00" → "3:00 PM" */
export function formatHora(hora: string): string {
  const [hStr, mStr] = hora.split(":");
  const h = parseInt(hStr, 10);
  const suffix = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${mStr} ${suffix}`;
}

// ─────────────────────────────────────────────
// WHATSAPP
// ─────────────────────────────────────────────

/** Arma la URL final de wa.me con el mensaje encodeado. */
export function buildWhatsAppUrl(numero: string, mensaje: string): string {
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
}
