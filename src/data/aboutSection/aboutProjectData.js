import gradientPaintLarge from "../../assets/images/large-images/projects/cgp.png";
import csClubLarge from "../../assets/images/large-images/projects/cs-club.png";
import csQueueLarge from "../../assets/images/large-images/projects/cs-queue.png";
import fabrexaLarge from "../../assets/images/large-images/projects/fabrexa.png";
import healthDataRelayLarge from "../../assets/images/large-images/projects/health-data-relay.png";
import pathFinderLarge from "../../assets/images/large-images/projects/path-finder.png";
import portfolioLarge from "../../assets/images/large-images/projects/portfolio.png";
import quickMathLarge from "../../assets/images/large-images/projects/quick-math.png";
import spotTasteLarge from "../../assets/images/large-images/projects/spot.png";
import ticTacToeLarge from "../../assets/images/large-images/projects/xo.png";
import csCalendarLarge from "../../assets/images/large-images/projects/cs-calender.png";
import mlkDvrBotLarge from "../../assets/images/large-images/projects/mlk-dvr-bot.png";
import gradientPaintThumbnail from "../../assets/images/thumbnails/projects/cgp.jpg";
import csClubThumbnail from "../../assets/images/thumbnails/projects/cs-club.jpg";
import csQueueThumbnail from "../../assets/images/thumbnails/projects/cs-queue.jpg";
import fabrexaThumbnail from "../../assets/images/thumbnails/projects/fabrexa.jpg";
import healthDataRelayThumbnail from "../../assets/images/thumbnails/projects/health-data-relay.jpg";
import pathFinderThumbnail from "../../assets/images/thumbnails/projects/path-finder.jpg";
import portfolioThumbnail from "../../assets/images/thumbnails/projects/portfolio.jpg";
import quickMathThumbnail from "../../assets/images/thumbnails/projects/quick-math.jpg";
import spotTasteThumbnail from "../../assets/images/thumbnails/projects/spot.jpg";
import ticTacToeThumbnail from "../../assets/images/thumbnails/projects/xo.jpg";
import csCalendarThumbnail from "../../assets/images/thumbnails/projects/cs-calender.jpg";
import mlkDvrBotThumbnail from "../../assets/images/thumbnails/projects/mlk-dvr-bot.jpg";
import { projectGalleryImages } from "./projectGalleryData";
import projectCsQueueCalendarStoryEN from "../stories/en/projects/cs-queue-calendar.md?raw";
import projectCsQueueCalendarStoryFA from "../stories/fa/projects/cs-queue-calendar.md?raw";

