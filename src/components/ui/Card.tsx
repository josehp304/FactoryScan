"use client";
import React from "react";
import { motion, HTMLMotionProps, useMotionValue, useMotionTemplate } from "framer-motion";
import styles from "./Card.module.css";
import { cn } from "@/lib/utils";

export interface CardProps extends Omit<HTMLMotionProps<"div">, "ref" | "children"> {
  children?: React.ReactNode;
  hoverEffect?: boolean;
  glowColor?: string;
  glass?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverEffect = false, glass = true, glowColor, children, onMouseMove, style, ...props }, ref) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
      if (onMouseMove) onMouseMove(e);
    };

    return (
      <motion.div
        ref={ref}
        className={cn(styles.card, glass && styles.glass, hoverEffect && styles.hoverEffect, className)}
        whileHover={hoverEffect ? { y: -4, transition: { duration: 0.2 } } : {}}
        onMouseMove={hoverEffect ? handleMouseMove : onMouseMove}
        style={{
          "--mouse-x": useMotionTemplate`${mouseX}px`,
          "--mouse-y": useMotionTemplate`${mouseY}px`,
          "--glow": glowColor || "var(--primary)",
          ...style,
        } as any}
        {...props}
      >
        <div className={styles.inner}>{children}</div>
      </motion.div>
    );
  }
);
Card.displayName = "Card";
