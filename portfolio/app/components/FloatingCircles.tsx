"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function FloatingCircles() {
  const shouldReduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const common = {
    style: {
      position: "absolute" as const,
      borderRadius: "9999px",
      mixBlendMode: "screen" as const,
      filter: "blur(56px)",
      opacity: 0.6,
    },
  };

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* large rotating gradient ring */}
      <motion.div
        {...common}
        animate={shouldReduce ? undefined : { rotate: [0, 360] }}
        transition={shouldReduce ? undefined : { repeat: Infinity, duration: 40, ease: "linear" }}
        style={{ ...common.style, width: 720, height: 720, left: "-12%", top: "-18%", background: "radial-gradient(circle at 30% 30%, rgba(79,70,229,0.14), transparent 35%), radial-gradient(circle at 70% 70%, rgba(236,72,153,0.06), transparent 30%)" }}
      />

      {/* medium floating accent */}
      <motion.div
        {...common}
        animate={shouldReduce ? undefined : { y: [0, 18, 0], x: [0, 8, 0], rotate: [0, 8, 0] }}
        transition={shouldReduce ? undefined : { duration: 14, repeat: Infinity, ease: "easeInOut" }}
        style={{ ...common.style, width: 420, height: 420, right: "-6%", bottom: "-10%", background: "radial-gradient(circle at 20% 30%, rgba(79,70,229,0.12), transparent 40%), radial-gradient(circle at 80% 70%, rgba(99,102,241,0.06), transparent 30%)" }}
      />

      {/* subtle circular glow near center */}
      <motion.div
        {...common}
        animate={shouldReduce ? undefined : { scale: [1, 1.06, 1] }}
        transition={shouldReduce ? undefined : { duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{ ...common.style, width: 540, height: 540, left: "50%", top: "28%", marginLeft: -270, background: "radial-gradient(circle at 40% 40%, rgba(99,102,241,0.06), rgba(79,70,229,0.03) 30%, transparent 60%)" }}
      />
    </div>
  );
}
