"use client";

import {
  Background,
  BackgroundVariant,
  BaseEdge,
  Controls,
  EdgeLabelRenderer,
  getSmoothStepPath,
  Handle,
  MarkerType,
  Position,
  ReactFlow,
  type Edge,
  type EdgeProps,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useState } from "react";
import type {
  ArchitectureNodeKind,
  ProjectArchitecture,
} from "@/data/architectures";

type DiagramNodeData = {
  label: string;
  detail: string;
  kind: ArchitectureNodeKind;
};

type DiagramNode = Node<DiagramNodeData, "note">;
type DiagramEdge = Edge<{ label?: string }, "signal">;

const kindLabels: Record<ArchitectureNodeKind, string> = {
  actor: "ator",
  app: "aplicação",
  api: "API",
  service: "serviço",
  security: "segurança",
  database: "dados",
  external: "externo",
  storage: "storage",
  cache: "cache",
};

function NoteNode({ data }: NodeProps<DiagramNode>) {
  return (
    <div className={`architecture-node architecture-node--${data.kind}`}>
      <Handle type="target" position={Position.Left} className="architecture-handle" />
      <span>{kindLabels[data.kind]}</span>
      <strong>{data.label}</strong>
      <p>{data.detail}</p>
      <Handle type="source" position={Position.Right} className="architecture-handle" />
    </div>
  );
}

function SignalEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
  style,
  data,
}: EdgeProps<DiagramEdge>) {
  const [path, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius: 12,
    offset: 24,
  });

  return (
    <>
      <BaseEdge id={id} path={path} markerEnd={markerEnd} style={style} />
      {data?.label && (
        <EdgeLabelRenderer>
          <span
            className="architecture-edge-label nodrag nopan"
            style={{ transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)` }}
          >
            {data.label}
          </span>
        </EdgeLabelRenderer>
      )}
    </>
  );
}

const nodeTypes = { note: NoteNode };
const edgeTypes = { signal: SignalEdge };

export function ArchitectureDiagram({ architecture }: { architecture: ProjectArchitecture }) {
  const views = [architecture, ...(architecture.alternatives ?? [])];
  const [activeIndex, setActiveIndex] = useState(0);
  const active = views[activeIndex];

  const nodes: DiagramNode[] = active.nodes.map((node) => ({
    id: node.id,
    type: "note",
    position: { x: node.x, y: node.y },
    data: { label: node.label, detail: node.detail, kind: node.kind },
    draggable: false,
    connectable: false,
  }));

  const edges: DiagramEdge[] = active.edges.map((edge, index) => ({
    id: `${edge.source}-${edge.target}-${index}`,
    source: edge.source,
    target: edge.target,
    type: "signal",
    data: { label: edge.label },
    animated: edge.animated,
    markerEnd: { type: MarkerType.ArrowClosed, width: 16, height: 16, color: "#d9d5c9" },
    style: {
      stroke: "#d9d5c9",
      strokeWidth: edge.animated ? 2.2 : 1.5,
      strokeDasharray: edge.dashed ? "7 6" : undefined,
    },
  }));

  return (
    <div className="architecture-explorer">
      <div className="architecture-tabs" role="tablist" aria-label="Modos do diagrama">
        {views.map((view, index) => (
          <button
            type="button"
            role="tab"
            aria-selected={activeIndex === index}
            className={activeIndex === index ? "active" : ""}
            onClick={() => setActiveIndex(index)}
            key={view.id ?? "architecture"}
          >
            <span>0{index + 1}</span>
            {view.label ?? "Sistema"}
          </button>
        ))}
      </div>

      <div className="architecture-heading">
        <div>
          <span>{active.eyebrow}</span>
          <h2>{active.title}</h2>
        </div>
        <p>{active.description}</p>
      </div>

      <div className="architecture-visual">
      <div className="architecture-canvas" aria-label={`Diagrama: ${active.title}`}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          fitViewOptions={{ padding: 0.13, maxZoom: 1.05 }}
          minZoom={0.45}
          maxZoom={1.45}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          zoomOnScroll={false}
          panOnScroll={false}
          preventScrolling={false}
          proOptions={{ hideAttribution: false }}
        >
          <Background variant={BackgroundVariant.Dots} gap={22} size={1.3} color="rgba(255,255,255,.13)" />
          <Controls showInteractive={false} position="bottom-right" />
        </ReactFlow>
      </div>

      <ol className="architecture-mobile-list" aria-label={`Fluxo linear: ${active.title}`}>
        {active.nodes.map((node, index) => (
          <li key={node.id} className={`architecture-mobile-node architecture-node--${node.kind}`}>
            <span>0{index + 1} / {kindLabels[node.kind]}</span>
            <strong>{node.label}</strong>
            <p>{node.detail}</p>
          </li>
        ))}
      </ol>
      </div>

      <div className="architecture-insight">
        <span>LEITURA DO SISTEMA</span>
        <p>{active.insight}</p>
      </div>
    </div>
  );
}
