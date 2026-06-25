// Career Journey images

import csiLogo from "../../assets/images/thumbnails/career/csi_logo.jpg";
import melkRadarLogo from "../../assets/images/thumbnails/career/melkradar_logo.jpg";
import dpaLogo from "../../assets/images/thumbnails/career/dpa_logo.jpg";
import settleitLogo from "../../assets/images/thumbnails/career/settleitgpt_logo.jpg";

// Tech Stack & Tools images
import reactLogo from "../../assets/images/thumbnails/tech-stack/react_logo.jpg";
import javascriptLogo from "../../assets/images/thumbnails/tech-stack/javascript_logo.jpg";
import scssLogo from "../../assets/images/thumbnails/tech-stack/scss_logo.jpg";
import antDesignLogo from "../../assets/images/thumbnails/tech-stack/ant-design_logo.jpg";
import tanStackQueryLogo from "../../assets/images/thumbnails/tech-stack/tanstack-query_logo.jpg";
import restApiLogo from "../../assets/images/thumbnails/tech-stack/rest-api_logo.jpg";
import chartJsLogo from "../../assets/images/thumbnails/tech-stack/chart.js_logo.jpg";
import firebaseLogo from "../../assets/images/thumbnails/tech-stack/firebase_logo.jpg";
import gitLogo from "../../assets/images/thumbnails/tech-stack/git_logo.jpg";
import githubActionsLogo from "../../assets/images/thumbnails/tech-stack/github-actions_logo.jpg";
import nodejsLogo from "../../assets/images/thumbnails/tech-stack/nodejs_logo.jpg";
import reactNativeLogo from "../../assets/images/thumbnails/tech-stack/react-native_logo.jpg";
import expoLogo from "../../assets/images/thumbnails/tech-stack/expo_logo.jpg";
import viteLogo from "../../assets/images/thumbnails/tech-stack/vite_logo.jpg";
import eslintLogo from "../../assets/images/thumbnails/tech-stack/eslint_logo.jpg";
import prettierLogo from "../../assets/images/thumbnails/tech-stack/prettier_logo.jpg";
import huskyLogo from "../../assets/images/thumbnails/tech-stack/husky_logo.jpg";
import semanticReleaseLogo from "../../assets/images/thumbnails/tech-stack/semantic-release_logo.jpg";

export const shelfSections = [
    {
        id: "projects",
        label: "Featured Projects",
        rowTop: "19%",
        cardHeight: "9.38cqw",
        cardWidth: "10.11cqw",
        rotation: { y: 10, z: -0.75 },

        // autoScrollSpeed: 10,
        // doRepeat: true,

        // For test
        autoScrollSpeed: 0,
        doRepeat: false,

        items: [
            {
                title: "Ali’s Portfolio",
                meta: "Interactive portfolio with a 3D shelf experience",
            },
            {
                title: "Spot Taste Tracker",
                meta: "Dashboard for analyzing Spotify taste over time",
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
                title: "SettleitGPT",
                meta: "iOS app with AI personas and voice generation",
            },
            {
                title: "Path Finder",
                meta: "Customizable animated pathfinding sandbox",
            },
            {
                title: "Tic Tac Toe",
                meta: "Customizable game with multiple play modes",
            },
            {
                title: "Quick Math",
                meta: "Timed math game with a rotating cube interface",
            },
            {
                title: "Gradient Paint",
                meta: "Customizable interactive gradient painting canvas",
            },
            {
                title: "RPS Battle Royale",
                meta: "Rock-paper-scissors battle royale simulator",
            },
            {
                title: "Dice Distribution",
                meta: "Configurable dice probability simulator",
            },
            {
                title: "CS Queue Bot",
                meta: "Live Telegram bot for queue management",
            },
            {
                title: "CS Club Bot",
                meta: "Live Telegram bot for AI-assisted workflows",
            },
            {
                title: "CS Queue Calendar",
                meta: "Live calendar for CS Internship session planning",
            },
        ],
    },
    {
        id: "achievements",
        label: "Things I've Built",
        rowTop: "38.8%",
        cardHeight: "8.75cqw",
        cardWidth: "9.64cqw",
        rotation: { y: 10, z: -0.5 },
        autoScrollSpeed: 16,
        doRepeat: true,
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
        cardHeight: "7.81cqw",
        cardWidth: "7.03cqw",
        rotation: { y: 10, z: 0.0 },
        autoScrollSpeed: 24,
        doRepeat: true,
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
        cardHeight: "7.29cqw",
        cardWidth: "9.9cqw",
        rotation: { y: 8.5, z: 0.0 },
        autoScrollSpeed: 0,
        doRepeat: false,
        items: [
            {
                title: "CS Internship",
                company: "CS Internship",
                meta: "Technical Mentor & System Designer",
                year: "2023 - 2026",
                image: csiLogo,
            },
            {
                title: "MelkRadar",
                company: "MelkRadar",
                meta: "Front-End Developer & Reviewer",
                year: "2023 - 2026",
                image: melkRadarLogo,
            },
            {
                title: "Dadeh Pardazi Azmoudeh Karan",
                company: "Dadeh Pardazi Azmoudeh Karan",
                meta: "React Developer",
                year: "2024 - 2025",
                image: dpaLogo,
            },
            {
                title: "SettleitGPT",
                company: "SettleitGPT",
                meta: "React Native Developer",
                year: "2025 - 2026",
                image: settleitLogo,
            },
        ],
    },
];
