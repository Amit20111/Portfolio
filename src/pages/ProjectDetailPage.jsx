import { PROJECTS } from "../data/index";
import { FadeIn, Card, Btn, Tag } from "../components/UI";

export default function ProjectDetailPage({ t, navigate, projectId }) {
  const project = PROJECTS.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div style={{ padding: "120px 64px", textAlign: "center" }}>
        <p style={{ color: t.muted, marginBottom: 24 }}>Project not found.</p>
        <Btn onClick={() => navigate("/projects")} variant="primary" t={t}>
          ← Back to Projects
        </Btn>
      </div>
    );
  }

  return (
    <div className="page-pad" style={{ padding: "120px 64px 80px", maxWidth: 820, margin: "0 auto" }}>
      {/* Back button */}
      <FadeIn>
        <button
          onClick={() => navigate("/projects")}
          style={{
            background: "none",
            border: "none",
            color: t.muted,
            cursor: "pointer",
            fontSize: 14,
            marginBottom: 32,
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "'JetBrains Mono', monospace",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.color = t.accent)}
          onMouseLeave={(e) => (e.target.style.color = t.muted)}
        >
          ← Back to Projects
        </button>
      </FadeIn>

      {/* Header */}
      <FadeIn delay={0.05}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
          {project.featured && (
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
          )}
          <span
            style={{
              fontSize: 12,
              color: t.muted,
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            {project.category} · {project.year}
          </span>
        </div>
        <h1
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(26px, 4vw, 44px)",
            fontWeight: 800,
            letterSpacing: -1.5,
            lineHeight: 1.1,
            marginBottom: 6,
            backgroundImage: t.gradientText,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}
        >
          {project.title}
        </h1>
        <p
          style={{
            fontSize: 16,
            color: t.accent,
            marginBottom: 32,
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          {project.subtitle}
        </p>
      </FadeIn>

      {/* Highlights */}
      <FadeIn delay={0.1}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(175px, 1fr))",
            gap: 12,
            marginBottom: 36,
          }}
        >
          {project.highlights.map((h, i) => (
            <div
              key={i}
              style={{
                background: t.surface,
                backdropFilter: "blur(8px)",
                border: `1px solid ${t.border}`,
                borderRadius: 12,
                padding: "14px 16px",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span style={{ color: t.greenText, fontSize: 13, fontFamily: "'JetBrains Mono', monospace" }}>
                ✓
              </span>
              <span style={{ fontSize: 13, color: t.text }}>{h}</span>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Overview */}
      <FadeIn delay={0.12}>
        <Card t={t} hover={false} style={{ marginBottom: 20, borderLeft: `2px solid ${t.accent}33` }}>
          <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: t.text, marginBottom: 10 }}>
            Overview
          </h3>
          <p style={{ color: t.muted, lineHeight: 1.8, fontSize: 14 }}>{project.desc}</p>
        </Card>
      </FadeIn>

      {/* Deep Dive */}
      <FadeIn delay={0.14}>
        <Card t={t} hover={false} style={{ marginBottom: 28, borderLeft: `2px solid ${t.accent2}33` }}>
          <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: t.text, marginBottom: 10 }}>
            Deep Dive
          </h3>
          <p style={{ color: t.muted, lineHeight: 1.8, fontSize: 14 }}>{project.longDesc}</p>
        </Card>
      </FadeIn>

      {/* Technologies */}
      <FadeIn delay={0.16}>
        <div style={{ marginBottom: 32 }}>
          <h3
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: t.accent,
              marginBottom: 12,
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            Technologies Used
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {project.tags.map((tag) => (
              <Tag key={tag} label={tag} t={t} />
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Links */}
      <FadeIn delay={0.18}>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Btn href={project.github} variant="primary" t={t}>
            GitHub ↗
          </Btn>
          {project.demo && (
            <Btn href={project.demo} variant="outline" t={t}>
              Live Demo ↗
            </Btn>
          )}
          <Btn onClick={() => navigate("/projects")} variant="ghost" t={t}>
            ← All Projects
          </Btn>
        </div>
      </FadeIn>
    </div>
  );
}
