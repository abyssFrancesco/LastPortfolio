"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  // Start with server-friendly default (dark) to avoid hydration mismatch.
  const [isDark, setIsDark] = useState<boolean>(true);

  // On mount, read persisted preference and apply it. Do not run this on server.
  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved) {
        const wantDark = saved === "dark";
        if (wantDark !== isDark) setIsDark(wantDark);
      }
    } catch {}
  }, []);

  // Apply class and persist whenever `isDark` changes (runs on client only).
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      root.classList.remove("light");
      root.style.setProperty("--page-bg", "#020617");
      root.style.setProperty("--surface-bg", "#020617");
      root.style.setProperty("--subtle-bg", "#020617");
      root.style.setProperty("--text-primary-token", "#F8FAFC");
      root.style.setProperty("--text-secondary-token", "#CBD5E1");
      root.style.setProperty("--text-muted-token", "#94A3B8");
      root.style.setProperty("--border-token", "#1E293B");
      root.style.setProperty("--accent-token", "#818CF8");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
      root.style.setProperty("--page-bg", "#F8FAFC");
      root.style.setProperty("--surface-bg", "#FFFFFF");
      root.style.setProperty("--subtle-bg", "#F1F5F9");
      root.style.setProperty("--text-primary-token", "#0F172A");
      root.style.setProperty("--text-secondary-token", "#475569");
      root.style.setProperty("--text-muted-token", "#64748B");
      root.style.setProperty("--border-token", "#E2E8F0");
      root.style.setProperty("--accent-token", "#4F46E5");
    }
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {}
  }, [isDark]);

  return (
    <motion.button
      aria-pressed={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setIsDark((v) => !v)}
      whileTap={{ scale: 0.94 }}
      whileHover={{ scale: 1.03 }}
      className="inline-flex items-center justify-center p-2 rounded-full border border-default bg-white/30 dark:bg-black/30 backdrop-blur-sm shadow-sm"
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.svg key="moon" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor" initial={{ opacity: 0, rotate: -10 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 10 }} transition={{ type: "spring", stiffness: 260 }}>
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
          </motion.svg>
        ) : (
          <motion.svg key="sun" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 24 24" fill="currentColor" initial={{ opacity: 0, rotate: 10 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -10 }} transition={{ type: "spring", stiffness: 260 }}>
            <path d="M6.76 4.84l-1.8-1.79L3.17 5.03l1.79 1.79 1.8-2zM1 13h2v-2H1v2zm10 9h2v-2h-2v2zm9-9h2v-2h-2v2zM6.76 19.16l-1.79 1.79 1.79 1.79 1.8-1.79-1.8-1.79zM17.24 4.84l1.8-1.79L20.83 5.03l-1.79 1.79-1.8-2zM12 7a5 5 0 100 10 5 5 0 000-10z" />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
