import React from 'react';
import { Calendar, MapPin, Building, GraduationCap, Briefcase } from 'lucide-react';

interface TimelineItem {
  id: string;
  type: 'education' | 'experience';
  title: string;
  organization: string;
  location: string;
  period: string;
  description: string[];
  technologies?: string[];
}

const timelineData: TimelineItem[] = [
  {
    id: '1',
    type: 'experience',
    title: 'Senior Mobile Developer',
    organization: 'Tech Innovations Inc.',
    location: 'San Francisco, CA',
    period: '2022 - Present',
    description: [
      'Lead development of cross-platform mobile applications using React Native and Flutter',
      'Architected scalable mobile solutions serving 100K+ active users',
      'Mentored junior developers and established mobile development best practices',
      'Collaborated with product teams to deliver user-centric mobile experiences'
    ],
    technologies: ['React Native', 'Flutter', 'TypeScript', 'Firebase', 'Redux']
  },
  {
    id: '2',
    type: 'experience',
    title: 'Mobile Developer',
    organization: 'Digital Solutions LLC',
    location: 'Remote',
    period: '2020 - 2022',
    description: [
      'Developed and maintained iOS and Android applications',
      'Implemented CI/CD pipelines for automated testing and deployment',
      'Optimized app performance resulting in 40% faster load times',
      'Integrated third-party APIs and payment gateways'
    ],
    technologies: ['Swift', 'Kotlin', 'React Native', 'Node.js', 'MongoDB']
  },
  {
    id: '3',
    type: 'education',
    title: 'Bachelor of Computer Science',
    organization: 'University of Technology',
    location: 'Lebanon',
    period: '2016 - 2020',
    description: [
      'Graduated with honors, GPA: 3.8/4.0',
      'Specialized in Software Engineering and Mobile Computing',
      'Led university mobile app development club',
      'Completed capstone project on cross-platform mobile frameworks'
    ],
    technologies: ['Java', 'C++', 'Python', 'Android', 'iOS']
  },
  {
    id: '4',
    type: 'experience',
    title: 'Junior Developer',
    organization: 'StartupHub',
    location: 'Beirut, Lebanon',
    period: '2019 - 2020',
    description: [
      'Built mobile applications for local businesses',
      'Gained experience in full-stack mobile development',
      'Worked with agile development methodologies',
      'Contributed to open-source mobile development tools'
    ],
    technologies: ['React Native', 'Firebase', 'JavaScript', 'Git']
  }
];

const Timeline: React.FC = () => {
  return (
    <section id="timeline" className="py-20 px-6 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background 3D Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-purple-500/5 rounded-full blur-2xl animate-float-delay-1"></div>
        <div className="absolute top-1/2 left-1/4 w-6 h-6 bg-lime-400/30 rotate-45 animate-float-delay-2"></div>
        <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-cyan-400/30 rounded-full animate-float-delay-3"></div>
        <div className="absolute bottom-1/3 left-1/2 w-8 h-8 bg-purple-400/20 rotate-12 animate-float"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-lime-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            My Journey
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A timeline of my professional growth and educational milestones
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-lime-500 to-cyan-500 mx-auto rounded-full mt-4"></div>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-500 via-purple-500 to-lime-500 rounded-full"></div>

          <div className="space-y-12">
            {timelineData.map((item, index) => (
              <div
                key={item.id}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Timeline Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
                  <div className={`w-16 h-16 rounded-full border-4 border-slate-900 flex items-center justify-center transform hover:scale-110 transition-all duration-300 ${
                    item.type === 'education' 
                      ? 'bg-gradient-to-r from-lime-500 to-green-500' 
                      : 'bg-gradient-to-r from-cyan-500 to-purple-500'
                  }`}>
                    {item.type === 'education' ? (
                      <GraduationCap className="w-8 h-8 text-white" />
                    ) : (
                      <Briefcase className="w-8 h-8 text-white" />
                    )}
                  </div>
                </div>

                {/* Content Card */}
                <div className={`w-full max-w-lg ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                  <div className="group perspective-1000">
                    <div className="relative preserve-3d group-hover:rotate-y-12 transition-transform duration-700">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                      
                      <div className="relative bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 transform hover:scale-105 transition-all duration-300">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                              {item.title}
                            </h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <Building className="w-4 h-4 text-purple-400" />
                              <p className="text-purple-300 font-medium">{item.organization}</p>
                            </div>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                            item.type === 'education' 
                              ? 'bg-lime-500/20 text-lime-400 border border-lime-500/30' 
                              : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                          }`}>
                            {item.type === 'education' ? 'EDUCATION' : 'EXPERIENCE'}
                          </div>
                        </div>

                        {/* Meta Info */}
                        <div className="flex items-center space-x-4 mb-4 text-sm text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{item.period}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{item.location}</span>
                          </div>
                        </div>

                        {/* Description */}
                        <ul className="space-y-2 mb-4">
                          {item.description.map((desc, i) => (
                            <li key={i} className="text-gray-300 text-sm flex items-start space-x-2">
                              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></span>
                              <span>{desc}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Technologies */}
                        {item.technologies && (
                          <div className="flex flex-wrap gap-2">
                            {item.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-2 py-1 bg-white/10 text-xs font-medium text-cyan-300 rounded-md border border-cyan-500/30"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;