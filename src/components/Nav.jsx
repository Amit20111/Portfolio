import { useState, useEffect } from "react";
import { NAV_ITEMS } from "../data/index";
import { Btn } from "./UI";

export default function Nav({ t, mode, toggleMode, navigate, currentPath }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => setMenuOpen(false), [currentPath]);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "15px 48px",
          background: scrolled ? t.navBg : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? `1px solid ${t.border}` : "none",
          transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 800,
            fontSize: 18,
            background: "none",
            border: "none",
            cursor: "pointer",
            letterSpacing: -0.5,
            padding: 0,
            backgroundImage: t.gradientText,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}
        >
          Amit Chakraborty
        </button>

        {/* Desktop links */}
        <ul
          className="desktop-nav"
          style={{ display: "flex", gap: 2, listStyle: "none", margin: 0, padding: 0 }}
        >
          {NAV_ITEMS.map((item) => {
            const active = currentPath === item.path;
            return (
              <li key={item.path}>
                <button
                  onClick={() => navigate(item.path)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: active ? t.accent : t.muted,
                    padding: "6px 14px",
                    borderRadius: 6,
                    fontSize: 14,
                    cursor: "pointer",
                    fontFamily: "'Inter', sans-serif",
                    transition: "all 0.25s",
                    position: "relative",
                    fontWeight: active ? 600 : 400,
                  }}
                >
                  {item.label}
                  {active && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 16,
                        height: 2,
                        background: t.accent,
                        borderRadius: 1,
                        boxShadow: t.neonGlowSm,
                      }}
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Right side controls */}
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button
            onClick={toggleMode}
            style={{
              background: t.surface,
              backdropFilter: "blur(8px)",
              border: `1px solid ${t.border}`,
              borderRadius: 6,
              padding: "7px 11px",
              cursor: "pointer",
              fontSize: 15,
              color: t.text,
              transition: "all 0.25s",
            }}
          >
            {mode === "dark" ? "◆" : "◇"}
          </button>

          <Btn href="/CV.pdf" variant="outline" t={t} style={{ padding: "7px 18px", fontSize: 13 }}>
            CV ↗
          </Btn>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="hamburger"
            style={{
              display: "none",
              background: t.surface,
              border: `1px solid ${t.border}`,
              borderRadius: 6,
              cursor: "pointer",
              color: t.accent,
              fontSize: 16,
              padding: "7px 11px",
            }}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: 58,
            left: 0,
            right: 0,
            zIndex: 199,
            background: t.navBg,
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom: `1px solid ${t.border}`,
          }}
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                background: currentPath === item.path ? t.tagBg : "transparent",
                border: "none",
                borderBottom: `1px solid ${t.border}`,
                color: currentPath === item.path ? t.accent : t.muted,
                padding: "14px 24px",
                fontSize: 15,
                cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
                transition: "all 0.2s",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
