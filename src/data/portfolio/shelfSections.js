import csiLogo from "../../assets/images/thumbnails/career/csi_logo.jpg";
import melkRadarLogo from "../../assets/images/thumbnails/career/melkradar_logo.jpg";
import dpaLogo from "../../assets/images/thumbnails/career/dpa_logo.jpg";
import settleitLogo from "../../assets/images/thumbnails/career/settleitgpt_logo.jpg";
import csClubThumbnail from "../../assets/images/thumbnails/projects/cs-club.jpg";
import csQueueThumbnail from "../../assets/images/thumbnails/projects/cs-queue.jpg";
import gradientPaintThumbnail from "../../assets/images/thumbnails/projects/cgp.jpg";
import fabrexaThumbnail from "../../assets/images/thumbnails/projects/fabrexa.jpg";
import healthDataRelayThumbnail from "../../assets/images/thumbnails/projects/health-data-relay.jpg";
import pathFinderThumbnail from "../../assets/images/thumbnails/projects/path-finder.jpg";
import portfolioThumbnail from "../../assets/images/thumbnails/projects/portfolio.jpg";
import quickMathThumbnail from "../../assets/images/thumbnails/projects/quick-math.jpg";
import spotTasteThumbnail from "../../assets/images/thumbnails/projects/spot.jpg";
import ticTacToeThumbnail from "../../assets/images/thumbnails/projects/xo.jpg";
import csCalendarThumbnail from "../../assets/images/thumbnails/projects/cs-calender.jpg";
// import mlkDvrBotThumbnail from "../../assets/images/thumbnails/projects/mlk-dvr-bot.jpg";
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
import reactLogo from "../../assets/images/thumbnails/tech-stack/react_logo.jpg";
import javascriptLogo from "../../assets/images/thumbnails/tech-stack/javascript_logo.jpg";
import scssLogo from "../../assets/images/thumbnails/tech-stack/scss_logo.jpg";
import antDesignLogo from "../../assets/images/thumbnails/tech-stack/ant-design_logo.jpg";
import tanStackQueryLogo from "../../assets/images/thumbnails/tech-stack/tanstack-query_logo.jpg";
import restApiLogo from "../../assets/images/thumbnails/tech-stack/rest-api_logo.jpg";
import chartJsLogo from "../../assets/images/thumbnails/tech-stack/chart.js_logo.jpg";
import apexChartsLogo from "../../assets/images/thumbnails/tech-stack/apexcharts_logo.svg";
import firebaseLogo from "../../assets/images/thumbnails/tech-stack/firebase_logo.jpg";
import gitLogo from "../../assets/images/thumbnails/tech-stack/git_logo.jpg";
import githubActionsLogo from "../../assets/images/thumbnails/tech-stack/github-actions_logo.jpg";
import nodejsLogo from "../../assets/images/thumbnails/tech-stack/nodejs_logo.jpg";
import reactNativeLogo from "../../assets/images/thumbnails/tech-stack/react-native_logo.jpg";
import expoLogo from "../../assets/images/thumbnails/tech-stack/expo_logo.jpg";
import viteLogo from "../../assets/images/thumbnails/tech-stack/vite_logo.jpg";
import azureLogo from "../../assets/images/thumbnails/tech-stack/azure_logo.jpg";
import ollamaLogo from "../../assets/images/thumbnails/tech-stack/ollama_logo.jpg";

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
                meta: "Local Telegram AI chatbot powered by Ollama",
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
