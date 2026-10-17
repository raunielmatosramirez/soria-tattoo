// src/components/ShopSection.tsx
"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import { filterByCategory, sortByDestacado } from "@/src/lib/shop";
import { TurnosData } from "@/src/lib/types";

type ShopSectionProps = {
  data: TurnosData;
};

export default function ShopSection({ data }: ShopSectionProps) {
  const { tienda } = data;
  const [categoriaActiva, setCategoriaActiva] = useState<string>("todas");

  const productosFiltrados = sortByDestacado(
    filterByCategory(tienda.productos, categoriaActiva),
  );

  return (
    <section className='py-12 md:py-16 bg-ink-soft'>
      <div className='max-w-6xl mx-auto px-5 sm:px-8 md:px-10'>
        {/* ─── FILTROS DE CATEGORÍA ─── */}
        <div className='mb-10 md:mb-12 border-b border-ink-line pb-4'>
          <div className='flex overflow-x-auto gap-6 sm:gap-8 scrollbar-hide'>
            {/* Botón "Todas" */}
            <button
              type='button'
              onPointerUp={() => setCategoriaActiva("todas")}
              style={{ touchAction: "manipulation" }}
              className={`relative pb-4 text-xs tracking-[0.2em] uppercase whitespace-nowrap transition-colors ${
                categoriaActiva === "todas"
                  ? "text-gold font-medium"
                  : "text-muted hover:text-smoke"
              }`}
            >
              Todas
              {categoriaActiva === "todas" && (
                <span className='absolute bottom-0 left-0 w-full h-[2px] bg-gold' />
              )}
            </button>

            {/* Categorías dinámicas */}
            {tienda.categorias.map((cat) => (
              <button
                key={cat.id}
                type='button'
                onPointerUp={() => setCategoriaActiva(cat.id)}
                style={{ touchAction: "manipulation" }}
                className={`relative pb-4 text-xs tracking-[0.2em] uppercase whitespace-nowrap transition-colors ${
                  categoriaActiva === cat.id
                    ? "text-gold font-medium"
                    : "text-muted hover:text-smoke"
                }`}
              >
                {cat.nombre}
                {categoriaActiva === cat.id && (
                  <span className='absolute bottom-0 left-0 w-full h-[2px] bg-gold' />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ─── GRILLA DE PRODUCTOS ─── */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5'>
          {productosFiltrados.map((producto) => (
            <ProductCard
              key={producto.id}
              producto={producto}
              tienda={tienda}
            />
          ))}
        </div>

        {/* ─── ESTADO VACÍO ─── */}
        {productosFiltrados.length === 0 && (
          <div className='text-center py-16 border border-ink-line rounded-md bg-ink'>
            <p className='text-muted text-sm'>
              No hay productos en esta categoría todavía.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
