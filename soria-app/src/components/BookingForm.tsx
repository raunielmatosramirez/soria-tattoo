// src/components/BookingForm.tsx
// Client Component. Formulario simplificado: nombre + teléfono.
// Al enviar, se abre WhatsApp y la vista de éxito se auto-cierra.

"use client";

import { useState, useEffect } from "react";
import type { DayInfo } from "../lib/types";
import { WHATSAPP_NUMERO } from "../lib/config";
import { formatFechaLarga, formatHora } from "../lib/booking";

// ─────────────────────────────────────────────
// CONSTANTES
// ─────────────────────────────────────────────

const AUTO_RESET_MS = 2000; // 👈 Cambiá acá la duración de la vista de éxito

// ─────────────────────────────────────────────
// TIPOS
// ─────────────────────────────────────────────

type SimpleForm = {
  nombre: string;
  telefono: string;
};

const FORM_INICIAL: SimpleForm = {
  nombre: "",
  telefono: "",
};

type BookingFormProps = {
  selectedDay: DayInfo | null;
  selectedTime: string | null;
  onReset: () => void;
};

// ─────────────────────────────────────────────
// COMPONENTE
// ─────────────────────────────────────────────

export default function BookingForm({
  selectedDay,
  selectedTime,
  onReset,
}: BookingFormProps) {
  const [form, setForm] = useState<SimpleForm>(FORM_INICIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const ready = selectedDay !== null && selectedTime !== null;

  // Auto-reset después del éxito
  useEffect(() => {
    if (!submitted) return;

    const timer = setTimeout(() => {
      setForm(FORM_INICIAL);
      setErrors({});
      setSubmitted(false);
      onReset();
    }, AUTO_RESET_MS);

    return () => clearTimeout(timer);
  }, [submitted, onReset]);

  const update = <K extends keyof SimpleForm>(key: K, value: SimpleForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ready) return;

    const newErrors = validate(form);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstKey = Object.keys(newErrors)[0];
      const el = document.querySelector(`[name="${firstKey}"]`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      (el as HTMLElement | null)?.focus();
      return;
    }

    const mensaje = [
      "¡Hola! Quiero reservar un turno para tatuarme",
      `📅 Fecha: ${formatFechaLarga(selectedDay!.iso)}`,
      `🕐 Hora: ${formatHora(selectedTime!)}`,
      `👤 Nombre: ${form.nombre}`,
      `📱 Teléfono: ${form.telefono}`,
      "¡Gracias! Quedo atento/a a la confirmación.",
    ].join("\n");

    const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(
      mensaje,
    )}`;
    window.open(url, "_blank");
    setSubmitted(true);
  };

  // ─────────────────────────────────────────────
  // RENDER: ÉXITO
  // ─────────────────────────────────────────────

  if (submitted) {
    return (
      <div className='bg-ink-soft border border-gold/40 rounded-md p-6 sm:p-8 md:p-12 text-center'>
        <p className='text-gold text-5xl mb-6'>✓</p>
        <h3 className='font-display text-2xl sm:text-3xl md:text-4xl text-smoke mb-4'>
          ¡Listo!
        </h3>
        <p className='text-muted text-sm sm:text-base max-w-md mx-auto mb-6 leading-relaxed'>
          Se abrió WhatsApp con tu solicitud. El turno queda confirmado cuando
          el estudio te responda.
        </p>

        {/* Barra de progreso */}
        <div className='w-full max-w-xs mx-auto h-0.5 bg-ink-line rounded-full overflow-hidden mb-3'>
          <div
            className='h-full bg-gold'
            style={{
              animation: `shrink ${AUTO_RESET_MS}ms linear forwards`,
            }}
          />
        </div>

        <p className='text-muted/60 text-xs'>
          Volviendo al inicio en unos segundos…
        </p>
      </div>
    );
  }

  // ─────────────────────────────────────────────
  // RENDER: FORMULARIO
  // ─────────────────────────────────────────────

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-ink-soft border border-ink-line rounded-md p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6'
      noValidate
    >
      {/* ─── ENCABEZADO ─── */}
      <div>
        <div className='flex items-center gap-3 mb-3'>
          <span className='w-10 h-px bg-gold' aria-hidden='true' />
          <p className='text-gold text-xs tracking-[0.35em] uppercase'>
            Último paso
          </p>
        </div>
        <h3 className='font-display text-xl sm:text-2xl md:text-3xl text-smoke'>
          Confirma tus datos
        </h3>
      </div>

      {/* ─── RESUMEN DEL TURNO ─── */}
      <div
        className={`rounded-md p-4 border ${
          ready ? "border-gold/40 bg-gold/5" : "border-ink-line bg-ink"
        }`}
      >
        {ready ? (
          <p className='text-smoke text-sm md:text-base'>
            <span className='text-gold'>Turno seleccionado:</span>{" "}
            {formatFechaLarga(selectedDay!.iso)} a las{" "}
            <span className='font-medium'>{formatHora(selectedTime!)}</span>
          </p>
        ) : (
          <p className='text-muted text-sm'>
            Elige un día y horario para continuar.
          </p>
        )}
      </div>

      {/* ─── CAMPOS ─── */}
      <fieldset
        disabled={!ready}
        className={`space-y-5 sm:space-y-6 ${!ready ? "opacity-50" : ""}`}
      >
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6'>
          <Field
            label='Nombre y apellido *'
            name='nombre'
            type='text'
            value={form.nombre}
            onChange={(v) => update("nombre", v)}
            error={errors.nombre}
            autoComplete='name'
          />
          <Field
            label='Teléfono *'
            name='telefono'
            type='tel'
            value={form.telefono}
            onChange={(v) => update("telefono", v)}
            error={errors.telefono}
            autoComplete='tel'
          />
        </div>
      </fieldset>

      {/* ─── BOTÓN ENVIAR ─── */}
      <div className='pt-2'>
        <button
          type='submit'
          disabled={!ready}
          className={`w-full md:w-auto px-8 py-4 rounded-md font-medium tracking-wide transition-colors touch-manipulation ${
            ready
              ? "bg-gold text-ink hover:bg-gold-light active:bg-gold-light"
              : "bg-disabled text-muted cursor-not-allowed"
          }`}
        >
          Enviar por WhatsApp
        </button>
        <p className='text-muted text-xs mt-3'>
          Se abrirá WhatsApp con tu solicitud ya escrita. Vos solo confirmás el
          envío.
        </p>
      </div>
    </form>
  );
}

// ─────────────────────────────────────────────
// VALIDACIÓN
// ─────────────────────────────────────────────

function validate(form: SimpleForm): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!form.nombre.trim()) errors.nombre = "Ingresá tu nombre.";
  if (!form.telefono.trim()) errors.telefono = "Ingresá tu teléfono.";

  return errors;
}

// ─────────────────────────────────────────────
// SUB-COMPONENTE CAMPO
// ─────────────────────────────────────────────

type FieldProps = {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  autoComplete?: string;
};

function Field({
  label,
  name,
  type,
  value,
  onChange,
  error,
  autoComplete,
}: FieldProps) {
  return (
    <div>
      <label htmlFor={name} className='block text-gold text-sm mb-1.5'>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        className={`w-full bg-ink border text-smoke rounded-md px-3 py-3 sm:py-2.5 text-base sm:text-sm transition-colors focus:outline-none ${
          error
            ? "border-error focus:border-error"
            : "border-ink-line focus:border-gold"
        }`}
      />
      {error && <p className='text-error text-xs mt-1'>{error}</p>}
    </div>
  );
}
