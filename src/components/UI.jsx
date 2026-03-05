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
        transform: visible ? "translateY(0)" : "translateY(22px)",
        transition: `opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ── Card (Glassmorphism) ─────────────────────────────────────────────────────
export function Card({ children, t, style = {}, onClick, hover = true }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => hover && setHovered(true)}
      onMouseLeave={() => hover && setHovered(false)}
      style={{
        background: t.surface,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: `1px solid ${hovered ? t.borderHover : t.border}`,
        borderRadius: 14,
        padding: "28px 30px",
        transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        transform: hovered && hover ? "translateY(-3px)" : "none",
        boxShadow: hovered && hover ? t.cardGlow : "none",
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ── Btn (Neon) ───────────────────────────────────────────────────────────────
export function Btn({ children, onClick, href, variant = "primary", t, style = {} }) {
  const [h, setH] = useState(false);
  const base = {
    padding: "11px 24px",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    textDecoration: "none",
    display: "inline-block",
    cursor: "pointer",
    border: "none",
    fontFamily: "'Inter', sans-serif",
    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
    lineHeight: 1,
    letterSpacing: 0.3,
    ...style,
  };
  const styles = {
    primary: {
      backgroundImage: t.primaryBtnBg,
      color: t.primaryBtnText,
      boxShadow: h ? t.neonGlow : t.neonGlowSm,
      transform: h ? "translateY(-1px)" : "none",
    },
    outline: {
      background: "transparent",
      border: `1px solid ${h ? t.accent : t.border}`,
      color: h ? t.accent : t.muted,
      boxShadow: h ? t.neonGlowSm : "none",
    },
    ghost: {
      background: "transparent",
      border: "1px solid transparent",
      color: h ? t.accent : t.muted,
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
        fontSize: 11,
        padding: "4px 11px",
        background: t.tagBg,
        border: `1px solid ${t.border}`,
        borderRadius: 6,
        color: t.accent,
        display: "inline-block",
        fontFamily: "'JetBrains Mono', monospace",
        letterSpacing: 0.3,
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
        letterSpacing: 3,
        textTransform: "uppercase",
        color: t.accent,
        fontWeight: 600,
        marginBottom: 10,
        fontFamily: "'JetBrains Mono', monospace",
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      <span
        style={{
          width: 20,
          height: 1,
          background: `linear-gradient(90deg, ${t.accent}, transparent)`,
        }}
      />
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
          backgroundImage: t.gradientText,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          color: "transparent",
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

// ── Divider (Gradient) ───────────────────────────────────────────────────────
export function Divider({ t }) {
  return (
    <div
      style={{
        height: 1,
        background: `linear-gradient(90deg, transparent, ${t.accent}33, transparent)`,
      }}
    />
  );
}
