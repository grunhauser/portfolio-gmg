import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { Starfield } from './components/Starfield';
import { About } from './sections/About';
import { Contact } from './sections/Contact';
import { Experience } from './sections/Experience';
import { Hero } from './sections/Hero';
import { Projects } from './sections/Projects';
import { TechStack } from './sections/TechStack';

/** Root component: background, navigation and all page sections. */
export default function App() {
  return (
    <>
      <Starfield />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <TechStack />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
