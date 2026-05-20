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

// SVGs for technology icons
const PythonIcon = (size) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.956 2C6.444 2 6.778 4.385 6.778 4.385L6.786 6.849H12.06V7.61H4.664C4.664 7.61 2 7.9 2 13.064C2 18.229 4.303 17.925 4.303 17.925H6.282V15.143C6.282 12.35 8.528 12.186 8.528 12.186H15.029C15.029 12.186 17.29 11.96 17.29 9.387V4.496C17.29 4.496 17.65 2 11.956 2Z" fill="#3776AB" />
    <path d="M12.044 22C17.556 22 17.222 19.615 17.222 19.615L17.214 17.151H11.94V16.39H19.336C19.336 16.39 22 16.1 22 10.936C22 5.771 19.697 6.075 19.697 6.075H17.718V8.857C17.718 11.65 15.472 11.814 15.472 11.814H8.971C8.971 11.814 6.71 12.04 6.71 14.613V19.504C6.71 19.504 6.35 22 12.044 22Z" fill="#FFD43B" />
    <circle cx="9" cy="4.5" r="0.75" fill="white" />
    <circle cx="15" cy="19.5" r="0.75" fill="white" />
  </svg>
);

const PyTorchIcon = (size) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.69l-.33.36c-.05.06-2.5 2.87-4.4 6.78-1.57 3.23-2.12 5.9-1.63 7.92.54 2.22 2.27 3.75 4.6 4.09l.4.06.33-.25c.08-.06.79-.62 1.3-1.64.44-.86.58-1.78.43-2.73l-.06-.39-.33.24c-.17.12-.9.65-1.76.54-.7-.09-1.25-.6-1.46-1.37-.21-.77.01-1.8.63-2.92.83-1.49 2.2-2.93 3.65-3.85v10.56l.33.26c.07.06 2.5 2 4.67 1.48 2.05-.49 3.32-2.3 3.42-4.88.08-2.14-.65-4.66-2.18-7.5-1.92-3.56-4.32-6.52-4.4-6.61L12 2.69z" fill="#EE4C2C" />
  </svg>
);

const HuggingFaceIcon = (size) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="11" r="8" fill="#FFD21E" />
    <circle cx="9" cy="10" r="1" fill="#000000" />
    <circle cx="15" cy="10" r="1" fill="#000000" />
    <path d="M9 13.5C10 15 14 15 15 13.5" stroke="#000000" strokeWidth="1.2" strokeLinecap="round" />
    <ellipse cx="12" cy="11.5" rx="1" ry="0.5" fill="#E65100" opacity="0.3" />
    <path d="M4 16C4.8 14.2 6.8 14 8 15C9.2 16 8.5 18 6.5 18C5 18 3.2 17.8 4 16Z" fill="#FFD21E" stroke="#E65100" strokeWidth="0.5" />
    <path d="M20 16C19.2 14.2 17.2 14 16 15C14.8 16 15.5 18 17.5 18C19 18 20.8 17.8 20 16Z" fill="#FFD21E" stroke="#E65100" strokeWidth="0.5" />
  </svg>
);

const JavaScriptIcon = (size) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="3" fill="#F7DF1E" />
    <path d="M12 17.5c0 .77-.28 1.34-.84 1.7-.56.37-1.4.55-2.5.55-.95 0-1.74-.15-2.37-.45v-2c.67.43 1.4.65 2.18.65.73 0 1.25-.13 1.55-.4.3-.27.45-.73.45-1.37v-6.3h2.53v7.62zm8.13-2c0 .9-.3 1.58-.93 2.06-.62.47-1.57.7-2.83.7-1.12 0-2.14-.24-3.07-.7l.76-1.87c.78.43 1.6.64 2.45.64.6 0 1.05-.1 1.34-.3.28-.2.43-.53.43-1 0-.3-.08-.55-.25-.76-.17-.2-.48-.4-.93-.6l-1.35-.6c-.95-.44-1.63-.9-2.03-1.38-.4-.48-.6-1.12-.6-1.92 0-.84.28-1.5.85-2 .57-.5 1.4-.75 2.5-.75.98 0 1.83.2 2.55.58l-.68 1.87c-.63-.33-1.3-.5-2-.5-.54 0-.94.1-1.2.3-.25.2-.38.5-.38.9 0 .3.08.54.25.74.17.2.5.4 1 .6l1.37.62c1 .45 1.7.92 2.1 1.4.4.48.6 1.13.6 1.95z" fill="#000000" />
  </svg>
);

