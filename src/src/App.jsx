import { useState, useEffect, useRef } from "react";
import { themes } from "./data/themes";
import { useRouter } from "./hooks/useRouter";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ExperiencePage from "./pages/ExperiencePage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";
import "./styles/global.css";

// ── Route matcher ─────────────────────────────────────────────────────────────
function RouterOutlet({ path, t, navigate }) {
  if (path === "/" || path === "") return <HomePage t={t} navigate={navigate} />;
  if (path === "/about")           return <AboutPage t={t} navigate={navigate} />;
  if (path === "/projects")        return <ProjectsPage t={t} navigate={navigate} />;
  if (path === "/experience")      return <ExperiencePage t={t} />;
  if (path === "/contact")         return <ContactPage t={t} />;
  if (path.startsWith("/projects/"))
    return <ProjectDetailPage t={t} navigate={navigate} projectId={path.replace("/projects/", "")} />;
  return <NotFoundPage t={t} navigate={navigate} />;
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [mode, setMode]           = useState("dark");
  const [pageVisible, setPageVisible] = useState(true);
  const { path, navigate }        = useRouter();
  const t                         = themes[mode];
  const prevPath                  = useRef(path);

  // Page-transition fade
  useEffect(() => {
    if (prevPath.current !== path) {
      setPageVisible(false);
      const timer = setTimeout(() => {
        setPageVisible(true);
        prevPath.current = path;
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [path]);

  return (
    <div
      style={{
        background: t.bg,
        color: t.text,
        minHeight: "100vh",
        transition: "background 0.3s, color 0.3s",
      }}
    >
      <Nav
        t={t}
        mode={mode}
        toggleMode={() => setMode((m) => (m === "dark" ? "light" : "dark"))}
        navigate={navigate}
        currentPath={path}
      />

      <div style={{ opacity: pageVisible ? 1 : 0, transition: "opacity 0.12s ease" }}>
        <RouterOutlet path={path} t={t} navigate={navigate} />
        <Footer t={t} navigate={navigate} />
      </div>
    </div>
  );
}
