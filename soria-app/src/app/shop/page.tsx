// src/app/shop/page.tsx
import ShopSection from "@/src/components/shop/ShopSection";
import { readTurnos } from "@/src/lib/readTurnos";

export default async function TiendaPage() {
  const data = await readTurnos();

  return (
    <main className='min-h-screen bg-ink'>
      <div className='h-16' aria-hidden='true' />

      <section className='py-16 md:py-24 bg-ink border-b border-ink-line'>
        <div className='max-w-6xl mx-auto px-5 sm:px-8 md:px-10'>
          <div className='flex items-center gap-3 mb-6'>
            <span className='w-10 h-px bg-gold' aria-hidden='true' />
            <p className='text-gold text-xs tracking-[0.35em] uppercase'>
              Shop
            </p>
          </div>

          <h1 className='font-display text-5xl md:text-7xl text-smoke leading-[0.95] mb-6'>
            Soria <span className='text-gold'>Arte</span>
          </h1>

          <p className='text-muted text-base md:text-lg max-w-xl leading-relaxed'>
            Piezas únicas de arte para llevar a casa.
          </p>
        </div>
      </section>

      <ShopSection data={data} />
    </main>
  );
}
