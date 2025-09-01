import React from 'react';
import { ExternalLink, Award, Shield, Star } from 'lucide-react';
import { useCertificates } from '../hooks/useCertificates';
import LoadingSpinner from './LoadingSpinner';

const Certificates: React.FC = () => {
  const { certificates, loading, error } = useCertificates();

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-400 text-center py-20">Error: {error}</div>;

  return (
    <section id="certificates" className="py-20 px-6 bg-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Certificates & Achievements
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Professional certifications and continuous learning journey
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mt-4"></div>
        </div>

        {certificates.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-12 border border-white/10 max-w-md mx-auto">
              <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Certificates Yet</h3>
              <p className="text-gray-400">Certificates will appear here once added to the database.</p>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {certificates.map((certificate, index) => (
              <div
                key={certificate.id}
                className={`group perspective-1000 ${index % 2 === 0 ? '' : 'md:mt-8'}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative preserve-3d group-hover:rotate-y-6 transition-transform duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                  
                  {/* Certificate Card - Horizontal Layout */}
                  <div className="relative bg-gradient-to-br from-amber-50 to-yellow-100 text-gray-900 rounded-3xl overflow-hidden border-4 border-yellow-400 shadow-2xl transform hover:scale-105 transition-all duration-500">
                    {/* Certificate Header */}
                    <div className="relative bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 p-6">
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/90 to-orange-400/90"></div>
                      <div className="relative flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-3 bg-white/20 rounded-full">
                            <Award className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white">CERTIFICATE</h3>
                            <p className="text-yellow-100 text-sm">OF ACHIEVEMENT</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Star className="w-6 h-6 text-yellow-200" />
                          <Shield className="w-6 h-6 text-yellow-200" />
                        </div>
                      </div>
                    </div>

                    {/* Certificate Body */}
                    <div className="p-8 space-y-6">
                      <div className="text-center space-y-4">
                        <p className="text-gray-600 text-sm uppercase tracking-wider">This certifies that</p>
                        <h4 className="text-2xl font-bold text-gray-800 border-b-2 border-yellow-400 pb-2 inline-block">
                          Ousama Abou Khalil
                        </h4>
                        <p className="text-gray-600 text-sm">has successfully completed</p>
                        <h3 className="text-xl font-bold text-gray-800 leading-tight">
                          {certificate.name}
                        </h3>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-yellow-300">
                        <div className="text-center">
                          <p className="text-gray-600 text-xs uppercase tracking-wider">Issued by</p>
                          <p className="text-gray-800 font-semibold">{certificate.issuer}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-600 text-xs uppercase tracking-wider">Date</p>
                          <p className="text-gray-800 font-semibold">
                            {new Date(certificate.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                        {certificate.credential_url && (
                          <a
                            href={certificate.credential_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-yellow-400 hover:bg-yellow-500 rounded-lg transition-all duration-300 hover:scale-110"
                          >
                            <ExternalLink className="w-5 h-5 text-gray-800" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Certificate Footer */}
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-4">
                      <div className="flex items-center justify-center space-x-4">
                        <div className="w-12 h-1 bg-white/30 rounded-full"></div>
                        <div className="p-2 bg-white/20 rounded-full">
                          <Shield className="w-4 h-4 text-white" />
                        </div>
                        <div className="w-12 h-1 bg-white/30 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Certificates;