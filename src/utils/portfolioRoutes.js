const basePath = import.meta.env.BASE_URL;

export const portfolioHomePath = basePath;
export const buildStoryPath = `${basePath}how-i-built-my-portfolio/`;

export const isPortfolioHomePath = (pathname) =>
    pathname === portfolioHomePath ||
    pathname === `${portfolioHomePath}index.html`;

export const isBuildStoryPath = (pathname) =>
    pathname === buildStoryPath ||
    pathname === buildStoryPath.slice(0, -1) ||
    pathname === `${buildStoryPath}index.html`;
