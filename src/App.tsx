import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';

function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <div className="relative bg-slate-900 text-white overflow-x-hidden">
      {/* Admin Button */}
      <button
        onClick={() => setShowAdmin(true)}
        className="fixed bottom-6 right-6 z-40 p-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white shadow-lg hover:scale-110 transform transition-all duration-300 hover:shadow-cyan-500/25"
      >
        <Settings className="w-6 h-6" />
      </button>

      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Certificates />
      <Contact />
      <Footer />
      
      <AdminPanel isOpen={showAdmin} onClose={() => setShowAdmin(false)} />
    </div>
  );
}

export default App;