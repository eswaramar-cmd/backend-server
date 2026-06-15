import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
}

interface Streak {
  x: number;
  y: number;
  width: number;
  height: number;
  opacity: number;
  speed: number;
  color: string;
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const particles: Particle[] = [];
    const streaks: Streak[] = [];

    const colors = ['#3b82f6', '#06b6d4', '#6366f1', '#8b5cf6', '#22d3ee'];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create initial particles
    for (let i = 0; i < 60; i++) {
      particles.push(createParticle());
    }

    function createParticle(): Particle {
      return {
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + Math.random() * 200,
        size: Math.random() * 2.5 + 0.5,
        speedY: -(Math.random() * 0.6 + 0.2),
        speedX: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 0,
        maxLife: Math.random() * 400 + 200,
      };
    }

    function createStreak(): Streak {
      return {
        x: -300,
        y: Math.random() * window.innerHeight * 0.6,
        width: Math.random() * 200 + 80,
        height: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.3 + 0.1,
        speed: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    }

    // Add streaks occasionally
    let streakTimer = 0;

    function drawBackground() {
      // Deep space background
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Radial gradient blobs
      const blobs = [
        { x: canvas.width * 0.2, y: canvas.height * 0.2, r: canvas.width * 0.35, color: 'rgba(59,130,246,0.12)' },
        { x: canvas.width * 0.8, y: canvas.height * 0.3, r: canvas.width * 0.3, color: 'rgba(6,182,212,0.09)' },
        { x: canvas.width * 0.5, y: canvas.height * 0.8, r: canvas.width * 0.4, color: 'rgba(99,102,241,0.08)' },
        { x: canvas.width * 0.1, y: canvas.height * 0.9, r: canvas.width * 0.25, color: 'rgba(37,99,235,0.07)' },
      ];

      blobs.forEach(blob => {
        const grad = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.r);
        grad.addColorStop(0, blob.color);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      // Grid overlay
      ctx.strokeStyle = 'rgba(59,130,246,0.025)';
      ctx.lineWidth = 1;
      const gridSize = 72;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    }

    function drawParticles() {
      particles.forEach((p, i) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.life++;

        const lifeRatio = p.life / p.maxLife;
        const fadeOpacity = lifeRatio < 0.1
          ? lifeRatio * 10 * p.opacity
          : lifeRatio > 0.8
          ? (1 - lifeRatio) * 5 * p.opacity
          : p.opacity;

        ctx.save();
        ctx.globalAlpha = Math.max(0, fadeOpacity);

        // Glow effect
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        glow.addColorStop(0, p.color);
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Core particle
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        if (p.life >= p.maxLife || p.y < -50) {
          particles[i] = createParticle();
        }
      });
    }

    function drawStreaks() {
      streaks.forEach((s, i) => {
        s.x += s.speed * 4;
        ctx.save();
        ctx.globalAlpha = s.opacity;
        const grad = ctx.createLinearGradient(s.x, s.y, s.x + s.width, s.y);
        grad.addColorStop(0, 'transparent');
        grad.addColorStop(0.3, s.color);
        grad.addColorStop(0.7, s.color);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.save();
        ctx.translate(s.x + s.width / 2, s.y);
        ctx.rotate(-0.15);
        ctx.fillRect(-s.width / 2, -s.height / 2, s.width, s.height);
        ctx.restore();
        ctx.restore();

        if (s.x > canvas.width + 400) {
          streaks.splice(i, 1);
        }
      });
    }

    let frame = 0;
    function animate() {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBackground();
      drawParticles();

      // Add streak every ~8 seconds
      streakTimer++;
      if (streakTimer > 240 && Math.random() < 0.02) {
        streaks.push(createStreak());
        streakTimer = 0;
      }
      drawStreaks();

      animationId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 1 }}
    />
  );
}
