import { Btn } from "../components/UI";

export default function NotFoundPage({ t, navigate }) {
  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        padding: 64,
        position: "relative",
      }}
    >
      {/* Subtle glow */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          height: 400,
          background: `radial-gradient(circle, ${t.heroGlow} 0%, transparent 60%)`,
          pointerEvents: "none",
        }}
      />

      <h1
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(72px, 12vw, 140px)",
          fontWeight: 800,
          marginBottom: 10,
          backgroundImage: t.gradientText,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          color: "transparent",
          animation: "glitch 5s ease-in-out infinite",
          position: "relative",
          zIndex: 1,
          letterSpacing: -4,
        }}
      >
        404
      </h1>
      <p
        style={{
          color: t.muted,
          marginBottom: 8,
          fontSize: 16,
          fontFamily: "'JetBrains Mono', monospace",
          position: "relative",
          zIndex: 1,
        }}
      >
        {">"} page_not_found
      </p>
      <p
        style={{
          color: t.muted,
          marginBottom: 30,
          fontSize: 14,
          position: "relative",
          zIndex: 1,
          opacity: 0.7,
        }}
      >
        This route doesn't exist in the neural network.
      </p>
      <div style={{ position: "relative", zIndex: 1 }}>
        <Btn onClick={() => navigate("/")} variant="primary" t={t}>
          ← Back Home
        </Btn>
      </div>
    </div>
  );
}
