"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { ProjectArchitecture } from "@/data/architectures";

const ArchitectureDiagram = dynamic(
  () => import("./architecture-diagram").then((module) => module.ArchitectureDiagram),
  {
    ssr: false,
    loading: () => <div className="architecture-loading"><span>montando mapa do sistema…</span></div>,
  },
);

export function LazyArchitecture({ architecture }: { architecture: ProjectArchitecture }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "320px" },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef}>
      {visible ? (
        <ArchitectureDiagram architecture={architecture} />
      ) : (
        <div className="architecture-loading"><span>diagrama carregado ao se aproximar</span></div>
      )}
    </div>
  );
}
