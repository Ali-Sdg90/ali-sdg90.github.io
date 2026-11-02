import howItWasBuiltData from "../data/howItWasBuilt/howItWasBuiltData";

const portfolioHref = import.meta.env.BASE_URL;

const formatCount = (count) => String(count).padStart(2, "0");

const renderStoryParagraphs = (story, language, chapterId) =>
    story
        .split(/\n\s*\n/)
        .filter(Boolean)
        .map((paragraph, index) => (
            <p key={`${chapterId}-${language}-${index}`}>{paragraph}</p>
        ));

const BuildStoryStaticPage = () => {
    const { page, chapters } = howItWasBuiltData;
    const total = chapters.length;

    return (
        <main
            className="build-story-static"
            aria-labelledby="build-story-static-title"
        >
            <header className="build-story-static__header">
                <a href={portfolioHref}>{page.returnLabel}</a>
                <h1 id="build-story-static-title">{page.title}</h1>
            </header>

            <ol className="build-story-static__chapters">
                {chapters.map((chapter, index) => {
                    const englishTitleId = `${chapter.id}-title-en`;
                    const persianTitleId = `${chapter.id}-title-fa`;

                    return (
                        <li
                            className="build-story-static__chapter"
                            id={`chapter-${chapter.id}`}
                            style={{ "--chapter-accent": chapter.accent }}
                            key={chapter.id}
                        >
                            <figure className="build-story-static__media">
                                <img
                                    src={chapter.image.src}
                                    alt={chapter.image.alt}
                                    width={chapter.image.lightboxWidth}
                                    height={chapter.image.lightboxHeight}
                                    loading={index === 0 ? "eager" : "lazy"}
                                    fetchPriority={
                                        index === 0 ? "high" : undefined
                                    }
                                    decoding="async"
                                />
                                <figcaption>
                                    Chapter {formatCount(index + 1)} of{" "}
                                    {formatCount(total)}
                                </figcaption>
                            </figure>

                            <div className="build-story-static__copy">
                                <section
                                    className="build-story-static__language"
                                    lang="en"
                                    dir="ltr"
                                    aria-labelledby={englishTitleId}
                                >
                                    <span>English</span>
                                    <h2 id={englishTitleId}>
                                        {chapter.translations.en.title}
                                    </h2>
                                    {renderStoryParagraphs(
                                        chapter.translations.en.description,
                                        "en",
                                        chapter.id,
                                    )}
                                </section>

                                <section
                                    className="build-story-static__language is-farsi-text"
                                    lang="fa"
                                    dir="rtl"
                                    aria-labelledby={persianTitleId}
                                >
                                    <span>فارسی</span>
                                    <h2 id={persianTitleId}>
                                        {chapter.translations.fa.title}
                                    </h2>
                                    {renderStoryParagraphs(
                                        chapter.translations.fa.description,
                                        "fa",
                                        chapter.id,
                                    )}
                                </section>
                            </div>
                        </li>
                    );
                })}
            </ol>
        </main>
    );
};

export default BuildStoryStaticPage;
