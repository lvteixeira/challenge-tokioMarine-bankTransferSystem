import React, { useState, useEffect } from "react";

export default function ErrorAlert() {
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setShouldRender(false); // Define o estado para não renderizar o componente ErrorAlert após 3 segundos
    }, 2800);

    // Limpa o timer ao desmontar o componente para evitar vazamentos de memória
    return () => clearTimeout(timerId);
  }, []); // O array vazio significa que o efeito será executado apenas uma vez após a montagem do componente

  return shouldRender ? (
    <div role="alert" className="alert alert-error z-50 mt-4 text-justify items-left">
      <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>Schedule failed! Transfer must be scheduled within 50 days.</span>
    </div>
  ) : null; // Retorna null se o estado indicar que o componente não deve ser renderizado
}