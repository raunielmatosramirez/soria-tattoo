// src/components/BookingFlow.tsx
// Client Component. Orquesta el flujo de reserva:
// Calendar → TimeSlots → BookingForm.

"use client";

import { useState } from "react";
import type { TurnosData, DayInfo } from "../lib/types";
import { getDayInfo } from "../lib/booking";
import Calendar from "./Calendar";
import TimeSlots from "./TimeSlots";
import BookingForm from "./BookingForm";

type BookingFlowProps = {
  data: TurnosData;
  todayISO: string;
};

export default function BookingFlow({ data, todayISO }: BookingFlowProps) {
  const [selectedISO, setSelectedISO] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const selectedDay: DayInfo | null = selectedISO
    ? getDayInfo(selectedISO, data, todayISO)
    : null;

  return (
    <div className='space-y-6 sm:space-y-10'>
      <Calendar
        data={data}
        todayISO={todayISO}
        selectedISO={selectedISO}
        onSelectDay={(day) => {
          setSelectedISO(day.iso);
          setSelectedTime(null);
        }}
      />

      {selectedDay && (
        <TimeSlots
          day={selectedDay}
          horarios={data.config.horarios}
          selectedTime={selectedTime}
          onSelectTime={setSelectedTime}
        />
      )}

      <BookingForm
        selectedDay={selectedDay}
        selectedTime={selectedTime}
        onReset={() => {
          setSelectedISO(null);
          setSelectedTime(null);
        }}
      />
    </div>
  );
}
