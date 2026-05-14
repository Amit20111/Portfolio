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
      }}
    >
      <h1
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(72px, 12vw, 140px)",
          fontWeight: 700,
          marginBottom: 10,
          color: t.text,
          letterSpacing: -4,
        }}
      >
        404
      </h1>
      <p
        style={{
          color: t.muted,
          marginBottom: 8,
          fontSize: 17,
          fontWeight: 500,
        }}
      >
        Page not found
      </p>
      <p
        style={{
          color: t.muted,
          marginBottom: 30,
          fontSize: 15,
          opacity: 0.7,
        }}
      >
        The page you're looking for doesn't exist.
      </p>
      <Btn onClick={() => navigate("/")} variant="primary" t={t}>
        ← Back Home
      </Btn>
    </div>
  );
}
