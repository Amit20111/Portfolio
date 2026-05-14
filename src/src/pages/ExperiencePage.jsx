import { SKILLS } from "../data/index";
import { FadeIn, Card, PageHeader } from "../components/UI";

export default function ExperiencePage({ t }) {
  return (
    <div className="page-pad" style={{ padding: "120px 64px 80px", maxWidth: 960, margin: "0 auto" }}>
      <PageHeader
        label="Experience"
        title="Work & Research"
        desc="My academic and professional journey in AI research and software development."
        t={t}
      />

      {/* Current role */}
      <FadeIn delay={0.05}>
        <Card t={t} hover={false} style={{ marginBottom: 24, borderLeft: `3px solid ${t.accent}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <span style={{ width: 7, height: 7, background: "#22c55e", borderRadius: "50%" }} />
            <span style={{ fontSize: 11, color: "#22c55e", textTransform: "uppercase", letterSpacing: 1.5 }}>
              Current
            </span>
          </div>
          <div
            style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "flex-start", flexWrap: "wrap",
              gap: 8, marginBottom: 16,
            }}
          >
            <div>
              <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 22, color: t.text, marginBottom: 3 }}>
                Research Intern
              </h3>
              <div style={{ fontSize: 15, color: t.accent, fontWeight: 500 }}>
                Machine Intelligence Lab, North South University
              </div>
            </div>
            <span
              style={{
                fontSize: 13, color: t.muted,
                background: t.tagBg, padding: "4px 14px",
                borderRadius: 999, border: `1px solid ${t.border}`,
              }}
            >
              2024 – Present
            </span>
          </div>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              "Conducting applied research in Artificial Intelligence and Machine Learning",
              "Specializing in Large Language Models, Natural Language Processing, and Deep Learning",
              "Designing and optimizing efficient model deployment pipelines for real-world use",
              "Building scalable AI solutions from research concept to working implementation",
              "Collaborating on multi-modal and conversational AI projects with healthcare and education impact",
            ].map((item, i) => (
              <li
                key={i}
                style={{
                  fontSize: 14, color: t.muted,
                  paddingLeft: 20, position: "relative", lineHeight: 1.65,
                }}
              >
                <span style={{ position: "absolute", left: 0, color: t.accent, fontSize: 11, top: 4 }}>→</span>
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </FadeIn>

      {/* Education */}
      <FadeIn delay={0.12}>
        <h2
          style={{
            fontFamily: "'Inter', sans-serif", fontSize: 22,
            fontWeight: 700, color: t.text, margin: "44px 0 18px",
          }}
        >
          Education
        </h2>
        <Card t={t} hover={false} style={{ borderLeft: `3px solid ${t.accent2}` }}>
          <div
            style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "flex-start", flexWrap: "wrap",
              gap: 8, marginBottom: 12,
            }}
          >
            <div>
              <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 20, color: t.text, marginBottom: 3 }}>
                B.Sc. in Computer Science & Engineering
              </h3>
              <div style={{ fontSize: 15, color: t.accent2, fontWeight: 500 }}>
                North South University, Dhaka, Bangladesh
              </div>
            </div>
            <span
              style={{
                fontSize: 13, color: t.muted,
                background: t.tagBg, padding: "4px 14px",
                borderRadius: 999, border: `1px solid ${t.border}`,
              }}
            >
              2020 – 2024
            </span>
          </div>
          <p style={{ color: t.muted, fontSize: 14, lineHeight: 1.75 }}>
            Graduated with a strong foundation in algorithms, data structures, software engineering,
            and machine learning. Senior thesis focused on efficient RAG systems for low-resource
            educational environments.
          </p>
        </Card>
      </FadeIn>

      {/* Skills */}
      <FadeIn delay={0.18}>
        <h2
          style={{
            fontFamily: "'Inter', sans-serif", fontSize: 22,
            fontWeight: 700, color: t.text, margin: "44px 0 18px",
          }}
        >
          Technical Skills
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
          {SKILLS.map((s) => (
            <Card key={s.category} t={t}>
              <h3
                style={{
                  fontSize: 11, color: t.muted, marginBottom: 12,
                  textTransform: "uppercase", letterSpacing: 1.5,
                }}
              >
                {s.category}
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {s.items.map((item) => (
                  <span
                    key={item}
                    style={{
                      fontSize: 12, padding: "5px 11px",
                      background: t.tagBg, border: `1px solid ${t.border}`,
                      borderRadius: 7, color: t.text,
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </FadeIn>
    </div>
  );
}
