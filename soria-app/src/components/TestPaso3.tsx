// src/components/TestPaso3.tsx
import { connection } from "next/server";
import { TurnosData } from "../lib/types";
import { getDayInfo, getMonthGrid } from "../lib/booking";

export default async function TestPaso3({ data }: { data: TurnosData }) {
  await connection(); // ✅ ahora SÍ puede ir acá (dentro de Suspense)

  const today = new Date().toISOString().split("T")[0];
  const info = getDayInfo(today, data, today);
  const grid = getMonthGrid(
    new Date().getFullYear(),
    new Date().getMonth(),
    data,
    today,
  );

  return (
    <>
      <p>Hoy: {today}</p>
      <p>Status hoy: {info.status}</p>
      <p>Slots libres hoy: {info.freeSlots.length}</p>
      <p>Celdas grilla: {grid.length}</p>
    </>
  );
}
