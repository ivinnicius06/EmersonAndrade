export default function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand-mark ${compact ? "compact" : ""}`}>
      <svg viewBox="0 0 110 78" fill="none" aria-hidden="true">
        <path
          d="M4 13H59M4 36H46M4 60H33M30 76L72 5L107 68M62 36H109"
          stroke="currentColor"
          strokeWidth="1.35"
        />
      </svg>
      {!compact && (
        <span>
          EMERSON ANDRADE<small>MODA · IMAGEM · EXCLUSIVIDADE</small>
        </span>
      )}
    </span>
  );
}
