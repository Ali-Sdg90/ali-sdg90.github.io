import csiLogo from "../../assets/images/career/cs-internship/cover.thumb.webp";
import melkRadarLogo from "../../assets/images/career/melk-radar/cover.thumb.webp";
import dpaLogo from "../../assets/images/career/dadeh-pardazi-azmoudeh-karan/cover.thumb.webp";
import settleitLogo from "../../assets/images/career/settleit-gpt/cover.thumb.webp";
import csClubThumbnail from "../../assets/images/projects/cs-club-bot/cover.thumb.webp";
import csQueueThumbnail from "../../assets/images/projects/cs-queue-bot/cover.thumb.webp";
import gradientPaintThumbnail from "../../assets/images/projects/gradient-paint/cover.thumb.webp";
import fabrexaThumbnail from "../../assets/images/projects/fabrexa-ai-ollama/cover.thumb.webp";
import healthDataRelayThumbnail from "../../assets/images/projects/health-data-relay/cover.thumb.webp";
import pathFinderThumbnail from "../../assets/images/projects/path-finder/cover.thumb.webp";
import portfolioThumbnail from "../../assets/images/projects/alis-portfolio/cover.thumb.webp";
import quickMathThumbnail from "../../assets/images/projects/quick-math/cover.thumb.webp";
import spotTasteThumbnail from "../../assets/images/projects/spot-taste-tracker/cover.thumb.webp";
import ticTacToeThumbnail from "../../assets/images/projects/tic-tac-toe/cover.thumb.webp";
import csCalendarThumbnail from "../../assets/images/projects/cs-queue-calendar/cover.thumb.webp";
import {
    FaAndroid,
    FaApple,
    FaChalkboardUser,
    FaCodeCommit,
    FaCodePullRequest,
    FaRobot,
    FaToolbox,
    FaUserGraduate,
    FaUsers,
} from "react-icons/fa6";

// Tech Stack & Tools images
import reactLogo from "../../assets/images/tech-stack/react_logo.thumb.webp";
import javascriptLogo from "../../assets/images/tech-stack/javascript_logo.thumb.webp";
import scssLogo from "../../assets/images/tech-stack/scss_logo.thumb.webp";
import antDesignLogo from "../../assets/images/tech-stack/ant-design_logo.thumb.webp";
import tanStackQueryLogo from "../../assets/images/tech-stack/tanstack-query_logo.thumb.webp";
import restApiLogo from "../../assets/images/tech-stack/rest-api_logo.thumb.webp";
import chartJsLogo from "../../assets/images/tech-stack/chart.js_logo.thumb.webp";
import apexChartsLogo from "../../assets/images/tech-stack/apexcharts_logo.thumb.webp";
import firebaseLogo from "../../assets/images/tech-stack/firebase_logo.thumb.webp";
import gitLogo from "../../assets/images/tech-stack/git_logo.thumb.webp";
import githubActionsLogo from "../../assets/images/tech-stack/github-actions_logo.thumb.webp";
import nodejsLogo from "../../assets/images/tech-stack/nodejs_logo.thumb.webp";
import reactNativeLogo from "../../assets/images/tech-stack/react-native_logo.thumb.webp";
import expoLogo from "../../assets/images/tech-stack/expo_logo.thumb.webp";
import viteLogo from "../../assets/images/tech-stack/vite_logo.thumb.webp";
import azureLogo from "../../assets/images/tech-stack/azure_logo.thumb.webp";
import ollamaLogo from "../../assets/images/tech-stack/ollama_logo.thumb.webp";

