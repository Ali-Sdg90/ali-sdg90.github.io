const AboutPanelLanguageToggle = ({ activeLanguage, onLanguageChange }) => (
    <div
        className={[
            "about-panel-language-toggle",
            activeLanguage === "FA" ? "is-fa-active" : "is-en-active",
        ]
            .filter(Boolean)
            .join(" ")}
        aria-label="Language"
    >
        <span className="about-panel-language-thumb" aria-hidden="true" />
        {["EN", "FA"].map((language) => (
            <button
                className={[
                    "about-panel-language-option",
                    activeLanguage === language ? "is-active" : "",
                ]
                    .filter(Boolean)
                    .join(" ")}
                key={language}
                type="button"
                aria-pressed={activeLanguage === language}
                onClick={() => onLanguageChange(language)}
            >
                {language}
            </button>
        ))}
    </div>
);

export default AboutPanelLanguageToggle;
