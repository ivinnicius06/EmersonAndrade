import { site, whatsapp } from "@/lib/site";
import Image from "next/image";
import BrandMark from "./BrandMark";
import ExternalArrow from "./ExternalArrow";
import LinkArrow from "./LinkArrow";
import ReviewsCarousel from "./ReviewsCarousel";
export function Manifesto() {
  return (
    <section id="manifesto" className="manifesto section">
      <div className="section-kicker">
        <p className="eyebrow">01 / NOSSA ESSÊNCIA</p>
        <span className="eyebrow">O ESSENCIAL PERMANECE.</span>
      </div>
      <h2 data-reveal>
        Mais do que vestir.
        <br />
        <em>Representar quem você é.</em>
      </h2>
      <div className="manifesto-bottom">
        <div className="manifesto-words">
          <span>IMAGEM</span>
          <i />
          <span>INTENÇÃO</span>
          <i />
          <span>EXCLUSIVIDADE</span>
        </div>
        <div data-reveal>
          <p>
            A Emerson Andrade entende o vestir como parte da construção da
            imagem pessoal.
          </p>
          <p>
            Moda masculina, curadoria, consultoria e personalização. Escolhas
            coerentes com a sua personalidade, sua rotina e seus objetivos.
          </p>
        </div>
      </div>
    </section>
  );
}
export function PremiumFashion() {
  return (
    <section className="fashion section" id="moda">
      <div className="section-kicker">
        <p className="eyebrow">03 / O UNIVERSO DO VESTIR</p>
        <span className="eyebrow">CURADORIA COM PROPÓSITO</span>
      </div>
      <div className="fashion-heading">
        <h2 data-reveal>
          Elegância não precisa
          <br />
          ser <em>exagerada.</em>
        </h2>
        <p>
          Qualidade que se sente. Caimento que se percebe. Uma presença que
          dispensa excessos.
        </p>
      </div>
      <div className="fashion-grid">
        <figure className="fashion-main">
          <div className="editorial-image">
            <Image
              data-parallax
              src="/media/Elegancia.png"
              fill
              sizes="(max-width: 767px) 100vw, 60vw"
              alt="Detalhe da camisa clara, com gola e botões em destaque"
            />
          </div>
          <figcaption>
            <span>01 — CASUAL PREMIUM</span>
            <span>Naturalmente, elegante.</span>
          </figcaption>
        </figure>
        <figure className="fashion-detail">
          <div className="editorial-image">
            <Image
              data-parallax
              src="/media/Elegancia.png"
              fill
              sizes="(max-width: 767px) 70vw, 35vw"
              alt="Caimento e textura da camisa branca da campanha"
            />
          </div>
          <figcaption>
            <span>02 — ESSENCIAIS</span>
            <span>O valor do detalhe.</span>
          </figcaption>
        </figure>
      </div>
      <div className="universe-list">
        <span>CASUAL PREMIUM</span>
        <span>BUSINESS CASUAL</span>
        <span>SOCIAL</span>
        <span>ESSENCIAIS</span>
      </div>
    </section>
  );
}
export function ImageConsulting() {
  return (
    <section id="consultoria" className="consulting section">
      <div className="consulting-intro" data-reveal>
        <p className="eyebrow">04 / CONSULTORIA DE IMAGEM</p>
        <h2>
          Sua imagem,
          <br />
          <em>com intenção.</em>
        </h2>
        <p>
          Entendemos o que você quer comunicar e transformamos essa intenção em
          escolhas de estilo que fazem sentido para sua vida.
        </p>
        <LinkArrow
          href={whatsapp(
            "Olá, Emerson Andrade. Quero entender melhor minha imagem e conhecer a consultoria.",
          )}
          external
        >
          Quero entender minha imagem
        </LinkArrow>
      </div>
      <div className="consulting-dialogue" data-reveal>
        <span className="eyebrow">PRIMEIRO, A GENTE ESCUTA.</span>
        <p>
          Quem é você
          <br />
          quando não precisa
          <br />
          <em>se apresentar?</em>
        </p>
        <div className="consulting-terms">
          {[
            "Personalidade",
            "Rotina",
            "Objetivos",
            "Proporções",
            "Estilo",
            "Imagem desejada",
          ].map((term, i) => (
            <span key={term}>
              <small>0{i + 1}</small>
              {term}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
export function Bespoke() {
  return (
    <section id="sob-medida" className="bespoke">
      <div className="bespoke-image">
        <Image
          src="/media/SobMedida01.jpg"
          fill
          sizes="100vw"
          alt="Máquinas de costura no ateliê de peças sob medida"
          data-parallax
        />
      </div>
      <div className="bespoke-shade" />
      <div className="bespoke-content" data-reveal>
        <p className="eyebrow">07 / SOB MEDIDA</p>
        <h2>
          Quando o padrão
          <br />
          não é <em>suficiente.</em>
        </h2>
        <p>
          Peças desenvolvidas a partir das suas medidas, preferências e
          necessidades. Da escolha do tecido ao último acabamento.
        </p>
        <LinkArrow
          href={whatsapp(
            "Olá, Emerson Andrade. Gostaria de conhecer as opções de peças sob medida e tecidos italianos.",
          )}
          light
          external
        >
          Descubra o sob medida
        </LinkArrow>
      </div>
      <div className="bespoke-details">
        <span>MODELAGEM INDIVIDUAL</span>
        <span>TECIDOS ITALIANOS</span>
        <span>ACABAMENTO PRECISO</span>
      </div>
    </section>
  );
}
export function PrivateExperience() {
  return (
    <section className="private section">
      <p className="eyebrow">08 / EXPERIÊNCIA PRIVADA</p>
      <div className="private-grid">
        <div data-reveal>
          <span className="private-symbol" aria-hidden="true">
            EA<span>PRIVÉ</span>
          </span>
          <p className="eyebrow">TEMPO. ATENÇÃO. INTENÇÃO.</p>
        </div>
        <div data-reveal>
          <h2>
            Uma experiência
            <br />
            que vai <em>até você.</em>
          </h2>
          <p>
            Um olhar reservado sobre seu guarda-roupa, sua rotina e suas
            necessidades. Para reconhecer o que funciona, o que falta e o que
            realmente faz sentido.
          </p>
          <LinkArrow
            href={whatsapp(
              "Olá, Emerson Andrade. Gostaria de conhecer o atendimento privado e a análise de guarda-roupa.",
            )}
            external
          >
            Conhecer este atendimento
          </LinkArrow>
        </div>
      </div>
      <div className="private-process">
        <span>SEU GUARDA-ROUPA</span>
        <i>→</i>
        <span>SUA ROTINA</span>
        <i>→</i>
        <span>ESCOLHAS MAIS PRECISAS</span>
      </div>
    </section>
  );
}
export function BrandAndStore() {
  return (
    <>
      <section id="marca" className="brand-section section">
        <p className="eyebrow">09 / A MARCA</p>
        <div className="brand-story">
          <h2 data-reveal>
            Uma marca autoral.
            <br />
            Uma visão
            <br />
            <em>sobre o homem.</em>
          </h2>
          <div data-reveal>
            <BrandMark compact />
            <p>
              De Barreiras, na Bahia, uma proposta que aproxima moda e imagem
              pessoal.
            </p>
            <p>
              A Emerson Andrade nasce dessa relação: entender cada homem para
              orientar escolhas com mais intenção. Na curadoria, no ajuste e na
              conversa, o cuidado é individual.
            </p>
            <a
              className="subtle-link"
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Conheça nosso dia a dia <ExternalArrow />
            </a>
          </div>
        </div>
      </section>
      <section id="espaco" className="store section">
        <div className="store-coordinate">
          <Image
            className="store-photo"
            src="/media/Espaco.jpeg"
            fill
            sizes="(max-width: 767px) calc(100vw - 48px), 45vw"
            alt="Interior da loja Emerson Andrade em Barreiras"
          />
          <span className="eyebrow">10 / O ESPAÇO</span>
          <span className="store-location">
            BARREIRAS
            <br />
            <em>BAHIA.</em>
          </span>
          <div className="store-lines" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <span className="eyebrow">UM ENCONTRO COM A SUA MELHOR VERSÃO.</span>
        </div>
        <div className="store-copy" data-reveal>
          <h2>
            Um espaço
            <br />
            feito <em>para você.</em>
          </h2>
          <p>
            Atendimento presencial em um ambiente pensado para consultoria,
            curadoria e experiência.
          </p>
          <p className="eyebrow">
            PRESENCIAL EM BARREIRAS.
            <br />
            ENVIOS PARA TODO O BRASIL.
          </p>
          <div className="store-links">
            <LinkArrow href={site.maps} external>
              Como chegar
            </LinkArrow>
            <LinkArrow href={whatsapp()} external>
              Falar com a loja
            </LinkArrow>
          </div>
        </div>
      </section>
      <ReviewsCarousel />
    </>
  );
}
export function Instagram() {
  return (
    <section className="instagram section">
      <div className="instagram-heading">
        <div>
          <p className="eyebrow">11 / PARA ALÉM DO VESTIR</p>
          <h2>
            Entre no <em>nosso universo.</em>
          </h2>
        </div>
        <LinkArrow href={site.instagram} external>
          @byemersonandrade
        </LinkArrow>
      </div>
      <div className="instagram-editorial">
        <a
          href={site.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="instagram-picture editorial-image"
        >
          <Image
            src="/media/campaign-04.webp"
            fill
            sizes="(max-width: 767px) 100vw, 50vw"
            alt="Cena da campanha Emerson Andrade com camisa clara e materiais naturais"
          />
          <span>
            VER INSTAGRAM <ExternalArrow />
          </span>
        </a>
        <div className="instagram-note">
          <p className="eyebrow">ESTILO É CONTINUIDADE.</p>
          <p>
            Novos olhares.
            <br />
            Bastidores.
            <br />
            <em>Boas escolhas.</em>
          </p>
          <span>Looks, curadoria e o dia a dia da marca.</span>
        </div>
      </div>
    </section>
  );
}
export function FinalCTA() {
  return (
    <section id="contato" className="final-cta section">
      <p className="eyebrow">SEU PRÓXIMO CAPÍTULO COMEÇA AQUI.</p>
      <h2 data-reveal>
        Sua imagem fala.
        <br />
        Faça com que ela diga
        <br />
        <em>o que você quer.</em>
      </h2>
      <p>Descubra uma experiência de moda masculina construída para você.</p>
      <div className="final-actions">
        <a
          className="button-light"
          href={whatsapp()}
          target="_blank"
          rel="noopener noreferrer"
        >
          Agendar atendimento <ExternalArrow />
        </a>
        <LinkArrow href="#ea-fit" light>
          Enviar minhas medidas
        </LinkArrow>
      </div>
      <a
        className="final-consultant"
        href={whatsapp(
          "Olá, gostaria de falar com um consultor da Emerson Andrade.",
        )}
        target="_blank"
        rel="noopener noreferrer"
      >
        Falar com um consultor <ExternalArrow />
      </a>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="footer section">
      <div className="footer-top">
        <a href="#inicio" aria-label="Voltar ao início">
          <BrandMark />
        </a>
        <p>
          Barreiras — Bahia
          <br />
          Envios para todo o Brasil.
        </p>
        <nav aria-label="Redes e localização">
          <a href={site.instagram} target="_blank" rel="noopener noreferrer">
            Instagram <ExternalArrow />
          </a>
          <a href={whatsapp()} target="_blank" rel="noopener noreferrer">
            WhatsApp <ExternalArrow />
          </a>
          <a href={site.maps} target="_blank" rel="noopener noreferrer">
            Localização <ExternalArrow />
          </a>
          <a href={site.maps} target="_blank" rel="noopener noreferrer">
            Google <ExternalArrow />
          </a>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} Emerson Andrade. Todos os direitos
          reservados.
        </span>
        <span>MODA · IMAGEM · EXCLUSIVIDADE</span>
        <a href="#inicio">VOLTAR AO TOPO ↑</a>
      </div>
    </footer>
  );
}
