import { Btn } from "../components/UI";

export default function NotFoundPage({ t, navigate }) {
  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex", alignItems: "center",
        justifyContent: "center", flexDirection: "column",
        textAlign: "center", padding: 64,
      }}
    >
      <div style={{ fontSize: 68, marginBottom: 14 }}>🌌</div>
      <h1
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 52, fontWeight: 800,
          color: t.text, marginBottom: 10,
        }}
      >
        404
      </h1>
      <p style={{ color: t.muted, marginBottom: 30 }}>
        This page doesn't exist in our universe.
      </p>
      <Btn onClick={() => navigate("/")} variant="primary" t={t}>
        ← Back Home
      </Btn>
    </div>
  );
}
