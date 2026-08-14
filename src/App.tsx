/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Welcome from './components/Welcome';
import Rules from './components/Rules';
import Directory from './components/Directory';
import Events from './components/Events';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  // Smooth-scroll navigation helper
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(
      sectionId === 'home' ? 'home-section' : sectionId
    );
    if (element) {
      const headerOffset = 70; // Height of the sticky navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Automated scroll observer to update active header state as user scrolls
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home-section', 'about', 'rules', 'directory', 'events'];
      const scrollPosition = window.scrollY + 120; // threshold offset

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            const mappedId = sectionId === 'home-section' ? 'home' : sectionId;
            setActiveSection(mappedId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      id="seaside-schools-app" 
      className="min-h-screen bg-[#FAF9F6] text-slate-800 antialiased selection:bg-[#E0533C]/20 selection:text-[#0F1A2C] scroll-smooth"
    >
      {/* Navigation Header */}
      <Header activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Main Content Sections */}
      <main id="main-content">
        {/* Home / Hero Section */}
        <Hero onLearnMore={() => handleNavigate('about')} />

        {/* Welcome Section */}
        <Welcome />

        {/* Code of Conduct / Rules Section */}
        <Rules />

        {/* Faculty & Students Directory Section */}
        <Directory />

        {/* Campus Life / Calendar & Events Section */}
        <Events />
      </main>

      {/* Footer & Direct Contact Section */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
