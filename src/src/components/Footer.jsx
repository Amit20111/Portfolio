import { NAV_ITEMS } from "../data/index";
import { Divider } from "./UI";

export default function Footer({ t, navigate }) {
  return (
    <>
      <Divider t={t} />
      <footer
        className="footer-grid"
        style={{
          padding: "48px 64px",
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr",
          gap: 40,
          background: t.surface,
        }}
      >
        {/* Brand */}
        <div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 800,
              fontSize: 20,
              color: t.text,
              letterSpacing: -0.5,
            }}
          >
            Amit<span style={{ color: t.accent }}>.</span>
          </div>
          <p
            style={{
              color: t.muted,
              fontSize: 13,
              marginTop: 10,
              maxWidth: 280,
              lineHeight: 1.7,
            }}
          >
            AI Researcher & Developer specializing in LLMs and scalable backend systems.
          </p>
          <p style={{ fontSize: 12, color: t.muted, marginTop: 10 }}>
            📍 Kuril, Dhaka, Bangladesh
          </p>
        </div>

        {/* Pages */}
        <div>
          <h4
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              marginBottom: 16,
              color: t.muted,
              textTransform: "uppercase",
              letterSpacing: 1.5,
            }}
          >
            Pages
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                style={{
                  background: "none",
                  border: "none",
                  textAlign: "left",
                  color: t.muted,
                  fontSize: 13,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  padding: 0,
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Social */}
        <div>
          <h4
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              marginBottom: 16,
              color: t.muted,
              textTransform: "uppercase",
              letterSpacing: 1.5,
            }}
          >
            Connect
          </h4>
          <div style={{ display: "flex", gap: 14 }}>
            <a
              href="https://github.com/Amit20111"
              target="_blank"
              rel="noreferrer"
              style={{ color: t.muted }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/amitchakraborty20111/"
              target="_blank"
              rel="noreferrer"
              style={{ color: t.muted }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>

      <div
        style={{
          borderTop: `1px solid ${t.border}`,
          padding: "18px 64px",
          textAlign: "center",
          color: t.muted,
          fontSize: 12,
          background: t.surface,
        }}
      >
        © 2026 Amit Chakraborty. All rights reserved.
      </div>
    </>
  );
}
