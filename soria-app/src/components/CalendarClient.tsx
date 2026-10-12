// src/components/CalendarClient.tsx
// Wrapper que carga DayPicker SOLO en el cliente usando dynamic + ssr: false.
// Esto evita hydration mismatch y no genera warnings de lint.

"use client";

import dynamic from "next/dynamic";
import type { DayPickerProps } from "react-day-picker";

const DayPicker = dynamic(
  () => import("react-day-picker").then((mod) => mod.DayPicker),
  {
    ssr: false,
    loading: () => (
      <div className='w-full h-80 flex items-center justify-center text-muted text-sm'>
        Cargando calendario…
      </div>
    ),
  },
);

export default function CalendarClient(props: DayPickerProps) {
  return <DayPicker {...props} />;
}
