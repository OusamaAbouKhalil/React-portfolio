import React from 'react';
import { ExternalLink, Award } from 'lucide-react';
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((certificate, index) => (
              <div
                key={certificate.id}
                className="group perspective-1000"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative preserve-3d group-hover:rotate-y-12 transition-transform duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                  
                  <div className="relative bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 transform hover:scale-105 transition-all duration-500">
                    {/* Certificate Image */}
                    <div className="relative h-40 bg-gradient-to-br from-purple-600 to-pink-600 overflow-hidden">
                      <img
                        src={certificate.image_url}
                        alt={certificate.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors duration-300 line-clamp-2">
                            {certificate.name}
                          </h3>
                          <p className="text-purple-300 text-sm font-medium mt-1">
                            {certificate.issuer}
                          </p>
                        </div>
                        
                        {certificate.credential_url && (
                          <a
                            href={certificate.credential_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 hover:scale-110 flex-shrink-0"
                          >
                            <ExternalLink className="w-4 h-4 text-gray-300 hover:text-white" />
                          </a>
                        )}
                      </div>
                      
                      <p className="text-gray-400 text-sm">
                        Issued: {new Date(certificate.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
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