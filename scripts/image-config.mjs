export const presets = {
    featuredProjects: { width: 480, height: 480 },
    techStack: { width: 128, height: 128 },
    careerJourney: { width: 128, height: 128 },
    gallery: { width: 285, height: 232 },
    aboutMe: { width: 480, height: 480 },
    buildStory: { width: 480, height: 270 },
};

export const rules = [
    { match: "profile/**", preset: "aboutMe" },
    { match: "projects/*/cover.*", preset: "featuredProjects" },
    { match: "projects/*/gallery/**", preset: "gallery" },
    { match: "tech-stack/**", preset: "techStack" },
    { match: "career/*/gallery/**", preset: "gallery" },
    { match: "career/**", preset: "careerJourney" },
    { match: "build-story/**", preset: "buildStory" },
    { match: "site/**", mode: "single" },
    { match: "ui/**", mode: "single" },
];
