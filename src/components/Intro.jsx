import HeroContactInfo from "./HeroContactInfo";

const Intro = () => {
    return (
        <>
            <p className="hero-greeting">Hi there!</p>

            <h1 id="hero-title">
                I&apos;m <span>Ali</span>
                <br />
                Sadeghi
            </h1>

            <p className="hero-role">Software Engineer</p>

            {/* https://youtu.be/8TycTsfTcY8 */}

            <p className="hero-copy">
                I love building complex systems, polished sites, bots,
                mini-games, and LLM characters.
                <br />
                Little worlds made with care, curiosity, and a splash of love :)
            </p>

            <div className="hero-actions">
                <a className="hero-button primary">
                    View Resume <span aria-hidden="true">-&gt;</span>
                </a>

                <a className="hero-button secondary">About Ali</a>
            </div>

            <HeroContactInfo />
        </>
    );
};

export default Intro;
