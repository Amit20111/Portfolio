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
        transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
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
        background: "#ffffff",
        border: `1px solid ${hovered ? t.borderHover : t.border}`,
        borderRadius: 12,
        padding: "28px 30px",
        transition: "all 0.25s ease",
        transform: hovered && hover ? "translateY(-2px)" : "none",
        boxShadow: hovered && hover
          ? "0 4px 20px rgba(0, 0, 0, 0.06)"
          : "0 1px 3px rgba(0, 0, 0, 0.04)",
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
    fontFamily: "'Inter', sans-serif",
    transition: "all 0.2s ease",
    lineHeight: 1,
    letterSpacing: -0.1,
    ...style,
  };
  const styles = {
    primary: {
      background: t.primaryBtnBg,
      color: t.primaryBtnText,
      boxShadow: h ? "0 2px 8px rgba(0, 0, 0, 0.15)" : "none",
      transform: h ? "translateY(-1px)" : "none",
    },
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
      <a href={href} target={href.startsWith("http") || href.endsWith(".pdf") ? "_blank" : undefined} rel="noreferrer" {...props}>
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
        padding: "4px 12px",
        background: t.tagBg,
        borderRadius: 6,
        color: t.muted,
        display: "inline-block",
        fontWeight: 500,
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
        fontSize: 12,
        letterSpacing: 1.5,
        textTransform: "uppercase",
        color: t.muted,
        fontWeight: 600,
        marginBottom: 8,
      }}
    >
      {label}
    </div>
  );
}

// ── PageHeader ───────────────────────────────────────────────────────────────
export function PageHeader({ label, title, desc, t }) {
  return (
    <FadeIn style={{ marginBottom: 48 }}>
      <SectionLabel label={label} t={t} />
      <h1
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(28px, 4vw, 44px)",
          fontWeight: 700,
          letterSpacing: -1,
          marginBottom: 12,
          color: t.text,
          lineHeight: 1.15,
        }}
      >
        {title}
      </h1>
      {desc && (
        <p style={{ color: t.muted, fontSize: 16, maxWidth: 520, lineHeight: 1.7 }}>
          {desc}
        </p>
      )}
    </FadeIn>
  );
}

// ── Divider ──────────────────────────────────────────────────────────────────
export function Divider({ t }) {
  return (
    <div
      style={{
        height: 1,
        background: t.border,
        maxWidth: 960,
        margin: "0 auto",
      }}
    />
  );
}
