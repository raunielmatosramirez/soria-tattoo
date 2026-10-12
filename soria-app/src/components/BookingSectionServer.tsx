// src/components/BookingSectionServer.tsx
// Server Component. Aísla la parte dinámica (connection + new Date)
// para que page.tsx pueda ser estático.

import { connection } from "next/server";
import type { TurnosData } from "../lib/types";
import BookingSection from "./BookingSection";

type Props = {
  data: TurnosData;
};

export default async function BookingSectionServer({ data }: Props) {
  await connection();
  const todayISO = new Date().toISOString().split("T")[0];

  return <BookingSection data={data} todayISO={todayISO} />;
}
