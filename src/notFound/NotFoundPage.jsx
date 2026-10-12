import { useEffect } from "react";
import { FaGithub } from "react-icons/fa6";
import { HiArrowUpRight, HiOutlineHome, HiOutlineLink } from "react-icons/hi2";

import DynamicBackground from "../components/layout/DynamicBackground";
import { contactItems } from "../data/portfolio/profileLinks";

const baseUrl = import.meta.env.BASE_URL;
const notFoundUrl = `${baseUrl}not-found`;
const githubUrl = contactItems.find((item) => item.id === "github").href;
const destinations = [
    {
        id: "portfolio",
        label: "Ali's Portfolio",
        href: baseUrl,
        icon: HiOutlineHome,
    },
    {
        id: "links",
        label: "Ali's Link Tree",
        href: `${baseUrl}links/`,
        icon: HiOutlineLink,
    },
    {
        id: "github",
        label: "Ali's GitHub",
        href: githubUrl,
        icon: FaGithub,
        external: true,
    },
];

const NotFoundPage = () => {
    useEffect(() => {
        if (window.location.pathname !== notFoundUrl) {
            window.history.replaceState(window.history.state, "", notFoundUrl);
        }
    }, []);

    return (
        <main className="not-found-page">
            <DynamicBackground />

            <section
                className="not-found-content"
                aria-labelledby="not-found-title"
            >
                <p className="not-found-code" aria-hidden="true">
                    404
                </p>
                <h1 id="not-found-title">Oops, nothing lives here.</h1>
                <p className="not-found-description">
                    Looks like you've wandered into an empty corner of my little
                    internet world.
                </p>
                <p className="not-found-return">Back to</p>

                <nav
                    className="not-found-links"
                    aria-label="Return destinations"
                >
                    {destinations.map(
                        ({ id, label, href, icon: Icon, external }) => (
                            <a
                                className={`not-found-link not-found-link--${id}`}
                                key={id}
                                href={href}
                                {...(external
                                    ? {
                                          target: "_blank",
                                          rel: "noopener noreferrer",
                                      }
                                    : {})}
                            >
                                <span>
                                    <Icon aria-hidden="true" />
                                    <strong>{label}</strong>
                                </span>
                                <HiArrowUpRight aria-hidden="true" />
                            </a>
                        ),
                    )}
                </nav>
            </section>
        </main>
    );
};

export default NotFoundPage;
