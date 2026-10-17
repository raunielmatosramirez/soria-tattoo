// src/lib/shop.ts
// Funciones puras para la tienda de arte.

import type { Producto, Tienda } from "./types";

/**
 * Filtra productos por categoría.
 * Si se pasa "todas", devuelve todos los productos.
 */
export function filterByCategory(
  productos: Producto[],
  categoriaId: string,
): Producto[] {
  if (categoriaId === "todas") return productos;
  return productos.filter((p) => p.categoria === categoriaId);
}

/**
 * Formatea un precio con su moneda.
 * Ej: 280 + "USD" -> "USD $280"
 */
export function formatPrecio(precio: number, moneda: string): string {
  const formatter = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: moneda,
    maximumFractionDigits: 0,
  });
  return formatter.format(precio);
}

/**
 * Devuelve el nombre de la categoría a partir de su ID.
 * Ej: "pinturas" -> "Pinturas"
 */
export function getCategoryName(tienda: Tienda, categoriaId: string): string {
  const cat = tienda.categorias.find((c) => c.id === categoriaId);
  return cat ? cat.nombre : "Sin categoría";
}

/**
 * Ordena productos: primero los destacados, luego el resto.
 */
export function sortByDestacado(productos: Producto[]): Producto[] {
  return [...productos].sort((a, b) => {
    if (a.destacado && !b.destacado) return -1;
    if (!a.destacado && b.destacado) return 1;
    return 0;
  });
}
