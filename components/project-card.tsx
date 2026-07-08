"use client";

import Link from "next/link";
import type { CSSProperties, MouseEvent } from "react";
import { ArrowUpRight, LockKeyhole } from "lucide-react";
import type { Project } from "@/data/projects";

type CardStyle = CSSProperties & {
  "--note-color": string;
  "--note-ink": string;
  "--rx": string;
  "--ry": string;
};

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  function handlePointerMove(event: MouseEvent<HTMLElement>) {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty("--ry", `${x * 3.5}deg`);
    card.style.setProperty("--rx", `${y * -3.5}deg`);
  }

  function resetPointer(event: MouseEvent<HTMLElement>) {
    event.currentTarget.style.setProperty("--ry", "0deg");
    event.currentTarget.style.setProperty("--rx", "0deg");
  }

  const style: CardStyle = {
    "--note-color": project.color,
    "--note-ink": project.ink,
    "--rx": "0deg",
    "--ry": "0deg",
    animationDelay: `${160 + index * 90}ms`,
  };

  return (
    <article
      className="project-note"
      style={style}
      onMouseMove={handlePointerMove}
      onMouseLeave={resetPointer}
    >
      <span className="note-tape" aria-hidden="true" />
      <div className="note-meta">
        <span>{project.ticket}</span>
        <span>{project.status}</span>
      </div>
      <p className="note-eyebrow">{project.eyebrow}</p>
      <h3>{project.title}</h3>
      <p className="note-description">{project.description}</p>
      <ul className="tag-list" aria-label="Tecnologias">
        {project.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <div className="note-footer">
        {project.private ? (
          <span className="private-label"><LockKeyhole size={13} /> case privado</span>
        ) : (
          <span>código público</span>
        )}
        <Link href={`/projetos/${project.slug}`} aria-label={`Abrir projeto ${project.title}`}>
          abrir cartão <ArrowUpRight size={16} />
        </Link>
      </div>
    </article>
  );
}
