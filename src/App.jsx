import DynamicBackground from "./components/DynamicBackground";
import Intro from "./components/Intro";
import Shelf from "./components/Shelf";

const App = () => {
    return (
        <div className="page-style">
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
    );
};

export default App;
