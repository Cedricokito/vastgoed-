import { useEffect } from 'react';
import './App.css';
import { LanguageProvider } from './context/LanguageContext';
import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Locations from './sections/Locations';
import Benefits from './sections/Benefits';
import Projects from './sections/Projects';
import CTA from './sections/CTA';
import Footer from './sections/Footer';

function App() {
  useEffect(() => {
    document.title = 'Whitestar Capital | Off-Plan Real Estate Investment';
  }, []);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-dark-blue text-white overflow-x-hidden">
        <Navigation />
        <main>
          <Hero />
          <About />
          <Locations />
          <Benefits />
          <Projects />
          <CTA />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
