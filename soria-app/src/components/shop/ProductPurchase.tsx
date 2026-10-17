// src/components/shop/ProductPurchase.tsx
"use client";

import type { OpcionesEnvio, Producto } from "@/src/lib/types";
import { WHATSAPP_NUMERO } from "@/src/lib/config";
import { formatPrecio } from "@/src/lib/shop";

type ProductPurchaseProps = {
  producto: Producto;
  opcionesEnvio: OpcionesEnvio;
};

export default function ProductPurchase({
  producto,
  opcionesEnvio,
}: ProductPurchaseProps) {
  const agotado = producto.stock === 0;

  const mensajeBase = `¡Hola! Me interesa la obra "${producto.nombre}" (${formatPrecio(
    producto.precio,
    producto.moneda,
  )}) que vi en la web.`;

  return (
    <div className='mt-auto pt-8'>
      <h3 className='text-smoke text-sm tracking-[0.2em] uppercase mb-3'>
        ¿Cómo querés recibir tu obra?
      </h3>

      <form
        action={`https://wa.me/${WHATSAPP_NUMERO}`}
        method='get'
        target='_blank'
        className='space-y-2 has-[:checked]:[&_.btn-disabled]:hidden has-[:checked]:[&_.btn-active]:flex'
      >
        {/* Radios nativos OCULTOS sin check visual */}
        {opcionesEnvio.gestores.map((gestor) => (
          <label
            key={gestor.id}
            className='group flex items-start gap-3 p-4 rounded-md border border-ink-line cursor-pointer transition-colors hover:border-gold/50 has-[:checked]:border-gold has-[:checked]:bg-gold/10'
          >
            <input
              type='radio'
              name='text'
              value={`${mensajeBase}\n\n📦 Envío: ${gestor.nombre} (${gestor.municipio})\n\n¿Sigue disponible?`}
              className='sr-only'
            />
            <div className='flex-1'>
              <div className='flex items-center justify-between mb-1'>
                <span className='font-medium text-smoke group-has-[:checked]:text-gold'>
                  {gestor.nombre}
                </span>
                <span className='text-xs text-muted'>{gestor.municipio}</span>
              </div>
              <p className='text-xs text-muted'>{gestor.descripcion}</p>
              <p className='text-xs text-gold mt-1'>
                {gestor.precioTexto || `$${gestor.precio}`}
              </p>
            </div>
          </label>
        ))}

        {opcionesEnvio.retiro.habilitado && (
          <label className='group flex items-start gap-3 p-4 rounded-md border border-ink-line cursor-pointer transition-colors hover:border-gold/50 has-[:checked]:border-gold has-[:checked]:bg-gold/10'>
            <input
              type='radio'
              name='text'
              value={`${mensajeBase}\n\n🏠 Recogida en el estudio (${opcionesEnvio.retiro.direccion})\n\n¿Sigue disponible?`}
              className='sr-only'
            />
            <div className='flex-1'>
              <div className='flex items-center justify-between mb-1'>
                <span className='font-medium text-smoke group-has-[:checked]:text-gold'>
                  Recogida en el estudio
                </span>
                <span className='text-xs text-muted'>Sin costo</span>
              </div>
              <p className='text-xs text-muted'>
                {opcionesEnvio.retiro.direccion}
              </p>
              <p className='text-xs text-muted'>
                {opcionesEnvio.retiro.horarios}
              </p>
            </div>
          </label>
        )}

        {/* Botón desactivado */}
        <div className='btn-disabled mt-6 w-full flex items-center justify-center gap-2 px-8 py-4 rounded-md font-medium tracking-wide bg-ink-line text-muted cursor-not-allowed'>
          Elegí cómo recibir tu obra
        </div>

        {/* Botón activo */}
        {agotado ? (
          <div className='btn-active hidden mt-6 w-full items-center justify-center gap-2 px-8 py-4 rounded-md font-medium tracking-wide bg-disabled text-muted cursor-not-allowed'>
            Sin stock
          </div>
        ) : (
          <button
            type='submit'
            className='btn-active hidden mt-6 w-full items-center justify-center gap-2 px-8 py-4 rounded-md font-medium tracking-wide bg-gold text-ink hover:bg-gold-light transition-all'
          >
            Consultar por WhatsApp
            <span aria-hidden='true'>→</span>
          </button>
        )}

        <p className='text-center text-muted text-xs mt-4'>
          Te responderemos a la brevedad para coordinar el pago y envío.
        </p>
      </form>
    </div>
  );
}
