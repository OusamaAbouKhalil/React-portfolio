import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from './components/AuthProvider';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Timeline from './components/Timeline';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import LoginForm from './components/LoginForm';
import SEOHead from './components/SEOHead';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <SEOHead />
        <Routes>
          <Route path="/admin/login" element={<LoginForm />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
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
    </AuthProvider>
  );
}

export default App;