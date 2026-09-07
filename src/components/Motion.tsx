"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Motion({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        root.current
          ?.querySelectorAll<HTMLElement>("[data-reveal]")
          .forEach((el) =>
            gsap.from(el, {
              y: 28,
              opacity: 0,
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 92%", once: true },
            }),
          );
        root.current
          ?.querySelectorAll<HTMLElement>("[data-parallax]")
          .forEach((el) =>
            gsap.fromTo(
              el,
              { yPercent: -4 },
              {
                yPercent: 4,
                ease: "none",
                scrollTrigger: {
                  trigger: el.parentElement,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.6,
                },
              },
            ),
          );

        // Imagens e fontes podem alterar a altura das seções depois da
        // hidratação. Uma atualização no próximo quadro mantém os gatilhos
        // corretos no Safari do iPhone, sem interceptar o gesto de rolagem.
        const refresh = () => ScrollTrigger.refresh();
        const frame = requestAnimationFrame(refresh);
        window.addEventListener("load", refresh, { once: true });
        return () => {
          cancelAnimationFrame(frame);
          window.removeEventListener("load", refresh);
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );
  return <div ref={root}>{children}</div>;
}
