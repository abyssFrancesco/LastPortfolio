"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ProjectCarousel() {
  const projects = [
    {
      title: "Piattaforma E-commerce",
      description: "Frontend React, Next.js + backend in Spring Boot, pagine prodotto performanti.",
      tech: ["Next.js", "React", "Java"],
    },
    {
      title: "Dashboard Analitica",
      description: "Visualizzazioni realtime, grafici interattivi e ottimizzazione query.",
      tech: ["React", "TypeScript", "Postgres"],
    },
    {
      title: "Servizio Microservizi",
      description: "API resilienti, deployment containerizzato e monitoring.",
      tech: ["Spring Boot", "Docker", "Kubernetes"],
    },
  ];

  const carouselRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-muted">Scorri per vedere i progetti</div>
        <div className="text-sm text-muted">Drag • Scroll • Tap</div>
      </div>

      <div className="overflow-hidden relative">
        <motion.div ref={carouselRef} drag="x" dragConstraints={{ left: -900, right: 0 }} dragElastic={0.12} className="flex gap-6 py-4 cursor-grab overflow-x-auto no-scrollbar carousel-track" style={{ scrollBehavior: "smooth" }}>
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.99 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="min-w-[280px] md:min-w-[420px] rounded-2xl border border-white/20 bg-white/40 dark:bg-black/40 backdrop-blur-md p-6 shadow-lg hover:shadow-2xl transition"
              style={{ scrollSnapAlign: 'start' }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-accent text-white flex items-center justify-center font-bold">{i + 1}</div>
                  <h3 className="text-lg font-semibold text-primary">{p.title}</h3>
                </div>
                <div className="text-sm text-secondary">{p.tech.join(" • ")}</div>
              </div>

              <p className="text-muted mb-4">{p.description}</p>

              <div className="flex gap-3">
                <Link href="/projects" className="inline-flex items-center gap-2 px-3 py-2 rounded-full btn-accent text-sm font-medium shadow">Dettagli</Link>
                <a className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-default text-sm">Live</a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
