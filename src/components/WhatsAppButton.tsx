import { whatsapp } from "@/lib/site";

export default function WhatsAppButton() {
  return (
    <a
      className="whatsapp-button"
      href={whatsapp("Olá, Emerson Andrade. Gostaria de falar com a equipe.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco pelo WhatsApp"
    >
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M27.1 4.8A15.4 15.4 0 0 0 16.1.3C7.6.3.7 7.2.7 15.7c0 2.7.7 5.3 2 7.6L.5 31.7l8.6-2.2a15.4 15.4 0 0 0 7 1.7h.1c8.5 0 15.4-6.9 15.4-15.4 0-4.1-1.6-8-4.5-11Zm-11 23.8h-.1a12.7 12.7 0 0 1-6.5-1.8l-.5-.3-5.1 1.3 1.4-5-.3-.5a12.7 12.7 0 0 1-2-6.7C3 8.6 8.8 2.9 16 2.9c3.4 0 6.6 1.3 9 3.7a12.7 12.7 0 0 1 3.7 9c0 7-5.7 12.8-12.7 12.8Zm7-9.5c-.4-.2-2.2-1.1-2.6-1.2-.3-.1-.6-.2-.9.2-.2.4-1 1.2-1.2 1.5-.2.3-.4.3-.8.1a10.3 10.3 0 0 1-3-1.8 11.4 11.4 0 0 1-2.1-2.7c-.2-.4 0-.6.1-.8l.6-.7c.2-.2.2-.4.3-.6.1-.2 0-.5 0-.7-.1-.2-.9-2.1-1.2-2.9-.3-.8-.7-.7-.9-.7h-.8c-.3 0-.7.1-1 .5-.4.4-1.4 1.3-1.4 3.2s1.4 3.7 1.6 4c.2.2 2.7 4.1 6.5 5.8.9.4 1.6.7 2.2.9.9.3 1.8.3 2.4.2.7-.1 2.2-.9 2.5-1.8.3-.9.3-1.7.2-1.8-.1-.2-.3-.3-.7-.5Z" />
      </svg>
      <span>Fale conosco</span>
    </a>
  );
}
