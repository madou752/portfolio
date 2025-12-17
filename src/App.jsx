import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Preloader from "./sections/Preloader";
import Timeline from "./sections/Timeline";
import Contact from "./sections/Contact";
import Cv from "./sections/Cv";
import NavBar from "./sections/Navbar";
import Skills from "./sections/Skills";
import { useState} from "react";
import "./index.css";

function App() {
  const [loading, setLoading] = useState(true);
  
  return (
    <> {loading ? (
        <Preloader onFinish={() => setLoading(false)}/>
      ) : (
      <>
        <NavBar/>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <Cv />
        <Contact />
      </>
      )}
    </>
  );
}

export default App;
