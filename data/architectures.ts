export type ArchitectureNodeKind =
  | "actor"
  | "app"
  | "api"
  | "service"
  | "security"
  | "database"
  | "external"
  | "storage"
  | "cache";

export type ArchitectureNode = {
  id: string;
  label: string;
  detail: string;
  kind: ArchitectureNodeKind;
  x: number;
  y: number;
};

export type ArchitectureEdge = {
  source: string;
  target: string;
  label?: string;
  animated?: boolean;
  dashed?: boolean;
};

export type ProjectArchitecture = {
  id?: string;
  label?: string;
  eyebrow: string;
  title: string;
  description: string;
  insight: string;
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
  alternatives?: ProjectArchitecture[];
};

export const architectures: Record<string, ProjectArchitecture> = {
  "clima-agora": {
    eyebrow: "ARCHITECTURE / ORCHESTRATION",
    title: "Uma interface, cinco fontes de contexto.",
    description:
      "O aplicativo mantém a experiência no Flutter e delega rotas, clima e IA a serviços especializados, protegendo a chave do Gemini no backend.",
    insight: "O backend não replica o app: ele protege segredos e coordena integrações que não devem morar no cliente.",
    alternatives: [
      {
        id: "request", label: "Requisição",
        eyebrow: "SEQUENCE / ROUTE TRACKING", title: "Da cidade escolhida ao alerta de viagem.",
        description: "Uma leitura do caminho percorrido quando o aplicativo calcula uma rota e consulta o clima ao longo do trajeto.",
        insight: "Serviços externos podem falhar separadamente; por isso rota, clima e alerta possuem responsabilidades e fallbacks distintos.",
        nodes: [
          { id: "tap", label: "Planejar viagem", detail: "origem, destino e paradas", kind: "actor", x: 0, y: 220 },
          { id: "repo", label: "Flutter Repository", detail: "monta e envia a solicitação", kind: "app", x: 245, y: 220 },
          { id: "route", label: "Tracking Route", detail: "endpoint Express", kind: "api", x: 500, y: 220 },
          { id: "osrm", label: "OSRM", detail: "geometria e duração", kind: "external", x: 760, y: 55 },
          { id: "weather", label: "Weather Service", detail: "pontos intermediários + cache", kind: "service", x: 760, y: 380 },
          { id: "response", label: "Route Tracking", detail: "rota, clima e alertas", kind: "app", x: 1030, y: 220 },
        ],
        edges: [
          { source: "tap", target: "repo", label: "confirma", animated: true },
          { source: "repo", target: "route", label: "POST" },
          { source: "route", target: "osrm", label: "calcula" },
          { source: "route", target: "weather", label: "consulta pontos" },
          { source: "osrm", target: "response", label: "trajeto" },
          { source: "weather", target: "response", label: "contexto climático" },
        ],
      },
      {
        id: "data", label: "Dados",
        eyebrow: "DATA MODEL / APP DOMAIN", title: "A viagem é um conjunto de paradas e trechos.",
        description: "O domínio no Flutter organiza planejamento, deslocamento e clima sem depender dos formatos retornados pelas APIs externas.",
        insight: "A camada de domínio protege a interface das mudanças de contrato dos serviços externos.",
        nodes: [
          { id: "plan", label: "TripPlan", detail: "plano completo da viagem", kind: "database", x: 495, y: 210 },
          { id: "stop", label: "TravelStop", detail: "cidade, posição e ordem", kind: "service", x: 180, y: 65 },
          { id: "leg", label: "TravelLeg", detail: "distância e duração", kind: "service", x: 180, y: 395 },
          { id: "weather", label: "Weather Context", detail: "condição por ponto", kind: "external", x: 820, y: 65 },
          { id: "prefs", label: "Local Preferences", detail: "pessoa e última cidade", kind: "cache", x: 820, y: 395 },
        ],
        edges: [
          { source: "stop", target: "plan", label: "compõe" },
          { source: "leg", target: "plan", label: "compõe" },
          { source: "plan", target: "weather", label: "recebe contexto" },
          { source: "plan", target: "prefs", label: "retoma sessão", dashed: true },
        ],
      },
    ],
    nodes: [
      { id: "person", label: "Pessoa viajando", detail: "busca, localização e paradas", kind: "actor", x: 0, y: 210 },
      { id: "flutter", label: "Flutter App", detail: "UI, estado e preferências locais", kind: "app", x: 250, y: 210 },
      { id: "local", label: "Shared Preferences", detail: "nome e última cidade", kind: "cache", x: 250, y: 410 },
      { id: "openmeteo", label: "Open-Meteo", detail: "forecast e geocoding", kind: "external", x: 570, y: 20 },
      { id: "backend", label: "Express Backend", detail: "CORS, rate limit e tracking", kind: "api", x: 570, y: 210 },
      { id: "osrm", label: "OSRM + Nominatim", detail: "rota e geocodificação reversa", kind: "external", x: 900, y: 95 },
      { id: "weathercache", label: "Cache em memória", detail: "clima por coordenada / 5 min", kind: "cache", x: 900, y: 260 },
      { id: "gemini", label: "Gemini", detail: "sugestões de atividades", kind: "external", x: 900, y: 425 },
    ],
    edges: [
      { source: "person", target: "flutter", label: "interage", animated: true },
      { source: "flutter", target: "local", label: "persiste", dashed: true },
      { source: "flutter", target: "openmeteo", label: "clima e cidades", animated: true },
      { source: "flutter", target: "backend", label: "rota / sugestões", animated: true },
      { source: "backend", target: "osrm", label: "calcula trajeto" },
      { source: "backend", target: "weathercache", label: "reaproveita leitura", dashed: true },
      { source: "backend", target: "gemini", label: "prompt protegido" },
    ],
  },
  "minhas-economias": {
    eyebrow: "ARCHITECTURE / EVENT SYNC",
    title: "Cada alteração deixa um rastro.",
    description:
      "Dispositivos trabalham sobre a mesma API. Além de persistir transações, o backend registra eventos para que outras instalações descubram o que mudou.",
    insight: "Transaction guarda o estado financeiro; SyncEvent guarda a história necessária para sincronizar esse estado.",
    alternatives: [
      {
        id: "request", label: "Requisição", eyebrow: "SEQUENCE / CREATE TRANSACTION", title: "Salvar também significa avisar os outros dispositivos.",
        description: "O fluxo de criação persiste a transação e produz o evento usado na sincronização.",
        insight: "A escrita financeira e o registro do evento pertencem ao mesmo caso de uso, mas atendem consumidores diferentes.",
        nodes: [
          { id: "form", label: "Nova movimentação", detail: "valor, tipo e categoria", kind: "actor", x: 0, y: 220 },
          { id: "flutter", label: "Finance Service", detail: "payload + device token", kind: "app", x: 245, y: 220 },
          { id: "api", label: "Transaction Route", detail: "controller Express", kind: "api", x: 500, y: 220 },
          { id: "service", label: "Transaction Service", detail: "regra da operação", kind: "service", x: 745, y: 80 },
          { id: "event", label: "Sync Event Service", detail: "registra CREATE", kind: "service", x: 745, y: 365 },
          { id: "db", label: "PostgreSQL", detail: "estado + evento", kind: "database", x: 1010, y: 220 },
        ],
        edges: [
          { source: "form", target: "flutter", label: "salvar", animated: true },
          { source: "flutter", target: "api", label: "POST" },
          { source: "api", target: "service", label: "executa" },
          { source: "api", target: "event", label: "publica mudança" },
          { source: "service", target: "db", label: "Transaction" },
          { source: "event", target: "db", label: "SyncEvent" },
        ],
      },
      {
        id: "data", label: "Dados", eyebrow: "DATA MODEL / PRISMA", title: "Estado, origem e histórico de mudança.",
        description: "O schema separa a movimentação financeira, a identidade da instalação e o evento de sincronização.",
        insight: "Device e SyncEvent não possuem relação rígida no banco; o token mantém o vínculo lógico e tolera clientes legados.",
        nodes: [
          { id: "transaction", label: "Transaction", detail: "valor, tipo, data e deviceToken", kind: "database", x: 180, y: 210 },
          { id: "device", label: "Device", detail: "token, nome e lastSeenAt", kind: "database", x: 505, y: 60 },
          { id: "event", label: "SyncEvent", detail: "ação, dispositivo e transactionId", kind: "database", x: 505, y: 365 },
          { id: "client", label: "Flutter Client", detail: "correlaciona pelo token", kind: "app", x: 845, y: 210 },
        ],
        edges: [
          { source: "transaction", target: "client", label: "estado atual" },
          { source: "device", target: "client", label: "identidade" },
          { source: "event", target: "client", label: "mudanças" },
        ],
      },
    ],
    nodes: [
      { id: "deviceA", label: "Dispositivo A", detail: "cria ou edita uma transação", kind: "actor", x: 0, y: 105 },
      { id: "deviceB", label: "Dispositivo B", detail: "consulta mudanças recentes", kind: "actor", x: 0, y: 390 },
      { id: "flutter", label: "Flutter App", detail: "dashboard, filtros e fallback", kind: "app", x: 255, y: 235 },
      { id: "local", label: "Fallback local", detail: "histórico quando a API cai", kind: "cache", x: 255, y: 465 },
      { id: "express", label: "API Express", detail: "transactions, devices e sync", kind: "api", x: 570, y: 235 },
      { id: "prisma", label: "Prisma ORM", detail: "serviços e persistência tipada", kind: "service", x: 830, y: 105 },
      { id: "sync", label: "SyncEvent", detail: "CREATE · UPDATE · DELETE · RESET", kind: "service", x: 830, y: 365 },
      { id: "postgres", label: "PostgreSQL", detail: "Transaction · Device · SyncEvent", kind: "database", x: 1080, y: 235 },
    ],
    edges: [
      { source: "deviceA", target: "flutter", label: "ação", animated: true },
      { source: "deviceB", target: "flutter", label: "polling", animated: true },
      { source: "flutter", target: "local", label: "fallback", dashed: true },
      { source: "flutter", target: "express", label: "REST + device token", animated: true },
      { source: "express", target: "prisma", label: "CRUD" },
      { source: "express", target: "sync", label: "registra evento" },
      { source: "prisma", target: "postgres", label: "transações" },
      { source: "sync", target: "postgres", label: "eventos" },
    ],
  },
  agenviagem: {
    eyebrow: "ARCHITECTURE / SECURITY PIPELINE",
    title: "A requisição prova quem é antes de agir.",
    description:
      "A API separa validação, autenticação e autorização das regras de viagem. Operações sensíveis avançam somente após cumprir o nível de acesso exigido.",
    insight: "Logs registram tanto ações bem-sucedidas quanto tentativas — segurança também é observabilidade.",
    alternatives: [
      {
        id: "request", label: "Requisição", eyebrow: "SEQUENCE / CREATE RESERVATION", title: "Uma reserva atravessa contrato, identidade e disponibilidade.",
        description: "O caso de uso valida a entrada, identifica o usuário e só então altera assentos e cria a reserva.",
        insight: "A reserva não é apenas um INSERT: ela precisa preservar a consistência da capacidade da viagem.",
        nodes: [
          { id: "post", label: "POST /reservas", detail: "cliente, viagem e assentos", kind: "actor", x: 0, y: 220 },
          { id: "schema", label: "Validation Schema", detail: "estrutura e limites", kind: "security", x: 245, y: 70 },
          { id: "jwt", label: "JWT Middleware", detail: "usuário + nível", kind: "security", x: 245, y: 365 },
          { id: "service", label: "Reserva Service", detail: "capacidade e regra de negócio", kind: "service", x: 540, y: 220 },
          { id: "prisma", label: "Prisma", detail: "Reserva + Viagem", kind: "database", x: 825, y: 80 },
          { id: "log", label: "Audit Log", detail: "ação, sucesso, IP e agente", kind: "storage", x: 825, y: 365 },
          { id: "response", label: "HTTP Response", detail: "reserva ou erro explícito", kind: "api", x: 1080, y: 220 },
        ],
        edges: [
          { source: "post", target: "schema", label: "valida" },
          { source: "post", target: "jwt", label: "autentica" },
          { source: "schema", target: "service", label: "payload" },
          { source: "jwt", target: "service", label: "identidade" },
          { source: "service", target: "prisma", label: "persiste" },
          { source: "service", target: "log", label: "registra" },
          { source: "prisma", target: "response", label: "resultado" },
        ],
      },
      {
        id: "data", label: "Dados", eyebrow: "DATA MODEL / PRISMA", title: "Reserva conecta pessoas, viagens e responsabilidade.",
        description: "O modelo relacional preserva o domínio operacional e os registros de segurança.",
        insight: "Soft delete em Viagem e onDelete controlado nos dados de segurança evitam apagar contexto importante.",
        nodes: [
          { id: "cliente", label: "Cliente", detail: "dados e reservas", kind: "database", x: 0, y: 90 },
          { id: "viagem", label: "Viagem", detail: "datas, valor e assentos", kind: "database", x: 0, y: 390 },
          { id: "reserva", label: "Reserva", detail: "cliente + viagem + usuário", kind: "service", x: 335, y: 240 },
          { id: "usuario", label: "Usuário", detail: "senhaHash e nível de acesso", kind: "security", x: 680, y: 240 },
          { id: "recovery", label: "RecuperaçãoSenha", detail: "hash, validade e uso único", kind: "database", x: 1010, y: 90 },
          { id: "log", label: "Log", detail: "ação, resultado e contexto", kind: "storage", x: 1010, y: 390 },
        ],
        edges: [
          { source: "cliente", target: "reserva", label: "1 : N" },
          { source: "viagem", target: "reserva", label: "1 : N" },
          { source: "reserva", target: "usuario", label: "N : 0..1" },
          { source: "usuario", target: "recovery", label: "1 : N" },
          { source: "usuario", target: "log", label: "1 : N" },
        ],
      },
    ],
    nodes: [
      { id: "client", label: "Cliente HTTP", detail: "Bruno, Insomnia ou frontend", kind: "actor", x: 0, y: 225 },
      { id: "router", label: "Express Router", detail: "7 domínios de rota", kind: "api", x: 245, y: 225 },
      { id: "validation", label: "Schemas", detail: "payload e formato dos dados", kind: "security", x: 500, y: 65 },
      { id: "auth", label: "JWT + Access Level", detail: "níveis 1, 2 e 3", kind: "security", x: 500, y: 385 },
      { id: "services", label: "Domain Services", detail: "reservas, viagens e usuários", kind: "service", x: 765, y: 225 },
      { id: "mail", label: "E-mail", detail: "recuperação e histórico", kind: "external", x: 1015, y: 35 },
      { id: "logs", label: "Audit Log", detail: "ação, IP, agente e sucesso", kind: "storage", x: 1015, y: 225 },
      { id: "prisma", label: "Prisma + SQLite", detail: "7 modelos e soft delete", kind: "database", x: 1015, y: 415 },
    ],
    edges: [
      { source: "client", target: "router", label: "request", animated: true },
      { source: "router", target: "validation", label: "valida" },
      { source: "router", target: "auth", label: "protege" },
      { source: "validation", target: "services", label: "payload seguro" },
      { source: "auth", target: "services", label: "identidade + nível" },
      { source: "services", target: "mail", label: "notifica" },
      { source: "services", target: "logs", label: "audita", dashed: true },
      { source: "services", target: "prisma", label: "persiste" },
    ],
  },
  "mauricio-furquin": {
    eyebrow: "ARCHITECTURE / FULL-STACK DELIVERY",
    title: "O site público e a operação compartilham o mesmo núcleo.",
    description:
      "Nginx entrega o React e encaminha API e uploads ao backend. Autenticação e papéis definem quem administra eventos e quem acessa galerias privadas.",
    insight: "Acesso a um evento privado depende do usuário, do papel, do proprietário e da validade da liberação.",
    alternatives: [
      {
        id: "request", label: "Requisição", eyebrow: "SEQUENCE / PRIVATE GALLERY", title: "Uma foto privada precisa provar que pode ser vista.",
        description: "O backend combina autenticação opcional, propriedade, papel e liberação antes de retornar a galeria.",
        insight: "Admin, fotógrafo proprietário e cliente liberado chegam ao mesmo recurso por regras diferentes.",
        nodes: [
          { id: "get", label: "GET /eventos/:id/fotos", detail: "solicitação da galeria", kind: "actor", x: 0, y: 220 },
          { id: "optional", label: "Optional Auth", detail: "extrai JWT quando existe", kind: "security", x: 245, y: 220 },
          { id: "access", label: "Event Access Service", detail: "papel, dono e expiração", kind: "service", x: 505, y: 220 },
          { id: "prisma", label: "Prisma", detail: "Event + Access + Photo", kind: "database", x: 765, y: 70 },
          { id: "storage", label: "Storage", detail: "arquivo autorizado", kind: "storage", x: 765, y: 365 },
          { id: "gallery", label: "Galeria React", detail: "lista visível ao usuário", kind: "app", x: 1035, y: 220 },
        ],
        edges: [
          { source: "get", target: "optional", label: "request" },
          { source: "optional", target: "access", label: "usuário opcional" },
          { source: "access", target: "prisma", label: "verifica acesso" },
          { source: "access", target: "storage", label: "libera arquivo" },
          { source: "prisma", target: "gallery", label: "metadados" },
          { source: "storage", target: "gallery", label: "mídia" },
        ],
      },
      {
        id: "data", label: "Dados", eyebrow: "DATA MODEL / PRISMA", title: "Eventos organizam mídia, acesso e pagamento.",
        description: "Sete modelos formam o núcleo relacional da plataforma de fotografia.",
        insight: "Access e GalleryPhoto são relações explícitas porque carregam estado próprio além das chaves estrangeiras.",
        nodes: [
          { id: "user", label: "User", detail: "papel e identidade", kind: "security", x: 0, y: 240 },
          { id: "event", label: "Event", detail: "dono, status e visibilidade", kind: "database", x: 280, y: 240 },
          { id: "access", label: "Access", detail: "liberação e expiração", kind: "service", x: 550, y: 35 },
          { id: "payment", label: "Payment", detail: "valor e status", kind: "database", x: 550, y: 240 },
          { id: "photo", label: "Photo", detail: "arquivo, ordem e publicidade", kind: "storage", x: 550, y: 445 },
          { id: "gallery", label: "Gallery", detail: "coleção do proprietário", kind: "database", x: 850, y: 115 },
          { id: "join", label: "GalleryPhoto", detail: "foto + galeria + ordem", kind: "service", x: 850, y: 380 },
        ],
        edges: [
          { source: "user", target: "event", label: "possui" },
          { source: "event", target: "access", label: "controla" },
          { source: "event", target: "payment", label: "recebe" },
          { source: "event", target: "photo", label: "contém" },
          { source: "user", target: "gallery", label: "possui" },
          { source: "photo", target: "join", label: "N : N" },
          { source: "gallery", target: "join", label: "N : N" },
        ],
      },
    ],
    nodes: [
      { id: "people", label: "Visitante / Equipe", detail: "cliente, fotógrafo ou admin", kind: "actor", x: 0, y: 230 },
      { id: "nginx", label: "Nginx", detail: "SPA, proxy /api e /uploads", kind: "service", x: 235, y: 230 },
      { id: "react", label: "React + Vite", detail: "site, galeria e portais", kind: "app", x: 495, y: 65 },
      { id: "express", label: "Express API", detail: "eventos, fotos e usuários", kind: "api", x: 495, y: 390 },
      { id: "auth", label: "JWT + Roles", detail: "admin · fotógrafo · cliente", kind: "security", x: 760, y: 245 },
      { id: "storage", label: "Storage local", detail: "uploads e capas de evento", kind: "storage", x: 1020, y: 55 },
      { id: "prisma", label: "Prisma ORM", detail: "regras de acesso e domínio", kind: "service", x: 1020, y: 245 },
      { id: "mysql", label: "MySQL / MariaDB", detail: "7 modelos relacionados", kind: "database", x: 1020, y: 435 },
    ],
    edges: [
      { source: "people", target: "nginx", label: "HTTP", animated: true },
      { source: "nginx", target: "react", label: "arquivos estáticos" },
      { source: "nginx", target: "express", label: "proxy /api", animated: true },
      { source: "react", target: "express", label: "REST" },
      { source: "express", target: "auth", label: "autentica" },
      { source: "auth", target: "storage", label: "upload autorizado" },
      { source: "auth", target: "prisma", label: "papel + acesso" },
      { source: "prisma", target: "mysql", label: "consulta e persiste" },
    ],
  },
};
