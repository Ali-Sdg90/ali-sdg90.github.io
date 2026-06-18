const PersonPlaceholder = () => {
    return (
        <aside className="hero-person-placeholder" aria-hidden="true">
            <div className="hero-person-note">
                <span>Person placeholder</span>
            </div>

            <div className="hero-person-figure">
                <div className="hero-person-head" />
                <div className="hero-person-neck" />
                <div className="hero-person-body" />
            </div>
        </aside>
    );
};

export default PersonPlaceholder;
