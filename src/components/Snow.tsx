"use client";

import { useEffect, useRef } from "react";

interface Snowflake {
  x: number;
  y: number;
  radius: number;
  speed: number;
  drift: number;
  opacity: number;
}

export default function Snow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let flakes: Snowflake[] = [];

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function createFlakes() {
      const count = Math.floor((window.innerWidth * window.innerHeight) / 8000);
      flakes = Array.from({ length: Math.min(count, 120) }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: Math.random() * 2.5 + 0.8,
        speed: Math.random() * 0.6 + 0.2,
        drift: Math.random() * 0.4 - 0.2,
        opacity: Math.random() * 0.5 + 0.2,
      }));
    }

    function animate() {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const flake of flakes) {
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
        ctx.fill();

        flake.y += flake.speed;
        flake.x += flake.drift + Math.sin(flake.y * 0.01) * 0.3;

        if (flake.y > canvas.height + 5) {
          flake.y = -5;
          flake.x = Math.random() * canvas.width;
        }
        if (flake.x > canvas.width + 5) flake.x = -5;
        if (flake.x < -5) flake.x = canvas.width + 5;
      }

      animationId = requestAnimationFrame(animate);
    }

    function handleResize() {
      resize();
      createFlakes();
    }

    handleResize();
    animate();

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10"
      aria-hidden="true"
    />
  );
}
