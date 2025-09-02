import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, BarChart3, Users, FolderOpen, Award, Settings, LogOut, User, Clock, Globe, Code } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useProjects } from '../hooks/useProjects';
import { useCertificates } from '../hooks/useCertificates';
import { usePersonalInfo } from '../hooks/usePersonalInfo';
import { useTimeline } from '../hooks/useTimeline';
import { useSkills } from '../hooks/useSkills';
import { useLanguages } from '../hooks/useLanguages';
import ImageUpload from './ImageUpload';
import type { Project, Certificate, TimelineItem, Skill, Language } from '../types';

const AdminDashboard: React.FC = () => {
  const { logout } = useAuth();
  const { projects, addProject, loading: projectsLoading } = useProjects();
  const { certificates, addCertificate, loading: certificatesLoading } = useCertificates();
  const { personalInfo, updatePersonalInfo } = usePersonalInfo();
  const { timeline, addTimelineItem, updateTimelineItem, deleteTimelineItem } = useTimeline();
  const { skills, addSkill, updateSkill, deleteSkill } = useSkills();
  const { languages, addLanguage, updateLanguage, deleteLanguage } = useLanguages();
  
  const [activeTab, setActiveTab] = useState<'overview' | 'personal' | 'timeline' | 'skills' | 'languages' | 'projects' | 'certificates'>('overview');
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showCertificateForm, setShowCertificateForm] = useState(false);
  const [showTimelineForm, setShowTimelineForm] = useState(false);
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [showLanguageForm, setShowLanguageForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Form states
  const [personalForm, setPersonalForm] = useState({
    name: personalInfo?.name || 'Ousama Abou Khalil',
    title: personalInfo?.title || 'Mobile Developer',
    location: personalInfo?.location || 'Beirut, Lebanon',
    phone: personalInfo?.phone || '+96181238678',
    email: personalInfo?.email || 'ousamaaboukhalil@gmail.com',
    summary: personalInfo?.summary || 'Experienced mobile developer creating user-friendly and reliable apps, adept at troubleshooting and teamwork, passionate about learning new technologies and best practices.',
    linkedin_url: personalInfo?.linkedin_url || '',
    github_url: personalInfo?.github_url || '',
    portfolio_url: personalInfo?.portfolio_url || '',
    profile_image: personalInfo?.profile_image || '',
  });

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
    category: 'mobile' as 'mobile' | 'web' | 'game',
  });

  const [certificateForm, setCertificateForm] = useState({
    name: '',
    issuer: '',
    date: '',
    credential_url: '',
    image_url: '',
  });

  const [timelineForm, setTimelineForm] = useState({
    type: 'experience' as 'education' | 'experience',
    title: '',
    organization: '',
    location: '',
    period: '',
    description: '',
    technologies: '',
  });

  const [skillForm, setSkillForm] = useState({
    name: '',
    level: 80,
    category: 'mobile' as 'mobile' | 'backend' | 'frontend' | 'tools' | 'design',
  });

  const [languageForm, setLanguageForm] = useState({
    name: '',
    proficiency: '',
  });

  React.useEffect(() => {
    if (personalInfo) {
      setPersonalForm({
        name: personalInfo.name,
        title: personalInfo.title,
        location: personalInfo.location,
        phone: personalInfo.phone,
        email: personalInfo.email,
        summary: personalInfo.summary,
        linkedin_url: personalInfo.linkedin_url || '',
        github_url: personalInfo.github_url || '',
        portfolio_url: personalInfo.portfolio_url || '',
        profile_image: personalInfo.profile_image || '',
      });
    }
  }, [personalInfo]);

  const handlePersonalInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await updatePersonalInfo(personalForm);
      alert('Personal information updated successfully!');
    } catch (error) {
      alert('Failed to update personal information');
    } finally {
      setLoading(false);
    }
  };

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
        category: 'mobile',
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

  const handleTimelineSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const timelineData: Omit<TimelineItem, 'id' | 'created_at'> = {
        ...timelineForm,
        description: timelineForm.description.split('\n').filter(line => line.trim()),
        technologies: timelineForm.technologies ? timelineForm.technologies.split(',').map(tech => tech.trim()) : undefined,
      };
      
      if (editingItem) {
        await updateTimelineItem(editingItem.id, timelineData);
        setEditingItem(null);
      } else {
        await addTimelineItem(timelineData);
      }
      
      setTimelineForm({
        type: 'experience',
        title: '',
        organization: '',
        location: '',
        period: '',
        description: '',
        technologies: '',
      });
      setShowTimelineForm(false);
      alert('Timeline item saved successfully!');
    } catch (error) {
      alert('Failed to save timeline item');
    } finally {
      setLoading(false);
    }
  };

  const handleSkillSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (editingItem) {
        await updateSkill(editingItem.id, skillForm);
        setEditingItem(null);
      } else {
        await addSkill(skillForm);
      }
      
      setSkillForm({
        name: '',
        level: 80,
        category: 'mobile',
      });
      setShowSkillForm(false);
      alert('Skill saved successfully!');
    } catch (error) {
      alert('Failed to save skill');
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (editingItem) {
        await updateLanguage(editingItem.id, languageForm);
        setEditingItem(null);
      } else {
        await addLanguage(languageForm);
      }
      
      setLanguageForm({
        name: '',
        proficiency: '',
      });
      setShowLanguageForm(false);
      alert('Language saved successfully!');
    } catch (error) {
      alert('Failed to save language');
    } finally {
      setLoading(false);
    }
  };

  const editTimelineItem = (item: TimelineItem) => {
    setEditingItem(item);
    setTimelineForm({
      type: item.type,
      title: item.title,
      organization: item.organization,
      location: item.location,
      period: item.period,
      description: item.description.join('\n'),
      technologies: item.technologies?.join(', ') || '',
    });
    setShowTimelineForm(true);
  };

  const editSkill = (skill: Skill) => {
    setEditingItem(skill);
    setSkillForm({
      name: skill.name,
      level: skill.level,
      category: skill.category,
    });
    setShowSkillForm(true);
  };

  const editLanguage = (language: Language) => {
    setEditingItem(language);
    setLanguageForm({
      name: language.name,
      proficiency: language.proficiency,
    });
    setShowLanguageForm(true);
  };

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'timeline', label: 'Timeline', icon: Clock },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'languages', label: 'Languages', icon: Globe },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'certificates', label: 'Certificates', icon: Award },
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
          <div className="flex items-center space-x-4">
            <a
              href="/"
              className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-300"
            >
              <span>View Site</span>
            </a>
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors duration-300"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
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
        <main className="flex-1 p-8 max-h-screen overflow-y-auto">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold">Dashboard Overview</h2>
              
              <div className="grid md:grid-cols-4 gap-6">
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
                      <p className="text-gray-400 text-sm">Skills</p>
                      <p className="text-3xl font-bold text-lime-400">{skills.length}</p>
                    </div>
                    <Code className="w-12 h-12 text-lime-400/50" />
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Timeline Items</p>
                      <p className="text-3xl font-bold text-orange-400">{timeline.length}</p>
                    </div>
                    <Clock className="w-12 h-12 text-orange-400/50" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'personal' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Personal Information</h2>
              
              <form onSubmit={handlePersonalInfoSubmit} className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={personalForm.name}
                      onChange={(e) => setPersonalForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Professional Title</label>
                    <input
                      type="text"
                      value={personalForm.title}
                      onChange={(e) => setPersonalForm(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                    <input
                      type="text"
                      value={personalForm.location}
                      onChange={(e) => setPersonalForm(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                    <input
                      type="text"
                      value={personalForm.phone}
                      onChange={(e) => setPersonalForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      value={personalForm.email}
                      onChange={(e) => setPersonalForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Professional Summary</label>
                  <textarea
                    value={personalForm.summary}
                    onChange={(e) => setPersonalForm(prev => ({ ...prev, summary: e.target.value }))}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Profile Image</label>
                  <ImageUpload
                    onImageUploaded={(url) => setPersonalForm(prev => ({ ...prev, profile_image: url }))}
                    currentImage={personalForm.profile_image}
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn URL</label>
                    <input
                      type="url"
                      value={personalForm.linkedin_url}
                      onChange={(e) => setPersonalForm(prev => ({ ...prev, linkedin_url: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">GitHub URL</label>
                    <input
                      type="url"
                      value={personalForm.github_url}
                      onChange={(e) => setPersonalForm(prev => ({ ...prev, github_url: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Portfolio URL</label>
                    <input
                      type="url"
                      value={personalForm.portfolio_url}
                      onChange={(e) => setPersonalForm(prev => ({ ...prev, portfolio_url: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl text-white font-semibold hover:scale-105 transition-transform duration-300 disabled:opacity-50"
                >
                  {loading ? 'Updating...' : 'Update Personal Information'}
                </button>
              </form>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">Manage Timeline</h2>
                <button
                  onClick={() => setShowTimelineForm(true)}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-lime-500 to-green-500 rounded-xl text-white font-semibold hover:scale-105 transition-transform duration-300"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Timeline Item</span>
                </button>
              </div>

              <div className="grid gap-6">
                {timeline.map((item) => (
                  <div key={item.id} className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-xl font-bold text-white">{item.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                            item.type === 'education' 
                              ? 'bg-lime-500/20 text-lime-400' 
                              : 'bg-cyan-500/20 text-cyan-400'
                          }`}>
                            {item.type.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-purple-300 font-medium mb-1">{item.organization}</p>
                        <p className="text-gray-400 text-sm mb-2">{item.period} • {item.location}</p>
                        <div className="text-gray-300 text-sm space-y-1">
                          {item.description.map((desc, i) => (
                            <p key={i}>• {desc}</p>
                          ))}
                        </div>
                        {item.technologies && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {item.technologies.map((tech) => (
                              <span key={tech} className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-md">
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => editTimelineItem(item)}
                          className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-300"
                        >
                          <Edit className="w-4 h-4 text-gray-300" />
                        </button>
                        <button 
                          onClick={() => deleteTimelineItem(item.id)}
                          className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors duration-300"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">Manage Skills</h2>
                <button
                  onClick={() => setShowSkillForm(true)}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl text-white font-semibold hover:scale-105 transition-transform duration-300"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Skill</span>
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {skills.map((skill) => (
                  <div key={skill.id} className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white">{skill.name}</h3>
                        <p className="text-gray-400 text-sm capitalize">{skill.category}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-cyan-400 font-bold">{skill.level}%</span>
                        <div className="flex space-x-1">
                          <button 
                            onClick={() => editSkill(skill)}
                            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-300"
                          >
                            <Edit className="w-4 h-4 text-gray-300" />
                          </button>
                          <button 
                            onClick={() => deleteSkill(skill.id)}
                            className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors duration-300"
                          >
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className="h-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-300"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'languages' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">Manage Languages</h2>
                <button
                  onClick={() => setShowLanguageForm(true)}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-lime-500 to-green-500 rounded-xl text-white font-semibold hover:scale-105 transition-transform duration-300"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Language</span>
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {languages.map((language) => (
                  <div key={language.id} className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white">{language.name}</h3>
                        <p className="text-lime-400 text-sm font-semibold">{language.proficiency}</p>
                      </div>
                      <div className="flex space-x-1">
                        <button 
                          onClick={() => editLanguage(language)}
                          className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-300"
                        >
                          <Edit className="w-4 h-4 text-gray-300" />
                        </button>
                        <button 
                          onClick={() => deleteLanguage(language.id)}
                          className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors duration-300"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
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

              <div className="grid gap-6">
                {projects.map((project) => (
                  <div key={project.id} className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-xl font-bold text-white">{project.title}</h3>
                          {project.featured && (
                            <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-bold rounded-full">
                              FEATURED
                            </span>
                          )}
                          <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs font-bold rounded-full capitalize">
                            {project.category}
                          </span>
                        </div>
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
            </div>
          )}
        </main>
      </div>

      {/* Timeline Form Modal */}
      {showTimelineForm && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/10">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h3 className="text-xl font-bold">{editingItem ? 'Edit' : 'Add'} Timeline Item</h3>
              <button onClick={() => {
                setShowTimelineForm(false);
                setEditingItem(null);
                setTimelineForm({
                  type: 'experience',
                  title: '',
                  organization: '',
                  location: '',
                  period: '',
                  description: '',
                  technologies: '',
                });
              }}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            
            <form onSubmit={handleTimelineSubmit} className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                  <select
                    value={timelineForm.type}
                    onChange={(e) => setTimelineForm(prev => ({ ...prev, type: e.target.value as 'education' | 'experience' }))}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-lime-500"
                  >
                    <option value="experience">Experience</option>
                    <option value="education">Education</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                  <input
                    type="text"
                    value={timelineForm.title}
                    onChange={(e) => setTimelineForm(prev => ({ ...prev, title: e.target.value }))}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Organization</label>
                  <input
                    type="text"
                    value={timelineForm.organization}
                    onChange={(e) => setTimelineForm(prev => ({ ...prev, organization: e.target.value }))}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                  <input
                    type="text"
                    value={timelineForm.location}
                    onChange={(e) => setTimelineForm(prev => ({ ...prev, location: e.target.value }))}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Period</label>
                <input
                  type="text"
                  placeholder="e.g., July 2025 – Present"
                  value={timelineForm.period}
                  onChange={(e) => setTimelineForm(prev => ({ ...prev, period: e.target.value }))}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description (one per line)</label>
                <textarea
                  value={timelineForm.description}
                  onChange={(e) => setTimelineForm(prev => ({ ...prev, description: e.target.value }))}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500 resize-none"
                  placeholder="Enter each responsibility or achievement on a new line"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Technologies (comma separated)</label>
                <input
                  type="text"
                  value={timelineForm.technologies}
                  onChange={(e) => setTimelineForm(prev => ({ ...prev, technologies: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500"
                  placeholder="React Native, Flutter, Firebase"
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-lime-500 to-green-500 rounded-xl text-white font-semibold hover:scale-105 transition-transform duration-300 disabled:opacity-50"
              >
                {loading ? 'Saving...' : editingItem ? 'Update Timeline Item' : 'Add Timeline Item'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Skill Form Modal */}
      {showSkillForm && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-2xl w-full max-w-md border border-white/10">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h3 className="text-xl font-bold">{editingItem ? 'Edit' : 'Add'} Skill</h3>
              <button onClick={() => {
                setShowSkillForm(false);
                setEditingItem(null);
                setSkillForm({ name: '', level: 80, category: 'mobile' });
              }}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            
            <form onSubmit={handleSkillSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Skill Name</label>
                <input
                  type="text"
                  value={skillForm.name}
                  onChange={(e) => setSkillForm(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Proficiency Level (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={skillForm.level}
                  onChange={(e) => setSkillForm(prev => ({ ...prev, level: parseInt(e.target.value) }))}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                <select
                  value={skillForm.category}
                  onChange={(e) => setSkillForm(prev => ({ ...prev, category: e.target.value as any }))}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="mobile">Mobile</option>
                  <option value="backend">Backend</option>
                  <option value="frontend">Frontend</option>
                  <option value="tools">Tools</option>
                  <option value="design">Design</option>
                </select>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl text-white font-semibold hover:scale-105 transition-transform duration-300 disabled:opacity-50"
              >
                {loading ? 'Saving...' : editingItem ? 'Update Skill' : 'Add Skill'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Language Form Modal */}
      {showLanguageForm && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-2xl w-full max-w-md border border-white/10">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h3 className="text-xl font-bold">{editingItem ? 'Edit' : 'Add'} Language</h3>
              <button onClick={() => {
                setShowLanguageForm(false);
                setEditingItem(null);
                setLanguageForm({ name: '', proficiency: '' });
              }}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            
            <form onSubmit={handleLanguageSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Language</label>
                <input
                  type="text"
                  value={languageForm.name}
                  onChange={(e) => setLanguageForm(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Proficiency</label>
                <select
                  value={languageForm.proficiency}
                  onChange={(e) => setLanguageForm(prev => ({ ...prev, proficiency: e.target.value }))}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-lime-500"
                >
                  <option value="">Select proficiency</option>
                  <option value="Native">Native</option>
                  <option value="Business Fluent">Business Fluent</option>
                  <option value="Fluent">Fluent</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Basic">Basic</option>
                </select>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-lime-500 to-green-500 rounded-xl text-white font-semibold hover:scale-105 transition-transform duration-300 disabled:opacity-50"
              >
                {loading ? 'Saving...' : editingItem ? 'Update Language' : 'Add Language'}
              </button>
            </form>
          </div>
        </div>
      )}

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
                <select
                  value={projectForm.category}
                  onChange={(e) => setProjectForm(prev => ({ ...prev, category: e.target.value as any }))}
                  className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="mobile">Mobile App</option>
                  <option value="web">Website</option>
                  <option value="game">Game</option>
                </select>
              </div>
              
              <textarea
                placeholder="Project Description"
                value={projectForm.description}
                onChange={(e) => setProjectForm(prev => ({ ...prev, description: e.target.value }))}
                required
                rows={3}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
              />

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Tech Stack (comma separated)</label>
                <input
                  type="text"
                  placeholder="React Native, Flutter, Firebase"
                  value={projectForm.tech_stack}
                  onChange={(e) => setProjectForm(prev => ({ ...prev, tech_stack: e.target.value }))}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Project Image</label>
                <ImageUpload
                  onImageUploaded={(url) => setProjectForm(prev => ({ ...prev, image_url: url }))}
                  currentImage={projectForm.image_url}
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="url"
                  placeholder="GitHub URL"
                  value={projectForm.github_url}
                  onChange={(e) => setProjectForm(prev => ({ ...prev, github_url: e.target.value }))}
                  className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <input
                  type="url"
                  placeholder="Demo URL"
                  value={projectForm.demo_url}
                  onChange={(e) => setProjectForm(prev => ({ ...prev, demo_url: e.target.value }))}
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

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Certificate Image</label>
                <ImageUpload
                  onImageUploaded={(url) => setCertificateForm(prev => ({ ...prev, image_url: url }))}
                  currentImage={certificateForm.image_url}
                />
              </div>
              
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