import type { ReactNode } from "react";
import ExternalArrow from "./ExternalArrow";
export default function LinkArrow({
  href,
  children,
  light = false,
  external = false,
}: {
  href: string;
  children: ReactNode;
  light?: boolean;
  external?: boolean;
}) {
  return (
    <a
      className={`text-link ${light ? "light" : ""}`}
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span>{children}</span>
      <span className="arrow" aria-hidden="true">
        <ExternalArrow />
      </span>
    </a>
  );
}
