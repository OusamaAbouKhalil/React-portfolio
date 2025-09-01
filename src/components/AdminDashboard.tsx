import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, BarChart3, Users, FolderOpen, Award, Settings, LogOut } from 'lucide-react';
import { useProjects } from '../hooks/useProjects';
import { useCertificates } from '../hooks/useCertificates';
import type { Project, Certificate } from '../types';

const AdminDashboard: React.FC = () => {
  const { projects, addProject, loading: projectsLoading } = useProjects();
  const { certificates, addCertificate, loading: certificatesLoading } = useCertificates();
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'certificates' | 'settings'>('overview');
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showCertificateForm, setShowCertificateForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    tech_stack: '',
    github_url: '',
    demo_url: '',
    app_store_url: '',
    play_store_url: '',
    image_url: '',
    featured: false,
  });

  const [certificateForm, setCertificateForm] = useState({
    name: '',
    issuer: '',
    date: '',
    credential_url: '',
    image_url: '',
  });

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const projectData: Omit<Project, 'id' | 'created_at'> = {
        ...projectForm,
        tech_stack: projectForm.tech_stack.split(',').map(tech => tech.trim()),
      };
      
      await addProject(projectData);
      setProjectForm({
        title: '',
        description: '',
        tech_stack: '',
        github_url: '',
        demo_url: '',
        app_store_url: '',
        play_store_url: '',
        image_url: '',
        featured: false,
      });
      setShowProjectForm(false);
      alert('Project added successfully!');
    } catch (error) {
      alert('Failed to add project');
    } finally {
      setLoading(false);
    }
  };

  const handleCertificateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await addCertificate(certificateForm);
      setCertificateForm({
        name: '',
        issuer: '',
        date: '',
        credential_url: '',
        image_url: '',
      });
      setShowCertificateForm(false);
      alert('Certificate added successfully!');
    } catch (error) {
      alert('Failed to add certificate');
    } finally {
      setLoading(false);
    }
  };

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="bg-slate-800 border-b border-white/10 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
              <p className="text-gray-400 text-sm">Manage your portfolio content</p>
            </div>
          </div>
          <a
            href="/"
            className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-300"
          >
            <LogOut className="w-4 h-4" />
            <span>Back to Site</span>
          </a>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-800 min-h-screen border-r border-white/10">
          <nav className="p-4 space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border border-cyan-500/30'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold">Dashboard Overview</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Total Projects</p>
                      <p className="text-3xl font-bold text-cyan-400">{projects.length}</p>
                    </div>
                    <FolderOpen className="w-12 h-12 text-cyan-400/50" />
                  </div>
                </div>
                
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Certificates</p>
                      <p className="text-3xl font-bold text-purple-400">{certificates.length}</p>
                    </div>
                    <Award className="w-12 h-12 text-purple-400/50" />
                  </div>
                </div>
                
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Featured Projects</p>
                      <p className="text-3xl font-bold text-lime-400">
                        {projects.filter(p => p.featured).length}
                      </p>
                    </div>
                    <BarChart3 className="w-12 h-12 text-lime-400/50" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">Manage Projects</h2>
                <button
                  onClick={() => setShowProjectForm(true)}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl text-white font-semibold hover:scale-105 transition-transform duration-300"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Project</span>
                </button>
              </div>

              {projectsLoading ? (
                <div className="text-center py-20">Loading projects...</div>
              ) : (
                <div className="grid gap-6">
                  {projects.map((project) => (
                    <div key={project.id} className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                          <p className="text-gray-400 mb-4">{project.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {project.tech_stack.map((tech) => (
                              <span key={tech} className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-md">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-300">
                            <Edit className="w-4 h-4 text-gray-300" />
                          </button>
                          <button className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors duration-300">
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'certificates' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">Manage Certificates</h2>
                <button
                  onClick={() => setShowCertificateForm(true)}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold hover:scale-105 transition-transform duration-300"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Certificate</span>
                </button>
              </div>

              {certificatesLoading ? (
                <div className="text-center py-20">Loading certificates...</div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {certificates.map((certificate) => (
                    <div key={certificate.id} className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white mb-1">{certificate.name}</h3>
                          <p className="text-purple-300 text-sm mb-2">{certificate.issuer}</p>
                          <p className="text-gray-400 text-sm">{certificate.date}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-300">
                            <Edit className="w-4 h-4 text-gray-300" />
                          </button>
                          <button className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors duration-300">
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Settings</h2>
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                <p className="text-gray-400">Settings panel coming soon...</p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Project Form Modal */}
      {showProjectForm && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/10">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h3 className="text-xl font-bold">Add New Project</h3>
              <button onClick={() => setShowProjectForm(false)}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            
            <form onSubmit={handleProjectSubmit} className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Project Title"
                  value={projectForm.title}
                  onChange={(e) => setProjectForm(prev => ({ ...prev, title: e.target.value }))}
                  required
                  className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <input
                  type="text"
                  placeholder="Tech Stack (comma separated)"
                  value={projectForm.tech_stack}
                  onChange={(e) => setProjectForm(prev => ({ ...prev, tech_stack: e.target.value }))}
                  required
                  className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              
              <textarea
                placeholder="Project Description"
                value={projectForm.description}
                onChange={(e) => setProjectForm(prev => ({ ...prev, description: e.target.value }))}
                required
                rows={3}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
              />
              
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="url"
                  placeholder="Image URL"
                  value={projectForm.image_url}
                  onChange={(e) => setProjectForm(prev => ({ ...prev, image_url: e.target.value }))}
                  required
                  className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <input
                  type="url"
                  placeholder="GitHub URL"
                  value={projectForm.github_url}
                  onChange={(e) => setProjectForm(prev => ({ ...prev, github_url: e.target.value }))}
                  className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  id="featured"
                  checked={projectForm.featured}
                  onChange={(e) => setProjectForm(prev => ({ ...prev, featured: e.target.checked }))}
                  className="w-5 h-5 rounded border-white/20 bg-white/10 text-cyan-500 focus:ring-cyan-500"
                />
                <label htmlFor="featured" className="text-gray-300 font-medium">
                  Featured Project
                </label>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl text-white font-semibold hover:scale-105 transition-transform duration-300 disabled:opacity-50"
              >
                {loading ? 'Adding...' : 'Add Project'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Certificate Form Modal */}
      {showCertificateForm && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/10">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h3 className="text-xl font-bold">Add New Certificate</h3>
              <button onClick={() => setShowCertificateForm(false)}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            
            <form onSubmit={handleCertificateSubmit} className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Certificate Name"
                  value={certificateForm.name}
                  onChange={(e) => setCertificateForm(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="text"
                  placeholder="Issuer"
                  value={certificateForm.issuer}
                  onChange={(e) => setCertificateForm(prev => ({ ...prev, issuer: e.target.value }))}
                  required
                  className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="date"
                  value={certificateForm.date}
                  onChange={(e) => setCertificateForm(prev => ({ ...prev, date: e.target.value }))}
                  required
                  className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="url"
                  placeholder="Credential URL"
                  value={certificateForm.credential_url}
                  onChange={(e) => setCertificateForm(prev => ({ ...prev, credential_url: e.target.value }))}
                  className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <input
                type="url"
                placeholder="Certificate Image URL"
                value={certificateForm.image_url}
                onChange={(e) => setCertificateForm(prev => ({ ...prev, image_url: e.target.value }))}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold hover:scale-105 transition-transform duration-300 disabled:opacity-50"
              >
                {loading ? 'Adding...' : 'Add Certificate'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;