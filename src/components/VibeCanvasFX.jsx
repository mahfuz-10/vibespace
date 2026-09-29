import React, { useEffect, useRef } from "react";

export const VibeCanvasFX = ({ environment = "Rainy Window" }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Responsive resize handler
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Environment specific configurations
    const isMobile = width < 768;
    const isRain = environment === "Rainy Window";
    const isFire = environment === "Fireplace";
    const isOcean = environment === "Ocean";
    const isCity = environment === "Midnight City";
    const isForest = environment === "Forest Cabin";

    // Optimized particle count for performance on mobile
    const baseCount = isRain ? 60 : 35;
    const count = isMobile ? Math.floor(baseCount * 0.55) : baseCount;

    const particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: Math.random() * 18 + 8,
        speedX: isRain ? -0.7 : (Math.random() - 0.5) * 0.4,
        speedY: isRain
          ? Math.random() * 6 + 10
          : isFire
          ? -(Math.random() * 1.4 + 0.6)
          : (Math.random() - 0.5) * 0.35,
        size: isFire ? Math.random() * 2 + 1 : Math.random() * 1.8 + 0.8,
        opacity: Math.random() * 0.45 + 0.15,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        ctx.beginPath();

        if (isRain) {
          // Falling raindrops
          ctx.strokeStyle = `rgba(180, 210, 215, ${p.opacity * 0.35})`;
          ctx.lineWidth = 1;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.speedX * 2, p.y + p.length);
          ctx.stroke();
        } else if (isFire) {
          // Rising embers / sparks
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(235, 155, 90, ${p.opacity * 0.65})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = "rgba(220, 140, 80, 0.45)";
          ctx.fill();
        } else {
          // Ambient floating dust particles / bokeh
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          const color = isOcean
            ? "135, 190, 200"
            : isCity
            ? "165, 180, 220"
            : isForest
            ? "155, 185, 145"
            : "214, 184, 135";
          ctx.fillStyle = `rgba(${color}, ${p.opacity * 0.35})`;
          ctx.fill();
        }

        // Update position
        p.x += p.speedX;
        p.y += p.speedY;

        // Reset boundaries smoothly
        if (isRain && p.y > height) {
          p.y = -20;
          p.x = Math.random() * width;
        } else if (isFire && p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        } else {
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [environment]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] opacity-75"
    />
  );
};

export default VibeCanvasFX;