export const shelfSections = [
    {
        id: "projects",
        label: "Featured Projects",
        rowTop: "19%",
        titleCardHeight: "9cqw",
        cardHeight: "9.38cqw",
        cardWidth: "10.11cqw",
        cardShadow: "shelf-cqw(-3) shelf-cqw(1) 0 shelf-cqw(1) #1c2c45",
        rotation: { y: 10, z: -0.75 },
        autoScrollSpeed: 0,
        doRepeat: false,

        items: [
            {
                id: "alis-portfolio",
                title: "Ali's Portfolio",
                meta: "Interactive portfolio with a shelf-based experience",
                image: portfolioThumbnail,
                imageWidth: 1254,
                imageHeight: 1254,
            },
            {
                id: "health-data-relay",
                title: "Health Data Relay",
                meta: "Android app for backing up health data to Google Drive",
                image: healthDataRelayThumbnail,
                imageWidth: 1254,
                imageHeight: 1254,
            },
            {
                id: "cs-queue-calendar",
                title: "CS Queue Calendar",
                meta: "Interactive calendar to coordinate queue sessions",
                image: csCalendarThumbnail,
                imageWidth: 1254,
                imageHeight: 1254,
            },
            {
                id: "cs-club-bot",
                title: "CS Club Bot",
                meta: "Live Telegram bot for AI-assisted workflows",
                image: csClubThumbnail,
                imageWidth: 774,
                imageHeight: 774,
            },
            {
                id: "fabrexa-ai-ollama",
                title: "Fabrexa AI Ollama",
                meta: "Self-hosted Telegram bot powered by local models",
                image: fabrexaThumbnail,
                imageWidth: 1254,
                imageHeight: 1254,
            },
            {
                id: "cs-queue-bot",
                title: "CS Queue Bot",
                meta: "Live Telegram bot for queue management",
                image: csQueueThumbnail,
                imageWidth: 774,
                imageHeight: 774,
            },
            {
                id: "spot-taste-tracker",
                title: "Spot Taste Tracker",
                meta: "Dashboard for analyzing Spotify taste over time",
                image: spotTasteThumbnail,
                imageWidth: 1254,
                imageHeight: 1254,
            },
            {
                id: "path-finder",
                title: "Path Finder",
                meta: "Customizable animated pathfinding sandbox",
                image: pathFinderThumbnail,
                imageWidth: 1254,
                imageHeight: 1254,
            },
            {
                id: "gradient-paint",
                title: "Gradient Paint",
                meta: "Customizable interactive gradient painting canvas",
                image: gradientPaintThumbnail,
                imageWidth: 1254,
                imageHeight: 1254,
            },
            {
                id: "quick-math",
                title: "Quick Math",
                meta: "Timed math game with a rotating cube interface",
                image: quickMathThumbnail,
                imageWidth: 1254,
                imageHeight: 1254,
            },
            {
                id: "tic-tac-toe",
                title: "Tic Tac Toe",
                meta: "Customizable game with multiple play modes",
                image: ticTacToeThumbnail,
                imageWidth: 1254,
                imageHeight: 1254,
            },
        ],
    },
    {
        id: "achievements",
        label: "Impact in Numbers",
        rowTop: "38.8%",
        titleCardHeight: "8.6cqw",
        cardHeight: "8.75cqw",
        cardWidth: "9.64cqw",
        cardShadow: "shelf-cqw(-3) shelf-cqw(0) 0 shelf-cqw(1) #1c2c45",
        rotation: { y: 10, z: -0.5 },
        autoScrollSpeed: 16,
        doRepeat: true,
        items: [
            {
                id: "interns-mentored",
                title: "25+",
                meta: "Interns mentored in web development",
                icon: FaUserGraduate,
            },
            {
                id: "developers-onboarded",
                title: "11",
                meta: "developers onboarded across projects",
                icon: FaUsers,
            },
            {
                id: "technical-sessions",
                title: "30+",
                meta: "Technical sessions led",
                icon: FaChalkboardUser,
            },

            {
                id: "telegram-bots",
                title: "6",
                meta: "Telegram bots built",
                icon: FaRobot,
            },
            {
                id: "internal-tools",
                title: "9",
                meta: "Internal tools shipped",
                icon: FaToolbox,
            },
            {
                id: "android-app-shipped",
                title: "2",
                meta: "Android apps shipped",
                icon: FaAndroid,
            },
            {
                id: "ios-app-shipped",
                title: "1",
                meta: "iOS app shipped",
                icon: FaApple,
            },

            {
                id: "pull-requests-reviewed",
                title: "376+",
                meta: "Internal pull requests reviewed",
                icon: FaCodePullRequest,
            },
            {
                id: "open-source-commits",
                title: "603+",
                meta: "Commits to open-source repositories",
                icon: FaCodeCommit,
            },
        ],
    },
    {
        id: "tech-stack",
        label: "Tech Stack & Tools",
        rowTop: "56.9%",
        titleCardHeight: "7.66cqw",
        cardHeight: "7.81cqw",
        cardWidth: "7.03cqw",
        cardShadow: "shelf-cqw(-3) shelf-cqw(0) 0 shelf-cqw(1) #1c2c45",
        rotation: { y: 10, z: 0.0 },
        autoScrollSpeed: 24,
        doRepeat: true,
        items: [
            { id: "react", title: "React", image: reactLogo },
            { id: "javascript", title: "JavaScript", image: javascriptLogo },
            { id: "scss", title: "SCSS", image: scssLogo },
            { id: "ant-design", title: "Ant Design", image: antDesignLogo },
            {
                id: "tan-stack-query",
                title: "TanStack Query",
                image: tanStackQueryLogo,
            },
            { id: "rest-apis", title: "REST APIs", image: restApiLogo },
            { id: "vite", title: "Vite", image: viteLogo },
            { id: "expo", title: "Expo", image: expoLogo },
            {
                id: "react-native",
                title: "React Native",
                image: reactNativeLogo,
            },
            { id: "node-js", title: "Node.js", image: nodejsLogo },
            {
                id: "github-actions",
                title: "GitHub Actions",
                image: githubActionsLogo,
            },
            { id: "git-github", title: "Git/GitHub", image: gitLogo },
            { id: "firebase", title: "Firebase", image: firebaseLogo },
            { id: "chart-js", title: "Chart.js", image: chartJsLogo },
            {
                id: "apex-charts",
                title: "ApexCharts",
                image: apexChartsLogo,
                imageWidth: 300,
                imageHeight: 300,
            },
            { id: "ollama", title: "Ollama", image: ollamaLogo },
            { id: "azure-devops", title: "Azure DevOps", image: azureLogo },
        ],
    },
    {
        id: "career-journey",
        label: "Career Journey",
        rowTop: "74%",
        titleCardHeight: "7.5cqw",
        cardHeight: "7.29cqw",
        cardWidth: "9.9cqw",
        cardShadow: "shelf-cqw(-3) shelf-cqw(-1) 0 shelf-cqw(1) #1c2c45",
        rotation: { y: 8.5, z: 0.0 },
        autoScrollSpeed: 0,
        doRepeat: false,
        items: [
            {
                id: "cs-internship",
                title: "CS Internship",
                company: "CS Internship",
                meta: "Technical Mentor & System Designer",
                year: "2023 - 2026",
                image: csiLogo,
            },
            {
                id: "melk-radar",
                title: "MelkRadar",
                company: "MelkRadar",
                meta: "Front-End Technical Lead",
                year: "2023 - 2025",
                image: melkRadarLogo,
            },
            {
                id: "dadeh-pardazi-azmoudeh-karan",
                title: "Dadeh Pardazi Azmoudeh Karan",
                company: "Dadeh Pardazi Azmoudeh Karan",
                meta: "React Developer",
                year: "2024 - 2025",
                image: dpaLogo,
            },
            {
                id: "settleit-gpt",
                title: "SettleitGPT",
                company: "SettleitGPT",
                meta: "React Native Developer",
                year: "2025 - 2026",
                image: settleitLogo,
            },
        ],
    },
];
