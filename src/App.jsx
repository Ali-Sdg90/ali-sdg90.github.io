import DynamicBackground from "./components/DynamicBackground";
import Shelf from "./components/Shelf";
import HomePage from "./pages/HomePage";

const App = () => {
    return (
        <div className="page-style">
            <h1>App</h1>

            <DynamicBackground />

            <Shelf />

            <HomePage />
        </div>
    );
};

export default App;
