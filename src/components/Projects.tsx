import React from 'react';
import { ExternalLink, Github, Smartphone, Play } from 'lucide-react';
import { useProjects } from '../hooks/useProjects';
import LoadingSpinner from './LoadingSpinner';

const Projects: React.FC = () => {
  const { projects, loading, error } = useProjects();

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-400 text-center py-20">Error: {error}</div>;

  return (
    <section id="projects" className="py-20 px-6 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore some of my most impactful mobile applications
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full mt-4"></div>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-12 border border-white/10 max-w-md mx-auto">
              <Smartphone className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Projects Yet</h3>
              <p className="text-gray-400">Projects will appear here once added to the database.</p>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project: { tech_stack: string[] | string; id: string; image_url: string; title: string; description: string; featured?: boolean; github_url?: string; demo_url?: string; app_store_url?: string; play_store_url?: string }, index: number) => {
              // Ensure tech_stack is always an array
              const techStack = Array.isArray(project.tech_stack)
                ? project.tech_stack
                : typeof project.tech_stack === 'string'
                ? JSON.parse(project.tech_stack) // <-- parse JSON array string
                : [];

              return (
                <div
                  key={project.id}
                  className="group relative"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                  
                  <div className="relative bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 transform hover:scale-105 hover:-rotate-2 transition-all duration-500">
                    {/* Project Image */}
                    <div className="relative h-48 bg-gradient-to-br from-slate-700 to-slate-800 overflow-hidden">
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      
                      {/* Featured Badge */}
                      {project.featured && (
                        <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold rounded-full">
                          FEATURED
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                        {project.title}
                      </h3>
                      
                      <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                        {project.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2">
                        {techStack.map((tech: string) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-white/10 text-xs font-medium text-cyan-300 rounded-full border border-cyan-500/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Links */}
                      <div className="flex space-x-3 pt-4">
                        {project.github_url && (
                          <a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 hover:scale-110"
                          >
                            <Github className="w-5 h-5 text-gray-300 hover:text-white" />
                          </a>
                        )}
                        {project.demo_url && (
                          <a
                            href={project.demo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 hover:scale-110"
                          >
                            <ExternalLink className="w-5 h-5 text-gray-300 hover:text-white" />
                          </a>
                        )}
                        {project.app_store_url && (
                          <a
                            href={project.app_store_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 hover:scale-110"
                          >
                            <Smartphone className="w-5 h-5 text-gray-300 hover:text-white" />
                          </a>
                        )}
                        {project.play_store_url && (
                          <a
                            href={project.play_store_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 hover:scale-110"
                          >
                            <Play className="w-5 h-5 text-gray-300 hover:text-white" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
