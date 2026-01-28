
import React, { useState, useCallback, useEffect } from 'react';
import { LogoStyle, GeneratedLogo, LogoStyleConfig } from './types';
import { LOGO_STYLES } from './constants';
import { generateLogoImage } from './services/geminiService';
import LogoCard from './components/LogoCard';
import IconPreviewModal from './components/IconPreviewModal';

const App: React.FC = () => {
  const [logos, setLogos] = useState<GeneratedLogo[]>([]);
  const [generating, setGenerating] = useState<LogoStyle | 'all' | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedLogo, setSelectedLogo] = useState<GeneratedLogo | null>(null);

  const handleGenerate = async (styleConfig: LogoStyleConfig) => {
    setGenerating(styleConfig.name);
    setError(null);
    try {
      const imageUrl = await generateLogoImage(styleConfig.promptSuffix);
      const newLogo: GeneratedLogo = {
        id: Math.random().toString(36).substr(2, 9),
        style: styleConfig.name,
        imageUrl,
        prompt: styleConfig.promptSuffix,
        timestamp: Date.now()
      };
      setLogos(prev => [newLogo, ...prev]);
    } catch (err) {
      setError(`Failed to generate ${styleConfig.name} logo. Please try again.`);
    } finally {
      setGenerating(null);
    }
  };

  const handleGenerateAll = async () => {
    setGenerating('all');
    setError(null);
    try {
      const results = await Promise.all(
        LOGO_STYLES.map(async config => {
          const imageUrl = await generateLogoImage(config.promptSuffix);
          return {
            id: Math.random().toString(36).substr(2, 9),
            style: config.name,
            imageUrl,
            prompt: config.promptSuffix,
            timestamp: Date.now()
          };
        })
      );
      setLogos(prev => [...results, ...prev]);
    } catch (err) {
      setError("One or more logo generations failed.");
    } finally {
      setGenerating(null);
    }
  };

  const downloadLogo = (logo: GeneratedLogo) => {
    const link = document.createElement('a');
    link.href = logo.imageUrl;
    link.download = `Fibrecon-${logo.style}-Logo.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-tight">Fibrecon</h1>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-widest">Logo Studio</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={handleGenerateAll}
              disabled={generating !== null}
              className="px-6 py-2.5 bg-gray-900 text-white font-semibold rounded-xl hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg"
            >
              {generating === 'all' ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Generating Gallery...
                </>
              ) : (
                'Generate All Styles'
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4 tracking-tight">
            Design your brand identity.
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Create professional logos for the <span className="text-indigo-600 font-semibold italic">Fibrecon</span> app. 
            Select a style below to generate high-quality icons optimized for app stores and favicons.
          </p>
          
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-700 text-sm animate-pulse">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}
        </div>

        {/* Style Selection Grid */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {LOGO_STYLES.map((config) => (
              <div 
                key={config.name}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-indigo-100 transition-all flex flex-col"
              >
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={config.icon} />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{config.name}</h3>
                <p className="text-sm text-gray-500 mb-6 flex-1 leading-snug">
                  {config.description}
                </p>
                <button 
                  onClick={() => handleGenerate(config)}
                  disabled={generating !== null}
                  className="w-full py-2.5 bg-gray-50 text-gray-900 font-semibold rounded-xl hover:bg-indigo-600 hover:text-white transition-all disabled:opacity-50 flex items-center justify-center gap-2 group"
                >
                  {generating === config.name ? (
                    <svg className="animate-spin h-4 w-4 text-current" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  ) : (
                    'Generate'
                  )}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Results Section */}
        {logos.length > 0 && (
          <section className="border-t border-gray-100 pt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Recent Generations</h2>
              <span className="text-sm text-gray-500 font-medium">{logos.length} logos created</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {logos.map((logo) => (
                <LogoCard 
                  key={logo.id} 
                  logo={logo} 
                  onPreview={setSelectedLogo}
                  onDownload={downloadLogo}
                />
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {logos.length === 0 && !generating && (
          <div className="py-24 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-50 rounded-full mb-6">
              <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">No logos generated yet</h3>
            <p className="text-gray-500">Pick a style above to start building the Fibrecon brand.</p>
          </div>
        )}

        {/* Loading Overlay for Bulk Generation */}
        {generating === 'all' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm">
            <div className="text-center">
              <div className="relative inline-flex mb-8">
                <div className="w-24 h-24 rounded-full border-4 border-indigo-100 animate-ping absolute inset-0"></div>
                <div className="w-24 h-24 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin relative"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 italic">Thinking...</h3>
              <p className="text-gray-500 font-medium animate-pulse">Generating a full set of brand identities for Fibrecon</p>
              <div className="mt-8 flex gap-2 justify-center">
                {LOGO_STYLES.map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-indigo-200 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}></div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-gray-50 border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-500 font-medium">
            &copy; {new Date().getFullYear()} Fibrecon Studio. Powered by Gemini Flash 2.5.
          </p>
          <div className="flex justify-center gap-6 mt-6">
            <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors">Documentation</a>
            <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors">Support</a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <IconPreviewModal 
        logo={selectedLogo} 
        onClose={() => setSelectedLogo(null)} 
      />
    </div>
  );
};

export default App;
