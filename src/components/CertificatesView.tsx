import React, { useState } from 'react';
import { 
  Award, 
  Download, 
  Share2, 
  CheckCircle2, 
  Printer, 
  ExternalLink,
  ShieldCheck,
  Code2
} from 'lucide-react';
import { generateQrCodeSvg } from '../lib/qrCode';
import { MOCK_CERTIFICATES } from '../data/mockUserData';
import { Certificate } from '../types';

interface CertificatesViewProps {
  darkMode: boolean;
}

export const CertificatesView: React.FC<CertificatesViewProps> = ({ darkMode }) => {
  const [selectedCert, setSelectedCert] = useState<Certificate>(MOCK_CERTIFICATES[0]);
  const [shareMsg, setShareMsg] = useState('');

  const qrSvg = generateQrCodeSvg(`https://codemaster.academy/verify/${selectedCert.verificationId}`, 110);

  const handleShare = (platform: string) => {
    setShareMsg(`✓ Certificate link generated for ${platform}!`);
    setTimeout(() => setShareMsg(''), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-500">Official Credentials</span>
          <h1 className="text-3xl font-extrabold tracking-tight">Verified Certificates of Completion</h1>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-700 hover:bg-slate-800 flex items-center space-x-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>Print Certificate</span>
          </button>
          <button
            onClick={() => handleShare('LinkedIn')}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share on LinkedIn</span>
          </button>
        </div>
      </div>

      {shareMsg && (
        <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-bold text-center">
          {shareMsg}
        </div>
      )}

      {/* Certificate Picker Tabs */}
      <div className="flex space-x-3 overflow-x-auto pb-2">
        {MOCK_CERTIFICATES.map((cert) => (
          <button
            key={cert.id}
            onClick={() => setSelectedCert(cert)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center space-x-2 ${
              selectedCert.id === cert.id
                ? 'bg-blue-600 text-white shadow-md'
                : darkMode ? 'bg-slate-900 border border-slate-800 text-slate-300' : 'bg-white border border-slate-200 text-slate-700'
            }`}
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>{cert.courseTitle}</span>
          </button>
        ))}
      </div>

      {/* High-Res Certificate Frame */}
      <div className="p-4 sm:p-10 rounded-3xl bg-slate-950 border-4 border-amber-500/40 shadow-2xl relative overflow-hidden text-center space-y-6">
        
        {/* Decorative Corner Ornaments */}
        <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-amber-400/60" />
        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-amber-400/60" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-amber-400/60" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-amber-400/60" />

        {/* Certificate Logo Header */}
        <div className="flex items-center justify-center space-x-2 pt-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-600 flex items-center justify-center text-slate-950 shadow-md font-bold">
            <Code2 className="w-6 h-6" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-white">CodeMaster Academy</span>
        </div>

        <div className="text-xs font-bold tracking-widest uppercase text-amber-400">
          Official Certificate of Completion
        </div>

        <div className="space-y-1 py-2">
          <div className="text-xs text-slate-400 italic">This is to certify that</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-wide">{selectedCert.studentName}</h2>
          <div className="text-xs text-slate-400 italic">has successfully mastered all curriculum requirements for</div>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-purple-900/40 border border-blue-500/30 max-w-2xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-bold text-blue-200">{selectedCert.courseTitle}</h3>
        </div>

        {/* Certificate Metadata & Dynamic SVG QR Code */}
        <div className="pt-6 border-t border-slate-800 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
          
          <div className="space-y-1.5 text-xs text-slate-300">
            <div><span className="text-slate-500">Issue Date:</span> <span className="font-bold text-white">{selectedCert.issueDate}</span></div>
            <div><span className="text-slate-500">Verification ID:</span> <span className="font-mono text-amber-400 font-bold">{selectedCert.verificationId}</span></div>
            <div><span className="text-slate-500">Instructor:</span> <span className="font-semibold text-white">{selectedCert.instructorSignature}</span></div>
            <div className="flex items-center space-x-1 text-emerald-400 font-bold pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified On-Chain & ISO 27001 Authenticated</span>
            </div>
          </div>

          {/* QR Code Container */}
          <div className="flex flex-col items-center space-y-1">
            <div dangerouslySetInnerHTML={{ __html: qrSvg }} />
            <span className="text-[10px] text-slate-400 font-mono">Scan to Verify</span>
          </div>

        </div>

      </div>

    </div>
  );
};
