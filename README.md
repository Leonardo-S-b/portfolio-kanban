# Portfolio Kanban

Portfólio interativo de Leonardo, apresentado como um quadro Kanban. Os projetos aparecem como cartões e cada estudo de caso detalha contexto, decisões, arquitetura e entrega.

## Tecnologias

- Next.js 16 com App Router
- React 19
- TypeScript
- Lucide React
- OpenNext
- Cloudflare Workers
- CSS responsivo e animações nativas

## Requisitos

Antes de começar, instale:

- [Node.js](https://nodejs.org/) 22 ou superior
- npm 10 ou superior
- [Git](https://git-scm.com/)

Confira as versões instaladas:

```bash
node --version
npm --version
git --version
```

## Instalação

Clone o repositório e entre na pasta:

```bash
git clone https://github.com/Leonardo-S-b/portfolio-kanban.git
cd portfolio-kanban
```

Instale as dependências:

```bash
npm install
```

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando | Função |
| --- | --- |
| `npm run dev` | Inicia o Next.js em desenvolvimento |
| `npm run build` | Cria e valida o build de produção |
| `npm run start` | Executa localmente o build do Next.js |
| `npm run preview` | Gera o bundle OpenNext e simula o Cloudflare Worker |
| `npm run deploy` | Gera o bundle e publica no Cloudflare Workers |
| `npm run cf-typegen` | Gera os tipos dos bindings da Cloudflare |

## Build de produção

Para validar o projeto antes de publicar:

```bash
npm run build
```

Para testar o bundle que será executado pela Cloudflare:

```bash
npm run preview
```

O OpenNext possui suporte limitado no Windows. Se o preview apresentar erros específicos do ambiente, use WSL, Linux ou o pipeline de CI. O desenvolvimento normal com `npm run dev` funciona no Windows.

## Publicação na Cloudflare

Faça login na sua conta:

```bash
npx wrangler login
```

Depois publique:

```bash
npm run deploy
```

A configuração do Worker está em [`wrangler.jsonc`](./wrangler.jsonc) e a integração do Next.js está em [`open-next.config.ts`](./open-next.config.ts).

Antes do primeiro deploy, confira se o nome definido em `wrangler.jsonc` está disponível na sua conta Cloudflare.

## Estrutura principal

```text
portfolio-kanban/
├── app/
│   ├── globals.css              # Identidade visual e responsividade
│   ├── layout.tsx               # Layout e metadados globais
│   ├── page.tsx                 # Página inicial e quadro Kanban
│   └── projetos/[slug]/page.tsx # Estudos de caso individuais
├── components/
│   └── project-card.tsx         # Cartão interativo de projeto
├── data/
│   └── projects.ts              # Conteúdo dos projetos
├── next.config.ts
├── open-next.config.ts
└── wrangler.jsonc
```

## Editando os projetos

Os projetos estão centralizados em [`data/projects.ts`](./data/projects.ts). Para adicionar outro estudo de caso:

1. Adicione um objeto ao array `projects`.
2. Defina um `slug` único.
3. Escolha a coluna com a propriedade `stage`.
4. Preencha tecnologias, fatos, etapas e fluxo arquitetural.

A rota `/projetos/[slug]` será gerada automaticamente durante o build.

## Variáveis de ambiente

A versão atual não precisa de variáveis de ambiente para funcionar. Futuras integrações com GitHub, formulário de contato ou Cloudflare Stream deverão usar secrets no servidor; nunca coloque tokens diretamente no código ou em arquivos versionados.

## Rotas atuais

- `/`
- `/projetos/clima-agora`
- `/projetos/minhas-economias`
- `/projetos/agenviagem`
- `/projetos/mauricio-furquin`

## Licença e conteúdo

O código está disponível publicamente para consulta. Textos, identidade visual e estudos de caso pertencem ao autor. Projetos privados apresentados no portfólio não têm seu código-fonte exposto por este repositório.
