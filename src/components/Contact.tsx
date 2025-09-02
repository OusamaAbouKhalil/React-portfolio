import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setFormData({ name: '', email: '', message: '' });
    alert('Message sent successfully!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-20 px-6 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-lime-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            Let's Connect
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have a project in mind? Let's build something amazing together.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-lime-500 to-cyan-500 mx-auto rounded-full mt-4"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-4 group">
                <div className="p-4 bg-cyan-500/20 rounded-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  <Mail className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="text-white font-semibold">alex.johnson@email.com</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 group">
                <div className="p-4 bg-purple-500/20 rounded-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  <Phone className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Phone</p>
                  <p className="text-white font-semibold">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 group">
                <div className="p-4 bg-lime-500/20 rounded-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  <MapPin className="w-6 h-6 text-lime-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Location</p>
                  <p className="text-white font-semibold">San Francisco, CA</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-8">
              <h3 className="text-xl font-bold text-white mb-6">Follow Me</h3>
              <div className="flex space-x-4">
                <a href="#" className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-110 hover:-rotate-12">
                  <Github className="w-6 h-6 text-gray-300 hover:text-white" />
                </a>
                <a href="#" className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-110 hover:-rotate-12">
                  <Linkedin className="w-6 h-6 text-gray-300 hover:text-white" />
                </a>
                <a href="#" className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-110 hover:-rotate-12">
                  <Twitter className="w-6 h-6 text-gray-300 hover:text-white" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl blur-xl"></div>
            
            <form onSubmit={handleSubmit} className="relative bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                  placeholder="Your Name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl text-white font-semibold overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;