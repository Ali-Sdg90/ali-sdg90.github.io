// Career Journey images

import csiLogo from "../../assets/images/thumbnails/career/csi_logo.jpg";
import melkRadarLogo from "../../assets/images/thumbnails/career/melkradar_logo.jpg";
import dpaLogo from "../../assets/images/thumbnails/career/dpa_logo.jpg";
import settleitLogo from "../../assets/images/thumbnails/career/settleitgpt_logo.jpg";

// Tech Stack & Tools images
import reactLogo from "../../assets/images/thumbnails/tech-stack/react_logo.png";
import javascriptLogo from "../../assets/images/thumbnails/tech-stack/javascript_logo.png";
import scssLogo from "../../assets/images/thumbnails/tech-stack/scss_logo.png";
import antDesignLogo from "../../assets/images/thumbnails/tech-stack/ant-design_logo.png";
import tanStackQueryLogo from "../../assets/images/thumbnails/tech-stack/tanstack-query_logo.png";
import restApiLogo from "../../assets/images/thumbnails/tech-stack/rest-api_logo.png";
import chartJsLogo from "../../assets/images/thumbnails/tech-stack/chart.js_logo.png";
import firebaseLogo from "../../assets/images/thumbnails/tech-stack/firebase_logo.png";
import gitLogo from "../../assets/images/thumbnails/tech-stack/git_logo.png";
import githubActionsLogo from "../../assets/images/thumbnails/tech-stack/github-actions_logo.png";
import nodejsLogo from "../../assets/images/thumbnails/tech-stack/node.js_logo.png";
import reactNativeLogo from "../../assets/images/thumbnails/tech-stack/react-native_logo.png";
import expoLogo from "../../assets/images/thumbnails/tech-stack/expo_logo.png";
import viteLogo from "../../assets/images/thumbnails/tech-stack/vite_logo.png";
import eslintLogo from "../../assets/images/thumbnails/tech-stack/eslint_logo.png";
import prettierLogo from "../../assets/images/thumbnails/tech-stack/prettier_logo.png";
import huskyLogo from "../../assets/images/thumbnails/tech-stack/husky_logo.png";
import semanticReleaseLogo from "../../assets/images/thumbnails/tech-stack/semantic-release_logo.png";

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
        label: "Tech Stack & Tools",
        rowTop: "56.9%",
        cardHeight: "7.5rem",
        cardWidth: "clamp(5.4rem, 6.1vw, 6.75rem)",
        rotation: { y: 10, z: 0.0 },
        autoScrollSpeed: 20,
        items: [
            { title: "React", image: reactLogo },
            { title: "JavaScript", image: javascriptLogo },
            { title: "SCSS", image: scssLogo },
            { title: "Ant Design", image: antDesignLogo },
            { title: "TanStack Query", image: tanStackQueryLogo },
            { title: "REST APIs", image: restApiLogo },
            { title: "semantic release", image: semanticReleaseLogo },
            { title: "Husky", image: huskyLogo },
            { title: "Prettier", image: prettierLogo },
            { title: "ESLint", image: eslintLogo },
            { title: "Vite", image: viteLogo },
            { title: "Expo", image: expoLogo },
            { title: "React Native", image: reactNativeLogo },
            { title: "Node.js", image: nodejsLogo },
            { title: "GitHub Actions", image: githubActionsLogo },
            { title: "Git/GitHub", image: gitLogo },
            { title: "Firebase", image: firebaseLogo },
            { title: "Chart.js", image: chartJsLogo },
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
