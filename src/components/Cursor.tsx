"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      () => {
        const el = ref.current!;
        const x = gsap.quickTo(el, "x", { duration: 0.22, ease: "power3.out" });
        const y = gsap.quickTo(el, "y", { duration: 0.22, ease: "power3.out" });
        const move = (e: PointerEvent) => {
          x(e.clientX);
          y(e.clientY);
          el.style.opacity = "1";
          const target = e.target as Element;
          el.dataset.kind = target.closest("canvas")
            ? "3d"
            : target.closest("a,button,input")
              ? "link"
              : target.closest(".editorial-image")
                ? "image"
                : target.closest("video,.hero")
                  ? "video"
                  : "";
        };
        const hide = () => {
          el.style.opacity = "0";
        };
        window.addEventListener("pointermove", move);
        document.addEventListener("pointerleave", hide);
        return () => {
          window.removeEventListener("pointermove", move);
          document.removeEventListener("pointerleave", hide);
        };
      },
    );
    return () => mm.revert();
  });
  return (
    <div ref={ref} className="cursor" aria-hidden="true">
      <span />
    </div>
  );
}
