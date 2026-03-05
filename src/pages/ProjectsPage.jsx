import { useState } from "react";
import { PROJECTS } from "../data/index";
import { FadeIn, Card, Tag, PageHeader } from "../components/UI";

export default function ProjectsPage({ t, navigate }) {
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))];
  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <div className="page-pad" style={{ padding: "120px 64px 80px", maxWidth: 960, margin: "0 auto" }}>
      <PageHeader
        label="Projects"
        title="All Work"
        desc="AI systems, tools, and applications I've built — from healthcare AI to educational chatbots."
        t={t}
      />

      {/* Filter tabs */}
      <FadeIn>
        <div style={{ display: "flex", gap: 8, marginBottom: 40, flexWrap: "wrap" }}>
          {categories.map((cat) => {
            const active = filter === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  padding: "7px 18px",
                  borderRadius: 8,
                  fontSize: 13,
                  cursor: "pointer",
                  fontFamily: "'JetBrains Mono', monospace",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  background: active ? t.accent : t.surface,
                  backdropFilter: active ? "none" : "blur(8px)",
                  color: active ? t.primaryBtnText : t.muted,
                  border: `1px solid ${active ? t.accent : t.border}`,
                  boxShadow: active ? t.neonGlowSm : "none",
                  letterSpacing: 0.5,
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </FadeIn>

      {/* Project cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {filtered.map((p, i) => (
          <FadeIn key={p.id} delay={i * 0.07}>
            <Card t={t} onClick={() => navigate(`/projects/${p.id}`)}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  gap: 12,
                  marginBottom: 10,
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 3,
                      flexWrap: "wrap",
                    }}
                  >
                    <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 20, color: t.text }}>
                      {p.title}
                    </h3>
                    {p.featured && (
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
                  </div>
                  <p
                    style={{
                      fontSize: 13,
                      color: t.accent,
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {p.subtitle}
                  </p>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div
                    style={{
                      fontSize: 12,
                      color: t.muted,
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {p.year}
                  </div>
                  <div style={{ fontSize: 11, color: t.muted, marginTop: 2 }}>{p.category}</div>
                </div>
              </div>

              <p style={{ color: t.muted, fontSize: 14, lineHeight: 1.7, marginBottom: 14 }}>
                {p.desc}
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {p.tags.slice(0, 4).map((tag) => (
                    <Tag key={tag} label={tag} t={t} />
                  ))}
                  {p.tags.length > 4 && <Tag label={`+${p.tags.length - 4}`} t={t} />}
                </div>
                <span
                  style={{
                    fontSize: 13,
                    color: t.accent,
                    fontWeight: 500,
                    flexShrink: 0,
                  }}
                >
                  View Details →
                </span>
              </div>
            </Card>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
