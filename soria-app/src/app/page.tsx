// src/app/page.tsx
import { Suspense } from "react";
import { readTurnos } from "../lib/readTurnos";
import Hero from "../components/Hero";
import About from "../components/About";
import Gallery from "../components/Gallery";
import BookingSectionServer from "../components/BookingSectionServer";

export default async function Page() {
  const data = await readTurnos();

  return (
    <main>
      <Hero />
      <About />
      <Gallery />
      <Suspense
        fallback={
          <div className='py-24 md:py-32 text-center text-muted'>
            Cargando disponibilidad…
          </div>
        }
      >
        <BookingSectionServer data={data} />
      </Suspense>
    </main>
  );
}
