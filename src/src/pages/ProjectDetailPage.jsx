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
            background: "none", border: "none", color: t.muted,
            cursor: "pointer", fontSize: 14, marginBottom: 32,
            display: "flex", alignItems: "center", gap: 6,
            fontFamily: "inherit",
          }}
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
                fontSize: 11, padding: "3px 10px",
                background: t.featuredBg, border: `1px solid ${t.featuredBorder}`,
                borderRadius: 999, color: t.featuredText,
              }}
            >
              Featured
            </span>
          )}
          <span style={{ fontSize: 12, color: t.muted }}>
            {project.category} · {project.year}
          </span>
        </div>
        <h1
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(26px, 4vw, 44px)",
            fontWeight: 800, letterSpacing: -1.5,
            color: t.text, lineHeight: 1.1, marginBottom: 6,
          }}
        >
          {project.title}
        </h1>
        <p style={{ fontSize: 16, color: t.accent, marginBottom: 32 }}>{project.subtitle}</p>
      </FadeIn>

      {/* Highlights */}
      <FadeIn delay={0.1}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(175px, 1fr))",
            gap: 12, marginBottom: 36,
          }}
        >
          {project.highlights.map((h, i) => (
            <div
              key={i}
              style={{
                background: t.surface, border: `1px solid ${t.border}`,
                borderRadius: 12, padding: "14px 16px",
                display: "flex", alignItems: "center", gap: 10,
              }}
            >
              <span style={{ color: t.accent, fontSize: 13 }}>✓</span>
              <span style={{ fontSize: 13, color: t.text }}>{h}</span>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Overview */}
      <FadeIn delay={0.12}>
        <Card t={t} hover={false} style={{ marginBottom: 20 }}>
          <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: t.text, marginBottom: 10 }}>
            Overview
          </h3>
          <p style={{ color: t.muted, lineHeight: 1.8, fontSize: 14 }}>{project.desc}</p>
        </Card>
      </FadeIn>

      {/* Deep Dive */}
      <FadeIn delay={0.14}>
        <Card t={t} hover={false} style={{ marginBottom: 28 }}>
          <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: t.text, marginBottom: 10 }}>
            Deep Dive
          </h3>
          <p style={{ color: t.muted, lineHeight: 1.8, fontSize: 14 }}>{project.longDesc}</p>
        </Card>
      </FadeIn>

      {/* Technologies */}
      <FadeIn delay={0.16}>
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: t.text, marginBottom: 12 }}>
            Technologies Used
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {project.tags.map((tag) => <Tag key={tag} label={tag} t={t} />)}
          </div>
        </div>
      </FadeIn>

      {/* Links */}
      <FadeIn delay={0.18}>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Btn href={project.github} variant="primary" t={t}>GitHub ↗</Btn>
          {project.demo && <Btn href={project.demo} variant="outline" t={t}>Live Demo ↗</Btn>}
          <Btn onClick={() => navigate("/projects")} variant="ghost" t={t}>← All Projects</Btn>
        </div>
      </FadeIn>
    </div>
  );
}
