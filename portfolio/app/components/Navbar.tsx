"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();


  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onClick(e: MouseEvent) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    function onScroll() {
      setScrolled(window.scrollY > 8);
    }

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    window.addEventListener("scroll", onScroll, { passive: true });

    onScroll();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="fixed top-6 left-0 right-0 z-50"
      aria-label="Main navigation"
    >
      <div className="mx-4 max-w-7xl mx-auto rounded-3xl overflow-hidden">
        <div className={`w-full backdrop-blur-md transition-colors duration-300 border border-default ${scrolled ? "glass-card shadow-2xl" : "glass-card shadow-md"}`}>
          <div className="flex items-center justify-between px-6 py-4 md:py-5">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 shadow-lg flex items-center justify-center text-white font-semibold text-lg md:text-xl">IT</div>
              <span className="text-lg md:text-2xl font-semibold tracking-tight">Francesco Maria Gragnaniello</span>
            </div>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8 relative">
              {links.map((l) => {
                const active = pathname === l.href;
                return (
                  <Link key={l.href} href={l.href} className="relative group">
                    <motion.span
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.18 }}
                      className={`inline-block px-4 py-2 text-lg font-medium transition-colors duration-200 ${active ? "text-accent" : "text-primary"}`}
                    >
                      {l.label}
                    </motion.span>
                    <motion.span
                      layout
                      initial={false}
                      animate={{ scaleX: active ? 1 : 0 }}
                      style={{ transformOrigin: "left" }}
                      transition={{ duration: 0.28 }}
                      className="absolute left-4 -bottom-0.5 h-1 w-[calc(100%-2rem)] bg-accent rounded"
                    />
                  </Link>
                );
              })}

              <motion.a
                href="#"
                whileHover={{ scale: 1.04 }}
                className="ml-4 inline-flex items-center gap-3 rounded-full btn-accent px-5 py-2 text-white text-sm font-semibold shadow-lg"
              >
                Get in touch
              </motion.a>
            </div>

            {/* Mobile button */}
            <div className="md:hidden">
              <motion.button
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Chiudi menu" : "Apri menu"}
                onClick={() => setOpen((v) => !v)}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center justify-center p-3 rounded-lg bg-white/30 dark:bg-black/30 backdrop-blur-sm border border-white/20 dark:border-black/20 shadow-sm"
              >
                <motion.svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-transform duration-300 ${open ? "rotate-90" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {open ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </motion.svg>
              </motion.button>
            </div>
          </div>

          {/* Mobile panel */}
          <AnimatePresence>
            {open && (
              <motion.div
                ref={menuRef}
                id="mobile-menu"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28 }}
                className="md:hidden overflow-hidden"
              >
                <div className="px-5 pb-5 pt-3 space-y-2 bg-subtle border-t border-default backdrop-blur-md">
                  {links.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-md px-3 py-3 text-base font-medium text-primary hover:bg-subtle transition"
                    >
                      {l.label}
                    </Link>
                  ))}

                  <a href="#" className="block mt-1 rounded-md px-4 py-3 text-center btn-accent">Get in touch</a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
}
