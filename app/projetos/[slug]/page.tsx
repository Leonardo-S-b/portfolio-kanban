import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, GitFork, LockKeyhole } from "lucide-react";
import { ProjectVideo } from "@/components/project-video";
import { LazyArchitecture } from "@/components/lazy-architecture";
import { architectures } from "@/data/architectures";
import { getProject, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();
  const architecture = architectures[project.slug];

  return (
    <main className="project-page" style={{ "--project-color": project.color } as React.CSSProperties}>
      <header className="project-nav">
        <Link href="/#quadro"><ArrowLeft size={17} /> voltar ao quadro</Link>
        <span>{project.ticket} / case study</span>
        {project.github ? (
          <a href={project.github} target="_blank" rel="noreferrer"><GitFork size={16} /> repositório</a>
        ) : (
          <span><LockKeyhole size={15} /> projeto privado</span>
        )}
      </header>

      <section className="project-hero">
        <div>
          <p className="project-eyebrow">{project.eyebrow}</p>
          <h1>{project.title}</h1>
          <p className="project-lead">{project.highlight}</p>
          <ul className="project-tags">
            {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
        </div>
        <aside className="project-brief">
          <span>RESUMO DO CARTÃO</span>
          <p>{project.description}</p>
          <dl>
            {project.facts.map((fact) => (
              <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>
            ))}
          </dl>
        </aside>
      </section>

      {project.slug === "clima-agora" && (
        <section className="project-demo" aria-labelledby="demo-title">
          <div className="demo-copy">
            <span>DEMO / EVIDÊNCIA DE ENTREGA</span>
            <h2 id="demo-title">O aplicativo<br />em movimento.</h2>
            <p>
              A interface reage à busca e transforma dados de clima, localização e viagem em uma experiência direta no celular.
            </p>
            <div className="demo-annotation" aria-hidden="true">
              <span>↳</span> interface real,<br />sem mockup
            </div>
          </div>
          <div className="demo-paper">
            <span className="demo-tape demo-tape-left" aria-hidden="true" />
            <span className="demo-tape demo-tape-right" aria-hidden="true" />
            <div className="demo-paper-heading">
              <span>APP-01 / SCREEN RECORD</span>
              <b>CLIMA AGORA</b>
            </div>
            <ProjectVideo src="/assets/telaClimaAgora.webm" title={project.title} />
            <div className="demo-playback-meta">
              <span><i /> app em execução</span>
              <span>WEBM / LOOP</span>
            </div>
            <div className="demo-caption">
              <span>Flutter · fluxo real</span>
              <span>01 take</span>
            </div>
          </div>
        </section>
      )}

      <section className="case-board" aria-label="Etapas do projeto">
        <div className="case-board-title">
          <span>FLUXO DO PROJETO</span>
          <p>do problema à entrega</p>
        </div>
        <div className="case-columns">
          {project.story.map((item, index) => (
            <article className="case-note" key={item.title} style={{ animationDelay: `${index * 100}ms` }}>
              <div className="case-column-label"><span>0{index + 1}</span>{item.title}</div>
              <div className="case-paper">
                <span className="mini-tape" />
                <b>{item.stamp}</b>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="flow-section">
        <LazyArchitecture architecture={architecture} />
      </section>

      <section className="outcomes-section">
        <div className="outcomes-heading">
          <span>RESULTADOS / MÉTRICAS</span>
          <h2>Resultados e métricas.</h2>
        </div>
        <div className="outcome-grid">
          {project.outcomes.map((outcome, index) => (
            <article key={outcome.title}>
              <span>0{index + 1}</span>
              <h3>{outcome.title}</h3>
              <p>{outcome.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="next-case">
        <span>PRÓXIMO PASSO</span>
        <h2>Voltar ao quadro e abrir outro cartão.</h2>
        <Link href="/#quadro">ver todos os projetos <ArrowUpRight size={18} /></Link>
      </section>
    </main>
  );
}
