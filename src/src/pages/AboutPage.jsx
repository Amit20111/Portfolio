import { INTERESTS, SKILLS } from "../data/index";
import { FadeIn, Card, PageHeader } from "../components/UI";

export default function AboutPage({ t }) {
  return (
    <div className="page-pad" style={{ padding: "120px 64px 80px", maxWidth: 960, margin: "0 auto" }}>
      <PageHeader
        label="About Me"
        title="Research & Interests"
        desc="Exploring the frontier of AI — from language models to intelligent backend systems."
        t={t}
      />

      {/* Bio */}
      <FadeIn>
        <Card t={t} hover={false} style={{ marginBottom: 28 }}>
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            <div>
              <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 17, color: t.text, marginBottom: 10 }}>
                Background
              </h3>
              <p style={{ color: t.muted, lineHeight: 1.8, fontSize: 14 }}>
                I'm a Computer Science graduate from North South University, Dhaka, currently a
                Research Intern at the Machine Intelligence Lab. My work sits at the intersection
                of applied AI and software engineering — making AI systems that are not just
                accurate, but usable and accessible.
              </p>
            </div>
            <div>
              <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 17, color: t.text, marginBottom: 10 }}>
                Focus Areas
              </h3>
              <p style={{ color: t.muted, lineHeight: 1.8, fontSize: 14 }}>
                My primary research interest lies in Large Language Models — fine-tuning, alignment,
                and efficient deployment. I'm also passionate about RAG systems that work reliably
                in low-resource, real-world environments where reliability matters more than
                benchmarks.
              </p>
            </div>
          </div>
        </Card>
      </FadeIn>

      {/* Research Interests */}
      <FadeIn delay={0.08}>
        <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 22, fontWeight: 700, color: t.text, marginBottom: 20 }}>
          Research Interests
        </h2>
      </FadeIn>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 18,
          marginBottom: 52,
        }}
      >
        {INTERESTS.map((int, i) => (
          <FadeIn key={int.title} delay={0.1 + i * 0.07}>
            <Card t={t} style={{ height: "100%" }}>
              <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: t.text, marginBottom: 14 }}>
                {int.title}
              </h3>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 7 }}>
                {int.items.map((item) => (
                  <li key={item} style={{ fontSize: 13, color: t.muted, paddingLeft: 18, position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, color: t.accent, fontSize: 10, top: 3 }}>→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </FadeIn>
        ))}
      </div>

      {/* Skills */}
      <FadeIn delay={0.15}>
        <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 22, fontWeight: 700, color: t.text, marginBottom: 20 }}>
          Technical Skills
        </h2>
      </FadeIn>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
        {SKILLS.map((s, i) => (
          <FadeIn key={s.category} delay={0.15 + i * 0.07}>
            <Card t={t}>
              <h3 style={{ fontSize: 11, color: t.muted, marginBottom: 14, textTransform: "uppercase", letterSpacing: 1.5 }}>
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
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
