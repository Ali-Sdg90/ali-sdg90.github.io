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

            <p className="hero-copy">Aloha, this is for test.</p>

            <div className="hero-actions">
                <a href="#projects" className="hero-button primary">
                    Explore My Work
                </a>

                <a href="#about" className="hero-button secondary">
                    About Me
                </a>
            </div>
        </>
    );
};

export default Intro;
