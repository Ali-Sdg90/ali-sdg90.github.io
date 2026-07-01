const AboutMeContent = ({ paragraphs }) => {
    return (
        <div className="about-panel-text">
            {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
            ))}
        </div>
    );
};

export default AboutMeContent;
