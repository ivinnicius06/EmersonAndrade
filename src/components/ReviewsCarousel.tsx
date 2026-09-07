"use client";

import { site } from "@/lib/site";
import { useEffect, useState } from "react";
import LinkArrow from "./LinkArrow";

const reviews = [
  {
    name: "Gabriel Rodrigues",
    text: "Nunca vi nada igual em Barreiras, atendimento muito diferenciado, roupas que vestem muito bem...",
  },
  {
    name: "Andréia Busato",
    text: "Excelente atendimento, produtos de qualidade e caimento impecável. Recomendo!",
  },
  {
    name: "Brenda Layanna",
    text: "Loja com peças de excelente qualidade e durabilidade!",
  },
  {
    name: "Paulo Ricardo Jesus Reges",
    text: "Ótimo atendimento, peças de alta qualidade, recomendo muitíssimo.",
  },
  {
    name: "Luma Quadros",
    text: "Atendimento maravilhoso. Roupas de qualidade.",
  },
];

export default function ReviewsCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % reviews.length),
      5200,
    );
    return () => window.clearInterval(timer);
  }, []);

  const move = (direction: number) =>
    setActive(
      (current) => (current + direction + reviews.length) % reviews.length,
    );

  return (
    <section className="reviews section" aria-labelledby="reviews-title">
      <div className="reviews-heading">
        <div>
          <p className="eyebrow">A EXPERIÊNCIA, POR QUEM A VIVE.</p>
          <h2 id="reviews-title">
            Quem vive a experiência,
            <br />
            <em>entende.</em>
          </h2>
        </div>
        <div className="reviews-score" aria-label="Nota 4,8 de 5 no Google">
          <strong>4,8</strong>
          <span aria-hidden="true">★★★★★</span>
        </div>
      </div>

      <div className="reviews-viewport" aria-live="polite">
        <div
          className="reviews-track"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {reviews.map((review) => (
            <article className="review-card" key={review.name}>
              <span className="review-stars" aria-label="5 de 5 estrelas">
                ★★★★★
              </span>
              <blockquote>“{review.text}”</blockquote>
              <p>{review.name}</p>
              <small>AVALIAÇÃO DO GOOGLE</small>
            </article>
          ))}
        </div>
      </div>

      <div className="reviews-footer">
        <div className="reviews-controls" aria-label="Controles do carrossel">
          <button onClick={() => move(-1)} aria-label="Avaliação anterior">
            <span aria-hidden="true">←</span>
          </button>
          <span className="reviews-count">
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(reviews.length).padStart(2, "0")}
          </span>
          <button onClick={() => move(1)} aria-label="Próxima avaliação">
            <span aria-hidden="true">→</span>
          </button>
        </div>
        <LinkArrow href={site.reviews} external>
          Ver todas as avaliações
        </LinkArrow>
      </div>
    </section>
  );
}
