import HeroContactInfo from "./HeroContactInfo";

const Intro = () => {
    return (
        <>
            <div className="intro-top-section">
                <p className="hero-greeting">Hi there! 👋</p>

                <h1 id="hero-title">
                    I&apos;m <span>Ali</span>
                    <br />
                    Sadeghi
                </h1>

                <p className="hero-role">Software Engineer</p>

                <p className="hero-copy">
                    I build polished web projects, useful tools, and reliable
                    systems.
                    <br />
                    Crafted with care, curiosity, and{" "}
                    {/* Temporary external link. in future make it a in-site source */}
                    <a href="https://youtu.be/8TycTsfTcY8" target="_blank">
                        a splash of love.
                    </a>
                </p>

                <div className="hero-actions">
                    <a className="hero-button primary">
                        View Resume <span aria-hidden="true">-&gt;</span>
                    </a>

                    <a className="hero-button secondary">About Me</a>
                </div>
            </div>

            <div className="intro-bottom-section">
                <HeroContactInfo />
            </div>
        </>
    );
};

export default Intro;
