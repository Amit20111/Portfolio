import { PROJECTS } from "../data/index";
import { FadeIn, Card, Btn, Tag, SectionLabel, Divider } from "../components/UI";

// ── Marquee Project Card (compact, for scrolling strip) ──────────────────────
function MarqueeCard({ p, t, navigate }) {
  return (
    <div
      onClick={() => navigate(`/projects/${p.id}`)}
      style={{
        background: "#ffffff",
        border: `1px solid ${t.border}`,
        borderRadius: 12,
        padding: "20px 24px",
        minWidth: 320,
        maxWidth: 360,
        cursor: "pointer",
        transition: "all 0.25s ease",
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,0.08)";
        e.currentTarget.style.borderColor = t.borderHover;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = t.border;
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontSize: 12, color: t.muted, fontWeight: 500 }}>{p.category}</span>
        <span style={{ fontSize: 12, color: t.muted }}>{p.year}</span>
      </div>
      <h3
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 17,
          color: t.text,
          marginBottom: 6,
          fontWeight: 600,
        }}
      >
        {p.title}
      </h3>
      <p
        style={{
          fontSize: 13,
          color: t.muted,
          lineHeight: 1.6,
          marginBottom: 12,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {p.desc}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
        {p.tags.slice(0, 3).map((tag) => (
          <Tag key={tag} label={tag} t={t} />
        ))}
        {p.tags.length > 3 && <Tag label={`+${p.tags.length - 3}`} t={t} />}
      </div>
    </div>
  );
}

export default function HomePage({ t, navigate }) {
  // Duplicate projects for seamless infinite scroll
  const allProjects = [...PROJECTS, ...PROJECTS];

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
        }}
      >
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
                background: t.tagBg,
                border: `1px solid ${t.border}`,
                borderRadius: 999,
                padding: "5px 16px",
                fontSize: 13,
                color: t.muted,
                marginBottom: 24,
                fontWeight: 500,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  background: t.greenText,
                  borderRadius: "50%",
                }}
              />
              Open to Opportunities
            </div>

            <h1
              style={{
                animation: "fadeUp 0.6s ease 0.15s both",
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(36px, 5vw, 60px)",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: -2,
                marginBottom: 12,
                color: t.text,
              }}
            >
              Amit Chakraborty
            </h1>

            <div
              style={{
                animation: "fadeUp 0.6s ease 0.25s both",
                fontSize: 17,
                color: t.muted,
                fontWeight: 500,
                marginBottom: 20,
              }}
            >
              AI & LLM Researcher
            </div>

            <p
              style={{
                animation: "fadeUp 0.6s ease 0.35s both",
                color: t.muted,
                maxWidth: 470,
                marginBottom: 34,
                lineHeight: 1.75,
                fontSize: 16,
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
                width: 280,
                height: 280,
                borderRadius: "50%",
                border: `1px solid ${t.border}`,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
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
                    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:8px;padding:16px;text-align:center;background:#f5f0ea;">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#6b6560" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                    </div>
                  `;
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <Divider t={t} />

      {/* ── SCROLLING PROJECTS MARQUEE ── */}
      <section style={{ padding: "64px 0" }}>
        <FadeIn>
          <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 64px", marginBottom: 32 }}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 16,
              }}
            >
              <div>
                <SectionLabel label="Projects" t={t} />
                <h2
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "clamp(22px, 3vw, 32px)",
                    fontWeight: 700,
                    color: t.text,
                  }}
                >
                  What I've Built
                </h2>
              </div>
              <Btn onClick={() => navigate("/projects")} variant="outline" t={t}>
                View All →
              </Btn>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="marquee-container">
            <div className="marquee-track">
              {allProjects.map((p, i) => (
                <MarqueeCard key={`${p.id}-${i}`} p={p} t={t} navigate={navigate} />
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      <Divider t={t} />

      {/* ── CTA ── */}
      <section style={{ padding: "80px 64px", textAlign: "center" }}>
        <FadeIn>
          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(24px, 3vw, 36px)",
              fontWeight: 700,
              color: t.text,
              marginBottom: 14,
            }}
          >
            Interested in collaborating?
          </h2>
          <p style={{ color: t.muted, marginBottom: 32, maxWidth: 420, margin: "0 auto 32px", fontSize: 16, lineHeight: 1.7 }}>
            I'm seeking research opportunities and open-source collaborations.
          </p>
          <Btn
            onClick={() => navigate("/contact")}
            variant="primary"
            t={t}
            style={{ fontSize: 15, padding: "13px 32px" }}
          >
            Let's Talk →
          </Btn>
        </FadeIn>
      </section>
    </div>
  );
}
