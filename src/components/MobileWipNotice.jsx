const MobileWipNotice = () => {
    return (
        <main className="mobile-wip" aria-labelledby="mobile-wip-title">
            <section className="mobile-wip__card">
                <div className="mobile-wip__mark" aria-hidden="true">
                    <span />
                </div>

                <p className="mobile-wip__eyebrow">Crafting in progress</p>

                <h1 id="mobile-wip-title">Mobile version in progress</h1>

                <p>This portfolio is best viewed on desktop for now.</p>

                <p>
                    I’m still crafting the mobile experience. Please open it on
                    a desktop or laptop to see the full interactive shelf.
                </p>

                <p>btw, thanks for checking my works :)</p>
            </section>
        </main>
    );
};

export default MobileWipNotice;
