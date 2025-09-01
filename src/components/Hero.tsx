import React from 'react';
import { ChevronDown, Smartphone, Code, Zap } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-cyan-400 rotate-45 animate-float-3d"></div>
        <div className="absolute top-3/4 right-1/4 w-6 h-6 bg-purple-400 rotate-12 animate-float-delay-1"></div>
        <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-blue-400 rotate-45 animate-float-delay-2"></div>
        <div className="absolute bottom-1/4 left-1/3 w-5 h-5 bg-green-400 rotate-12 animate-float-delay-3"></div>
        <div className="absolute top-1/6 right-1/6 w-8 h-8 bg-lime-400/30 rounded-full animate-float-3d"></div>
        <div className="absolute bottom-1/6 left-1/6 w-6 h-6 bg-orange-400/40 rotate-45 animate-float-delay-1"></div>
        <div className="absolute top-2/3 left-1/5 w-4 h-4 bg-pink-400/50 rounded-full animate-float-delay-2"></div>
        <div className="absolute bottom-1/2 right-1/5 w-5 h-5 bg-indigo-400/40 rotate-12 animate-float-3d"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Main Content */}
        <div className="space-y-8">
          {/* Animated Icons */}
          <div className="flex justify-center space-x-8 mb-8">
            <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 transform hover:scale-110 transition-all duration-300 hover:rotate-12 animate-float">
              <Smartphone className="w-8 h-8 text-cyan-400" />
            </div>
            <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 transform hover:scale-110 transition-all duration-300 hover:rotate-12 animate-float-delay-1">
              <Code className="w-8 h-8 text-purple-400" />
            </div>
            <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 transform hover:scale-110 transition-all duration-300 hover:rotate-12 animate-float-delay-2">
              <Zap className="w-8 h-8 text-lime-400" />
            </div>
          </div>

          {/* Name and Title */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-lime-400 bg-clip-text text-transparent animate-gradient-x">
             Ousama Abou Khalil 
            </h1>
            <div className="text-xl md:text-2xl text-gray-300 font-light tracking-wider">
              <span className="inline-block animate-type-writer">Mobile Developer</span>
              <span className="inline-block w-1 h-6 bg-cyan-400 ml-2 animate-blink"></span>
            </div>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed transform hover:scale-105 transition-transform duration-300">
            Crafting innovative mobile experiences with cutting-edge technology. 
            Specializing in React Native, Flutter, and native iOS/Android development.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white font-semibold overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25">
              <span className="relative z-10">View My Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
            <button className="group px-8 py-4 border-2 border-purple-500 rounded-full text-purple-400 font-semibold hover:bg-purple-500 hover:text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25">
              <span className="relative z-10">Get In Touch</span>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-gray-400" />
      </div>
    </section>
  );
};

export default Hero;