"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function ProjectVideo({ src, title }: { src: string; title: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (prefersReducedMotion.matches) {
      videoRef.current?.pause();
      setPlaying(false);
    }
  }, []);

  async function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      await video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  }

  return (
    <div className="demo-video-frame">
      <video
        ref={videoRef}
        src={src}
        aria-label={`Demonstração do projeto ${title}`}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        Seu navegador não suporta vídeos HTML5.
      </video>
      <button type="button" className="video-control" onClick={togglePlayback}>
        {playing ? <Pause size={17} /> : <Play size={17} fill="currentColor" />}
        <span>{playing ? "pausar demo" : "reproduzir demo"}</span>
      </button>
    </div>
  );
}
