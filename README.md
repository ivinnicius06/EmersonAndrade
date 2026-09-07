# Emerson Andrade

Landing page editorial em Next.js, React, TypeScript, GSAP e Three.js.

## Executar

```sh
npm install
npm run dev
```

Acesse http://localhost:3000. Para produção: `npm run build` e `npm start`.

## O que está implementado

- Hero com o vídeo real fornecido, em quatro momentos narrativos. GSAP ScrollTrigger fixa a hero e sincroniza a narrativa com o scroll no desktop e no celular; no mobile, o vídeo permanece em loop enquanto os textos avançam pela rolagem.
- Manifesto, experiência em quatro etapas, curadoria, consultoria, personalização, sob medida, atendimento privado, marca, espaço, acesso às avaliações, Instagram e encerramento.
- EA Fit com manequim 3D procedural, superfície torácica contínua, deformação regional e linhas de medidas. Altura, peso, ombros, tórax, cintura e quadril alteram a visualização. Rotação por arrasto e por botões.
- Formulário progressivo, validação, revisão, compartilhamento pelo WhatsApp e alternativa para quem não sabe as medidas. Dados pessoais permanecem no estado da página; não são persistidos nem enviados para um backend.
- Menu mobile em `dialog`, botão flutuante de WhatsApp, foco por teclado, textos com contraste verificado, modo de movimento reduzido e alternativa funcional quando WebGL não está disponível.
- Fontes hospedadas no projeto, imagens WebP, carregamento do Three.js apenas perto do EA Fit, renderização 3D sob demanda e pausa fora da tela.

## Conteúdo e identidade

`src/lib/site.ts` centraliza o WhatsApp **+55 77 99822-9945**, o Instagram e o link do Google fornecidos.

As seções editoriais usam as imagens fornecidas para a campanha, o espaço e o serviço sob medida. O monograma foi reconstruído em SVG a partir da referência da identidade.

O vídeo original de 10 segundos foi convertido em `public/media/hero-scrub.mp4`: aproximadamente 4,3 MB, áudio removido, keyframes frequentes e `faststart`. O arquivo original permanece intacto em Downloads. `scripts/prepare-media.mjs` documenta a geração dos arquivos locais; o caminho da fonte é configurado nesse script.

A área do Instagram leva ao perfil oficial, sem simular um feed ao vivo. A seção de avaliações apresenta comentários públicos do perfil da loja no Google e mantém o link para consultar todas as avaliações na fonte.

## Arquitetura

- `src/app`: página, layout, tokens e estilos responsivos, metadados e rotas de SEO.
- `src/components/Hero.tsx`: timeline da campanha e busca de frames do vídeo.
- `src/components/Experience.tsx`: narrativa da experiência com troca de imagens e etapas por rolagem no desktop e no celular.
- `src/components/Motion.tsx`: entradas e parallax com cleanup e reduced motion.
- `src/components/fit`: formulário e visualização 3D isolados, carregados sob demanda.
- `src/lib/fit.ts`: limites de medidas, textos de orientação e mensagem de WhatsApp.
- `tests` e `scripts`: testes de mensagem, navegador, acessibilidade e preparação de mídia.

## Verificar

```sh
npm run typecheck
npm test
npm run build
# Com o site rodando e Google Chrome instalado:
node scripts/qa.mjs
node scripts/accessibility.mjs
```

As capturas da revisão ficam em `artifacts/qa`. Os testes de navegador não enviam mensagens externas: verificam o destino e o conteúdo do link.

O teste automatizado cobre desktop, mobile, reduced motion, o formulário completo, retorno de foco do menu, limites dos campos e indisponibilidade de WebGL. Validação em iPhone/Safari e Android físicos ainda é recomendada para aferir a fluidez de busca do vídeo nas condições reais de rede e dispositivo.

## Publicação

Defina `NEXT_PUBLIC_SITE_URL` com o domínio definitivo antes do build. Essa variável habilita a indexação e configura as URLs de Open Graph, robots e sitemap. Sem domínio configurado, a aplicação permanece com `noindex`, apropriado para a prévia local.

A aplicação não foi publicada em um serviço externo. Não exige backend para o atendimento via WhatsApp.
