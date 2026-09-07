"use client";
import { useState } from "react";
export default function Personalization() {
  const [fit, setFit] = useState(65);
  const loose = 33 - fit * 0.16;
  return (
    <section id="personalizacao" className="personalization section">
      <div className="personalization-copy" data-reveal>
        <p className="eyebrow">06 / PERSONALIZAÇÃO</p>
        <h2>
          Não é apenas
          <br />
          sobre o tamanho.
          <br />
          <em>É sobre o ajuste.</em>
        </h2>
        <p>
          Modelagem, proporções e preferências. Pequenas mudanças transformam a
          forma como uma peça acompanha você.
        </p>
        <div className="tailor-terms">
          <span>Modelagem</span>
          <span>Caimento</span>
          <span>Proporções</span>
          <span>Ajustes</span>
          <span>Preferências</span>
          <span>Combinações</span>
        </div>
      </div>
      <div className="tailoring-visual">
        <span className="eyebrow">UM OLHAR SOBRE O CAIMENTO</span>
        <svg
          viewBox="0 0 260 270"
          role="img"
          aria-label="Desenho técnico de camisa com ajuste de largura controlado pelo slider"
        >
          <defs>
            <pattern
              id="tailor-grid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M20 0H0V20"
                fill="none"
                stroke="currentColor"
                opacity=".08"
              />
            </pattern>
          </defs>
          <rect width="260" height="270" fill="url(#tailor-grid)" />
          <path
            className="shirt-baseline"
            d="M107 31L66 48L20 105L57 130L76 104L66 241Q130 250 194 241L184 104L203 130L240 105L194 48L153 31"
          />
          <path
            className="shirt-adjusted"
            d={`M107 31L76 48L35 104L65 122L88 91L${98 - loose} 235Q130 243 ${162 + loose} 235L172 91L195 122L225 104L184 48L153 31L145 62L130 51L115 62Z`}
          />
          <path
            className="shirt-seams"
            d="M107 31Q130 45 153 31M130 52V238M109 34L115 62M151 34L145 62"
          />
          {[85, 113, 141, 169, 197, 225].map((y) => (
            <circle key={y} cx="134" cy={y} r="1.5" fill="currentColor" />
          ))}
          <path
            className="shirt-guide"
            d="M24 170H236M24 165V175M236 165V175"
          />
        </svg>
        <label htmlFor="tailor-fit" className="tailor-slider-label">
          <span>PEÇA PADRÃO</span>
          <span>AJUSTE PERSONALIZADO</span>
        </label>
        <input
          id="tailor-fit"
          aria-label="Explorar ajuste da modelagem"
          type="range"
          min="0"
          max="100"
          value={fit}
          onChange={(e) => setFit(Number(e.target.value))}
        />
        <small>Explore o ajuste. Ilustração conceitual de modelagem.</small>
      </div>
    </section>
  );
}
