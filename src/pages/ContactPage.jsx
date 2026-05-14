import { useState } from "react";
import { CONTACTS } from "../data/index";
import { FadeIn, Card, Btn, PageHeader } from "../components/UI";

export default function ContactPage({ t }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSend = () => {
    if (form.name && form.email && form.message) setSent(true);
  };

  return (
    <div className="page-pad" style={{ padding: "120px 64px 80px", maxWidth: 960, margin: "0 auto" }}>
      <PageHeader
        label="Contact"
        title="Let's Connect"
        desc="Open to research collaborations, job opportunities, and interesting conversations."
        t={t}
      />

      <div
        className="contact-grid"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}
      >
        {/* Contact cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <FadeIn>
            <p style={{ color: t.muted, fontSize: 15, marginBottom: 8, lineHeight: 1.75 }}>
              I'm always happy to discuss AI research, project ideas, or potential collaborations.
              Feel free to reach out through any of the channels below.
            </p>
          </FadeIn>

          {CONTACTS.map((c, i) => (
            <ContactCard key={c.label} c={c} t={t} delay={0.05 + i * 0.07} />
          ))}
        </div>

        {/* Message form */}
        <FadeIn delay={0.1}>
          <Card t={t} hover={false}>
            <h3
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 17,
                color: t.text,
                marginBottom: 20,
                fontWeight: 600,
              }}
            >
              Send a Message
            </h3>

            {sent ? (
              <div style={{ textAlign: "center", padding: "36px 0" }}>
                <div style={{ fontSize: 42, marginBottom: 12 }}>
                  ✅
                </div>
                <p style={{ color: t.text, fontWeight: 600, marginBottom: 6 }}>Message sent!</p>
                <p style={{ color: t.muted, fontSize: 14 }}>
                  I'll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { key: "name", label: "Name", type: "text", placeholder: "Your name" },
                  { key: "email", label: "Email", type: "email", placeholder: "your@email.com" },
                ].map((field) => (
                  <div key={field.key}>
                    <label
                      style={{
                        fontSize: 13,
                        color: t.text,
                        display: "block",
                        marginBottom: 6,
                        fontWeight: 500,
                      }}
                    >
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={form[field.key]}
                      onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
                      style={{
                        width: "100%",
                        padding: "11px 14px",
                        borderRadius: 8,
                        background: "#ffffff",
                        border: `1px solid ${t.border}`,
                        color: t.text,
                        fontSize: 14,
                        fontFamily: "'Inter', sans-serif",
                        outline: "none",
                        transition: "border-color 0.2s",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = t.text;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = t.border;
                      }}
                    />
                  </div>
                ))}

                <div>
                  <label
                    style={{
                      fontSize: 13,
                      color: t.text,
                      display: "block",
                      marginBottom: 6,
                      fontWeight: 500,
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="What would you like to discuss?"
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    style={{
                      width: "100%",
                      padding: "11px 14px",
                      borderRadius: 8,
                      background: "#ffffff",
                      border: `1px solid ${t.border}`,
                      color: t.text,
                      fontSize: 14,
                      fontFamily: "'Inter', sans-serif",
                      resize: "vertical",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = t.text;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = t.border;
                    }}
                  />
                </div>

                <Btn
                  onClick={handleSend}
                  variant="primary"
                  t={t}
                  style={{ width: "100%", textAlign: "center" }}
                >
                  Send Message →
                </Btn>
              </div>
            )}
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}

// ── Contact Card subcomponent ─────────────────────────────────────────────────
function ContactCard({ c, t, delay }) {
  const [hovered, setHovered] = useState(false);
  const El = c.href ? "a" : "div";

  return (
    <FadeIn delay={delay}>
      <El
        href={c.href || undefined}
        target={c.href?.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "#ffffff",
          border: `1px solid ${hovered && c.href ? t.borderHover : t.border}`,
          borderRadius: 12,
          padding: "18px 22px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          textDecoration: "none",
          color: t.text,
          transition: "all 0.2s ease",
          transform: hovered && c.href ? "translateX(4px)" : "none",
          cursor: c.href ? "pointer" : "default",
          boxShadow: hovered && c.href ? "0 2px 10px rgba(0, 0, 0, 0.06)" : "0 1px 3px rgba(0, 0, 0, 0.04)",
        }}
      >
        <div
          style={{
            width: 42,
            height: 42,
            background: t.tagBg,
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            flexShrink: 0,
          }}
        >
          {c.icon}
        </div>
        <div>
          <div
            style={{
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: 1.5,
              color: t.muted,
              marginBottom: 3,
              fontWeight: 600,
            }}
          >
            {c.label}
          </div>
          <div style={{ fontSize: 14, fontWeight: 500, color: t.text }}>{c.value}</div>
        </div>
      </El>
    </FadeIn>
  );
}
