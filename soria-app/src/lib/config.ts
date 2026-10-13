// src/lib/config.ts
// src/lib/config.ts
// 👇 Datos editables del estudio.
// La ubicación se lee desde .env.local (NEXT_PUBLIC_UBICACION).
// La URL de Google Maps se DERIVA automáticamente de esa dirección.

// 👇 CAMBIAR ACÁ EL NÚMERO DE WHATSAPP (formato internacional, sin + ni espacios)
export const WHATSAPP_NUMERO = "+53 55161541";

export const NOMBRE_ESTUDIO = "Coraje tattoo";
export const INSTAGRAM_URL = "https://instagram.com/soria.art94";

// 👇 Dirección del estudio (texto visible + base del mapa)
export const UBICACION =
  process.env.NEXT_PUBLIC_UBICACION ?? "Buenos Aires, Argentina";

// 👇 URL de Google Maps generada automáticamente a partir de UBICACION.
// encodeURIComponent se encarga de los espacios, comas y caracteres especiales.
export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  UBICACION,
)}`;

export const HORARIOS_ATENCION = "Lun a Sáb de 10 a 19 hs";
