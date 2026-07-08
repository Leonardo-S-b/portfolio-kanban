"use client";

import Link from "next/link";
import { ArrowUpRight, BriefcaseBusiness, X } from "lucide-react";
import { useRef } from "react";

const linkedin = "https://www.linkedin.com/in/leonardo-souza-bezerra-15247a355/";

export function RecruiterSummary() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button className="summary-trigger" type="button" onClick={() => dialogRef.current?.showModal()}>
        resumo rápido
      </button>
      <dialog className="summary-dialog" ref={dialogRef} onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}>
        <div className="summary-sheet">
          <button className="summary-close" type="button" onClick={() => dialogRef.current?.close()} aria-label="Fechar resumo">
            <X size={18} />
          </button>
          <div className="summary-ticket"><BriefcaseBusiness size={16} /> PROFILE / 30 SEGUNDOS</div>
          <p className="summary-kicker">Leonardo Souza Bezerra</p>
          <h2>Programador com foco em backend, dados e produtos digitais.</h2>
          <p className="summary-intro">
            Atuo em múltiplos squads e também construo projetos próprios envolvendo APIs, autenticação, bancos, Flutter e aplicações full-stack.
          </p>
          <div className="summary-columns">
            <div>
              <span>BASE TÉCNICA</span>
              <ul>
                <li>TypeScript e Node.js</li>
                <li>Prisma e bancos SQL</li>
                <li>React, Next.js e Flutter</li>
                <li>Docker e integrações</li>
              </ul>
            </div>
            <div>
              <span>EXPERIÊNCIA</span>
              <p>Atuação em múltiplos squads, desenvolvendo sistemas internos, automações, integrações e produtos digitais utilizados em produção.</p>
            </div>
          </div>
          <div className="summary-projects">
            <span>CASES SELECIONADOS</span>
            <div>
              <Link href="/projetos/clima-agora" onClick={() => dialogRef.current?.close()}>Clima Agora</Link>
              <Link href="/projetos/agenviagem" onClick={() => dialogRef.current?.close()}>AgenViagem</Link>
              <Link href="/projetos/minhas-economias" onClick={() => dialogRef.current?.close()}>Minhas Economias</Link>
            </div>
          </div>
          <div className="summary-actions">
            <a href={linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={15} /></a>
            <a href="https://github.com/Leonardo-S-b" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15} /></a>
          </div>
        </div>
      </dialog>
    </>
  );
}
