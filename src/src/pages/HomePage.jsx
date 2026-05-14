import { PROJECTS } from "../data/index";
import { FadeIn, Card, Btn, Tag, SectionLabel, Divider } from "../components/UI";

export default function HomePage({ t, navigate }) {
  return (
    <div>
      {/* ── HERO ── */}
      <section
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
        {/* Background glows */}
        <div
          style={{
            position: "absolute", top: -200, left: "38%",
            width: 650, height: 650,
            background: `radial-gradient(circle, ${t.heroGlow} 0%, transparent 68%)`,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute", bottom: -80, right: "8%",
            width: 420, height: 420,
            background: `radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: 900, width: "100%",
            display: "flex", flexWrap: "wrap",
            gap: 60, alignItems: "center", justifyContent: "space-between",
          }}
        >
          {/* Left content */}
          <div style={{ flex: "1 1 360px" }}>
            <div
              style={{
                animation: "fadeUp 0.6s ease 0.05s both",
                display: "inline-flex", alignItems: "center", gap: 8,
                background: t.tagBg, border: `1px solid ${t.border}`,
                borderRadius: 999, padding: "5px 16px",
                fontSize: 13, color: t.accent2, marginBottom: 22,
              }}
            >
              <span style={{ width: 6, height: 6, background: "#22c55e", borderRadius: "50%" }} />
              Open to Opportunities
            </div>

            <h1
              style={{
                animation: "fadeUp 0.6s ease 0.15s both",
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(36px, 5vw, 60px)",
                fontWeight: 800, lineHeight: 1.05,
                letterSpacing: -2, marginBottom: 12,
                background: t.gradientText,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Amit Chakraborty
            </h1>

            <div
              style={{
                animation: "fadeUp 0.6s ease 0.25s both",
                fontSize: 17, color: t.accent, fontWeight: 500, marginBottom: 16,
              }}
            >
              AI & LLM Researcher
            </div>

            <p
              style={{
                animation: "fadeUp 0.6s ease 0.35s both",
                color: t.muted, maxWidth: 470, marginBottom: 34,
                lineHeight: 1.75, fontSize: 15,
              }}
            >
              Computer Science graduate from North South University with expertise in
              Large Language Models and Applied AI. Passionate about building intelligent
              systems that bring research into real-world impact.
            </p>

            <div
              style={{
                animation: "fadeUp 0.6s ease 0.45s both",
                display: "flex", gap: 12, flexWrap: "wrap",
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

          {/* Avatar */}
          <div style={{ animation: "fadeUp 0.6s ease 0.3s both", flexShrink: 0 }}>
            <img
              src="/avatar.jpg"
              alt="Amit Chakraborty"
              style={{
                width: 220, height: 220, borderRadius: "50%",
                objectFit: "cover",
                border: `3px solid ${t.border}`, background: t.surface,
                boxShadow: `0 0 40px ${t.heroGlow}`,
              }}
            />
          </div>
        </div>
      </section>

      <Divider t={t} />


      {/* ── FEATURED PROJECTS ── */}
      <section style={{ padding: "72px 64px", maxWidth: 960, margin: "0 auto" }}>
        <FadeIn>
          <div
            style={{
              display: "flex", alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: 40, flexWrap: "wrap", gap: 16,
            }}
          >
            <div>
              <SectionLabel label="Featured Work" t={t} />
              <h2
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(22px, 3vw, 34px)",
                  fontWeight: 700, color: t.text,
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

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
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
                      fontSize: 11, padding: "3px 10px",
                      background: t.featuredBg, border: `1px solid ${t.featuredBorder}`,
                      borderRadius: 999, color: t.featuredText,
                    }}
                  >
                    Featured
                  </span>
                  <span style={{ fontSize: 12, color: t.muted }}>{p.year}</span>
                </div>
                <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 17, color: t.text, marginBottom: 5 }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: 12, color: t.accent, marginBottom: 10 }}>{p.category}</p>
                <p style={{ fontSize: 13, color: t.muted, lineHeight: 1.65, flexGrow: 1 }}>{p.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14 }}>
                  {p.tags.slice(0, 3).map((tag) => <Tag key={tag} label={tag} t={t} />)}
                  {p.tags.length > 3 && <Tag label={`+${p.tags.length - 3}`} t={t} />}
                </div>
                <div style={{ marginTop: 14, fontSize: 13, color: t.accent, fontWeight: 500 }}>
                  View details →
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </section>

      <Divider t={t} />

      {/* ── CTA ── */}
      <section style={{ padding: "80px 64px", textAlign: "center" }}>
        <FadeIn>
          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(24px, 3vw, 38px)",
              fontWeight: 700, color: t.text, marginBottom: 14,
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
    </div >
  );
}
