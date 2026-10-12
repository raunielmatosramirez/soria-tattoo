import {
  getDayInfo,
  getMonthGrid,
  buildWhatsAppMessage,
  buildWhatsAppUrl,
} from "./src/lib/booking.ts";
import data from "./src/data/turnos.json" with { type: "json" };

const today = new Date().toISOString().split("T")[0];
console.log("Hoy:", today);

const info = getDayInfo(today, data, today);
console.log("Info de hoy:", {
  iso: info.iso,
  status: info.status,
  freeSlots: info.freeSlots.length,
  occupiedSlots: info.occupiedSlots.length,
});

const grid = getMonthGrid(
  new Date().getFullYear(),
  new Date().getMonth(),
  data,
  today,
);
console.log("Celdas de la grilla:", grid.length); // debe ser 42

const msg = buildWhatsAppMessage(
  {
    nombre: "Test",
    telefono: "123",
    email: "",
    estilo: "Realismo",
    zona: "Brazo",
    tamano: "10",
    coverUp: "no",
    primerTatuaje: "si",
    descripcion: "Test",
    referencia: "",
    alergias: "",
    aceptaSenia: true,
  },
  today,
  "15:00",
);
console.log("--- Mensaje WA ---");
console.log(msg);
console.log("--- URL WA ---");
console.log(buildWhatsAppUrl("5491122334455", msg).slice(0, 80) + "...");
