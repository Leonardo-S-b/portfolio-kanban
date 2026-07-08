export type ProjectStage = "em-foco" | "arquitetura" | "entregue";

export type Project = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  stage: ProjectStage;
  status: string;
  ticket: string;
  color: string;
  ink: string;
  tags: string[];
  github?: string;
  private?: boolean;
  highlight: string;
  facts: { label: string; value: string }[];
  story: { title: string; text: string; stamp: string }[];
  flow: string[];
};

export const projects: Project[] = [
  {
    slug: "clima-agora",
    title: "Clima Agora",
    eyebrow: "Mobile + APIs + IA",
    description:
      "Aplicativo meteorológico multiplataforma com rotas, geolocalização e sugestões inteligentes para viagens.",
    stage: "em-foco",
    status: "case principal",
    ticket: "APP-01",
    color: "#ffca3a",
    ink: "#1c1b18",
    tags: ["Flutter", "Dart", "Node.js", "Docker"],
    github: "https://github.com/Leonardo-S-b/Clima_Agora_frameworks_Web",
    highlight: "Um produto visual sustentado por várias integrações invisíveis.",
    facts: [
      { label: "Arquitetura", value: "Feature-based" },
      { label: "Integrações", value: "Clima, mapas e IA" },
      { label: "Plataformas", value: "Mobile + Web" },
    ],
    story: [
      {
        title: "Contexto",
        text: "Transformar dados meteorológicos e de rota em uma experiência simples para quem está planejando uma viagem.",
        stamp: "BRIEFING",
      },
      {
        title: "Decisão",
        text: "Separação por features e camadas de data, domain e presentation para manter as integrações independentes da interface.",
        stamp: "PLANNED",
      },
      {
        title: "Construção",
        text: "Flutter consome Open-Meteo, geocoding e rotas; um backend Node protege a integração com IA.",
        stamp: "BUILD",
      },
      {
        title: "Entrega",
        text: "Busca de cidades, clima dinâmico, preferências locais e planejamento de viagem com múltiplas paradas.",
        stamp: "SHIPPED",
      },
    ],
    flow: ["Pessoa", "Flutter", "Serviços externos", "Backend IA", "Resposta contextual"],
  },
  {
    slug: "minhas-economias",
    title: "Minhas Economias",
    eyebrow: "Dados + sincronização",
    description:
      "Controle financeiro em Flutter com API, persistência e sincronização de mudanças entre dispositivos.",
    stage: "arquitetura",
    status: "deep dive",
    ticket: "ARC-02",
    color: "#b8e986",
    ink: "#172113",
    tags: ["Flutter", "Express", "Prisma", "Postgres"],
    private: true,
    highlight: "O valor está no fluxo de dados, inclusive quando a API não responde.",
    facts: [
      { label: "Entidades", value: "3 principais" },
      { label: "Resiliência", value: "Fallback local" },
      { label: "Sync", value: "Eventos por dispositivo" },
    ],
    story: [
      {
        title: "Contexto",
        text: "Registrar entradas e saídas em mais de um dispositivo sem perder o histórico quando a rede oscila.",
        stamp: "BRIEFING",
      },
      {
        title: "Modelo",
        text: "Transaction, Device e SyncEvent formam o núcleo de persistência e rastreio das alterações.",
        stamp: "SCHEMA",
      },
      {
        title: "Construção",
        text: "A API registra eventos de create, update, delete e reset; o aplicativo consulta mudanças periodicamente.",
        stamp: "BUILD",
      },
      {
        title: "Resultado",
        text: "Dashboard financeiro, filtros, histórico temporal, previsão simples e experiência resiliente.",
        stamp: "REVIEWED",
      },
    ],
    flow: ["Dispositivo A", "API Express", "Prisma", "Postgres", "Dispositivo B"],
  },
  {
    slug: "agenviagem",
    title: "AgenViagem",
    eyebrow: "API + segurança",
    description:
      "API de viagens com autenticação, níveis de acesso, recuperação de senha, auditoria e soft delete.",
    stage: "arquitetura",
    status: "backend",
    ticket: "API-03",
    color: "#87ceeb",
    ink: "#10242d",
    tags: ["TypeScript", "Express", "Prisma", "JWT"],
    github: "https://github.com/Leonardo-S-b/agenViagem",
    highlight: "Segurança tratada como fluxo, não como middleware decorativo.",
    facts: [
      { label: "Acesso", value: "3 níveis" },
      { label: "Senha", value: "bcrypt 12 rounds" },
      { label: "Contrato", value: "OpenAPI" },
    ],
    story: [
      {
        title: "Contexto",
        text: "Uma agência precisa separar ações públicas, operações de clientes e rotinas administrativas.",
        stamp: "BRIEFING",
      },
      {
        title: "Segurança",
        text: "JWT, senha forte, códigos de recuperação com hash e autorização progressiva por nível.",
        stamp: "GUARDED",
      },
      {
        title: "Auditoria",
        text: "Ações e tentativas ficam registradas; exclusões de viagens preservam histórico com soft delete.",
        stamp: "LOGGED",
      },
      {
        title: "Entrega",
        text: "Rotas documentadas, workspace de testes e domínio organizado em controllers, schemas e services.",
        stamp: "SHIPPED",
      },
    ],
    flow: ["Request", "Validação", "Autorização", "Service", "Prisma"],
  },
  {
    slug: "mauricio-furquin",
    title: "Mauricio Furquin",
    eyebrow: "Produto full-stack",
    description:
      "Plataforma para eventos e fotografia com galerias, uploads, autenticação e painel administrativo.",
    stage: "entregue",
    status: "produto real",
    ticket: "WEB-04",
    color: "#ff8fa3",
    ink: "#2a1218",
    tags: ["React", "TypeScript", "MySQL", "Docker"],
    private: true,
    highlight: "Da interface pública à operação interna em um único produto.",
    facts: [
      { label: "Qualidade", value: "Jest + Supertest" },
      { label: "Infra", value: "Docker + Nginx" },
      { label: "Dados", value: "Prisma + MySQL" },
    ],
    story: [
      {
        title: "Contexto",
        text: "Apresentar o trabalho de um fotógrafo e permitir que eventos e galerias sejam administrados no mesmo sistema.",
        stamp: "BRIEFING",
      },
      {
        title: "Produto",
        text: "Site público, login, portais por perfil e painel administrativo compartilham o mesmo domínio de eventos.",
        stamp: "PLANNED",
      },
      {
        title: "Backend",
        text: "Express e Prisma cuidam de autenticação, permissões, upload, visibilidade e persistência em MySQL.",
        stamp: "BUILD",
      },
      {
        title: "Entrega",
        text: "Testes automatizados e contêineres fecham o ciclo entre desenvolvimento, validação e execução.",
        stamp: "DELIVERED",
      },
    ],
    flow: ["Visitante", "React", "API", "Prisma/MySQL", "Storage"],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
