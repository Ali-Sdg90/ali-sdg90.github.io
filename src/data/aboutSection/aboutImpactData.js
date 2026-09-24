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
    "interns-mentored": {
        id: "interns-mentored",
        title: "25+",
        subtitle: "Web Development Interns Mentored",
        summary:
            "Guided CS Internship web development interns through projects and technical challenges.",
        featuresTitle: "What I Did",
        features: [
            "Mentored web development interns from across Iran for around two years",
            "Reviewed their work and helped them find their own answers",
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
    "developers-onboarded": {
        id: "developers-onboarded",
        title: "11",
        subtitle: "Frontend Developers Onboarded",
        summary:
            "Helped new MelkRadar frontend developers settle into projects, standards, and team workflows.",
        featuresTitle: "What I Did",
        features: [
            "Helped new teammates get access and understand the projects and standards",
            "Walked them through Git, branching, and pull requests on their first tasks",
            "Stayed available for questions until they could work independently",
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
    "technical-sessions": {
        id: "technical-sessions",
        title: "30+",
        subtitle: "Technical Mentoring Sessions",
        summary:
            "Reviewed interns' projects and questions in CS Internship mentoring sessions.",
        featuresTitle: "What I Did",
        features: [
            "Held weekly, hour-long sessions to discuss interns' work and questions",
            "Reviewed their posts and projects, then helped plan their next steps",
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
    "telegram-bots": {
        id: "telegram-bots",
        title: "6",
        subtitle: "Telegram Bots Built",
        summary:
            "Built Telegram bots for community management, monitoring, sales automation, and AI conversations.",
        featuresTitle: "What I Built",
        features: [
            "Built three CS Internship bots for entry, feedback, and monitoring",
            "Built a MelkRadar sales bot to replace a repetitive manual process",
            "Created two personal AI bots for local models and answers within chats",
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
    "internal-tools": {
        id: "internal-tools",
        title: "9",
        subtitle: "Internal Tools Built",
        summary:
            "Automated sales and program workflows with tools for MelkRadar and CS Internship.",

        featuresTitle: "What I Built",
        features: [
            "Built tools for sales, onboarding, feedback, scheduling, and monitoring",
            "Automated a MelkRadar sales workflow, raising output more than fivefold",
            "Cut weekly Azure Board setup from about 30 minutes to under five seconds",
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
    "android-app-shipped": {
        id: "android-app-shipped",
        title: "2",
        subtitle: "Android Apps Shipped",
        summary:
            "Shipped a sales workflow app and a health backup app, both built natively in Kotlin.",

        featuresTitle: "What I Shipped",
        features: [
            "Designed MLK DVR Receiver's Android app, backend, and Telegram bot",
            "Built Health Data Relay for automatic backups to each user's Google Drive",
            "Published Health Data Relay on Cafe Bazaar and APKPure",
            "Handled app signing, permissions, and Play Protect verification",
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
    "ios-app-shipped": {
        id: "ios-app-shipped",
        title: "1",
        subtitle: "iOS App Shipped",
        summary:
            "Co-developed an AI-powered subscription app published on the Apple App Store.",

        featuresTitle: "What I Shipped",
        features: [
            "Co-developed Settle It GPT from a basic prototype into a working iOS app",
            "Connected accounts, camera and microphone input, and AI responses through Firebase",
            "Added spoken answers and a subscription flow with Stripe",
            "Worked with my co-developer to publish it on the Apple App Store",
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
    "pull-requests-reviewed": {
        id: "pull-requests-reviewed",
        title: "376+",
        subtitle: "Pull Requests Reviewed",
        summary:
            "Reviewed pull requests across MelkRadar's main frontend projects to maintain code quality.",
        featuresTitle: "What I Did",
        features: [
            "Reviewed pull requests across MelkRadar's three main frontend projects",
            "Checked code structure, team standards, and how each feature worked",
            "Explained changes through PR comments, screenshots, and conversations",
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
    "open-source-commits": {
        id: "open-source-commits",
        title: "603+",
        subtitle: "Open Source Commits",
        summary:
            "Contributed to CS Internship and other open-source projects, including fx-blox and TonRich.",
        featuresTitle: "What I Contributed",
        features: [
            "Contributed to open-source tools used by the CS Internship program",
            "Worked with other contributors on fx-blox, TonRich, and smaller projects",
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
