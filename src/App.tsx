import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Timeline from './components/Timeline';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import SEOHead from './components/SEOHead';

function App() {
  return (
    <Router>
      <SEOHead />
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/" element={
          <div className="relative bg-slate-900 text-white overflow-x-hidden">
            <Navigation />
            <Hero />
            <About />
            <Timeline />
            <Projects />
            <Certificates />
            <Contact />
            <Footer />
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;