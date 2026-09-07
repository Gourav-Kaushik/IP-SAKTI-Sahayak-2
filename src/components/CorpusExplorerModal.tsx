import React, { useState, useEffect } from 'react';
import { X, Search, BookOpen, Scale, Globe, Flag, Filter, Shield } from 'lucide-react';
import { LegalChunk, Jurisdiction } from '../types.js';

interface CorpusExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CorpusExplorerModal: React.FC<CorpusExplorerModalProps> = ({
  isOpen,
  onClose
}) => {
  const [chunks, setChunks] = useState<LegalChunk[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<Jurisdiction | 'all'>('all');

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      fetch('/api/corpus')
        .then((res) => res.json())
        .then((data) => {
          if (data.chunks) {
            setChunks(data.chunks);
          }
        })
        .catch((err) => console.error('Corpus fetch error:', err))
        .finally(() => setLoading(false));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredChunks = chunks.filter((c) => {
    const matchesJurisdiction =
      selectedJurisdiction === 'all' || c.jurisdiction === selectedJurisdiction;

    const term = searchTerm.toLowerCase();
    const matchesSearch =
      !term ||
      c.act.toLowerCase().includes(term) ||
      c.section.toLowerCase().includes(term) ||
      c.title.toLowerCase().includes(term) ||
      c.content.toLowerCase().includes(term) ||
      c.keywords.some((k) => k.toLowerCase().includes(term));

    return matchesJurisdiction && matchesSearch;
  });

  return (
    <div
      id="corpus-explorer-modal-overlay"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
    >
      <div
        id="corpus-explorer-dialog"
        className="w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-[#CFE8FF]"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#CFE8FF] text-[#1A365D]">
              <BookOpen className="w-5 h-5 text-[#3A86C8]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#0D1B2A]">
                Ayurveda Legal & IP Knowledge Corpus
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Verified statutory corpus ingested for grounded RAG retrieval ({chunks.length} statutory chunks)
              </p>
            </div>
          </div>
          <button
            type="button"
            id="close-corpus-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-[#0D1B2A] hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-center gap-3 bg-white">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter by Act, Section (e.g. 3(p), Rule 158B, Section 6 NBA, GRATK, TRIPS)..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#3A86C8]/40"
            />
          </div>

          <div className="flex items-center gap-1.5 self-start sm:self-auto shrink-0 text-xs">
            <button
              type="button"
              onClick={() => setSelectedJurisdiction('all')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                selectedJurisdiction === 'all'
                  ? 'bg-[#0D1B2A] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All ({chunks.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedJurisdiction('national')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
                selectedJurisdiction === 'national'
                  ? 'bg-[#3A86C8] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Flag className="w-3 h-3 text-orange-500" />
              <span>National</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedJurisdiction('international')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
                selectedJurisdiction === 'international'
                  ? 'bg-[#1A365D] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Globe className="w-3 h-3 text-blue-400" />
              <span>International</span>
            </button>
          </div>
        </div>

        {/* Chunks List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50">
          {loading ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              Loading legal documents...
            </div>
          ) : filteredChunks.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm">
              No statutory provisions match your search criteria.
            </div>
          ) : (
            filteredChunks.map((chunk) => (
              <div
                key={chunk.id}
                id={`corpus-chunk-${chunk.id}`}
                className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-2xs hover:border-[#3A86C8]/60 transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        chunk.jurisdiction === 'national'
                          ? 'bg-orange-50 text-orange-700 border border-orange-200'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}
                    >
                      {chunk.jurisdiction}
                    </span>
                    <span className="font-bold text-sm text-[#0D1B2A]">
                      {chunk.shortAct} — {chunk.section}
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-slate-500">
                    {chunk.statutoryAuthority}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-[#1A365D] mb-1">
                  {chunk.title}
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {chunk.summary}
                </p>

                {/* Verbatim Section Text */}
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 leading-relaxed mb-3">
                  {chunk.content}
                </div>

                {/* Compliance Steps */}
                {chunk.complianceSteps && chunk.complianceSteps.length > 0 && (
                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      Statutory Action Items:
                    </span>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {chunk.complianceSteps.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-[#3A86C8] font-bold">•</span>
                          <span>{step.task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>
            Showing {filteredChunks.length} of {chunks.length} indexed provisions
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#0D1B2A] text-white font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Close Explorer
          </button>
        </div>
      </div>
    </div>
  );
};
