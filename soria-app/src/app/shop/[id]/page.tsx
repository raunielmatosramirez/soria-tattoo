// src/app/shop/[id]/page.tsx
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { readTurnos } from "@/src/lib/readTurnos";
import { Producto } from "@/src/lib/types";
import { formatPrecio, getCategoryName } from "@/src/lib/shop";
import ProductGallery from "@/src/components/shop/ProductGallery";
import ProductPurchase from "@/src/components/shop/ProductPurchase"; // 👈 Import directo
import ShareButton from "@/src/components/shop/ShareButton";

// 👇 BORRÁ TODO ESTO:
// const ProductPurchase = dynamic(...)

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const data = await readTurnos();
  const producto = data.tienda.productos.find((p: Producto) => p.id === id);

  if (!producto) return { title: "Producto no encontrado" };
  return {
    title: `${producto.nombre} — ${data.tienda.nombre}`,
    description: producto.descripcion,
  };
}

async function ProductDetailContent({ params }: Props) {
  const { id } = await params;
  const data = await readTurnos();
  const producto = data.tienda.productos.find((p: Producto) => p.id === id);

  if (!producto) notFound();

  const categoriaNombre = getCategoryName(data.tienda, producto.categoria);

  return (
    <div className='max-w-6xl mx-auto px-5 sm:px-8 md:px-10 pt-8 md:pt-12'>
      {/* ─── MIGA DE PAN ─── */}
      <nav className='flex items-center gap-2 text-xs text-muted mb-8 sm:mb-12'>
        <Link href='/shop' className='hover:text-gold transition-colors'>
          Shop
        </Link>
        <span aria-hidden='true'>/</span>
        <span className='text-smoke'>{producto.nombre}</span>
      </nav>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start'>
        {/* ─── GALERÍA ─── */}
        <ProductGallery imagenes={producto.imagenes} nombre={producto.nombre} />

        {/* ─── INFO ─── */}
        <div className='flex flex-col pt-4 md:pt-0'>
          <p className='text-gold text-xs tracking-[0.3em] uppercase mb-3'>
            {categoriaNombre}
          </p>

          <h1 className='font-display text-4xl sm:text-5xl md:text-6xl text-smoke leading-[1.1] mb-6'>
            {producto.nombre}
          </h1>

          <div className='flex items-center gap-3 mb-8 flex-wrap'>
            <p className='font-display text-2xl sm:text-3xl text-gold'>
              {formatPrecio(producto.precio, producto.moneda)}
            </p>
            <ShareButton nombre={producto.nombre} id={producto.id} />
          </div>

          <hr className='border-ink-line mb-8' />

          <div className='mb-8'>
            <h2 className='text-smoke text-sm tracking-[0.2em] uppercase mb-3'>
              Sobre la obra
            </h2>
            <p className='text-muted text-sm sm:text-base leading-relaxed'>
              {producto.descripcion}
            </p>
          </div>

          <div className='grid grid-cols-2 gap-4 mb-8 text-sm'>
            <div>
              <p className='text-muted text-xs uppercase tracking-wider mb-1'>
                Material
              </p>
              <p className='text-smoke'>{producto.material}</p>
            </div>
            <div>
              <p className='text-muted text-xs uppercase tracking-wider mb-1'>
                Stock
              </p>
              <p className='text-smoke'>
                {producto.stock > 0
                  ? `${producto.stock} disponibles`
                  : "Sin stock"}
              </p>
            </div>
          </div>

          {/* ─── SELECTOR DE ENVÍO + BOTÓN WHATSAPP ─── */}
          <ProductPurchase
            producto={producto}
            opcionesEnvio={data.tienda.opcionesEnvio}
          />
        </div>
      </div>
    </div>
  );
}

export default function ProductDetailPage({ params }: Props) {
  return (
    <main className='min-h-screen bg-ink pb-24'>
      <div className='h-16' aria-hidden='true' />

      <Suspense
        fallback={
          <div className='max-w-6xl mx-auto px-5 sm:px-8 md:px-10 pt-8 md:pt-12'>
            <div className='h-6 w-32 bg-ink-soft rounded animate-pulse mb-8' />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16'>
              <div className='aspect-square bg-ink-soft rounded-md animate-pulse' />
              <div className='space-y-4'>
                <div className='h-4 w-20 bg-ink-soft rounded animate-pulse' />
                <div className='h-12 w-3/4 bg-ink-soft rounded animate-pulse' />
                <div className='h-8 w-32 bg-ink-soft rounded animate-pulse' />
                <div className='h-24 w-full bg-ink-soft rounded animate-pulse' />
                <div className='h-32 w-full bg-ink-soft rounded animate-pulse' />
              </div>
            </div>
          </div>
        }
      >
        <ProductDetailContent params={params} />
      </Suspense>
    </main>
  );
}
