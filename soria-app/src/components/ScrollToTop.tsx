// src/components/ScrollToTop.tsx
"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // chequear al montar

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className='pointer-events-none fixed bottom-6 right-6 z-40'>
      <button
        type='button'
        onClick={handleClick}
        aria-label='Volver arriba'
        className={`pointer-events-auto w-12 h-12 flex items-center justify-center rounded-full bg-gold text-ink shadow-lg shadow-gold/20 transition-all duration-300 touch-manipulation ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        } hover:bg-gold-light active:scale-95 ${
          !visible ? "pointer-events-none" : ""
        }`}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='20'
          height='20'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2.5'
          strokeLinecap='round'
          strokeLinejoin='round'
          aria-hidden='true'
        >
          <path d='M12 19V5' />
          <path d='M5 12l7-7 7 7' />
        </svg>
      </button>
    </div>
  );
}