export const aboutProjectData = {
    "alis-portfolio": {
        id: "alis-portfolio",
        title: "Ali's Portfolio",
        subtitle: "Interactive portfolio with a shelf-based experience",
        year: "2026",
        image: portfolioThumbnail,
        lightboxImage: portfolioLarge,
        imageWidth: 1254,
        imageHeight: 1254,
        lightboxWidth: 1254,
        lightboxHeight: 1254,
        summary:
            "An interactive, shelf-inspired portfolio presenting projects, skills, career milestones, and a bilingual build journal in a focused 3D experience.",
        links: [
            { label: "Live Version", url: "https://ali-sdg90.github.io" },
            {
                label: "GitHub Repo",
                url: "https://github.com/Ali-Sdg90/ali-sdg90.github.io",
            },
        ],
        tech: ["React 19", "Vite 8", "SCSS", "Framer Motion", "GitHub Pages"],
        features: [
            "Custom shelf navigation with drag momentum, friction, and infinite scrolling",
            "Reusable data system for projects, skills, career history, and impact metrics",
            "Project panels with image galleries, lightboxes, external links, and bilingual stories",
            "A 26-chapter build journal with keyboard and reduced-motion support",
        ],
        galleryImages: projectGalleryImages["alis-portfolio"],
        storyEN: "placeholder: see the bottom-right corner of the page",
        storyFA: "Placeholder",
        hasRelatedLinks: true,
        relatedLinks: [
            {
                label: "Engineering",
                text: "CI/CD, PR previews, semantic releases, and GitHub Pages deployment",
                url: "https://github.com/Ali-Sdg90/ali-sdg90.github.io/blob/main/.github/workflows/ci.yml",
            },
            {
                label: "Release History",
                text: "Versioned changelog generated from the release workflow",
                url: "https://github.com/Ali-Sdg90/ali-sdg90.github.io/blob/main/CHANGELOG.md",
            },
        ],
    },
    "health-data-relay": {
        id: "health-data-relay",
        title: "Health Data Relay",
        subtitle: "Android app for backing up health data to Google Drive",
        year: "2026",
        image: healthDataRelayThumbnail,
        lightboxImage: healthDataRelayLarge,
        imageWidth: 1254,
        imageHeight: 1254,
        lightboxWidth: 1254,
        lightboxHeight: 1254,
        summary:
            "A privacy-focused Android app that creates a seamless, automated pipeline from selected Health Connect records to compact daily JSON summaries stored directly in a user-owned Google Drive folder.",
        links: [
            {
                label: "App Website",
                url: "https://ali-sdg.is-a.dev/health-data-relay/",
            },
            {
                label: "GitHub Repo",
                url: "https://github.com/Ali-Sdg90/health-data-relay",
            },
        ],
        tech: [
            "Kotlin",
            "Jetpack Compose",
            "Material 3",
            "Health Connect",
            "WorkManager",
            "DataStore",
            "Google Drive API",
        ],
        features: [
            "Creates compact daily JSON summaries from selected Health Connect data",
            "Runs automatic daily backups with optional manual backups",
            "Retries failures and fills in missing recent backups",
            "Processes data on-device and uploads directly to Google Drive",
            "Supports English, Persian, Jalali dates, and configurable data categories",
        ],
        galleryImages: projectGalleryImages["health-data-relay"],
        storyEN: "",
        storyFA: "",
        hasRelatedLinks: true,
        relatedLinks: [
            {
                label: "APKPure",
                text: "Download the latest Health Data Relay release",
                url: "https://apkpure.com/p/com.alisadeghi.autohealthsync",
            },
            {
                label: "Cafe Bazaar",
                text: "Download the latest Health Data Relay release",
                url: "https://cafebazaar.ir/app/com.alisadeghi.autohealthsync",
            },
            {
                label: "GitHub Releases",
                text: "Download versioned APK releases from GitHub",
                url: "https://github.com/Ali-Sdg90/health-data-relay/releases",
            },
            {
                label: "Privacy Policy",
                text: "How health data and permissions are handled",
                url: "https://ali-sdg.is-a.dev/health-data-relay/privacy/",
            },
            {
                label: "Changelog",
                text: "Version history, fixes, and improvements",
                url: "https://github.com/Ali-Sdg90/health-data-relay/blob/main/CHANGELOG.md",
            },
        ],
    },
    "mlk-dvr-receiver": {
        id: "mlk-dvr-receiver",
        title: "MLK DVR Receiver",
        subtitle: "Automated and secure Divar verification code delivery",
        year: "2026",
        image: mlkDvrBotThumbnail,
        lightboxImage: mlkDvrBotLarge,
        imageWidth: 1254,
        imageHeight: 1254,
        lightboxWidth: 1254,
        lightboxHeight: 1254,
        summary:
            "An Android-to-Telegram delivery system that captures Divar verification SMS messages and routes each code privately through a secure Node.js backend.",
        links: [
            {
                label: "GitHub Repo",
                url: "https://github.com/Ali-Sdg90/mlk-dvr-receiver",
            },
        ],
        tech: [
            "Kotlin",
            "Android SDK",
            "Node.js",
            "Express",
            "Telegram Bot API",
        ],
        features: [
            "Automates the Divar verification code workflow from SMS reception to private Telegram delivery",
            "Matches each verification code to the correct active requester and keeps codes out of group chats",
            "Creates a traceable history of code requests and delivery outcomes for accountability and auditing",
            "Built for reliable unattended operation with background recovery, authenticated backend communication, and automated delivery",
            "Automatically delivered 212 codes in its first 14 days, 2.86 times the 74 codes shared manually during the previous 14-day period",
        ],
        galleryImages: projectGalleryImages["mlk-dvr-receiver"],
        storyEN: "",
        storyFA: "",
        hasRelatedLinks: true,
        relatedLinks: [
            {
                label: "Telegram",
                text: "Open the MLK DVR Receiver bot",
                url: "https://t.me/mlk_dvr_sms_bot",
            },
            {
                label: "Deployment",
                text: "Deployment and security guide",
                url: "https://github.com/Ali-Sdg90/mlk-dvr-receiver/blob/main/docs/DEPLOYMENT.md",
            },
            {
                label: "Onboarding Video",
                text: "Installation and usage walkthrough",
                url: "https://youtu.be/_IXXjlE-Cyg?si=YTcUeUdOdqjAaL5N",
            },
            {
                label: "Process Flowcharts - EN",
                text: "System architecture and flow in English",
                url: "https://github.com/Ali-Sdg90/mlk-dvr-receiver/blob/main/docs/system-flow.md",
            },
            {
                label: "Process Flowcharts - FA",
                text: "System architecture and flow in Farsi",
                url: "https://github.com/Ali-Sdg90/mlk-dvr-receiver/blob/main/docs/system-flow-fa.md",
            },
        ],
    },
    "cs-queue-calendar": {
        id: "cs-queue-calendar",
        title: "CS Queue Calendar",
        subtitle: "Interactive calendar to coordinate queue sessions",
        year: "2025",
        image: csCalendarThumbnail,
        lightboxImage: csCalendarLarge,
        imageWidth: 1254,
        imageHeight: 1254,
        lightboxWidth: 1254,
        lightboxHeight: 1254,
        summary:
            "A responsive calendar for tracking CS Internship queue meetings, announcements, and events with Persian and Gregorian date support.",
        links: [
            {
                label: "Live Version",
                url: "https://cs-internship.github.io/CS-Queue-Calendar",
            },
            {
                label: "GitHub Repo",
                url: "https://github.com/cs-internship/CS-Queue-Calendar",
            },
        ],
        tech: ["React", "Ant Design", "Sass", "Day.js", "Jalali Moment"],
        features: [
            "Displays both Jalali and Gregorian dates for scheduled sessions",
            "Creates ready-to-share weekly announcements for queue admins",
            "Adds full event details to Google Calendar with one click",
            "Uses automated tests, coverage reports, releases, deployment, and Telegram build alerts",
        ],
        galleryImages: projectGalleryImages["cs-queue-calendar"],

        storyEN: projectCsQueueCalendarStoryEN.trim(),

        storyFA: projectCsQueueCalendarStoryFA.trim(),
        storySource: {
            collection: "projects",
            slug: "cs-queue-calendar",
        },

        hasRelatedLinks: true,
        relatedLinks: [
            {
                label: "CI/CD Pipeline",
                text: "Tests, releases, deployment, and Telegram alerts",
                url: "https://github.com/cs-internship/CS-Queue-Calendar/blob/main/.github/workflows/ci.yml",
            },
            {
                label: "Release History",
                text: "Versioned project changelog",
                url: "https://github.com/cs-internship/CS-Queue-Calendar/blob/main/CHANGELOG.md",
            },
        ],
    },
    "spot-taste-tracker": {
        id: "spot-taste-tracker",
        title: "Spot Taste Tracker",
        subtitle: "Dashboard for analyzing Spotify taste over time",
        year: "2026",
        image: spotTasteThumbnail,
        lightboxImage: spotTasteLarge,
        imageWidth: 1254,
        imageHeight: 1254,
        lightboxWidth: 1254,
        lightboxHeight: 1254,
        summary:
            "A browser-based dashboard for exploring how a Spotify collection changes across listening order, mood, genres, artists, and audio features.",
        links: [
            {
                label: "Live Version",
                url: "https://ali-sdg90.github.io/Spotify-Taste-Timeline",
            },
            {
                label: "GitHub Repo",
                url: "https://github.com/Ali-Sdg90/Spotify-Taste-Timeline",
            },
        ],
        tech: [
            "React",
            "Vite",
            "JavaScript",
            "SCSS",
            "ApexCharts",
            "PapaParse",
        ],
        features: [
            "Analyzes playlist CSV files inside the browser without uploading personal data",
            "Shows music changes over time with two timelines and moving averages for 11 audio features",
            "Compares mood, artists, genres, release age, explicit content, Camelot data, and outliers",
            "Creates an AI-ready report from summary data instead of the full listening history",
        ],
        galleryImages: projectGalleryImages["spot-taste-tracker"],
        storyEN: "Placeholder",
        storyFA: "Placeholder",
        hasRelatedLinks: true,
        relatedLinks: [
            {
                label: "CSV Tool",
                text: "Chosic Spotify Playlist Analyzer",
                url: "https://www.chosic.com/spotify-playlist-analyzer/",
            },
            {
                label: "Deployment",
                text: "Automated GitHub Pages build and deployment workflow",
                url: "https://github.com/Ali-Sdg90/Spotify-Taste-Timeline/blob/main/.github/workflows/deploy-pages.yml",
            },
        ],
    },
    "fabrexa-ai-ollama": {
        id: "fabrexa-ai-ollama",
        title: "Fabrexa AI Ollama",
        subtitle: "Local Telegram AI chatbot powered by Ollama",
        year: "2026",
        image: fabrexaThumbnail,
        lightboxImage: fabrexaLarge,
        imageWidth: 1254,
        imageHeight: 1254,
        lightboxWidth: 1254,
        lightboxHeight: 1254,
        summary:
            "A self-hosted Telegram chatbot that runs local Ollama models with configurable personalities, persistent memory, and streaming responses.",
        links: [
            {
                label: "GitHub Repo",
                url: "https://github.com/Ali-Sdg90/Fabrexa-AI-Ollama",
            },
            {
                label: "Telegram Bot",
                url: "https://t.me/FabrexaAIBot",
            },
        ],
        tech: ["Node.js", "Telegraf", "Ollama", "node-cron", "Axios"],
        features: [
            "Runs AI locally with Ollama, with no cloud model costs",
            "Supports reusable personalities and saves each user's selected persona",
            "Keeps short- and long-term memory and summarizes older conversations automatically",
            "Streams replies in Telegram and supports private or public access",
        ],
        galleryImages: projectGalleryImages["fabrexa-ai-ollama"],
        storyEN: "Placeholder",
        storyFA: "Placeholder",
        hasRelatedLinks: true,
        relatedLinks: [
            {
                label: "Architecture",
                text: "System design, message pipeline, memory model, and module reference",
                url: "https://github.com/Ali-Sdg90/Fabrexa-AI-Ollama/blob/main/docs/ARCHITECTURE.md",
            },
            {
                label: "Documentation",
                text: "Detailed guide to personalities, memory, streaming, and model controls",
                url: "https://github.com/Ali-Sdg90/Fabrexa-AI-Ollama/blob/main/docs/FEATURES.md",
            },
            {
                label: "Setup",
                text: "Quick-start guide for running the bot with a local Ollama model",
                url: "https://github.com/Ali-Sdg90/Fabrexa-AI-Ollama/blob/main/QUICK_START.md",
            },
        ],
    },
    "cs-club-bot": {
        id: "cs-club-bot",
        title: "CS Club Bot",
        subtitle: "Live Telegram bot for AI-assisted workflows",
        year: "2025",
        image: csClubThumbnail,
        lightboxImage: csClubLarge,
        imageWidth: 774,
        imageHeight: 774,
        lightboxWidth: 774,
        lightboxHeight: 774,
        summary:
            "An automated Telegram bot for managing CS internship club registration, feedback, messaging, and AI-assisted group workflows.",
        links: [
            { label: "Telegram Bot", url: "https://t.me/CSIClubBot" },
            {
                label: "GitHub Repo",
                url: "https://github.com/cs-internship/CS-Club-Bot",
            },
        ],
        tech: [
            "Node.js",
            "Telegraf",
            "Express",
            "Notion API",
            "Perplexity AI",
            "CryptoJS",
        ],
        features: [
            "Uses Notion for registration, roles, and ban checks",
            "Creates encrypted feedback links for technical and mentorship sessions",
            "Uses Perplexity AI to analyze selected group discussions and format long Telegram replies",
            "Runs linting and Jest coverage before automatic releases and Render deployment",
        ],
        galleryImages: projectGalleryImages["cs-club-bot"],
        storyEN: "Placeholder",
        storyFA: "Placeholder",
        hasRelatedLinks: true,
        relatedLinks: [
            {
                label: "Engineering",
                text: "CI/CD pipeline for tests, coverage, releases, Render deployment, and Telegram alerts",
                url: "https://github.com/cs-internship/CS-Club-Bot/blob/main/.github/workflows/ci.yml",
            },
            {
                label: "Operations",
                text: "Scheduled Render service health and uptime workflow",
                url: "https://github.com/cs-internship/CS-Club-Bot/blob/main/.github/workflows/ping-render.yml",
            },
            {
                label: "Quality",
                text: "Extensive Jest suite covering handlers, integrations, validation, and utilities",
                url: "https://github.com/cs-internship/CS-Club-Bot/tree/main/__tests__",
            },
            {
                label: "Release History",
                text: "Versioned project changelog",
                url: "https://github.com/cs-internship/CS-Club-Bot/blob/main/CHANGELOG.md",
            },
        ],
    },
    "cs-queue-bot": {
        id: "cs-queue-bot",
        title: "CS Queue Bot",
        subtitle: "Live Telegram bot for queue management",
        year: "2025",
        image: csQueueThumbnail,
        lightboxImage: csQueueLarge,
        imageWidth: 774,
        imageHeight: 774,
        lightboxWidth: 774,
        lightboxHeight: 774,
        summary:
            "An automated Telegram bot for managing CS Internship queue onboarding, moderation, admin tasks, and Azure DevOps candidate tracking.",
        links: [
            { label: "Telegram Bot", url: "https://t.me/CSQueueBot" },
            {
                label: "GitHub Repo",
                url: "https://github.com/cs-internship/CS-Queue-Bot",
            },
        ],
        tech: [
            "Node.js",
            "Telegraf",
            "Express",
            "Axios",
            "Azure DevOps REST API",
        ],
        features: [
            "Checks Telegram usernames and guides new members through onboarding",
            "Detects message spam and applies moderation rules automatically",
            "Creates and links Azure DevOps work items from bot commands",
            "Supports scheduled messages, health checks, tests, releases, and automatic Render deployment",
        ],
        galleryImages: projectGalleryImages["cs-queue-bot"],
        storyEN: "Placeholder",
        storyFA: "Placeholder",
        hasRelatedLinks: true,
        relatedLinks: [
            {
                label: "Engineering",
                text: "Test, coverage, semantic release, Render deployment, and Telegram alert pipeline",
                url: "https://github.com/cs-internship/CS-Queue-Bot/blob/main/.github/workflows/ci.yml",
            },
            {
                label: "Quality",
                text: "Jest suite covering onboarding, moderation, scheduling, Azure integration, and server health",
                url: "https://github.com/cs-internship/CS-Queue-Bot/tree/main/__tests__",
            },
            {
                label: "Release History",
                text: "Versioned project changelog",
                url: "https://github.com/cs-internship/CS-Queue-Bot/blob/main/CHANGELOG.md",
            },
        ],
    },
    "gradient-paint": {
        id: "gradient-paint",
        title: "Gradient Paint",
        subtitle: "Customizable interactive gradient painting canvas",
        year: "2023",
        image: gradientPaintThumbnail,
        lightboxImage: gradientPaintLarge,
        imageWidth: 1254,
        imageHeight: 1254,
        lightboxWidth: 1254,
        lightboxHeight: 1254,
        summary:
            "An interactive grid canvas for painting customizable color gradients through click or drag gestures.",
        links: [
            {
                label: "Live Version",
                url: "https://ali-sdg90.github.io/Custom-Gradient-Paint",
            },
            {
                label: "GitHub Repo",
                url: "https://github.com/Ali-Sdg90/Custom-Gradient-Paint",
            },
        ],
        tech: ["HTML", "JavaScript", "SCSS", "CSS"],
        features: [
            "Spreads fading colors across nearby grid cells from each selected point",
            "Lets users change grid size, colors, spread distance, borders, and cell numbers",
            "Supports both click painting and continuous drag painting",
        ],
        galleryImages: projectGalleryImages["gradient-paint"],
        storyEN: "Placeholder",
        storyFA: "Placeholder",
        hasRelatedLinks: true,
        relatedLinks: [
            {
                label: "Process",
                text: "Development time-lapse",
                url: "https://youtu.be/jG_HB7bDDH0",
            },
        ],
    },
    "quick-math": {
        id: "quick-math",
        title: "Quick Math",
        subtitle: "Timed math game with a rotating cube interface",
        year: "2023",
        image: quickMathThumbnail,
        lightboxImage: quickMathLarge,
        imageWidth: 1254,
        imageHeight: 1254,
        lightboxWidth: 1254,
        lightboxHeight: 1254,
        summary:
            "A timed arithmetic game that presents three questions through a rotating cube interface with configurable difficulty aids.",
        links: [
            {
                label: "Live Version",
                url: "https://ali-sdg90.github.io/Quick-Math",
            },
            {
                label: "GitHub Repo",
                url: "https://github.com/Ali-Sdg90/Quick-Math",
            },
        ],
        tech: ["HTML", "JavaScript", "SCSS", "CSS"],
        features: [
            "Uses three-question rounds with lives, question timers, and total time tracking",
            "Shows each question on a different side of a rotating cube",
            "Saves answer hints, color themes, and ready-screen settings in local storage",
        ],
        galleryImages: projectGalleryImages["quick-math"],
        storyEN: "Placeholder",
        storyFA: "Placeholder",
        hasRelatedLinks: false,
        relatedLinks: [],
    },
    "tic-tac-toe": {
        id: "tic-tac-toe",
        title: "Tic Tac Toe",
        subtitle: "Customizable game with multiple play modes",
        year: "2022",
        image: ticTacToeThumbnail,
        lightboxImage: ticTacToeLarge,
        imageWidth: 1254,
        imageHeight: 1254,
        lightboxWidth: 1254,
        lightboxHeight: 1254,
        summary:
            "A customizable Tic-Tac-Toe game with local multiplayer, computer opponents, persistent settings, and unlockable challenges.",
        links: [
            {
                label: "Live Version",
                url: "https://ali-sdg90.github.io/Tic-Tac-Toe",
            },
            {
                label: "GitHub Repo",
                url: "https://github.com/Ali-Sdg90/Tic-Tac-Toe",
            },
        ],
        tech: ["HTML", "JavaScript", "CSS"],
        features: [
            "Includes classic, computer, local two-player, and rule-breaking unbeatable modes",
            "Adds challenges that keep progress between game sessions",
            "Saves game settings and changes the background after every move",
        ],
        galleryImages: projectGalleryImages["tic-tac-toe"],
        storyEN: "Placeholder",
        storyFA: "Placeholder",
        hasRelatedLinks: true,
        relatedLinks: [
            {
                label: "??",
                text: "Project interdiction post",
                url: "https://x.com/Ali_Sdg90/status/1663115176504344576?s=20",
            },
            {
                label: "Process",
                text: "Development time-lapse",
                url: "https://youtu.be/s278dOASbqg",
            },
        ],
    },
    "path-finder": {
        id: "path-finder",
        title: "Path Finder",
        subtitle: "Customizable animated pathfinding sandbox",
        year: "2025",
        image: pathFinderThumbnail,
        lightboxImage: pathFinderLarge,
        imageWidth: 1254,
        imageHeight: 1254,
        lightboxWidth: 1254,
        lightboxHeight: 1254,
        summary:
            "An interactive pathfinding sandbox that uses weighted randomness to fill a grid while favoring configurable movement directions.",
        links: [
            {
                label: "Live Version",
                url: "https://ali-sdg90.github.io/Path-Finder",
            },
            {
                label: "GitHub Repo",
                url: "https://github.com/Ali-Sdg90/Path-Finder",
            },
        ],
        tech: ["React", "Ant Design", "Sass", "CryptoJS"],
        features: [
            "Uses weighted random movement to favor directions selected by the user",
            "Shows the grid filling step by step instead of only displaying the final result",
            "Lets users change grid size, direction weights, colors, speed, and display options",
            "Works on both desktop and mobile screens",
        ],
        galleryImages: projectGalleryImages["path-finder"],
        storyEN: "Placeholder",
        storyFA: "Placeholder",
        hasRelatedLinks: true,
        relatedLinks: [
            {
                label: "??",
                text: "Project interdiction post",
                url: "https://x.com/Ali_Sdg90/status/1963653671083790650?s=20",
            },
            {
                label: "Predecessor",
                text: "Spread Color, the related grid-propagation project",
                url: "https://github.com/Ali-Sdg90/Spread-Color",
            },
        ],
    },
};

export const getAboutProjectById = (projectId) =>
    aboutProjectData[projectId] ?? null;
