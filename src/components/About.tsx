import React from 'react';
import { MapPin, Calendar, Award, Coffee } from 'lucide-react';
import type { Skill } from '../types';

const skills: Skill[] = [
  { name: 'React Native', level: 95, category: 'mobile' },
  { name: 'Flutter', level: 90, category: 'mobile' },
  { name: 'Swift', level: 85, category: 'mobile' },
  { name: 'Kotlin', level: 88, category: 'mobile' },
  { name: 'Node.js', level: 92, category: 'backend' },
  { name: 'Firebase', level: 90, category: 'backend' },
  { name: 'MongoDB', level: 85, category: 'backend' },
  { name: 'Figma', level: 80, category: 'design' },
  { name: 'Xcode', level: 90, category: 'tools' },
  { name: 'Android Studio', level: 88, category: 'tools' },
];

const About: React.FC = () => {
  const categoryColors = {
    mobile: 'from-cyan-500 to-blue-500',
    backend: 'from-purple-500 to-pink-500',
    design: 'from-green-500 to-lime-500',
    tools: 'from-orange-500 to-red-500',
  };

  return (
    <section id="about" className="py-20 px-6 bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Personal Info */}
          <div className="space-y-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 transform hover:scale-105 transition-all duration-300">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-cyan-500/20 rounded-full">
                      <MapPin className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Location</p>
                      <p className="text-white font-semibold">Beirut, Lebanon</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-purple-500/20 rounded-full">
                      <Calendar className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Experience</p>
                      <p className="text-white font-semibold">5+ Years</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-lime-500/20 rounded-full">
                      <Award className="w-6 h-6 text-lime-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Projects</p>
                      <p className="text-white font-semibold">50+ Completed</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-orange-500/20 rounded-full">
                      <Coffee className="w-6 h-6 text-orange-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Coffee Consumed</p>
                      <p className="text-white font-semibold">∞ Cups</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed text-lg">
                Passionate mobile developer with 5+ years of experience creating innovative mobile solutions. 
                I specialize in React Native, Flutter, and native iOS/Android development, delivering high-performance 
                applications that serve thousands of users worldwide.
              </p>
              <p className="text-gray-300 leading-relaxed text-lg">
                Based in Beirut, Lebanon, I've worked with startups and established companies to bring their mobile 
                visions to life. I'm passionate about clean code, user experience, and staying at the forefront of 
                mobile technology trends.
              </p>
            </div>
          </div>

          {/* Right Column - Skills */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-white mb-8">Technical Skills</h3>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={skill.name} className="group">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">{skill.name}</span>
                    <span className="text-gray-400 text-sm">{skill.level}%</span>
                  </div>
                  <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`absolute top-0 left-0 h-full bg-gradient-to-r ${categoryColors[skill.category]} rounded-full transform origin-left transition-all duration-1000 ease-out group-hover:scale-105`}
                      style={{ 
                        width: `${skill.level}%`,
                        animationDelay: `${index * 100}ms`
                      }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;