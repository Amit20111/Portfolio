import { useEffect, useRef } from "react";
import { PROJECTS } from "../data/index";
import { FadeIn, Card, Btn, Tag, SectionLabel, Divider } from "../components/UI";

// ── Advanced Neural Network Visualization ─────────────────────────────────────
function NeuralNetBg() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let nodes = [];
    let packets = [];
    let time = 0;

    // Color palette
    const CYAN = { r: 0, g: 245, b: 255 };
    const VIOLET = { r: 123, g: 97, b: 255 };
    const BLUE = { r: 30, g: 80, b: 220 };

    const lerp = (a, b, t) => a + (b - a) * t;
    const lerpColor = (c1, c2, t) => ({
      r: Math.round(lerp(c1.r, c2.r, t)),
      g: Math.round(lerp(c1.g, c2.g, t)),
      b: Math.round(lerp(c1.b, c2.b, t)),
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.parentElement.offsetWidth;
      const h = canvas.parentElement.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const w = () => canvas.parentElement.offsetWidth;
    const h = () => canvas.parentElement.offsetHeight;

    const initNodes = () => {
      // Dense brain-shaped distribution: more nodes concentrated in upper-center
      const count = Math.min(Math.floor((w() * h()) / 7000), 140);
      const cx = w() * 0.5, cy = h() * 0.42;
      nodes = Array.from({ length: count }, () => {
        const depth = Math.random();
        // 60% of nodes cluster toward brain center, 40% scatter everywhere
        const brainNode = Math.random() < 0.6;
        const angle = Math.random() * Math.PI * 2;
        const rad = brainNode ? Math.random() * Math.min(w(), h()) * 0.35 : Math.random() * Math.max(w(), h()) * 0.6;
        const x = brainNode ? cx + Math.cos(angle) * rad * 1.3 : Math.random() * w();
        const y = brainNode ? cy + Math.sin(angle) * rad * 0.8 : Math.random() * h();
        return {
          x, y,
          vx: (Math.random() - 0.5) * (0.1 + depth * 0.3),
          vy: (Math.random() - 0.5) * (0.1 + depth * 0.3),
          depth,
          r: 0.8 + depth * 2.8,
          pulse: Math.random() * Math.PI * 2,
          color: Math.random() > 0.35 ? CYAN : (Math.random() > 0.45 ? VIOLET : BLUE),
        };
      });
      packets = [];
    };

    // Spawn data packet along a connection
    const spawnPacket = (from, to) => {
      const col = Math.random() > 0.4 ? CYAN : (Math.random() > 0.5 ? VIOLET : BLUE);
      packets.push({
        fromX: from.x, fromY: from.y,
        toX: to.x, toY: to.y,
        progress: 0,
        speed: 0.012 + Math.random() * 0.018,
        color: col,
        size: 1.8 + Math.random() * 2,
        trail: [],
      });
    };

    // Draw subtle background grid
    const drawGrid = () => {
      const spacing = 60;
      const opacity = 0.018 + Math.sin(time * 0.3) * 0.005;
      ctx.strokeStyle = `rgba(0, 245, 255, ${opacity})`;
      ctx.lineWidth = 0.5;

      for (let x = 0; x < w(); x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h());
        ctx.stroke();
      }
      for (let y = 0; y < h(); y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w(), y);
        ctx.stroke();
      }

      // Grid intersection dots
      ctx.fillStyle = `rgba(0, 245, 255, ${0.04 + Math.sin(time * 0.5) * 0.015})`;
      for (let x = 0; x < w(); x += spacing) {
        for (let y = 0; y < h(); y += spacing) {
          ctx.beginPath();
          ctx.arc(x, y, 0.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    // Draw holographic interface elements
    const drawHoloElements = () => {
      const cx = w() * 0.75;
      const cy = h() * 0.45;

      // Rotating arc 1
      const a1 = time * 0.15;
      ctx.beginPath();
      ctx.arc(cx, cy, 160, a1, a1 + 1.2);
      ctx.strokeStyle = `rgba(0, 245, 255, 0.06)`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Rotating arc 2 (opposite, violet)
      const a2 = -time * 0.1 + Math.PI;
      ctx.beginPath();
      ctx.arc(cx, cy, 140, a2, a2 + 0.8);
      ctx.strokeStyle = `rgba(123, 97, 255, 0.05)`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Rotating arc 3
      const a3 = time * 0.08;
      ctx.beginPath();
      ctx.arc(cx, cy, 190, a3, a3 + 0.5);
      ctx.strokeStyle = `rgba(0, 245, 255, 0.035)`;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Corner brackets (holographic UI feel)
      const bracketSize = 12;
      const bracketOpacity = 0.06 + Math.sin(time * 0.4) * 0.02;
      ctx.strokeStyle = `rgba(0, 245, 255, ${bracketOpacity})`;
      ctx.lineWidth = 1;

      // Top-left corner bracket
      const tlx = 40, tly = 80;
      ctx.beginPath();
      ctx.moveTo(tlx, tly + bracketSize);
      ctx.lineTo(tlx, tly);
      ctx.lineTo(tlx + bracketSize, tly);
      ctx.stroke();

      // Top-right
      const trx = w() - 40, trY = 80;
      ctx.beginPath();
      ctx.moveTo(trx - bracketSize, trY);
      ctx.lineTo(trx, trY);
      ctx.lineTo(trx, trY + bracketSize);
      ctx.stroke();

      // Bottom-left
      const blx = 40, bly = h() - 40;
      ctx.beginPath();
      ctx.moveTo(blx, bly - bracketSize);
      ctx.lineTo(blx, bly);
      ctx.lineTo(blx + bracketSize, bly);
      ctx.stroke();

      // Bottom-right
      const brx = w() - 40, bry = h() - 40;
      ctx.beginPath();
      ctx.moveTo(brx - bracketSize, bry);
      ctx.lineTo(brx, bry);
      ctx.lineTo(brx, bry - bracketSize);
      ctx.stroke();
    };

    const CONNECT_DIST = 180;

    const draw = () => {
      time += 0.016;
      ctx.clearRect(0, 0, w(), h());

      // Grid
      drawGrid();

      // Connections + spawn packets
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const avgDepth = (nodes[i].depth + nodes[j].depth) / 2;

          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * (0.03 + avgDepth * 0.06);
            const col = lerpColor(BLUE, CYAN, avgDepth);

            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(${col.r}, ${col.g}, ${col.b}, ${alpha})`;
            ctx.lineWidth = 0.4 + avgDepth * 0.6;
            ctx.stroke();

            // Frequently spawn data packets for dense data-flow effect
            if (Math.random() < 0.002 && packets.length < 60) {
              spawnPacket(nodes[i], nodes[j]);
            }
          }
        }
      }

      // Data packets
      packets = packets.filter((p) => {
        p.progress += p.speed;
        if (p.progress >= 1) return false;

        const x = lerp(p.fromX, p.toX, p.progress);
        const y = lerp(p.fromY, p.toY, p.progress);

        // Glow
        const grd = ctx.createRadialGradient(x, y, 0, x, y, p.size * 4);
        grd.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0.4)`);
        grd.addColorStop(1, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0)`);
        ctx.fillStyle = grd;
        ctx.fillRect(x - p.size * 4, y - p.size * 4, p.size * 8, p.size * 8);

        // Core dot
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0.9)`;
        ctx.fill();

        return true;
      });

      // Nodes with glow + pulsing
      nodes.forEach((n) => {
        n.pulse += 0.02;
        const pulseScale = 1 + Math.sin(n.pulse) * 0.3;
        const r = n.r * pulseScale;
        const alpha = 0.15 + n.depth * 0.35;

        // Outer glow
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 5);
        grd.addColorStop(0, `rgba(${n.color.r}, ${n.color.g}, ${n.color.b}, ${alpha * 0.3})`);
        grd.addColorStop(1, `rgba(${n.color.r}, ${n.color.g}, ${n.color.b}, 0)`);
        ctx.fillStyle = grd;
        ctx.fillRect(n.x - r * 5, n.y - r * 5, r * 10, r * 10);

        // Core
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${n.color.r}, ${n.color.g}, ${n.color.b}, ${alpha})`;
        ctx.fill();

        // Bright center for near nodes
        if (n.depth > 0.7) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, r * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${0.3 * pulseScale})`;
          ctx.fill();
        }

        // Move with smooth boundary reflection
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20 || n.x > w() + 20) n.vx *= -1;
        if (n.y < -20 || n.y > h() + 20) n.vy *= -1;
      });

      // Holographic UI elements
      drawHoloElements();

      animId = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      resize();
      initNodes();
    };

    resize();
    initNodes();
    draw();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}

