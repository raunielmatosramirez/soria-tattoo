// src/components/ProductCard.tsx
import { formatPrecio, getCategoryName } from "@/src/lib/shop";
import { Producto, Tienda } from "@/src/lib/types";
import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  producto: Producto;
  tienda: Tienda;
};

export default function ProductCard({ producto, tienda }: ProductCardProps) {
  const categoriaNombre = getCategoryName(tienda, producto.categoria);
  const agotado = producto.stock === 0;

  // Fallback por si no hay imágenes
  const portada =
    producto.imagenes && producto.imagenes.length > 0
      ? producto.imagenes[0]
      : "https://picsum.photos/seed/placeholder/600/600";

  return (
    <Link href={`/shop/${producto.id}`} className='group block h-full'>
      <article className='flex flex-col h-full bg-ink-soft border border-ink-line rounded-md overflow-hidden hover:border-gold transition-colors duration-300'>
        {/* ─── IMAGEN ─── */}
        <div className='relative aspect-square overflow-hidden bg-ink'>
          <Image
            src={portada}
            alt={producto.nombre}
            fill
            sizes='(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
            className='object-cover object-center transition-transform duration-500 group-hover:scale-105'
          />

          {producto.destacado && (
            <span className='absolute top-1.5 left-1.5 bg-gold text-ink text-[8px] sm:text-[9px] tracking-[0.15em] uppercase font-bold px-1.5 py-0.5 rounded-sm'>
              Destacado
            </span>
          )}

          {agotado && (
            <div className='absolute inset-0 bg-ink/70 flex items-center justify-center'>
              <span className='text-gold font-display text-sm tracking-widest uppercase'>
                Agotado
              </span>
            </div>
          )}
        </div>

        {/* ─── INFO ─── */}
        <div className='flex flex-col flex-1 p-2.5 sm:p-3'>
          <p className='text-[8px] sm:text-[9px] tracking-[0.15em] uppercase text-gold mb-1 truncate'>
            {categoriaNombre}
          </p>

          <h3 className='font-display text-[11px] sm:text-sm text-smoke leading-tight mb-2 line-clamp-2'>
            {producto.nombre}
          </h3>

          <p className='font-display text-sm sm:text-base text-gold mt-auto pt-2 border-t border-ink-line/50'>
            {formatPrecio(producto.precio, producto.moneda)}
          </p>
        </div>
      </article>
    </Link>
  );
}
