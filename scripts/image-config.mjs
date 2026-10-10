export const presets = {
    featuredProjects: { width: 480, height: 480 },
    techStack: { width: 128, height: 128 },
    careerJourney: { width: 128, height: 128 },
    gallery: { width: 256, height: 256 },
    aboutMe: { width: 480, height: 480 },
};

export const rules = [
    { match: "profile/**", preset: "aboutMe" },
    { match: "projects/*/cover.png", preset: "featuredProjects" },
    { match: "projects/*/gallery/**", preset: "gallery" },
    { match: "tech-stack/**", preset: "techStack" },
    { match: "career/**", preset: "careerJourney" },
];
