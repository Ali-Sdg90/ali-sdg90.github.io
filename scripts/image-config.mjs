export const presets = {
    featuredProjects: { width: 480, height: 480 },
    techStack: { width: 128, height: 128 },
    careerJourney: { width: 128, height: 128 },
    gallery: { width: 285, height: 232 },
    aboutMe: { width: 480, height: 480 },
    buildStory: {
        width: 260,
        height: 160,
        quality: 74,
        display: {
            width: 1920,
            height: 1200,
            quality: 97,
        },
    },
};

export const rules = [
    { match: "profile/**", preset: "aboutMe" },
    { match: "projects/*/cover.*", preset: "featuredProjects" },
    { match: "projects/*/gallery/**", preset: "gallery" },
    { match: "tech-stack/**", preset: "techStack" },
    { match: "career/*/gallery/**", preset: "gallery" },
    { match: "career/**", preset: "careerJourney" },
    { match: "build-story/**", preset: "buildStory", mode: "buildStory" },
    { match: "site/**", mode: "single" },
    { match: "ui/**", mode: "single" },
];
