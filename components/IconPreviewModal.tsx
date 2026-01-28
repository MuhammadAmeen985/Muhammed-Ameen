
import React from 'react';
import { GeneratedLogo } from '../types';

interface IconPreviewModalProps {
  logo: GeneratedLogo | null;
  onClose: () => void;
}

const IconPreviewModal: React.FC<IconPreviewModalProps> = ({ logo, onClose }) => {
  if (!logo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Icon Preview: {logo.style}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-8 overflow-y-auto space-y-12">
          {/* Desktop Tab Preview */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Browser Tab Preview</h3>
            <div className="bg-gray-100 p-6 rounded-xl flex items-center justify-center">
              <div className="bg-white px-4 py-2 rounded-t-lg shadow-sm flex items-center gap-3 w-64 border border-gray-200">
                <img src={logo.imageUrl} alt="Favicon" className="w-4 h-4 rounded-sm" />
                <span className="text-sm font-medium text-gray-600 truncate">Fibrecon - Dashboard</span>
                <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Mobile Home Screen Preview */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Mobile Home Screen</h3>
            <div className="flex justify-center">
              <div className="relative w-72 h-[140px] bg-gradient-to-b from-sky-400 to-indigo-600 rounded-3xl p-6 flex items-start gap-8 overflow-hidden shadow-xl border-4 border-gray-800">
                 <div className="flex flex-col items-center gap-1">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center p-1 overflow-hidden">
                       <img src={logo.imageUrl} alt="App Icon" className="w-full h-full object-contain" />
                    </div>
                    <span className="text-[10px] font-medium text-white shadow-sm">Fibrecon</span>
                 </div>
                 <div className="flex flex-col items-center gap-1">
                    <div className="w-12 h-12 bg-gray-200/40 backdrop-blur-md rounded-xl shadow-lg"></div>
                    <span className="text-[10px] font-medium text-white shadow-sm">Camera</span>
                 </div>
                 <div className="flex flex-col items-center gap-1">
                    <div className="w-12 h-12 bg-gray-200/40 backdrop-blur-md rounded-xl shadow-lg"></div>
                    <span className="text-[10px] font-medium text-white shadow-sm">Safari</span>
                 </div>
              </div>
            </div>
          </div>

          {/* App Store Preview */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest">App Store Identity</h3>
            <div className="flex items-center gap-6 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm">
                <img src={logo.imageUrl} alt="Large Icon" className="w-full h-full object-contain" />
              </div>
              <div className="flex-1">
                <h4 className="text-2xl font-bold text-gray-900 leading-tight">Fibrecon</h4>
                <p className="text-indigo-600 font-medium text-sm">Design & Productivity</p>
                <div className="flex items-center gap-2 mt-3">
                  <div className="bg-indigo-600 text-white px-6 py-1.5 rounded-full text-sm font-bold">GET</div>
                  <div className="text-gray-400 text-xs">In-App Purchases</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end">
           <button 
             onClick={onClose}
             className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors shadow-md active:scale-95"
           >
             Close Preview
           </button>
        </div>
      </div>
    </div>
  );
};

export default IconPreviewModal;
