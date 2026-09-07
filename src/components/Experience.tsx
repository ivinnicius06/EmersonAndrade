"use client";
import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(useGSAP, ScrollTrigger);

const steps = [
  {
    title: "Entender.",
    subtitle: "Antes da peça, a pessoa.",
    body: "Sua rotina, suas necessidades e os próximos passos que você deseja dar. Tudo começa com uma conversa.",
    image: "/media/Entender.jpg",
    alt: "Camisa branca de campanha, em um cabide de madeira e luz natural",
  },
  {
    title: "Interpretar.",
    subtitle: "A intenção por trás da imagem.",
    body: "Traduzimos o que você deseja transmitir em uma direção de estilo coerente com quem você é.",
    image: "/media/Interpretar.jpg",
    alt: "Detalhe da camisa clara, com gola e botões em destaque",
  },
  {
    title: "Curar.",
    subtitle: "Menos excessos. Mais escolhas.",
    body: "Peças, materiais, proporções e combinações que fazem sentido juntos — e na sua vida.",
    image: "/media/Curar.jpg",
    alt: "Caimento e textura da camisa branca da campanha",
  },
  {
    title: "Personalizar.",
    subtitle: "O detalhe que torna seu.",
    body: "Ajustes e soluções individuais. Porque um bom caimento respeita você.",
    image: "/media/Personalizar.jpg",
    alt: "Cena da campanha Emerson Andrade com camisa clara e materiais naturais",
  },
];

export default function Experience() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      const createStory = (mobile: boolean) => {
        const panels =
          root.current!.querySelectorAll<HTMLElement>(".experience-step");
        const photos = root.current!.querySelectorAll<HTMLElement>(
          ".experience-photo-img",
        );
        const pinTarget = mobile
          ? root.current!.querySelector<HTMLElement>(".experience-grid")!
          : root.current!;

        gsap.set(panels, { autoAlpha: 0, y: 22 });
        gsap.set(panels[0], { autoAlpha: 1, y: 0 });
        gsap.set(photos, { autoAlpha: 0, scale: 1 });
        gsap.set(photos[0], { autoAlpha: 1 });

        const tl = gsap.timeline({
          scrollTrigger: {
            id: mobile ? "experience-mobile" : "experience-desktop",
            trigger: pinTarget,
            start: mobile ? "top 82px" : "top 80px",
            end: () => `+=${mobile ? window.innerHeight * 1.8 : 1600}`,
            pin: pinTarget,
            scrub: mobile ? 0.35 : 0.5,
            anticipatePin: mobile ? 1 : 0,
            invalidateOnRefresh: true,
          },
        });

        panels.forEach((el, i) => {
          if (i) tl.to(el, { autoAlpha: 1, y: 0, duration: 0.35 }, i);
          if (i < panels.length - 1)
            tl.to(el, { autoAlpha: 0, y: -22, duration: 0.25 }, i + 0.75);
        });

        photos.forEach((photo, i) => {
          if (i) tl.to(photo, { autoAlpha: 1, duration: 0.35 }, i);
          if (i < photos.length - 1)
            tl.to(photo, { autoAlpha: 0, duration: 0.25 }, i + 0.75);
          tl.to(photo, { scale: 1.07, ease: "none", duration: 1 }, i);
        });

        return () => tl.kill();
      };

      mm.add(
        "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
        () => createStory(false),
      );
      mm.add(
        "(max-width: 899px) and (prefers-reduced-motion: no-preference)",
        () => createStory(true),
      );
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="experiencia" className="experience section">
      <div className="section-heading">
        <p className="eyebrow">02 / A EXPERIÊNCIA</p>
        <h2>
          Cada homem tem
          <br />
          uma imagem <em>a construir.</em>
        </h2>
      </div>
      <div className="experience-grid">
        <div className="experience-photo editorial-image">
          {steps.map((step, i) => (
            <Image
              key={step.image}
              src={step.image}
              fill
              sizes="(max-width: 899px) 100vw, 50vw"
              alt={step.alt}
              className="experience-photo-img"
              priority={i === 0}
            />
          ))}
          <span className="image-caption">A ESCOLHA COMEÇA EM VOCÊ.</span>
        </div>
        <div className="experience-steps">
          {steps.map(({ title, subtitle, body }, i) => (
            <article className="experience-step" key={title}>
              <span className="step-number">
                0{i + 1}
                <span> / 04</span>
              </span>
              <h3>{title}</h3>
              <p className="step-subtitle">{subtitle}</p>
              <p>{body}</p>
              <div className="step-track" aria-hidden="true">
                {steps.map((_, j) => (
                  <i key={j} className={i === j ? "active" : ""} />
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
