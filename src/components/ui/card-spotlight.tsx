"use client";

import {
  useMotionValue,
  motion,
  useMotionTemplate,
} from "motion/react";
import React, {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
  MouseEvent as ReactMouseEvent,
} from "react";
import { CanvasRevealEffect } from "./canvas-reveal-effect";
import { cn } from "../../../libs/utils";

export const CardSpotlight = forwardRef<
  HTMLDivElement,
  {
    radius?: number;
    color?: string;
    children: React.ReactNode;
  } & React.HTMLAttributes<HTMLDivElement>
>(({ children, radius = 350, color = "#262626", className, ...props }, ref) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const localRef = useRef<HTMLDivElement>(null);

  // Attach the internal ref to the forwarded ref
  useImperativeHandle(ref, () => localRef.current!, []);

  const [isHovering, setIsHovering] = useState(false);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: ReactMouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  return (
    <div
      ref={localRef}
      className={cn(
        "group/spotlight p-10 rounded-md relative border border-neutral-800 bg-black",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <motion.div
        className="pointer-events-none absolute z-0 -inset-px rounded-md opacity-0 transition duration-300 group-hover/spotlight:opacity-100"
        style={{
          backgroundColor: "rgba(243, 238, 238, 0.1)",
          maskImage: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              white,
              transparent 90%
            )
          `,
        }}
      >
        {isHovering && (
          <CanvasRevealEffect
            animationSpeed={5}
            containerClassName="bg-transparent absolute inset-0 pointer-events-none"
            colors={[
              [59, 130, 246],
              [139, 92, 246],
            ]}
            dotSize={3}
          />
        )}
      </motion.div>
      {children}
    </div>
  );
});

CardSpotlight.displayName = "CardSpotlight";