const TypeScriptIcon = (size) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="3" fill="#3178C6" />
    <path d="M11.66 17.61c0 .73-.24 1.27-.72 1.61-.48.34-1.2.51-2.15.51-.8 0-1.48-.14-2.02-.42v-1.9c.57.4 1.2.6 1.86.6.62 0 1.06-.12 1.32-.38.26-.26.39-.7.39-1.3v-6.04h2.16v7.32zm8.34-1.9c0 .85-.28 1.5-.83 1.95-.55.45-1.4.67-2.54.67-1 0-1.9-.22-2.73-.67l.68-1.78c.7.4 1.43.6 2.18.6.53 0 .93-.1 1.2-.3.26-.2.4-.5.4-.95 0-.28-.07-.52-.22-.72-.15-.2-.43-.38-.83-.57l-1.2-.57c-.85-.4-1.46-.86-1.83-1.3-.37-.45-.55-1.07-.55-1.83 0-.8.25-1.43.76-1.9.5-.48 1.25-.72 2.25-.72.88 0 1.64.2 2.28.55l-.6 1.78c-.56-.32-1.17-.48-1.8-.48-.48 0-.84.1-1.08.3-.24.2-.36.48-.36.86 0 .28.07.5.22.7.15.2.45.38.9.58l1.23.59c.9.43 1.53.88 1.9 1.33.37.45.55 1.07.55 1.86z" fill="#FFFFFF" />
  </svg>
);

const CPlusPlusIcon = (size) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.4 10.8h-1.6V9.2h-1.6v1.6H17.6v1.6h1.6v1.6h1.6v-1.6h1.6v-1.6zm-5.6 0h-1.6V9.2h-1.6v1.6h-1.6v1.6h1.6v1.6h1.6v-1.6h1.6v-1.6zM11.6 14.8c-.8.8-2 1.2-3.2 1.2-2.8 0-4.8-2-4.8-4.8s2-4.8 4.8-4.8c1.2 0 2.4.4 3.2 1.2l1.6-2C11.6 4.4 9.6 3.6 8 3.6c-4.4 0-8 3.6-8 8s3.6 8 8 8c1.6 0 3.6-.8 5.2-2l-1.6-1.2z" fill="#00599C" />
  </svg>
);

const JavaIcon = (size) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.5 2C14.5 2 13 4 13 5.5C13 7 14.5 8 14.5 8C14.5 8 16 6 16 4.5C16 3 14.5 2 14.5 2Z" fill="#ED8B00" />
    <path d="M11.5 3C11.5 3 10 5 10 6.5C10 8 11.5 9 11.5 9C11.5 9 13 7 13 5.5C13 4 11.5 3 11.5 3Z" fill="#007396" />
    <path d="M5 12C5 12 5 15 9 15C13 15 15 14 17 14C19 14 20 15 20 15V13C20 13 19 12 17 12C15 12 13 13 9 13C5 13 5 12 5 12Z" fill="#ED8B00" />
    <path d="M3 16C3 16 3 19 9 19C15 19 18 17.5 20 17.5C22 17.5 22 19 22 19V17C22 17 21 16 19 16C17 16 15 17 9 17C3 17 3 16 3 16Z" fill="#007396" />
  </svg>
);

const LangChainIcon = (size) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 16.5c-2.5 0-4.5-2-4.5-4.5S6.5 7.5 9 7.5h3V9.5H9c-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5h3v2H9z" fill="#13C3A0" />
    <path d="M15 7.5c2.5 0 4.5 2 4.5 4.5s-2 4.5-4.5 4.5h-3v-2h3c1.4 0 2.5-1.1 2.5-2.5s-1.1-2.5-2.5-2.5h-3v-2h3z" fill="#13C3A0" />
    <rect x="8" y="11" width="8" height="2" rx="1" fill="#13C3A0" />
  </svg>
);

const NumPyIcon = (size) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 3.5v17l6-3.5v-10L6 3.5z" fill="#013243" />
    <path d="M12 7v10l6-3.5v-10L12 7z" fill="#4D77CF" />
    <path d="M6 3.5l6 3.5 6-3.5-6-3.5-6 3.5z" fill="#013243" opacity="0.8" />
  </svg>
);

const PandasIcon = (size) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="4" width="4" height="16" rx="2" fill="#15045C" />
    <rect x="10" y="7" width="4" height="13" rx="2" fill="#FFC000" />
    <rect x="17" y="10" width="4" height="10" rx="2" fill="#E70488" />
  </svg>
);

