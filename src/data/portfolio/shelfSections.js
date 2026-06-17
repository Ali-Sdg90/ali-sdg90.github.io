import csiLogo from "../../assets/images/thumbnails/career/csi_logo.jpg";
import melkRadarLogo from "../../assets/images/thumbnails/career/melkradar_logo.jpg";
import dpaLogo from "../../assets/images/thumbnails/career/dpa_logo.jpg";
import settleitLogo from "../../assets/images/thumbnails/career/settleitgpt_logo.jpg";

export const shelfSections = [
    {
        id: "projects",
        label: "Featured Projects",
        rowTop: "19%",
        cardHeight: "9rem",
        cardWidth: "clamp(7.875rem, 9.03vw, 9.71rem)",
        rotation: { y: 10, z: -0.75 },
        autoScrollSpeed: 0,
        items: [
            {
                title: "Ali’s Portfolio",
                meta: "Interactive portfolio with a 3D shelf experience",
            },
            {
                title: "Fabrexa AI Ollama",
                meta: "Local Telegram AI chatbot powered by Ollama",
            },
            {
                title: "Restook Admin",
                meta: "Production admin panel for platform management",
            },
            {
                title: "Path Finder",
                meta: "Customizable animated pathfinding sandbox",
            },
            {
                title: "CS Queue Calendar",
                meta: "Live calendar for CS Internship session planning",
            },
            {
                title: "CS Club Bot",
                meta: "Live Telegram bot for AI-assisted workflows",
            },
            {
                title: "CS Queue Bot",
                meta: "Live Telegram bot for queue management",
            },
            {
                title: "Dice Distribution",
                meta: "Configurable dice probability simulator",
            },
            {
                title: "RPS Battle Royale",
                meta: "Rock-paper-scissors battle royale simulator",
            },
            {
                title: "Gradient Paint",
                meta: "Customizable interactive gradient painting canvas",
            },
            {
                title: "Quick Math",
                meta: "Timed math game with a rotating cube interface",
            },
            {
                title: "Tic Tac Toe",
                meta: "Customizable game with multiple play modes",
            },
        ],
    },
    {
        id: "achievements",
        label: "Things I've Built",
        rowTop: "38.8%",
        cardHeight: "8.4rem",
        cardWidth: "clamp(7.5rem, 8.6vw, 9.25rem)",
        rotation: { y: 10, z: -0.5 },
        autoScrollSpeed: 6,
        items: [
            { title: "50+", meta: "Charts delivered" },
            { title: "60+", meta: "APIs integrated" },
            { title: "6", meta: "Internal products" },
            { title: "5", meta: "Automation tools" },
            { title: "12", meta: "Dashboards shipped" },
            { title: "30+", meta: "UI components" },
        ],
    },
    {
        id: "tech-stack",
        label: "Tech Stack",
        rowTop: "56.9%",
        cardHeight: "7.5rem",
        cardWidth: "clamp(5.4rem, 6.1vw, 6.75rem)",
        rotation: { y: 10, z: 0.0 },
        autoScrollSpeed: 8,
        items: [
            { title: "React", meta: "UI systems" },
            { title: "JavaScript", meta: "App logic" },
            { title: "TypeScript", meta: "Typed flows" },
            { title: "SCSS", meta: "Design styles" },
            { title: "Node.js", meta: "Backend tooling" },
            { title: "REST APIs", meta: "Service contracts" },
            { title: "Vite", meta: "Fast builds" },
        ],
    },
    {
        id: "career-journey",
        label: "Career Journey",
        rowTop: "74%",
        cardHeight: "7rem",
        cardWidth: "clamp(7.5rem, 8.6vw, 9.25rem)",
        rotation: { y: 8.5, z: 0.0 },
        autoScrollSpeed: 0,
        items: [
            {
                title: "CS Internship",
                meta: "2023 — 2026",
                image: csiLogo,
            },
            {
                title: "MelkRadar",
                meta: "2023 — 2026",
                image: melkRadarLogo,
            },
            {
                title: "Dadeh Pardazi",
                meta: "2024 — 2025",
                image: dpaLogo,
            },
            {
                title: "SettleitGPT",
                meta: "2025 — 2026",
                image: settleitLogo,
            },
        ],
    },
];
