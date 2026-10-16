export const NAV_ITEMS = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Projects", path: "/projects" },
  { label: "Experience", path: "/experience" },
  { label: "Contact", path: "/contact" },
];

export const INTERESTS = [
  {
    title: "Applied AI & Machine Learning",
    items: [
      "Large Language Model Architecture & Fine-Tuning",
      "Generative AI",
      "Agentic AI Systems & Tool Use",
      "Retrieval-Augmented Generation (RAG)",
      "Reinforcement Learning for LLM Alignment",
      "Efficient Small Language Models (SLMs)",
    ],
  },
  {
    title: "Natural Language Processing",
    items: [
      "Text Classification",
      "Machine Translation",
      "Sentiment Analysis",
      "Question Answering",
      "Text Summarization",
      "Language Modeling",
      "Speech Recognition",
      "Text Generation",
    ],
  },
  {
    title: "Backend Development",
    items: [
      "Robust RESTful API Development",
      "Scalable Server-Side Architectures",
      "Database Design & Optimization",
      "Secure Authentication & Authorization",
    ],
  },
];

export const PROJECTS = [
  {
    id: "panda",
    title: "PANDA",
    subtitle: "Personalized ADHD Neuro Diagnostic Assessment",
    featured: true,
    year: "2025",
    category: "AI / Healthcare",
    desc: "An AI-driven ADHD screening system providing early indication of ADHD likelihood through DSM-5–based conversational assessment. Developed in collaboration with Lifespring, PANDA reduces traditional diagnostic screening time by ~70–80%, delivering a structured preliminary evaluation within 40–45 minutes.",
    longDesc:
      "PANDA integrates both chat and voice interactions to ensure accessibility, efficiency, and research-backed assessment support. The system uses GPT-4.1 as its backbone, with carefully engineered prompts aligned to clinical DSM-5 criteria. A real-time speech pipeline (STT → LLM → TTS) enables hands-free assessment for users with accessibility needs. Evaluation was conducted using LLM-as-judge methodology across 200+ simulated sessions.",
    tags: [
      "Next.js",
      "TypeScript",
      "Convex",
      "PostgreSQL",
      "OpenAI GPT-4.1",
      "STT",
      "TTS",
      "LLM Evaluation",
      "Conversational AI",
    ],
    github: "#",
    demo: "#",
    highlights: [
      "~75% reduction in screening time",
      "DSM-5 aligned assessment",
      "Voice + Chat interface",
      "LLM evaluation pipeline",
    ],
  },
  {
    id: "physics-rag",
    title: "Physics Educational Chatbot",
    subtitle: "RAG-Based Offline Learning Assistant",
    featured: true,
    year: "2024",
    category: "AI / Education",
    desc: "A lightweight Retrieval-Augmented Generation chatbot for Physics education, designed for offline and low-resource environments. Achieved 75% accuracy on a 4,000-question benchmark using RAGChecker.",
    longDesc:
      "Built to address the digital divide in education, this chatbot runs entirely on-device using quantized SLMs via Ollama. The RAG pipeline retrieves relevant physics concepts from a curated textbook corpus, then generates grounded, accurate answers. Evaluated rigorously with RAGChecker across 4,000 Physics questions spanning mechanics, thermodynamics, electromagnetism, and modern physics.",
    tags: [
      "SLMs",
      "Python",
      "Ollama",
      "LangChain",
      "HuggingFace",
      "FastAPI",
      "Prompt Engineering",
      "Git",
    ],
    github: "#",
    highlights: [
      "75% accuracy on 4,000-Q benchmark",
      "Fully offline capable",
      "RAGChecker evaluation",
      "Low-resource optimized",
    ],
  },
  {
    id: "movie-platform",
    title: "Movie Reservation Platform",
    subtitle: "Agile-Driven Full-Stack System",
    featured: false,
    year: "2024",
    category: "Full-Stack",
    desc: "Engineered a scalable full-stack movie reservation system in a 5-member Agile Scrum team, contributing to both frontend and backend using MVC architecture.",
    longDesc:
      "Built across 4 two-week sprints using Scrum methodology. The platform supports seat selection, booking management, and admin scheduling. Jest unit tests cover core reservation logic with 80%+ coverage. GitHub Wiki documents the full API surface and onboarding guide.",
    tags: ["Node.js", "React", "MongoDB", "Postman", "Jest", "Trello", "JSDoc", "Git"],
    github: "#",
    highlights: [
      "Agile Scrum team of 5",
      "80%+ Jest test coverage",
      "MVC architecture",
      "Full API documentation",
    ],
  },
];

export const SKILLS = [
  { category: "Languages", items: ["Python", "JavaScript", "TypeScript", "C/C++", "Java"] },
  { category: "AI & ML", items: ["PyTorch", "HuggingFace", "LangChain", "NumPy", "Pandas"] },
  { category: "Web Dev", items: ["FastAPI", "Node.js", "REST APIs", "Next.js"] },
  { category: "Database & DevOps", items: ["MySQL", "MongoDB", "Git"] },
];

export const CONTACTS = [
  {
    icon: "✉️",
    label: "Email",
    value: "chakraborty.amit@northsouth.edu",
    href: "mailto:chakraborty.amit@northsouth.edu",
  },
  {
    icon: "🐙",
    label: "GitHub",
    value: "@Amit20111",
    href: "https://github.com/Amit20111",
  },
  {
    icon: "💼",
    label: "LinkedIn",
    value: "amitchakraborty20111",
    href: "https://www.linkedin.com/in/amitchakraborty20111/",
  },
  {
    icon: "📍",
    label: "Location",
    value: "Kuril, Dhaka, Bangladesh",
    href: null,
  },
];
