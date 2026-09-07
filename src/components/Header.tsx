"use client";
import { useEffect, useRef, useState } from "react";
import BrandMark from "./BrandMark";
import { whatsapp } from "@/lib/site";
import ExternalArrow from "./ExternalArrow";
const links = [
  ["A Marca", "marca"],
  ["Consultoria", "consultoria"],
  ["Personalização", "personalizacao"],
  ["Sob Medida", "sob-medida"],
  ["EA Fit", "ea-fit"],
];
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 70);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    if (open) {
      dialog.current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog.current?.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  function close() {
    setOpen(false);
    trigger.current?.focus();
  }
  return (
    <>
      <header className={`header ${scrolled ? "is-scrolled" : ""}`}>
        <a
          href="#inicio"
          className="brand-home"
          aria-label="Emerson Andrade, início"
        >
          <BrandMark />
        </a>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {links.map(([name, id]) => (
            <a key={id} href={`#${id}`}>
              {name}
            </a>
          ))}
        </nav>
        <a
          className="header-cta"
          href={whatsapp()}
          target="_blank"
          rel="noopener noreferrer"
        >
          Agendar atendimento <ExternalArrow />
        </a>
        <button
          ref={trigger}
          className="menu-button"
          aria-label="Abrir menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
        >
          <span />
          <span />
        </button>
      </header>
      <dialog
        id="mobile-menu"
        aria-label="Menu de navegação"
        ref={dialog}
        className="mobile-menu"
        onCancel={close}
        onClick={(e) => {
          if (e.target === dialog.current) close();
        }}
      >
        <div className="mobile-menu-top">
          <BrandMark />
          <button onClick={close} aria-label="Fechar menu">
            ×
          </button>
        </div>
        <nav aria-label="Menu mobile">
          {links.map(([name, id], i) => (
            <a key={id} href={`#${id}`} onClick={close}>
              <small>0{i + 1}</small>
              {name}
              <span>
                <ExternalArrow />
              </span>
            </a>
          ))}
        </nav>
        <a
          className="text-link"
          href={whatsapp()}
          target="_blank"
          rel="noopener noreferrer"
        >
          Agendar atendimento <ExternalArrow />
        </a>
        <p className="eyebrow">BARREIRAS, BAHIA · BRASIL</p>
      </dialog>
    </>
  );
}
