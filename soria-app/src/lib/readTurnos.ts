// src/lib/readTurnos.ts
import { promises as fs } from "fs";
import path from "path";
import type { TurnosData } from "./types";

export async function readTurnos(): Promise<TurnosData> {
  "use cache"; // 👈 ESTA LÍNEA ES EL FIX
  const filePath = path.join(process.cwd(), "src", "data", "turnos.json");
  const file = await fs.readFile(filePath, "utf8");
  return JSON.parse(file) as TurnosData;
}
