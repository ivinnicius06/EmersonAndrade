# Emerson Andrade

> Sua imagem, com intenção.

Site institucional e experiência digital para a Emerson Andrade, marca de moda masculina localizada em Barreiras, Bahia. O projeto foi criado para traduzir no ambiente digital a mesma percepção de cuidado, exclusividade e consultoria presente no atendimento da marca.

Mais do que uma landing page, o site funciona como uma apresentação editorial da marca e como uma porta de entrada para o relacionamento com o cliente. A navegação conduz o visitante pela proposta, pelos serviços e pelo processo de personalização até o contato direto pelo WhatsApp.

## Destaques do projeto

- **Direção editorial:** hero com vídeo, narrativa guiada por rolagem, tipografia contrastante e imagens de campanha para apresentar a marca com ritmo de editorial de moda.
- **Experiência de marca:** manifesto, curadoria, consultoria de imagem, personalização, peças sob medida, atendimento privado, espaço físico e avaliações aparecem como partes de uma mesma jornada.
- **EA Fit:** ferramenta interativa de simulação de medidas com manequim 3D procedural. Altura, peso, ombros, tórax, cintura e quadril alteram a visualização em tempo real.
- **Conversão sem atrito:** formulário progressivo com validação, revisão das informações e compartilhamento estruturado pelo WhatsApp. Também existe uma alternativa para quem ainda não sabe as próprias medidas.
- **Acessibilidade e resiliência:** navegação por teclado, retorno de foco no menu mobile, contraste verificado, suporte a movimento reduzido e alternativa funcional quando WebGL não está disponível.
- **Performance consciente:** mídia otimizada, fontes locais, carregamento do Three.js somente quando necessário e pausa da renderização 3D quando o recurso sai da tela.

## Tecnologias utilizadas

- **Next.js 16** e **React 19** para a aplicação e a composição das páginas.
- **TypeScript** para tipagem e manutenção do código.
- **GSAP** e **ScrollTrigger** para narrativa, transições, parallax e sincronização do hero com a rolagem.
- **Three.js** para o manequim 3D procedural do EA Fit.
- **CSS responsivo** com tokens visuais, layout adaptável e suporte a `prefers-reduced-motion`.
- **Manrope** e **Cormorant Garamond** para a combinação de legibilidade e linguagem editorial.
- **Playwright** e **axe-core** para verificações de navegador e acessibilidade.
- **Sharp** e **FFmpeg** para preparação e otimização dos assets de imagem e vídeo.

## Decisões técnicas e de produto

O vídeo principal foi convertido para `public/media/hero-scrub.mp4`, com aproximadamente 4,3 MB, sem áudio, keyframes frequentes e `faststart`, permitindo uma experiência de busca mais previsível. No desktop, o ScrollTrigger relaciona os momentos do vídeo ao progresso da rolagem; no mobile, o vídeo permanece em loop e a narrativa continua acompanhando o gesto do usuário.

O EA Fit é carregado sob demanda e renderiza o modelo apenas quando necessário. As informações preenchidas no formulário permanecem no estado da página: não são persistidas nem enviadas para um backend. O contato é iniciado pelo usuário através de um link do WhatsApp com a mensagem preparada para revisão.

O conteúdo operacional da marca, como telefone, Instagram e Google Maps, fica centralizado em `src/lib/site.ts`. A área de Instagram direciona para o perfil oficial, sem simular um feed ao vivo, e as avaliações mantêm o link para a fonte original.

## Estrutura principal

```text
src/app/                 Página, layout, estilos e SEO
src/components/          Hero, narrativa editorial, navegação e interações
src/components/fit/      Formulário e visualização 3D do EA Fit
src/lib/                 Conteúdo compartilhado e regras de medidas
public/media/             Imagens, fontes e vídeo otimizados
tests/                    Testes automatizados
scripts/                  QA, acessibilidade e preparação de mídia
```

## Executar localmente

```sh
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000). Para simular produção:

```sh
npm run build
npm start
```

## Verificação

```sh
npm run typecheck
npm test
npm run build
```

Com o site rodando e o Google Chrome instalado, também é possível executar as verificações de navegador:

```sh
node scripts/qa.mjs
node scripts/accessibility.mjs
```

Os testes cobrem desktop, mobile, movimento reduzido, formulário completo, limites dos campos, retorno de foco do menu, destino dos links e indisponibilidade de WebGL. As capturas ficam em `artifacts/qa`.

## Publicação

Defina `NEXT_PUBLIC_SITE_URL` com o domínio definitivo antes do build. A variável configura as URLs de Open Graph, `robots.txt`, sitemap e indexação. Sem ela, a aplicação permanece com `noindex`, comportamento adequado para desenvolvimento e prévias locais.

O projeto não depende de backend para o atendimento: a conversão acontece pelo WhatsApp. A validação em dispositivos físicos iPhone/Safari e Android ainda é recomendada para aferir a fluidez do vídeo em diferentes redes e condições de hardware.
