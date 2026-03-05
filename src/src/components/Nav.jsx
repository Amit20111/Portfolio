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

  // Close menu when page changes
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
          backdropFilter: scrolled ? "blur(18px)" : "none",
          borderBottom: scrolled ? `1px solid ${t.border}` : "none",
          transition: "all 0.3s",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 800,
            fontSize: 18,
            color: t.text,
            background: "none",
            border: "none",
            cursor: "pointer",
            letterSpacing: -0.5,
            padding: 0,
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
                    background: active ? t.featuredBg : "transparent",
                    border: `1px solid ${active ? t.featuredBorder : "transparent"}`,
                    color: active ? t.accent : t.muted,
                    padding: "6px 14px",
                    borderRadius: 8,
                    fontSize: 14,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "all 0.2s",
                  }}
                >
                  {item.label}
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
              border: `1px solid ${t.border}`,
              borderRadius: 8,
              padding: "7px 11px",
              cursor: "pointer",
              fontSize: 15,
              color: t.text,
            }}
          >
            {mode === "dark" ? "🌙" : "☀️"}
          </button>

          <Btn href="#" variant="outline" t={t} style={{ padding: "7px 18px", fontSize: 13 }}>
            CV ↗
          </Btn>

          {/* Hamburger — visible on mobile via CSS */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="hamburger"
            style={{
              display: "none",
              background: t.surface,
              border: `1px solid ${t.border}`,
              borderRadius: 8,
              padding: "7px 11px",
              cursor: "pointer",
              color: t.text,
              fontSize: 16,
            }}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: 58,
            left: 0,
            right: 0,
            zIndex: 199,
            background: t.navBg,
            backdropFilter: "blur(18px)",
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
                background: currentPath === item.path ? t.featuredBg : "transparent",
                border: "none",
                borderBottom: `1px solid ${t.border}`,
                color: currentPath === item.path ? t.accent : t.muted,
                padding: "14px 24px",
                fontSize: 15,
                cursor: "pointer",
                fontFamily: "inherit",
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
