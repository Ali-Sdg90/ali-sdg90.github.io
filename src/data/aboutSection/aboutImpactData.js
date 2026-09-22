import impactInternsMentoredStoryEN from "../stories/en/impact/interns-mentored.md?raw";
import impactInternsMentoredStoryFA from "../stories/fa/impact/interns-mentored.md?raw";
import impactDevelopersOnboardedStoryEN from "../stories/en/impact/developers-onboarded.md?raw";
import impactDevelopersOnboardedStoryFA from "../stories/fa/impact/developers-onboarded.md?raw";
import impactTechnicalSessionsStoryEN from "../stories/en/impact/technical-sessions.md?raw";
import impactTechnicalSessionsStoryFA from "../stories/fa/impact/technical-sessions.md?raw";
import impactTelegramBotsStoryEN from "../stories/en/impact/telegram-bots.md?raw";
import impactTelegramBotsStoryFA from "../stories/fa/impact/telegram-bots.md?raw";
import impactInternalToolsStoryEN from "../stories/en/impact/internal-tools.md?raw";
import impactInternalToolsStoryFA from "../stories/fa/impact/internal-tools.md?raw";
import impactAndroidAppShippedStoryEN from "../stories/en/impact/android-app-shipped.md?raw";
import impactAndroidAppShippedStoryFA from "../stories/fa/impact/android-app-shipped.md?raw";
import impactIosAppShippedStoryEN from "../stories/en/impact/ios-app-shipped.md?raw";
import impactIosAppShippedStoryFA from "../stories/fa/impact/ios-app-shipped.md?raw";
import impactPullRequestsReviewedStoryEN from "../stories/en/impact/pull-requests-reviewed.md?raw";
import impactPullRequestsReviewedStoryFA from "../stories/fa/impact/pull-requests-reviewed.md?raw";
import impactOpenSourceCommitsStoryEN from "../stories/en/impact/open-source-commits.md?raw";
import impactOpenSourceCommitsStoryFA from "../stories/fa/impact/open-source-commits.md?raw";

