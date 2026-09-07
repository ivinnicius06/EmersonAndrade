"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { initialMeasurements, measureFields, profileMessage } from "@/lib/fit";
import { whatsapp } from "@/lib/site";
import ExternalArrow from "../ExternalArrow";
const Mannequin = dynamic(() => import("./Mannequin"), {
  ssr: false,
  loading: () => (
    <div className="model-loading">
      <span>EA FIT</span>
      <p>Preparando sua visualização 3D…</p>
    </div>
  ),
});
export default function EAFit() {
  const root = useRef<HTMLElement>(null),
    heading = useRef<HTMLHeadingElement>(null);
  const [load, setLoad] = useState(false),
    [step, setStep] = useState(0),
    [measurements, setMeasurements] = useState(initialMeasurements);
  const [name, setName] = useState(""),
    [phone, setPhone] = useState(""),
    [consent, setConsent] = useState(false),
    [error, setError] = useState(""),
    [draft, setDraft] = useState(String(initialMeasurements.height));
  const field = measureFields[Math.min(step, 5)];
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "450px" },
    );
    observer.observe(root.current!);
    return () => observer.disconnect();
  }, []);
  function go(next: number) {
    setError("");
    setStep(next);
    if (next < 6) setDraft(String(measurements[measureFields[next].key]));
    requestAnimationFrame(() => {
      heading.current?.focus({ preventScroll: true });
      if (window.innerWidth < 768 && heading.current) {
        const preview =
          next < 6
            ? root.current?.querySelector(".fit-model")?.getBoundingClientRect()
                .height || 0
            : 0;
        window.scrollTo({
          top:
            window.scrollY +
            heading.current.getBoundingClientRect().top -
            preview -
            90,
          behavior: "instant",
        });
      }
    });
  }
  function next() {
    if (step < 6) {
      const value = Number(draft);
      if (
        !draft ||
        !Number.isFinite(value) ||
        value < field.min ||
        value > field.max
      ) {
        setError(
          `Informe um valor entre ${field.min} e ${field.max} ${field.unit}.`,
        );
        return;
      }
      setMeasurements((m) => ({ ...m, [field.key]: value }));
    }
    go(step + 1);
  }
  function confirm() {
    if (name.trim().length < 2) {
      setError("Informe seu nome para personalizar o atendimento.");
      return;
    }
    if (!/^(?:55)?\d{10,11}$/.test(phone.replace(/\D/g, ""))) {
      setError("Informe um WhatsApp válido com DDD.");
      return;
    }
    if (!consent) {
      setError(
        "Confirme que deseja compartilhar seu perfil para o atendimento.",
      );
      return;
    }
    go(7);
  }
  const message = profileMessage(name, phone, measurements);
  return (
    <section id="ea-fit" ref={root} className="ea-fit section">
      <div className="fit-heading">
        <div>
          <p className="eyebrow">05 / PERSONALIZAÇÃO EM OUTRA DIMENSÃO</p>
          <h2>
            EA <em>Fit.</em>
            <span>FEITO PARA AS SUAS PROPORÇÕES.</span>
          </h2>
        </div>
        <p>
          Seu tamanho. Seu caimento. Seu ajuste.
          <br />
          Uma primeira referência, inteiramente sua.
        </p>
      </div>
      <div className={`fit-workspace ${step >= 6 ? "is-review" : ""}`}>
        <div className="fit-model">
          <div className="fit-model-top">
            <span className="eyebrow">ESTUDO DE PROPORÇÕES</span>
            <span className="model-status">
              <i /> INTERATIVO / 3D
            </span>
          </div>
          {load ? (
            <Mannequin
              measurements={measurements}
              active={step < 6 ? field.key : ""}
            />
          ) : (
            <div className="model-loading">
              <span>EA FIT</span>
            </div>
          )}
          <p className="model-disclaimer">
            Representação visual ilustrativa. O caimento final é definido no
            atendimento.
          </p>
        </div>
        <div className="fit-form">
          <div
            className="fit-steps"
            role="group"
            aria-label={`Etapa ${Math.min(step + 1, 8)} de 8`}
          >
            {Array.from({ length: 8 }, (_, i) => (
              <i key={i} className={i <= step ? "complete" : ""} />
            ))}
          </div>
          <span className="eyebrow fit-step-count">
            {String(step + 1).padStart(2, "0")} / 08 —{" "}
            {step < 6
              ? "SUAS MEDIDAS"
              : step === 6
                ? "SEU CONTATO"
                : "SEU PERFIL"}
          </span>
          {step < 6 ? (
            <>
              <h3 ref={heading} tabIndex={-1}>
                {field.question}
              </h3>
              <p className="fit-help" id="measure-help">
                {field.help}
              </p>
              <label htmlFor="measurement" className="sr-only">
                {field.label} em {field.unit}
              </label>
              <div className="measurement-value">
                <input
                  id="measurement"
                  type="number"
                  inputMode="decimal"
                  min={field.min}
                  max={field.max}
                  step="1"
                  value={draft}
                  aria-describedby="measure-help fit-error"
                  aria-invalid={Boolean(error)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      next();
                    }
                  }}
                  onChange={(e) => {
                    setDraft(e.target.value);
                    const n = Number(e.target.value);
                    if (e.target.value && n >= field.min && n <= field.max)
                      setMeasurements((m) => ({ ...m, [field.key]: n }));
                    setError("");
                  }}
                />
                <span>{field.unit}</span>
              </div>
              <input
                className="measurement-range"
                aria-label={`Ajustar ${field.label.toLowerCase()}`}
                type="range"
                min={field.min}
                max={field.max}
                value={measurements[field.key]}
                onChange={(e) => {
                  setDraft(e.target.value);
                  setMeasurements((m) => ({
                    ...m,
                    [field.key]: Number(e.target.value),
                  }));
                  setError("");
                }}
              />
              <div className="range-ends">
                <span>
                  {field.min} {field.unit}
                </span>
                <span>
                  {field.max} {field.unit}
                </span>
              </div>
              <div className="fit-buttons">
                {step > 0 && (
                  <button
                    type="button"
                    className="back-button"
                    onClick={() => go(step - 1)}
                  >
                    ← Voltar
                  </button>
                )}
                <button className="button-dark" onClick={next}>
                  Continuar <span>→</span>
                </button>
              </div>
            </>
          ) : step === 6 ? (
            <>
              <h3 ref={heading} tabIndex={-1}>
                Como podemos
                <br />
                <em>chamar você?</em>
              </h3>
              <p className="fit-help">
                Seu perfil acompanha a conversa. Nenhum dado é enviado antes de
                você confirmar no WhatsApp.
              </p>
              <div className="contact-fields">
                <label htmlFor="fit-name">
                  Nome
                  <input
                    id="fit-name"
                    name="name"
                    autoComplete="name"
                    value={name}
                    maxLength={100}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
                <label htmlFor="fit-phone">
                  WhatsApp com DDD
                  <input
                    id="fit-phone"
                    name="tel"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="(77) 99999-9999"
                    value={phone}
                    maxLength={20}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </label>
                <label className="consent">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                  />
                  <span>
                    Quero compartilhar meu nome, contato e medidas com a Emerson
                    Andrade para este atendimento.
                  </span>
                </label>
              </div>
              <div className="fit-buttons">
                <button className="back-button" onClick={() => go(5)}>
                  ← Voltar
                </button>
                <button className="button-dark" onClick={confirm}>
                  Revisar perfil <span>→</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <h3 ref={heading} tabIndex={-1}>
                Seu perfil,
                <br />
                <em>pronto para enviar.</em>
              </h3>
              <p className="fit-help">
                {name.trim()}, agora temos uma referência inicial para
                compreender melhor suas proporções e orientar seu atendimento.
              </p>
              <dl className="fit-summary">
                {measureFields.map((f) => (
                  <div key={f.key}>
                    <dt>{f.label}</dt>
                    <dd>
                      {measurements[f.key]} {f.unit}
                    </dd>
                  </div>
                ))}
              </dl>
              <a
                className="button-dark send-profile"
                href={whatsapp(message)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Enviar meu perfil <ExternalArrow />
              </a>
              <button className="back-button" onClick={() => go(0)}>
                ← Revisar minhas medidas
              </button>
              <small className="privacy-note">
                Seu perfil fica somente nesta página até você enviá-lo pelo
                WhatsApp. Não há armazenamento no servidor.
              </small>
            </>
          )}
          <p id="fit-error" className="form-error" role="alert">
            {error}
          </p>
          <a
            className="fit-help-link"
            href={whatsapp(
              "Olá, Emerson Andrade. Quero um atendimento personalizado, mas ainda não sei minhas medidas. Podem me orientar?",
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ainda não sei minhas medidas <ExternalArrow />
          </a>
        </div>
      </div>
    </section>
  );
}
