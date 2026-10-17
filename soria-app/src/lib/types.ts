// src/lib/types.ts
// Tipos centrales del proyecto. TypeScript estricto: sin `any`.

// ─────────────────────────────────────────────
// TATUAJES / TURNOS
// ─────────────────────────────────────────────

export type Turno = {
  fecha: string;
  hora: string;
  nombre?: string;
};

export type Config = {
  horarios: string[];
  diasCerrado: number[];
  anticipacionMinimaDias: number;
  maxDiasFuturo: number;
};

export type DayStatus =
  | "available"
  | "partial"
  | "full"
  | "closed"
  | "past"
  | "future-limit";

export type DayInfo = {
  iso: string;
  day: number;
  month: number;
  year: number;
  weekday: number;
  status: DayStatus;
  freeSlots: string[];
  occupiedSlots: string[];
};

// ─────────────────────────────────────────────
// TIENDA DE ARTE
// ─────────────────────────────────────────────

export type Categoria = {
  id: string;
  nombre: string;
  descripcion?: string;
};

export type Producto = {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  moneda: string;
  categoria: string;
  material: string;
  imagenes: string[]; // 👈 AHORA ES UN ARRAY
  destacado: boolean;
  stock: number;
};

// ─────────────────────────────────────────────
// DATA GLOBAL (Turnos + Tienda)
// ─────────────────────────────────────────────

export type TurnosData = {
  config: Config;
  turnos: Turno[];
  tienda: Tienda;
};
// src/lib/types.ts

export type GestorEnvio = {
  id: string;
  nombre: string;
  municipio: string;
  descripcion: string;
  precio: number;
  precioTexto?: string;
};

export type Retiro = {
  habilitado: boolean;
  direccion: string;
  horarios: string;
};

export type OpcionesEnvio = {
  gestores: GestorEnvio[];
  retiro: Retiro;
};

export type Tienda = {
  nombre: string;
  descripcion: string;
  categorias: Categoria[];
  productos: Producto[];
  opcionesEnvio: OpcionesEnvio; // 👈 NUEVO
};
