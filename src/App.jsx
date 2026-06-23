import DynamicBackground from "./components/DynamicBackground";
import Intro from "./components/Intro";
import MobileWipNotice from "./components/MobileWipNotice";
import Shelf from "./components/Shelf/Shelf";

const App = () => {
    return (
        <>
            {/* TEMPORARY: Remove this wrapper class with the mobile WIP gate. */}
            <div className="page-style desktop-experience">
                <DynamicBackground />

                <main className="portfolio-hero" aria-labelledby="hero-title">
                    <section className="hero-intro">
                        <Intro />
                    </section>

                    <section className="hero-shelf">
                        <Shelf />
                    </section>
                </main>
            </div>

            {/* TEMPORARY: Mobile/tablet placeholder until responsive work begins. */}
            <MobileWipNotice />
        </>
    );
};

export default App;
