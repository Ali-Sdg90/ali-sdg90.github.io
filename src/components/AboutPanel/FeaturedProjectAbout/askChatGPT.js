const CHATGPT_URL = "https://chatgpt.com/";

const promptContentBySection = Object.freeze({
    projects: {
        introduction: "Explore this project from Ali Sadeghi's portfolio:",
        request:
            "Summarize its background, technical decisions, challenges, and Ali's engineering experience. Use only information from the page, suggest 2–3 relevant follow-up questions, and say so if you cannot access it.",
    },
    achievements: {
        introduction: "Explore this achievement from Ali Sadeghi's portfolio:",
        request:
            "Summarize its context, Ali's contribution, the work behind it, and his engineering experience. Use only information from the page, suggest 2–3 relevant follow-up questions, and say so if you cannot access it.",
    },
    "tech-stack": {
        introduction: "Explore this technology from Ali Sadeghi's portfolio:",
        request:
            "Summarize how Ali used it, the projects and technical decisions involved, and his engineering experience. Use only information from the page, suggest 2–3 relevant follow-up questions, and say so if you cannot access it.",
    },
    "career-journey": {
        introduction:
            "Explore this career experience from Ali Sadeghi's portfolio:",
        request:
            "Summarize Ali's role, responsibilities, contributions, challenges, and engineering experience. Use only information from the page, suggest 2–3 relevant follow-up questions, and say so if you cannot access it.",
    },
});

export const buildChatGPTPrompt = ({ pageUrl, sectionId }) => {
    const promptContent = promptContentBySection[sectionId];

    if (!pageUrl || !promptContent) return null;

    return `${promptContent.introduction} ${pageUrl}\n\n${promptContent.request}`;
};

export const buildChatGPTUrl = (prompt) => {
    if (!prompt) return null;

    const chatGPTUrl = new URL(CHATGPT_URL);
    chatGPTUrl.searchParams.set("q", prompt);

    return chatGPTUrl.href;
};
