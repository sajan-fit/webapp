import React, { useState } from 'react';
import { 
  FolderLock, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Flag, 
  ShieldAlert, 
  UserCheck, 
  Maximize2, 
  X, 
  Calendar,
  Clock,
  Printer,
  CheckCircle2
} from 'lucide-react';
import { EvidenceItem } from '../types';

interface EvidenceViewProps {
  evidence: EvidenceItem[];
  onToggleFlag: (id: string) => void;
}

export const EvidenceView: React.FC<EvidenceViewProps> = ({
  evidence,
  onToggleFlag
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [previewItem, setPreviewItem] = useState<EvidenceItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const tags = ['All', 'Restricted Area Entry', 'Authorized Access', 'Forced Entry Attempt'];

  const filtered = evidence.filter((item) => {
    const matchesTag = selectedTag === 'All' || item.tag === selectedTag;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.camera.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.subject && item.subject.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesTag && matchesSearch;
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDownload = (item: EvidenceItem) => {
    // Direct download handler
    const a = document.createElement('a');
    a.href = item.fullImage;
    a.download = `VisionGuard_Evidence_${item.id}.jpg`;
    a.target = '_blank';
    a.click();
    showToast(`Downloading forensic image snapshot for ${item.id}`);
  };

  return (
    <div id="evidence-view" className="p-4 lg:p-6 space-y-6 max-w-7xl mx-auto">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-[#00d2ff]/20 text-[#26fedc] border border-[#00d2ff] backdrop-blur-xl shadow-2xl flex items-center gap-2 font-mono text-xs animate-in fade-in duration-150">
          <CheckCircle2 className="w-4 h-4 text-[#26fedc]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header and Tag Filters */}
      <div className="p-4 rounded-2xl bg-[#131b2e] border border-[#3c494e]/40 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <FolderLock className="w-5 h-5 text-[#26fedc]" />
            <div>
              <h2 className="font-mono text-sm font-bold text-[#dae2fd]">FORENSIC EVIDENCE REPOSITORY</h2>
              <p className="font-mono text-xs text-[#859399]">Cryptographically hashed and timestamped CCTV captures</p>
            </div>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#859399]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search evidence records..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#0b1326] border border-[#3c494e]/40 text-xs font-mono text-[#dae2fd] placeholder-[#859399] focus:outline-none focus:border-[#00d2ff]"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#3c494e]/30">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                selectedTag === tag
                  ? 'bg-[#00d2ff]/20 text-[#26fedc] border border-[#00d2ff]/50 shadow-[0_0_8px_rgba(0,210,255,0.2)]'
                  : 'bg-[#171f33] text-[#859399] hover:text-[#dae2fd] border border-[#3c494e]/40'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Evidence Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            id={`evidence-card-${item.id}`}
            className="group rounded-2xl bg-[#131b2e] border border-[#3c494e]/40 hover:border-[#00d2ff]/50 overflow-hidden shadow-xl transition-all flex flex-col justify-between"
          >
            {/* Visual Thumbnail */}
            <div className="relative aspect-video bg-black overflow-hidden cursor-pointer" onClick={() => setPreviewItem(item)}>
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 cctv-scanline" />

              {/* Tag overlay */}
              <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#0b1326]/90 text-[10px] font-mono text-[#26fedc] border border-[#26fedc]/30 backdrop-blur-md">
                {item.tag}
              </div>

              {/* Confidence */}
              <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-[#0b1326]/90 text-[10px] font-mono text-[#a5e7ff] border border-[#3c494e]/50 backdrop-blur-md">
                AI Match: {item.confidence}%
              </div>

              {/* Flag button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFlag(item.id);
                  showToast(item.flagged ? 'Flag removed.' : 'Evidence flagged for legal file.');
                }}
                className={`absolute top-3 right-3 p-1.5 rounded-lg border backdrop-blur-md transition-all ${
                  item.flagged
                    ? 'bg-[#93000a] text-[#ffdad6] border-[#ffb4ab]'
                    : 'bg-[#0b1326]/80 text-[#859399] hover:text-[#ffb4ab] border-[#3c494e]/40'
                }`}
                title="Flag Evidence"
              >
                <Flag className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Evidence details */}
            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between font-mono text-xs">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[#859399] text-[11px]">
                  <span>{item.id}</span>
                  <span>{item.timestamp}</span>
                </div>
                <h3 className="font-bold text-sm text-[#dae2fd] line-clamp-1">{item.title}</h3>
                <p className="text-[#bbc9cf] text-xs line-clamp-2">{item.description}</p>
              </div>

              <div className="pt-3 border-t border-[#3c494e]/30 flex items-center justify-between">
                <span className="text-[11px] text-[#00d2ff]">Origin: {item.camera}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDownload(item)}
                    className="p-1.5 rounded-lg bg-[#171f33] hover:bg-[#222a3d] text-[#bbc9cf] hover:text-[#26fedc] border border-[#3c494e]/40 transition-colors"
                    title="Download Frame"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setPreviewItem(item)}
                    className="px-3 py-1.5 rounded-xl bg-[#00d2ff]/20 hover:bg-[#00d2ff]/30 text-[#26fedc] border border-[#00d2ff]/40 text-xs flex items-center gap-1 transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* High-Resolution Forensic Modal */}
      {previewItem && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-4xl rounded-2xl bg-[#131b2e] border border-[#00d2ff]/50 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-4 bg-[#171f33] border-b border-[#3c494e]/40 flex items-center justify-between font-mono">
              <div className="flex items-center gap-2">
                <FolderLock className="w-4 h-4 text-[#26fedc]" />
                <span className="text-xs font-bold text-[#dae2fd]">FORENSIC EVIDENCE DOSSIER: {previewItem.id}</span>
              </div>
              <button
                onClick={() => setPreviewItem(null)}
                className="p-1.5 rounded-lg bg-[#0b1326] text-[#859399] hover:text-[#dae2fd] border border-[#3c494e]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 font-mono text-xs">
              <div className="relative aspect-video rounded-xl overflow-hidden border border-[#3c494e]/50 bg-black">
                <img
                  src={previewItem.fullImage}
                  alt={previewItem.title}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 cctv-scanline pointer-events-none" />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#0b1326]/90 text-xs text-[#26fedc] border border-[#26fedc]/30">
                  {previewItem.tag} • AI MATCH: {previewItem.confidence}%
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-[#171f33] border border-[#3c494e]/30 space-y-1.5">
                  <span className="text-[11px] text-[#859399]">INCIDENT SUMMARY</span>
                  <h4 className="font-bold text-sm text-[#dae2fd]">{previewItem.title}</h4>
                  <p className="text-[#bbc9cf] text-xs leading-relaxed">{previewItem.description}</p>
                </div>

                <div className="p-3 rounded-xl bg-[#171f33] border border-[#3c494e]/30 space-y-1.5 text-[11px]">
                  <span className="text-[11px] text-[#859399]">METADATA & CHAIN OF CUSTODY</span>
                  <div className="flex justify-between text-[#859399]">
                    <span>Camera Source:</span>
                    <span className="text-[#a5e7ff]">{previewItem.camera}</span>
                  </div>
                  <div className="flex justify-between text-[#859399]">
                    <span>Timestamp:</span>
                    <span className="text-[#dae2fd]">{previewItem.timestamp}</span>
                  </div>
                  <div className="flex justify-between text-[#859399]">
                    <span>Officer Remarks:</span>
                    <span className="text-[#26fedc]">{previewItem.officerNotes || 'Verified authentic by CSO.'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#171f33] border-t border-[#3c494e]/40 flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#859399]">SHA-256: 8f9b4c20...91ae</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    handleDownload(previewItem);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#00d2ff]/20 hover:bg-[#00d2ff]/30 text-[#26fedc] border border-[#00d2ff]/50 font-mono text-xs flex items-center gap-1.5 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Forensic Image</span>
                </button>
                <button
                  onClick={() => setPreviewItem(null)}
                  className="px-4 py-2 rounded-xl bg-[#0b1326] text-[#bbc9cf] hover:text-[#dae2fd] border border-[#3c494e] font-mono text-xs"
                >
                  Close Dossier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
