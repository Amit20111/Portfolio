import { useState } from "react";
import { useInView } from "../hooks/useInView";

// ── FadeIn ────────────────────────────────────────────────────────────────────
export function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 0.45s ease ${delay}s, transform 0.45s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ── Card ─────────────────────────────────────────────────────────────────────
export function Card({ children, t, style = {}, onClick, hover = true }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => hover && setHovered(true)}
      onMouseLeave={() => hover && setHovered(false)}
      style={{
        background: t.surface,
        border: `1px solid ${hovered ? t.accent : t.border}`,
        borderRadius: 10,
        padding: "28px 30px",
        transition: "all 0.3s ease",
        transform: hovered && hover ? "translateY(-2px)" : "none",
        boxShadow: hovered && hover ? `0 8px 30px ${t.heroGlow}` : "none",
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ── Btn ──────────────────────────────────────────────────────────────────────
export function Btn({ children, onClick, href, variant = "primary", t, style = {} }) {
  const [h, setH] = useState(false);
  const base = {
    padding: "11px 24px",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    textDecoration: "none",
    display: "inline-block",
    cursor: "pointer",
    border: "none",
    fontFamily: "inherit",
    transition: "all 0.2s",
    lineHeight: 1,
    ...style,
  };
  const styles = {
    primary: { background: t.text, color: t.bg, opacity: h ? 0.8 : 1 },
    outline: {
      background: "transparent",
      border: `1px solid ${h ? t.text : t.border}`,
      color: h ? t.text : t.muted,
    },
    ghost: {
      background: "transparent",
      border: "1px solid transparent",
      color: h ? t.text : t.muted,
    },
  };
  const props = {
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: { ...base, ...styles[variant] },
  };
  if (href)
    return (
      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" {...props}>
        {children}
      </a>
    );
  return (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  );
}

// ── Tag ──────────────────────────────────────────────────────────────────────
export function Tag({ label, t }) {
  return (
    <span
      style={{
        fontSize: 12,
        padding: "4px 11px",
        background: t.tagBg,
        border: `1px solid ${t.border}`,
        borderRadius: 6,
        color: t.muted,
        display: "inline-block",
      }}
    >
      {label}
    </span>
  );
}

// ── SectionLabel ─────────────────────────────────────────────────────────────
export function SectionLabel({ label, t }) {
  return (
    <div
      style={{
        fontSize: 11,
        letterSpacing: 2.5,
        textTransform: "uppercase",
        color: t.muted,
        fontWeight: 600,
        marginBottom: 10,
      }}
    >
      {label}
    </div>
  );
}

// ── PageHeader ───────────────────────────────────────────────────────────────
export function PageHeader({ label, title, desc, t }) {
  return (
    <FadeIn style={{ marginBottom: 52 }}>
      <SectionLabel label={label} t={t} />
      <h1
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(30px, 4vw, 50px)",
          fontWeight: 700,
          letterSpacing: -1,
          marginBottom: 12,
          color: t.text,
          lineHeight: 1.1,
        }}
      >
        {title}
      </h1>
      {desc && (
        <p style={{ color: t.muted, fontSize: 15, maxWidth: 500, lineHeight: 1.75 }}>
          {desc}
        </p>
      )}
    </FadeIn>
  );
}

// ── Divider ──────────────────────────────────────────────────────────────────
export function Divider({ t }) {
  return <div style={{ borderTop: `1px solid ${t.border}` }} />;
}
