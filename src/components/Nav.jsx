import { useState, useEffect } from "react";
import { NAV_ITEMS } from "../data/index";

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
          style={{ display: "flex", gap: 4, listStyle: "none", margin: 0, padding: 0, alignItems: "center" }}
        >
          {NAV_ITEMS.map((item) => {
            const active = !item.external && currentPath === item.path;
            const sharedStyle = {
              background: active ? t.text : "transparent",
              border: "none",
              color: active ? t.primaryBtnText : t.muted,
              padding: "6px 14px",
              borderRadius: 6,
              fontSize: 14,
              lineHeight: "20px",
              cursor: "pointer",
              fontFamily: "'Inter', sans-serif",
              transition: "all 0.2s",
              fontWeight: active ? 600 : 400,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 32,
              boxSizing: "border-box",
            };
            return (
              <li key={item.path} style={{ display: "flex", alignItems: "center" }}>
                {item.external ? (
                  <a
                    href={item.path}
                    target="_blank"
                    rel="noreferrer"
                    style={{ ...sharedStyle, background: "transparent", color: t.muted, fontWeight: 400 }}
                  >
                    {item.label}
                  </a>
                ) : (
                  <button onClick={() => navigate(item.path)} style={sharedStyle}>
                    {item.label}
                  </button>
                )}
              </li>
            );
          })}
        </ul>

        {/* Right side controls */}
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
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
          {NAV_ITEMS.map((item) =>
            item.external ? (
              <a
                key={item.path}
                href={item.path}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  background: "transparent",
                  border: "none",
                  borderBottom: `1px solid ${t.border}`,
                  color: t.muted,
                  padding: "14px 24px",
                  fontSize: 15,
                  cursor: "pointer",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
              >
                {item.label}
              </a>
            ) : (
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
            )
          )}
        </div>
      )}
    </>
  );
}