const FastAPIIcon = (size) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 13.5h9v8.5L22 10.5h-9L12 2z" fill="#059669" />
  </svg>
);

const NodejsIcon = (size) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm-1 15.5c-2.2 0-4-1.8-4-4s1.8-4 4-4v8zm2-8c2.2 0 4 1.8 4 4s-1.8 4-4 4v-8z" fill="#339933" />
  </svg>
);

const RestApiIcon = (size) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="3" width="20" height="5" rx="1.5" fill="#FF6C37" />
    <rect x="2" y="10" width="20" height="5" rx="1.5" fill="#FF6C37" />
    <rect x="2" y="17" width="20" height="5" rx="1.5" fill="#FF6C37" />
    <circle cx="5" cy="5.5" r="1" fill="#FFFFFF" />
    <circle cx="5" cy="12.5" r="1" fill="#FFFFFF" />
    <circle cx="5" cy="19.5" r="1" fill="#FFFFFF" />
    <circle cx="9" cy="5.5" r="1" fill="#FFFFFF" />
    <circle cx="9" cy="12.5" r="1" fill="#FFFFFF" />
    <circle cx="9" cy="19.5" r="1" fill="#FFFFFF" />
  </svg>
);

const NextjsIcon = (size) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#000000" />
    <path d="M16.5 16.5L9.5 7.5V16.5H8.2V6.5H9.5L15.3 14V6.5H16.5V16.5Z" fill="#FFFFFF" />
  </svg>
);

const MySQLIcon = (size) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 5.58 2 10s4.48 8 10 8 10-3.58 10-8-4.48-8-10-8zm0 13c-4.42 0-8-2.24-8-5v3c0 2.76 3.58 5 8 5s8-2.24 8-5v-3c0 2.76-3.58 5-8 5zm0-5c-4.42 0-8-2.24-8-5s3.58-5 8-5 8 2.24 8 5-3.58 5-8 5z" fill="#4479A1" />
    <path d="M12 22c-4.42 0-8-2.24-8-5v3c0 2.76 3.58 5 8 5s8-2.24 8-5v-3c0 2.76-3.58 5-8 5z" fill="#F29111" />
  </svg>
);

const MongoDBIcon = (size) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C12 2 9 6.5 9 11.5C9 16.5 12 22 12 22C12 22 15 16.5 15 11.5C15 6.5 12 2 12 2Z" fill="#47A248" />
    <path d="M12 2C12 2 10.5 6.5 10.5 11.5C10.5 16.5 12 22 12 22V2Z" fill="#3F9140" />
    <path d="M12 5.5v13" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const GitIcon = (size) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.6 10.8L13.2 2.4C12.4 1.6 11.2 1.6 10.4 2.4L2.4 10.4C1.6 11.2 1.6 12.4 2.4 13.2L10.8 21.6C11.6 22.4 12.8 22.4 13.6 21.6L21.6 13.6C22.4 12.8 22.4 11.6 21.6 10.8ZM16.8 12.8C16.8 13.8 16.2 14.6 15.2 14.9V18.2C15.2 19.3 14.3 20.2 13.2 20.2C12.1 20.2 11.2 19.3 11.2 18.2C11.2 17.5 11.6 16.9 12.2 16.6V13.8C11.6 13.5 11.2 12.9 11.2 12.2C11.2 11.2 12.1 10.3 13.2 10.3C13.8 10.3 14.4 10.6 14.7 11.2H16.8C16.8 11.8 16.8 12.3 16.8 12.8Z" fill="#F05032" />
  </svg>
);

const RagIcon = (size) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6c0 1.66 3.58 3 8 3s8-1.34 8-3-3.58-3-8-3-8 1.34-8 3zm0 6c0 1.66 3.58 3 8 3s8-1.34 8-3M4 18c0 1.66 3.58 3 8 3s8-1.34 8-3" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" />
    <path d="M21 21l-4-4" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" />
    <circle cx="15.5" cy="15.5" r="2.5" stroke="#6366F1" strokeWidth="2" />
  </svg>
);

