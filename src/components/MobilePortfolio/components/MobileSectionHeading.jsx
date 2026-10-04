const MobileSectionHeading = ({ title, copy }) => (
    <header className="mobile-section-heading">
        <h2>{title}</h2>
        {copy && <span>{copy}</span>}
    </header>
);

export default MobileSectionHeading;
