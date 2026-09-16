import HeroContactInfo from "./HeroContactInfo";
import { trackUmamiEvent } from "../../utils/analytics";

const RESUME_URL = "/resume/ali-sadeghi-resume-en.pdf";

const Intro = ({ isAboutMeActive, onAboutMeSelect }) => {
    const handleAboutMeClick = () => {
        onAboutMeSelect();
    };

    return (
        <>
            <div className="intro-top-section">
                <p className="hero-greeting" aria-label="Hey there!">
                    <span className="hero-greeting-label hero-greeting-default">
                        <span className="hero-greeting-text">Hey there!</span>
                        <span className="hero-greeting-hand" aria-hidden="true">
                            {"\u{1F44B}"}
                        </span>
                    </span>
                    <span className="hero-greeting-label hero-greeting-hover">
                        <span className="hero-greeting-text">Aloha!</span>
                        <span className="hero-greeting-hand" aria-hidden="true">
                            {"\u{1F44B}"}
                        </span>
                    </span>
                </p>

                <h1 id="hero-title">
                    I&apos;m <span>Ali</span>
                    <br />
                    Sadeghi
                </h1>

                <p className="hero-role">Software Engineer</p>

                <p className="hero-copy">
                    I love building polished software, useful tools, and
                    reliable systems.
                    <br />
                    Crafted with care, curiosity, and{" "}
                    <a href="https://youtu.be/8TycTsfTcY8" target="_blank">
                        a splash of love.
                    </a>
                </p>

                <div className="hero-actions">
                    <a
                        className="hero-button primary"
                        href={RESUME_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                            trackUmamiEvent("resume_open", {
                                file: "ali-sadeghi-resume-en.pdf",
                                location: "hero",
                            })
                        }
                    >
                        View Resume <span aria-hidden="true">-&gt;</span>
                    </a>

                    <button
                        className={[
                            "hero-button",
                            "secondary",
                            isAboutMeActive ? "is-active" : "",
                        ]
                            .filter(Boolean)
                            .join(" ")}
                        type="button"
                        aria-pressed={isAboutMeActive}
                        onClick={handleAboutMeClick}
                    >
                        About Me
                    </button>
                </div>
            </div>

            <div className="intro-bottom-section">
                <HeroContactInfo />
            </div>
        </>
    );
};

export default Intro;