export const aboutImpactData = {
    internsMentored: {
        id: "internsMentored",
        title: "25+",
        subtitle: "Web Development Interns Mentored",
        summary:
            "Guided CS Internship web development interns through projects and technical challenges.",
        featuresTitle: "What I Did",
        features: [
            "Guided interns through their technical learning paths, projects, tasks, and development challenges",
            "Reviewed their work and progress and helped them find answers instead of simply giving them solutions",
            "Held online mentoring sessions for technical questions, project reviews, challenges, and follow-up tasks",
        ],
        storyTitle: "Story",
        storyEN: impactInternsMentoredStoryEN.trim(),
        storyFA: impactInternsMentoredStoryFA.trim(),
        storySource: {
            collection: "impact",
            slug: "interns-mentored",
        },
        hasRelatedLinks: true,
        relatedLinks: [
            {
                label: "Program Repo",
                text: "CS Internship Specification",
                url: "https://github.com/cs-internship/cs-internship-spec",
            },
            {
                label: "My Whiteboard",
                text: "My Technical Sessions Whiteboard",
                url: "https://github.com/Ali-Sdg90/CS-Technical-Sessions-Whiteboard",
            },
        ],
    },
    developersOnboarded: {
        id: "developersOnboarded",
        title: "11",
        subtitle: "Frontend Developers Onboarded",
        summary:
            "Helped new MelkRadar frontend developers settle into projects, standards, and team workflows.",
        featuresTitle: "What I Did",
        features: [
            "Guided new team members through company projects, required access, onboarding material, and frontend standards",
            "Helped developers understand the team's Git workflow, branching conventions, and pull request process",
            "Worked alongside them on their first tasks to make the transition into real project work easier",
        ],
        storyTitle: "Story",
        storyEN: impactDevelopersOnboardedStoryEN.trim(),
        storyFA: impactDevelopersOnboardedStoryFA.trim(),
        storySource: {
            collection: "impact",
            slug: "developers-onboarded",
        },
        hasRelatedLinks: true,
        relatedLinks: [
            {
                label: "Company Website",
                text: "MelkRadar",
                url: "https://melkradar.com/",
            },
        ],
    },
    technicalSessions: {
        id: "technicalSessions",
        title: "30+",
        subtitle: "Technical Mentoring Sessions",
        summary:
            "Reviewed interns' projects and questions in CS Internship mentoring sessions.",
        featuresTitle: "What I Did",
        features: [
            "Held weekly technical mentoring sessions for web development interns",
            "Reviewed interns' posts, projects, activities, and technical questions during the sessions",
            "Guided interns through problems, project decisions, and the next steps in their learning path",
        ],
        storyTitle: "Story",
        storyEN: impactTechnicalSessionsStoryEN.trim(),
        storyFA: impactTechnicalSessionsStoryFA.trim(),
        storySource: {
            collection: "impact",
            slug: "technical-sessions",
        },
        hasRelatedLinks: true,
        relatedLinks: [
            {
                label: "Program Repo",
                text: "CS Internship Specification",
                url: "https://github.com/cs-internship/cs-internship-spec",
            },
            {
                label: "My Whiteboard",
                text: "My Technical Sessions Whiteboard",
                url: "https://github.com/Ali-Sdg90/CS-Technical-Sessions-Whiteboard",
            },
        ],
    },
    telegramBots: {
        id: "telegramBots",
        title: "6",
        subtitle: "Telegram Bots Built",
        summary:
            "Built Telegram bots for community management, monitoring, sales automation, and AI conversations.",
        featuresTitle: "What I Built",
        features: [
            "Built 3 bots for CS Internship, 1 internal bot for MelkRadar, and 2 personal AI-powered bots",
            "Automated workflows including community operations, technical feedback, monitoring, sales processes, and AI conversations",
            "Designed bots for real workflows, with multiple bots still actively running and being used today",
        ],
        storyTitle: "Story",
        storyEN: impactTelegramBotsStoryEN.trim(),
        storyFA: impactTelegramBotsStoryFA.trim(),
        storySource: {
            collection: "impact",
            slug: "telegram-bots",
        },
        hasRelatedLinks: true,
        relatedLinks: [
            {
                label: "Telegram Bot",
                text: "CS Automation Bot",
                url: "https://t.me/CSIAutomationBot",
            },
            {
                label: "GitHub Repository",
                text: "CS Club Bot",
                url: "https://github.com/cs-internship/CS-Club-Bot",
            },
            {
                label: "GitHub Repository",
                text: "CS Queue Bot",
                url: "https://github.com/cs-internship/CS-Queue-Bot",
            },
            {
                label: "GitHub Repository",
                text: "Fabrexa AI Ollama",
                url: "https://github.com/Ali-Sdg90/Fabrexa-AI-Ollama",
            },
            {
                label: "GitHub Repository",
                text: "Askly90 Bot",
                url: "https://github.com/Ali-Sdg90/Askly90-Bot",
            },
        ],
    },
    internalTools: {
        id: "internalTools",
        title: "9",
        subtitle: "Internal Tools Built",
        summary:
            "Automated sales and program workflows with tools for MelkRadar and CS Internship.",

        featuresTitle: "What I Built",
        features: [
            "Built internal systems for sales operations, onboarding, queue management, feedback, scheduling, monitoring, and administration",
            "Identified repetitive or inefficient workflows and turned them into tools that became part of real team processes",
            "Reduced manual work from recurring multi-step processes to automated workflows that could run in seconds",
        ],
        storyTitle: "Story",
        storyEN: impactInternalToolsStoryEN.trim(),
        storyFA: impactInternalToolsStoryFA.trim(),
        storySource: {
            collection: "impact",
            slug: "internal-tools",
        },
        hasRelatedLinks: true,
        relatedLinks: [
            {
                label: "GitHub Repository",
                text: "CS Queue Bot",
                url: "https://github.com/cs-internship/CS-Queue-Bot",
            },
            {
                label: "GitHub Repository",
                text: "CS Club Bot",
                url: "https://github.com/cs-internship/CS-Club-Bot",
            },
            {
                label: "GitHub Repository",
                text: "CS Queue Calendar",
                url: "https://github.com/cs-internship/CS-Queue-Calendar",
            },
            {
                label: "GitHub Repository",
                text: "CS Azure Board Automation",
                url: "https://github.com/Ali-Sdg90/CS-Azure-Board-Automation",
            },
            {
                label: "GitHub Repository",
                text: "CS Queue Message Maker",
                url: "https://github.com/Ali-Sdg90/CS-Queue-Message-Maker",
            },
            {
                label: "GitHub Repository",
                text: "CS Queue Meetings Intro",
                url: "https://github.com/cs-internship/CS-Queue-Meetings-Intro",
            },
            {
                label: "GitHub Repository",
                text: "CS Feedback Webhook",
                url: "https://github.com/cs-internship/CS-Feedback-Webhook",
            },
        ],
    },
    androidAppShipped: {
        id: "androidAppShipped",
        title: "2",
        subtitle: "Android Apps Shipped",
        summary:
            "Shipped a sales workflow app and a health backup app, both built natively in Kotlin.",

        featuresTitle: "What I Shipped",
        features: [
            "Built MLK DVR Receiver as an internal Android app connected to a backend and Telegram bot for MelkRadar's sales workflow",
            "Built Health Data Relay as a public Android app for automated health data backups to the user's own Google Drive",
            "Handled the full Android release process including permissions, app signing, device testing, background processing, and distribution",
        ],
        storyTitle: "Story",
        storyEN: impactAndroidAppShippedStoryEN.trim(),
        storyFA: impactAndroidAppShippedStoryFA.trim(),
        storySource: {
            collection: "impact",
            slug: "android-app-shipped",
        },
        hasRelatedLinks: true,
        relatedLinks: [
            {
                label: "Project Website",
                text: "Health Data Relay",
                url: "https://ali-sdg.is-a.dev/health-data-relay/",
            },
            {
                label: "GitHub Repository",
                text: "Health Data Relay",
                url: "https://github.com/Ali-Sdg90/health-data-relay",
            },
            {
                label: "Android Store",
                text: "Health Data Relay on Cafe Bazaar",
                url: "https://cafebazaar.ir/app/com.alisadeghi.autohealthsync",
            },
            {
                label: "Android Store",
                text: "Health Data Relay on APKPure",
                url: "https://apkpure.com/p/com.alisadeghi.autohealthsync",
            },
        ],
    },
    iosAppShipped: {
        id: "iosAppShipped",
        title: "1",
        subtitle: "iOS App Shipped",
        summary:
            "Co-developed an AI-powered subscription app published on the Apple App Store.",

        featuresTitle: "What I Shipped",
        features: [
            "Co-developed an AI-powered iOS app with authentication, cloud backend, subscriptions, and native device capabilities",
            "Integrated camera, microphone, AI-generated responses, text-to-speech, Firebase, and Stripe into one complete product",
            "Took the project from an early prototype through development, testing, release, and publication on the Apple App Store",
        ],
        storyTitle: "Story",
        storyEN: impactIosAppShippedStoryEN.trim(),
        storyFA: impactIosAppShippedStoryFA.trim(),
        storySource: {
            collection: "impact",
            slug: "ios-app-shipped",
        },
        hasRelatedLinks: true,
        relatedLinks: [
            {
                label: "LinkedIn Post",
                text: "Settle It GPT Launch Post",
                url: "https://www.linkedin.com/posts/ali-sdg90_settleitgpt-share-7374421474943700993-_H3R/?utm_source=share&utm_medium=member_desktop&rcm=ACoAADiHtIwB6ffMAWL0iNc5fSdSRqvEYI6Q2IA",
            },
        ],
    },
    pullRequestsReviewed: {
        id: "pullRequestsReviewed",
        title: "376+",
        subtitle: "Pull Requests Reviewed",
        summary:
            "Reviewed pull requests across MelkRadar's main frontend projects to maintain code quality.",
        featuresTitle: "What I Did",
        features: [
            "Reviewed pull requests across three main frontend projects at MelkRadar",
            "Checked implementation quality, component structure, coding standards, and the final product behavior",
            "Provided feedback through PR comments, screenshots, and direct technical discussions when needed",
        ],
        storyTitle: "Story",
        storyEN: impactPullRequestsReviewedStoryEN.trim(),
        storyFA: impactPullRequestsReviewedStoryFA.trim(),
        storySource: {
            collection: "impact",
            slug: "pull-requests-reviewed",
        },
        hasRelatedLinks: true,
        relatedLinks: [
            {
                label: "Company Website",
                text: "MelkRadar",
                url: "https://melkradar.com/",
            },
        ],
    },
    openSourceCommits: {
        id: "openSourceCommits",
        title: "603+",
        subtitle: "Open Source Commits",
        summary:
            "Contributed to CS Internship and other open-source projects, including fx-blox and TonRich.",
        featuresTitle: "What I Contributed",
        features: [
            "Contributed extensively to open-source projects and repositories used by the CS Internship program",
            "Worked on collaborative projects outside the program including fx-blox and TonRich",
            "Contributed through ongoing development, improvements, fixes, and maintaining shared codebases",
        ],
        storyTitle: "Story",
        storyEN: impactOpenSourceCommitsStoryEN.trim(),
        storyFA: impactOpenSourceCommitsStoryFA.trim(),
        storySource: {
            collection: "impact",
            slug: "open-source-commits",
        },
        hasRelatedLinks: true,
        relatedLinks: [
            {
                label: "GitHub Organization",
                text: "CS Internship",
                url: "https://github.com/cs-internship",
            },
            {
                label: "GitHub Repository",
                text: "Functionland fx-blox",
                url: "https://github.com/functionland/fx-blox",
            },
            {
                label: "GitHub Repository",
                text: "TonRich",
                url: "https://github.com/tonradar/tonrich",
            },
        ],
    },
};

export const getAboutImpactById = (impactId) =>
    aboutImpactData[impactId] ?? null;
