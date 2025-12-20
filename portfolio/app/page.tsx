"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ProjectCarousel from "./components/ProjectCarousel";

const container = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.12 } },
};

const card = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Home() {
  const features = [
    {
      title: "Web App moderne",
      description: "React + Next.js, SSR/SSG ottimizzati per prestazioni reali.",
    },
    {
      title: "Architetture solide",
      description: "Backend in Java/Spring Boot, servizi scalabili e manutenibili.",
    },
    {
      title: "UX e accessibilità",
      description: "Design attento, animazioni fluide e accessibilità al centro.",
    },
  ];

  const skills = [
    { name: "React", level: 95 },
    { name: "Next.js", level: 92 },
    { name: "TypeScript", level: 90 },
    { name: "Tailwind CSS", level: 88 },
    { name: "Java", level: 85 },
    { name: "SQL / PostgreSQL", level: 82 },
  ];

  return (
    <div className="min-h-screen">
      <main className="max-w-5xl mx-auto px-6 py-20">
        {/* HERO */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-semibold text-2xl shadow-2xl">FG</div>
            <div>
              <div className="text-sm text-secondary">Software Developer • Full-stack</div>
              <h1 className="text-4xl md:text-6xl font-extrabold mt-1 tracking-tight">Ciao, sono <span className="text-accent typing">Francesco<span className="blink">|</span></span></h1>
            </div>
          </div>

          <p className="max-w-2xl text-zinc-700 dark:text-zinc-300 text-lg leading-relaxed">
            Sviluppo applicazioni web moderne e performanti con attenzione a codice leggibile, accessibilità e UX. Creo interfacce fluide con animazioni eleganti e backend affidabili.
          </p>

          <div className="mt-6 flex gap-4">
            <Link href="/projects" className="inline-flex items-center gap-3 rounded-full btn-accent px-6 py-4 text-white font-medium shadow-lg hover:scale-105 transition">Guarda i progetti</Link>
            <Link href="/contact" className="inline-flex items-center gap-3 rounded-full border border-default px-6 py-4 text-sm font-medium hover:bg-subtle transition">Contattami</Link>
          </div>
        </motion.section>

        {/* FEATURES CARDS */}
        <motion.section
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold mb-6">Cosa faccio</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f) => (
              <motion.article
                key={f.title}
                variants={card}
                whileHover={{ scale: 1.03 }}
                className="rounded-2xl border border-white/20 bg-white/40 dark:bg-black/40 backdrop-blur-md p-6 shadow-lg hover:shadow-2xl transition"
              >
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-zinc-600 dark:text-zinc-300">{f.description}</p>
              </motion.article>
            ))}
          </div>
        </motion.section>

        {/* PROJECTS - carousel */}
        <motion.section className="mb-12" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-2xl font-semibold mb-6">Progetti</h2>
          <ProjectCarousel />
        </motion.section>

        {/* SKILLS */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold mb-6">Competenze</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skills.map((s) => (
              <motion.div key={s.name} whileHover={{ scale: 1.02 }} className="rounded-2xl p-4 bg-white/30 dark:bg-black/40 backdrop-blur-md border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{s.name}</span>
                  <span className="text-sm text-zinc-500">{s.level}%</span>
                </div>

                <div className="w-full bg-white/20 dark:bg-black/20 rounded-full h-4 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.level}%` }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-4 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 shadow-md"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* SMALL FOOTER CTA */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="pt-8 border-t border-zinc-100 dark:border-zinc-800"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">Vuoi collaborare? <span className="font-semibold">Contattami per una chiacchierata.</span></div>
            </div>

            <div className="flex gap-3">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-white font-medium">Scrivimi</Link>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
