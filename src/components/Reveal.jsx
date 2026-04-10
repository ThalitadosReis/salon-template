import { motion } from "motion/react";

export default function Reveal({
  children,
  delay = 0,
  className = "",
  direction = "up",
}) {
  const y = direction === "up" ? 20 : direction === "down" ? -20 : 0;
  const x = direction === "left" ? 20 : direction === "right" ? -20 : 0;

  const initial = { opacity: 0, y, x };
  const animate = { opacity: 1, y: 0, x: 0 };
  const transition = { type: "spring", stiffness: 72, damping: 18, delay };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "-48px" }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