export const SKILL_INFO = {
  Python: {
    color: "#3776AB",
    hoverBg: "rgba(55, 118, 171, 0.08)",
    hoverBorder: "#3776AB",
    icon: PythonIcon,
  },
  JavaScript: {
    color: "#A16207",
    hoverBg: "rgba(247, 223, 30, 0.12)",
    hoverBorder: "#F7DF1E",
    icon: JavaScriptIcon,
  },
  TypeScript: {
    color: "#3178C6",
    hoverBg: "rgba(49, 120, 198, 0.08)",
    hoverBorder: "#3178C6",
    icon: TypeScriptIcon,
  },
  "C/C++": {
    color: "#00599C",
    hoverBg: "rgba(0, 89, 156, 0.08)",
    hoverBorder: "#00599C",
    icon: CPlusPlusIcon,
  },
  Java: {
    color: "#ED8B00",
    hoverBg: "rgba(237, 139, 0, 0.08)",
    hoverBorder: "#ED8B00",
    icon: JavaIcon,
  },
  PyTorch: {
    color: "#EE4C2C",
    hoverBg: "rgba(238, 76, 44, 0.08)",
    hoverBorder: "#EE4C2C",
    icon: PyTorchIcon,
  },
  RAG: {
    color: "#6366F1",
    hoverBg: "rgba(99, 102, 241, 0.08)",
    hoverBorder: "#6366F1",
    icon: RagIcon,
  },
  HuggingFace: {
    color: "#B45309",
    hoverBg: "rgba(255, 210, 30, 0.15)",
    hoverBorder: "#FFD21E",
    icon: HuggingFaceIcon,
    displayName: "Hugging Face",
  },
  LangChain: {
    color: "#13C3A0",
    hoverBg: "rgba(19, 195, 160, 0.08)",
    hoverBorder: "#13C3A0",
    icon: LangChainIcon,
  },
  NumPy: {
    color: "#4D77CF",
    hoverBg: "rgba(77, 119, 207, 0.08)",
    hoverBorder: "#4D77CF",
    icon: NumPyIcon,
  },
  Pandas: {
    color: "#15045C",
    hoverBg: "rgba(21, 4, 92, 0.06)",
    hoverBorder: "#15045C",
    icon: PandasIcon,
  },
  FastAPI: {
    color: "#059669",
    hoverBg: "rgba(5, 150, 105, 0.08)",
    hoverBorder: "#059669",
    icon: FastAPIIcon,
  },
  "Node.js": {
    color: "#339933",
    hoverBg: "rgba(51, 153, 51, 0.08)",
    hoverBorder: "#339933",
    icon: NodejsIcon,
  },
  "REST APIs": {
    color: "#FF6C37",
    hoverBg: "rgba(255, 108, 55, 0.08)",
    hoverBorder: "#FF6C37",
    icon: RestApiIcon,
  },
  "Next.js": {
    color: "#000000",
    hoverBg: "rgba(0, 0, 0, 0.06)",
    hoverBorder: "#000000",
    icon: NextjsIcon,
  },
  MySQL: {
    color: "#4479A1",
    hoverBg: "rgba(68, 121, 161, 0.08)",
    hoverBorder: "#4479A1",
    icon: MySQLIcon,
  },
  MongoDB: {
    color: "#3F9140",
    hoverBg: "rgba(63, 145, 64, 0.08)",
    hoverBorder: "#47A248",
    icon: MongoDBIcon,
  },
  Git: {
    color: "#F05032",
    hoverBg: "rgba(240, 80, 50, 0.08)",
    hoverBorder: "#F05032",
    icon: GitIcon,
  },
};

export function SkillTag({ item, t }) {
  const [hovered, setHovered] = useState(false);
  
  const info = SKILL_INFO[item] || {
    color: t.text,
    hoverBg: t.tagBg,
    hoverBorder: t.border,
    icon: null,
  };

  const activeColor = info.color;
  const hoverBg = info.hoverBg;
  const hoverBorder = info.hoverBorder;
  const label = info.displayName || item;

  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontSize: 13,
        padding: "6px 14px",
        background: hovered ? hoverBg : t.tagBg,
        border: `1px solid ${hovered ? hoverBorder : "transparent"}`,
        borderRadius: 8,
        color: hovered ? activeColor : t.text,
        fontWeight: 500,
        transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        transform: hovered ? "translateY(-1.5px)" : "none",
        boxShadow: hovered ? `0 4px 12px ${activeColor}15` : "none",
        cursor: "default",
      }}
    >
      {info.icon && (
        <span style={{ display: "inline-flex", alignItems: "center", transition: "transform 0.25s ease", transform: hovered ? "scale(1.1)" : "none" }}>
          {info.icon(14)}
        </span>
      )}
      <span>{label}</span>
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
