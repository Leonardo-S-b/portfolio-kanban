import Link from "next/link";
import {
  ArrowDownRight,
  ArrowUpRight,
  CircleDot,
  GitFork,
  Layers3,
  MoveRight,
} from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/data/projects";

const stageData = [
  {
    id: "em-foco",
    number: "01",
    title: "Em foco",
    description: "O projeto que abre a conversa.",
  },
  {
    id: "arquitetura",
    number: "02",
    title: "Review técnico",
    description: "Onde os sistemas aparecem por dentro.",
  },
  {
    id: "entregue",
    number: "03",
    title: "Entregue",
    description: "Produto, operação e acabamento.",
  },
] as const;

export default function Home() {
  return (
    <main>
      <header className="topbar">
        <Link className="brand" href="#top" aria-label="Voltar ao início">
          <span>LS</span>
          <span>Leonardo / workspace</span>
        </Link>
        <nav aria-label="Navegação principal">
          <Link href="#quadro">Projetos</Link>
          <Link href="#sobre">Sobre</Link>
          <a href="https://github.com/Leonardo-S-b" target="_blank" rel="noreferrer">
            GitHub <ArrowUpRight size={14} />
          </a>
        </nav>
        <span className="live-status"><i /> disponível para conversar</span>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="issue-label"><CircleDot size={15} /> PORTFÓLIO / SPRINT 01</div>
          <p className="hero-kicker">Backend · arquitetura · produtos digitais</p>
          <h1>
            Ideias no quadro.
            <span>Sistemas no mundo.</span>
          </h1>
          <p className="hero-intro">
            Sou Leonardo. Transformo regras, dados e integrações em produtos que continuam funcionando depois que a interface termina.
          </p>
          <div className="hero-actions">
            <Link className="primary-action" href="#quadro">
              abrir o quadro <ArrowDownRight size={18} />
            </Link>
            <a className="text-action" href="https://github.com/Leonardo-S-b" target="_blank" rel="noreferrer">
              <GitFork size={17} /> ver código
            </a>
          </div>
        </div>

        <div className="hero-board" aria-label="Resumo do portfólio">
          <div className="board-shadow-card" aria-hidden="true" />
          <div className="hero-note hero-note-main">
            <span className="paperclip" aria-hidden="true" />
            <p>OBJETIVO DA SPRINT</p>
            <strong>Mostrar como eu penso antes de mostrar apenas o resultado.</strong>
            <div className="check-row"><span>✓</span> APIs e segurança</div>
            <div className="check-row"><span>✓</span> Modelagem de dados</div>
            <div className="check-row"><span>✓</span> Produtos completos</div>
          </div>
          <div className="hero-note hero-note-small">
            <Layers3 size={20} />
            <strong>4 cases</strong>
            <span>selecionados do GitHub</span>
          </div>
          <span className="scribble-arrow" aria-hidden="true">↙</span>
          <span className="scribble-copy">comece por aqui</span>
        </div>
      </section>

      <section className="board-section" id="quadro">
        <div className="section-heading">
          <div>
            <span className="section-index">BOARD / 01</span>
            <h2>Projetos em contexto</h2>
          </div>
          <p>Não são cards soltos: cada entrega abre seu próprio fluxo de decisões, arquitetura e resultado.</p>
        </div>

        <div className="kanban-shell">
          <div className="kanban-toolbar">
            <span><i /> portfolio-board</span>
            <span>{projects.length} cartões</span>
            <span>atualizado recentemente</span>
          </div>
          <div className="kanban-board">
            {stageData.map((stage, stageIndex) => {
              const stageProjects = projects.filter((project) => project.stage === stage.id);
              return (
                <section className="kanban-column" key={stage.id} aria-labelledby={`stage-${stage.id}`}>
                  <header className="column-heading">
                    <span>{stage.number}</span>
                    <div>
                      <h3 id={`stage-${stage.id}`}>{stage.title}</h3>
                      <p>{stage.description}</p>
                    </div>
                    <b>{stageProjects.length}</b>
                  </header>
                  <div className="column-cards">
                    {stageProjects.map((project, index) => (
                      <ProjectCard project={project} index={stageIndex * 2 + index} key={project.slug} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>

      <section className="about-section" id="sobre">
        <div className="about-title">
          <span className="section-index">PROFILE / README</span>
          <h2>Mais interessado no sistema inteiro do que na parte que cabe no print.</h2>
        </div>
        <div className="about-grid">
          <div className="about-copy">
            <p>
              Minha base está no backend: APIs, autenticação, bancos e regras de negócio. Também construo as interfaces necessárias para transformar essa base em produto.
            </p>
            <a href="https://github.com/Leonardo-S-b" target="_blank" rel="noreferrer">
              explorar atividade no GitHub <MoveRight size={18} />
            </a>
          </div>
          <div className="stack-note">
            <p>STACK ATUAL</p>
            <ul>
              <li><span>01</span> TypeScript / Node.js</li>
              <li><span>02</span> Prisma / SQL</li>
              <li><span>03</span> Flutter / Dart</li>
              <li><span>04</span> React / Next.js</li>
              <li><span>05</span> Docker / Cloud</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="contact-section">
        <p>NOVO CARD / NOVA CONVERSA</p>
        <h2>Tem um sistema que precisa sair do quadro?</h2>
        <a href="https://github.com/Leonardo-S-b" target="_blank" rel="noreferrer">
          falar pelo GitHub <ArrowUpRight size={20} />
        </a>
      </section>

      <footer>
        <span>Leonardo S. B. © 2026</span>
        <span>feito como um sistema em evolução</span>
      </footer>
    </main>
  );
}
