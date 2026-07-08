import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, GitFork, LockKeyhole } from "lucide-react";
import { getProject, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

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
        <div>
          <span>ARCHITECTURE / HIGH LEVEL</span>
          <h2>O caminho da informação</h2>
        </div>
        <div className="flow-diagram">
          {project.flow.map((node, index) => (
            <div className="flow-node-wrap" key={node}>
              <div className="flow-node"><span>0{index + 1}</span>{node}</div>
              {index < project.flow.length - 1 && <span className="flow-arrow">→</span>}
            </div>
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
