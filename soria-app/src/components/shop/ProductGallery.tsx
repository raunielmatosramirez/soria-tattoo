// src/components/shop/ProductGallery.tsx
"use client";

import { useState } from "react";
import Image from "next/image";

type ProductGalleryProps = {
  imagenes?: string[];
  nombre: string;
};

export default function ProductGallery({
  imagenes = [],
  nombre,
}: ProductGalleryProps) {
  const [imagenActiva, setImagenActiva] = useState(0);

  if (!imagenes || imagenes.length === 0) {
    return (
      <div className='aspect-square bg-ink-soft border border-ink-line rounded-md flex items-center justify-center text-muted'>
        Sin imagen disponible
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='relative aspect-square md:aspect-[4/5] rounded-md overflow-hidden border border-ink-line bg-ink-soft'>
        <Image
          src={imagenes[imagenActiva]}
          alt={`${nombre} - Imagen ${imagenActiva + 1}`}
          fill
          priority
          sizes='(max-width: 768px) 100vw, 50vw'
          className='object-cover object-center transition-opacity duration-300'
        />
      </div>

      {imagenes.length > 1 && (
        <div className='flex gap-2 overflow-x-auto pb-2 scrollbar-hide'>
          {imagenes.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setImagenActiva(idx)}
              style={{ touchAction: "manipulation" }}
              className={`relative w-20 h-20 flex-shrink-0 rounded-sm overflow-hidden border-2 transition-colors ${
                imagenActiva === idx
                  ? "border-gold"
                  : "border-transparent hover:border-gold/50 opacity-70 hover:opacity-100"
              }`}
              aria-label={`Ver imagen ${idx + 1}`}
            >
              <Image
                src={img}
                alt={`${nombre} - Miniatura ${idx + 1}`}
                fill
                sizes='80px'
                className='object-cover'
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