export default function HomePage({ t, navigate }) {
  return (
    <div>
      {/* ── HERO ── */}
      <section
        className="hero-section"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 64px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Neural network background */}
        <NeuralNetBg />

        {/* Scan line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: `linear-gradient(90deg, transparent, ${t.accent}44, transparent)`,
            animation: "scanLine 8s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />

        {/* Radial glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            height: 800,
            background: `radial-gradient(circle, ${t.heroGlow} 0%, transparent 60%)`,
            pointerEvents: "none",
          }}
        />

        <div
          className="hero-content"
          style={{
            maxWidth: 960,
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            gap: 60,
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Left content */}
          <div style={{ flex: "1 1 380px" }}>
            {/* Status badge */}
            <div
              style={{
                animation: "fadeUp 0.6s ease 0.05s both",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: t.surface,
                backdropFilter: "blur(8px)",
                border: `1px solid ${t.border}`,
                borderRadius: 999,
                padding: "5px 16px",
                fontSize: 12,
                color: t.accent,
                marginBottom: 22,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  background: t.greenText,
                  borderRadius: "50%",
                  animation: "pulseGlowDot 2s ease-in-out infinite",
                }}
              />
              Open to Opportunities
            </div>

            <h1
              style={{
                animation: "fadeUp 0.6s ease 0.15s both",
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(36px, 5vw, 64px)",
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: -2,
                marginBottom: 12,
                backgroundImage: t.gradientText,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}
            >
              Amit Chakraborty
            </h1>

            <div
              style={{
                animation: "fadeUp 0.6s ease 0.25s both",
                fontSize: 16,
                color: t.accent,
                fontWeight: 500,
                marginBottom: 16,
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: 1,
              }}
            >
              {">"} AI & LLM Researcher_
            </div>

            <p
              style={{
                animation: "fadeUp 0.6s ease 0.35s both",
                color: "#8DA2BE",
                maxWidth: 470,
                marginBottom: 34,
                lineHeight: 1.75,
                fontSize: 15,
              }}
            >
              Computer Science graduate from North South University with expertise in
              Large Language Models and Applied AI. Passionate about building intelligent
              systems that bring research into real-world impact.
            </p>

            <div
              style={{
                animation: "fadeUp 0.6s ease 0.45s both",
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <Btn onClick={() => navigate("/projects")} variant="primary" t={t}>
                Explore Projects →
              </Btn>
              <Btn onClick={() => navigate("/contact")} variant="outline" t={t}>
                Get In Touch
              </Btn>
            </div>
          </div>

          {/* Profile Image */}
          <div style={{ animation: "fadeUp 0.6s ease 0.3s both", flexShrink: 0 }}>
            <div
              style={{
                width: 300,
                height: 300,
                borderRadius: "50%",
                border: `3px solid ${t.accent}44`,
                background: t.surface,
                backdropFilter: "blur(8px)",
                boxShadow: `${t.neonGlow}, inset 0 0 30px rgba(0, 245, 255, 0.05)`,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                animation: "pulseGlow 4s ease-in-out infinite",
              }}
            >
              <img
                src="/Myprofiel_fb.jpg"
                alt="Amit Chakraborty"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentNode.innerHTML = `
                    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:8px;padding:16px;text-align:center;">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="${t.accent}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                      <span style="font-size:11px;color:${t.muted};line-height:1.3;font-family:JetBrains Mono,monospace;">Place photo at<br/><code>public/avatar.jpg</code></span>
                    </div>
                  `;
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <Divider t={t} />

      {/* ── FEATURED PROJECTS ── */}
      <section style={{ padding: "72px 64px", maxWidth: 960, margin: "0 auto" }}>
        <FadeIn>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: 40,
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div>
              <SectionLabel label="Featured Work" t={t} />
              <h2
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(22px, 3vw, 34px)",
                  fontWeight: 700,
                  color: t.text,
                }}
              >
                Recent Projects
              </h2>
            </div>
            <Btn onClick={() => navigate("/projects")} variant="outline" t={t}>
              View All →
            </Btn>
          </div>
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {PROJECTS.filter((p) => p.featured).map((p, i) => (
            <FadeIn key={p.id} delay={i * 0.1}>
              <Card
                t={t}
                onClick={() => navigate(`/projects/${p.id}`)}
                style={{ height: "100%", display: "flex", flexDirection: "column" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <span
                    style={{
                      fontSize: 10,
                      padding: "3px 10px",
                      background: t.featuredBg,
                      border: `1px solid ${t.featuredBorder}`,
                      borderRadius: 999,
                      color: t.featuredText,
                      fontFamily: "'JetBrains Mono', monospace",
                      letterSpacing: 1,
                    }}
                  >
                    FEATURED
                  </span>
                  <span style={{ fontSize: 12, color: t.muted, fontFamily: "'JetBrains Mono', monospace" }}>
                    {p.year}
                  </span>
                </div>
                <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 17, color: t.text, marginBottom: 5 }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: 12, color: t.accent, marginBottom: 10, fontFamily: "'JetBrains Mono', monospace" }}>
                  {p.category}
                </p>
                <p style={{ fontSize: 13, color: t.muted, lineHeight: 1.65, flexGrow: 1 }}>
                  {p.desc}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14 }}>
                  {p.tags.slice(0, 3).map((tag) => (
                    <Tag key={tag} label={tag} t={t} />
                  ))}
                  {p.tags.length > 3 && <Tag label={`+${p.tags.length - 3}`} t={t} />}
                </div>
                <div
                  style={{
                    marginTop: 14,
                    fontSize: 13,
                    color: t.accent,
                    fontWeight: 500,
                  }}
                >
                  View details →
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </section>

      <Divider t={t} />

      {/* ── CTA ── */}
      <section style={{ padding: "80px 64px", textAlign: "center", position: "relative" }}>
        <FadeIn>
          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(24px, 3vw, 38px)",
              fontWeight: 700,
              color: t.text,
              marginBottom: 14,
            }}
          >
            Interested in collaborating?
          </h2>
          <p style={{ color: t.muted, marginBottom: 32, maxWidth: 380, margin: "0 auto 32px" }}>
            I'm seeking research opportunities and open-source collaborations.
          </p>
          <Btn
            onClick={() => navigate("/contact")}
            variant="primary"
            t={t}
            style={{ fontSize: 15, padding: "13px 32px" }}
          >
            Let's Talk
          </Btn>
        </FadeIn>
      </section>
    </div>
  );
}
