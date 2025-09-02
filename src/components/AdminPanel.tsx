import React, { useState } from 'react';
import { Plus, X, Upload, Calendar, Award, Smartphone } from 'lucide-react';
import { useProjects } from '../hooks/useProjects';
import { useCertificates } from '../hooks/useCertificates';
import type { Project, Certificate } from '../types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const { addProject } = useProjects();
  const { addCertificate } = useCertificates();
  const [activeTab, setActiveTab] = useState<'projects' | 'certificates'>('projects');
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
      alert('Certificate added successfully!');
    } catch (error) {
      alert('Failed to add certificate');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-slate-900 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-white/10">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Admin Panel
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-300"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10">
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex-1 py-4 px-6 font-medium transition-colors duration-300 ${
              activeTab === 'projects'
                ? 'text-cyan-400 border-b-2 border-cyan-400 bg-cyan-500/10'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-5 h-5 inline-block mr-2" />
            Projects
          </button>
          <button
            onClick={() => setActiveTab('certificates')}
            className={`flex-1 py-4 px-6 font-medium transition-colors duration-300 ${
              activeTab === 'certificates'
                ? 'text-purple-400 border-b-2 border-purple-400 bg-purple-500/10'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Award className="w-5 h-5 inline-block mr-2" />
            Certificates
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeTab === 'projects' ? (
            <form onSubmit={handleProjectSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Project Title
                  </label>
                  <input
                    type="text"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm(prev => ({ ...prev, title: e.target.value }))}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="Awesome Mobile App"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tech Stack (comma separated)
                  </label>
                  <input
                    type="text"
                    value={projectForm.tech_stack}
                    onChange={(e) => setProjectForm(prev => ({ ...prev, tech_stack: e.target.value }))}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="React Native, TypeScript, Firebase"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={projectForm.description}
                  onChange={(e) => setProjectForm(prev => ({ ...prev, description: e.target.value }))}
                  required
                  rows={3}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                  placeholder="Describe your project..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={projectForm.image_url}
                    onChange={(e) => setProjectForm(prev => ({ ...prev, image_url: e.target.value }))}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={projectForm.github_url}
                    onChange={(e) => setProjectForm(prev => ({ ...prev, github_url: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="https://github.com/username/repo"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Demo URL
                  </label>
                  <input
                    type="url"
                    value={projectForm.demo_url}
                    onChange={(e) => setProjectForm(prev => ({ ...prev, demo_url: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="https://demo.example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    App Store URL
                  </label>
                  <input
                    type="url"
                    value={projectForm.app_store_url}
                    onChange={(e) => setProjectForm(prev => ({ ...prev, app_store_url: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="https://apps.apple.com/..."
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Play Store URL
                  </label>
                  <input
                    type="url"
                    value={projectForm.play_store_url}
                    onChange={(e) => setProjectForm(prev => ({ ...prev, play_store_url: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="https://play.google.com/..."
                  />
                </div>
                
                <div className="flex items-center space-x-4 pt-8">
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
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl text-white font-semibold hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Adding...' : 'Add Project'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleCertificateSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Certificate Name
                  </label>
                  <input
                    type="text"
                    value={certificateForm.name}
                    onChange={(e) => setCertificateForm(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="React Native Certification"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Issuer
                  </label>
                  <input
                    type="text"
                    value={certificateForm.issuer}
                    onChange={(e) => setCertificateForm(prev => ({ ...prev, issuer: e.target.value }))}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Meta (Facebook)"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Date Issued
                  </label>
                  <input
                    type="date"
                    value={certificateForm.date}
                    onChange={(e) => setCertificateForm(prev => ({ ...prev, date: e.target.value }))}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Credential URL
                  </label>
                  <input
                    type="url"
                    value={certificateForm.credential_url}
                    onChange={(e) => setCertificateForm(prev => ({ ...prev, credential_url: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="https://credentials.example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Certificate Image URL
                </label>
                <input
                  type="url"
                  value={certificateForm.image_url}
                  onChange={(e) => setCertificateForm(prev => ({ ...prev, image_url: e.target.value }))}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="https://example.com/certificate.jpg"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Adding...' : 'Add Certificate'}
              </button>
            </form>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="border-t border-white/10 p-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'projects'
                  ? 'bg-cyan-500/20 text-cyan-400'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => setActiveTab('certificates')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'certificates'
                  ? 'bg-purple-500/20 text-purple-400'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              Certificates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;