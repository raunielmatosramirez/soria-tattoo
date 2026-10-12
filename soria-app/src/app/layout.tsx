// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

export const metadata: Metadata = {
  title: "Estudio Tinta — Turnos",
  description:
    "Reservá tu turno en Estudio Tinta. Tatuajes personalizados en Buenos Aires. Elegí día y horario, y coordinamos por WhatsApp.",
  keywords: [
    "tatuajes",
    "estudio de tatuajes",
    "turnos",
    "Buenos Aires",
    "reservar turno",
  ],
  authors: [{ name: "Estudio Tinta" }],
  openGraph: {
    title: "Estudio Tinta — Turnos",
    description: "Reservá tu turno online. Coordinamos por WhatsApp.",
    type: "website",
    locale: "es_AR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // 👇 Año del copyright. Hardcodeado para evitar el error de
  //    "blocking route" de Next 16 con cacheComponents.
  //    Actualizalo una vez al año si querés.
  const year = 2026;

  return (
    <html lang='es'>
      <body className='font-sans bg-ink text-smoke antialiased'>
        <Header />
        {children}
        <Footer year={year} />
        <ScrollToTop /> {/* 👈 NUEVO */}
      </body>
    </html>
  );
}
