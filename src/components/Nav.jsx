import { useState, useEffect } from "react";
import { NAV_ITEMS } from "../data/index";
import { Btn } from "./UI";

export default function Nav({ t, navigate, currentPath }) {
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
          padding: "14px 48px",
          background: scrolled ? t.navBg : "rgba(250, 248, 245, 0.6)",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? `1px solid ${t.border}` : "1px solid transparent",
          transition: "all 0.3s ease",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: 17,
            background: "none",
            border: "none",
            cursor: "pointer",
            letterSpacing: -0.5,
            padding: 0,
            color: t.text,
          }}
        >
          Amit Chakraborty
        </button>

        {/* Desktop links */}
        <ul
          className="desktop-nav"
          style={{ display: "flex", gap: 4, listStyle: "none", margin: 0, padding: 0 }}
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
                    color: active ? t.text : t.muted,
                    padding: "6px 14px",
                    borderRadius: 6,
                    fontSize: 14,
                    cursor: "pointer",
                    fontFamily: "'Inter', sans-serif",
                    transition: "all 0.2s",
                    fontWeight: active ? 600 : 400,
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
          <Btn href="/CV_Latest.pdf" variant="outline" t={t} style={{ padding: "7px 18px", fontSize: 13 }}>
            CV ↗
          </Btn>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="hamburger"
            style={{
              display: "none",
              background: t.bg,
              border: `1px solid ${t.border}`,
              borderRadius: 6,
              cursor: "pointer",
              color: t.text,
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
            top: 56,
            left: 0,
            right: 0,
            zIndex: 199,
            background: "rgba(250, 248, 245, 0.98)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
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
                color: currentPath === item.path ? t.text : t.muted,
                padding: "14px 24px",
                fontSize: 15,
                cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
                fontWeight: currentPath === item.path ? 600 : 400,
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
