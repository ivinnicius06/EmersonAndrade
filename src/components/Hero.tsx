"use client";
import { whatsapp } from "@/lib/site";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import LinkArrow from "./LinkArrow";
import ExternalArrow from "./ExternalArrow";
gsap.registerPlugin(useGSAP, ScrollTrigger);
export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const el = video.current!;
          const panels =
            root.current!.querySelectorAll<HTMLElement>(".hero-panel");
          const playhead = { progress: 0 };
          let raf = 0;
          const seek = () => {
            raf = 0;
            if (
              el.readyState < 1 ||
              !Number.isFinite(el.duration) ||
              el.seeking
            )
              return;
            const target = Math.min(
              el.duration - 0.04,
              playhead.progress * el.duration,
            );
            if (Math.abs(el.currentTime - target) > 0.035)
              el.currentTime = target;
          };
          const scheduleSeek = () => {
            if (!raf) raf = requestAnimationFrame(seek);
          };
          el.pause();
          el.addEventListener("seeked", scheduleSeek);
          el.addEventListener("loadedmetadata", scheduleSeek);
          gsap.set(panels, { autoAlpha: 0, y: 32 });
          gsap.set(panels[0], { autoAlpha: 1, y: 0 });
          const tl = gsap.timeline({
            defaults: { ease: "power2.inOut" },
            scrollTrigger: {
              id: "hero-story",
              trigger: root.current,
              start: "top top",
              end: () => `+=${window.innerHeight * 2.7}`,
              pin: true,
              scrub: 0.6,
              invalidateOnRefresh: true,
              refreshPriority: 10,
            },
          });
          tl.to(
            playhead,
            { progress: 1, duration: 4, ease: "none", onUpdate: scheduleSeek },
            0,
          )
            .to(
              ".hero-media",
              { scale: 1.06, xPercent: -1, duration: 4, ease: "none" },
              0,
            )
            .to(
              ".hero-progress-fill",
              { scaleX: 1, duration: 4, ease: "none" },
              0,
            );
          panels.forEach((panel, i) => {
            if (i > 0)
              tl.to(panel, { autoAlpha: 1, y: 0, duration: 0.32 }, i - 0.12);
            if (i < 3)
              tl.to(panel, { autoAlpha: 0, y: -30, duration: 0.24 }, i + 0.7);
          });
          tl.to(".hero-dissolve", { opacity: 1, duration: 0.35 }, 3.65);
          return () => {
            cancelAnimationFrame(raf);
            el.removeEventListener("seeked", scheduleSeek);
            el.removeEventListener("loadedmetadata", scheduleSeek);
          };
        },
      );
      media.add(
        "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        () => {
          const panels =
            root.current!.querySelectorAll<HTMLElement>(".hero-panel");
          gsap.set(panels, { autoAlpha: 0, y: 26 });
          gsap.set(panels[0], { autoAlpha: 1, y: 0 });

          const tl = gsap.timeline({
            defaults: { ease: "power2.inOut" },
            scrollTrigger: {
              id: "hero-story-mobile",
              trigger: root.current,
              start: "top top",
              end: () => `+=${window.innerHeight * 2.35}`,
              pin: true,
              scrub: 0.35,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              refreshPriority: 10,
            },
          });

          tl.to(
            ".hero-media",
            { scale: 1.035, duration: 4, ease: "none" },
            0,
          ).to(
            ".hero-progress-fill",
            { scaleX: 1, duration: 4, ease: "none" },
            0,
          );

          panels.forEach((panel, i) => {
            if (i > 0)
              tl.to(panel, { autoAlpha: 1, y: 0, duration: 0.32 }, i - 0.12);
            if (i < panels.length - 1)
              tl.to(panel, { autoAlpha: 0, y: -24, duration: 0.24 }, i + 0.7);
          });

          tl.to(".hero-dissolve", { opacity: 1, duration: 0.3 }, 3.7);
          return () => tl.kill();
        },
      );
      const timeout = window.setTimeout(() => setReady(true), 1200);
      return () => {
        media.revert();
        clearTimeout(timeout);
      };
    },
    { scope: root },
  );
  return (
    <section
      ref={root}
      id="inicio"
      className="hero"
      aria-label="Emerson Andrade: moda, imagem e exclusividade"
    >
      <div className="hero-media">
        <video
          ref={video}
          poster="/media/hero-poster.webp"
          muted
          playsInline
          autoPlay
          loop
          preload="auto"
          onLoadedData={() => setReady(true)}
          onError={() => {
            setReady(true);
            setFailed(true);
          }}
          aria-label="Filme de campanha Emerson Andrade, controlado pela rolagem"
        >
          <source src="/media/hero-scrub.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="hero-shade" />
      <div className="hero-side eyebrow">A ESSÊNCIA ESTÁ NOS DETALHES</div>
      <div className="hero-panels">
        <div className="hero-panel hero-first">
          <p className="eyebrow">MODA · IMAGEM · EXCLUSIVIDADE</p>
          <h1>
            EMERSON
            <br />
            <em>ANDRADE.</em>
          </h1>
          <p className="hero-intro">O vestir é só o começo.</p>
          <LinkArrow href="#manifesto" light>
            Descubra a experiência
          </LinkArrow>
        </div>
        <div className="hero-panel" aria-hidden="true">
          <p className="eyebrow">01 / ESSÊNCIA</p>
          <p className="hero-title">
            MINIMALISMO
            <br />
            QUE <em>COMUNICA.</em>
          </p>
        </div>
        <div className="hero-panel" aria-hidden="true">
          <p className="eyebrow">02 / PRESENÇA</p>
          <p className="hero-title">
            VOCÊ VESTE.
            <br />A GENTE
            <br />
            <em>POSICIONA.</em>
          </p>
        </div>
        <div className="hero-panel hero-last">
          <p className="eyebrow">03 / INTENÇÃO</p>
          <h2>
            SUA IMAGEM CHEGA
            <br />
            ANTES DA SUA
            <br />
            <em>PALAVRA.</em>
          </h2>
          <p>
            Ela precisa refletir quem você é, aquilo que conquistou e aquilo que
            deseja transmitir.
          </p>
          <div className="hero-actions">
            <LinkArrow href="#experiencia" light>
              Conhecer a experiência
            </LinkArrow>
            <a href={whatsapp()} target="_blank" rel="noopener noreferrer">
              Falar com um consultor <ExternalArrow />
            </a>
          </div>
        </div>
      </div>
      <div className="hero-bottom">
        <a href="#manifesto" className="scroll-cue">
          <span aria-hidden="true">↓</span>
          <span>ROLE PARA DESCOBRIR</span>
        </a>
        <div className="hero-progress">
          <span className="hero-progress-fill" />
        </div>
        <span className="eyebrow">BARREIRAS, BAHIA · PARA TODO O BRASIL</span>
      </div>
      <div className="hero-dissolve" />
      <div
        className={`loading-signature ${ready ? "ready" : ""}`}
        aria-hidden="true"
      >
        <span>EA</span>
        <small>EMERSON ANDRADE</small>
        <i />
      </div>
      {failed && (
        <span className="video-fallback">
          A campanha em imagem. Continue para conhecer a experiência.
        </span>
      )}
    </section>
  );
}
