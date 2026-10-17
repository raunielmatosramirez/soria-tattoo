// src/components/shop/ShippingSelector.tsx
"use client";

import { OpcionesEnvio } from "@/src/lib/types";

type ShippingChoice =
  | {
      type: "gestor";
      gestorId: string;
      gestorNombre: string;
      municipio: string;
    }
  | { type: "retiro" }
  | null;

type ShippingSelectorProps = {
  opciones: OpcionesEnvio;
  onSelect: (choice: ShippingChoice) => void;
};

export default function ShippingSelector({
  opciones,
  onSelect,
}: ShippingSelectorProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    if (!value) return; // Si elige la opción por defecto, no hace nada

    if (value === "retiro") {
      onSelect({ type: "retiro" });
    } else {
      const gestor = opciones.gestores.find((g) => g.id === value);
      if (gestor) {
        onSelect({
          type: "gestor",
          gestorId: gestor.id,
          gestorNombre: gestor.nombre,
          municipio: gestor.municipio,
        });
      }
    }
  };

  return (
    <div className='space-y-4'>
      <h3 className='text-smoke text-sm tracking-[0.2em] uppercase mb-3'>
        ¿Cómo querés recibir tu obra?
      </h3>

      {/* ─── SELECT NATIVO ─── */}
      <div className='relative'>
        <select
          onChange={handleChange}
          defaultValue=''
          className='w-full appearance-none bg-ink border border-ink-line text-smoke rounded-md px-4 py-3 pr-10 focus:outline-none focus:border-gold transition-colors cursor-pointer'
        >
          <option value='' disabled>
            Elegí una opción de envío...
          </option>

          {opciones.gestores.map((gestor) => (
            <option key={gestor.id} value={gestor.id}>
              {gestor.nombre} — {gestor.municipio}
            </option>
          ))}

          {opciones.retiro.habilitado && (
            <option value='retiro'>
              Recogida en el estudio — {opciones.retiro.direccion}
            </option>
          )}
        </select>

        {/* Flechita decorativa para el select */}
        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gold'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='14'
            height='14'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <polyline points='6 9 12 15 18 9' />
          </svg>
        </div>
      </div>

      {/* Info extra para el usuario */}
      <p className='text-xs text-muted'>
        Al elegir una opción, podrás consultar por WhatsApp con los detalles de
        envío ya incluidos.
      </p>
    </div>
  );
}
