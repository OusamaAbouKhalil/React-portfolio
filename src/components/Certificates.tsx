import React, { useState } from 'react';
import { ExternalLink, Award } from 'lucide-react';
import { useCertificates } from '../hooks/useCertificates';
import LoadingSpinner from './LoadingSpinner';

const Certificates: React.FC = () => {
  const { certificates, loading, error } = useCertificates();
  const [modalImage, setModalImage] = useState<string | null>(null);

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
                className="group relative"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>

                <div className="relative bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 transform hover:scale-105 transition-all duration-500">
                  
                  {/* Certificate Image */}
                  <div className="relative h-48 overflow-hidden rounded-t-2xl">
                    <img
                      src={certificate.image_url}
                      alt={certificate.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>

                  {/* Certificate Content */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-white">{certificate.name}</h3>
                    <p className="text-gray-400 text-sm">Issued by {certificate.issuer}</p>
                    <p className="text-gray-400 text-sm">
                      Date: {new Date(certificate.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>

                    <div className="flex gap-3">
                      {certificate.credential_url && (
                        <a
                          href={certificate.credential_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/80 hover:bg-purple-500 rounded-xl text-white font-medium transition-all duration-300"
                        >
                          <ExternalLink className="w-4 h-4" /> View Credential
                        </a>
                      )}
                      <button
                        onClick={() => setModalImage(certificate.image_url)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/80 hover:bg-pink-500 rounded-xl text-white font-medium transition-all duration-300"
                      >
                        <Award className="w-4 h-4" /> View Image
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {modalImage && (
          <div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            onClick={() => setModalImage(null)}
          >
            <img
              src={modalImage}
              alt="Certificate"
              className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-2xl"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Certificates;
