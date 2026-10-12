// src/lib/types.ts
// Tipos centrales del proyecto. TypeScript estricto: sin `any`.

/** Un turno ya reservado (leído desde turnos.json). */
export type Turno = {
  fecha: string; // YYYY-MM-DD
  hora: string; // HH:MM
  nombre?: string; // informativo, no afecta disponibilidad
};

/** Configuración del estudio (leída desde turnos.json). */
export type Config = {
  horarios: string[]; // ["10:00", "11:00", ...]
  diasCerrado: number[]; // 0=domingo ... 6=sábado
  anticipacionMinimaDias: number;
  maxDiasFuturo: number;
};

/** Estructura completa del archivo turnos.json. */
export type TurnosData = {
  config: Config;
  turnos: Turno[];
};

/** Estado posible de un día en el calendario. */
export type DayStatus =
  | "available" // sin turnos ocupados
  | "partial" // algunos horarios ocupados
  | "full" // todos los horarios ocupados
  | "closed" // día cerrado por configuración
  | "past" // antes de la anticipación mínima
  | "future-limit"; // más allá del límite de días futuros

/** Info calculada de un día para renderizar en el calendario. */
export type DayInfo = {
  iso: string; // YYYY-MM-DD
  day: number; // 1-31
  month: number; // 0-11
  year: number;
  weekday: number; // 0=domingo ... 6=sábado
  status: DayStatus;
  freeSlots: string[]; // horarios libres
  occupiedSlots: string[]; // horarios ocupados
};

/** Datos del formulario de reserva. */
export type BookingFormData = {
  nombre: string;
  telefono: string;
  email: string;
  estilo: string;
  zona: string;
  tamano: string;
  coverUp: "si" | "no";
  primerTatuaje: "si" | "no";
  descripcion: string;
  referencia: string;
  alergias: string;
  aceptaSenia: boolean;
};
