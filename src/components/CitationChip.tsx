import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, ExternalLink, Scale } from 'lucide-react';
import { Citation } from '../types.js';

interface CitationChipProps {
  citation: Citation;
}

export const CitationChip: React.FC<CitationChipProps> = ({ citation }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      id={`citation-chip-${citation.chunkId}`}
      className="mt-1.5 text-xs border border-[#3A86C8]/30 bg-[#CFE8FF]/20 hover:bg-[#CFE8FF]/30 transition-colors rounded-lg overflow-hidden shadow-2xs"
    >
      <button
        type="button"
        id={`toggle-citation-${citation.chunkId}`}
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-2.5 py-1.5 text-left font-medium text-[#0D1B2A] gap-2 cursor-pointer select-none"
      >
        <div className="flex items-center gap-2 truncate">
          <Scale className="w-3.5 h-3.5 text-[#3A86C8] shrink-0" />
          <span className="font-bold text-[#3A86C8] uppercase text-[10px] tracking-wider">
            Source:
          </span>
          <span className="text-[#0D1B2A] font-bold text-xs truncate">
            {citation.act}, {citation.section}
          </span>
          <span className="hidden sm:inline text-gray-500 font-normal text-[11px]">
            — {citation.title}
          </span>
        </div>
        <div className="flex items-center gap-1 shrink-0 text-[#3A86C8] font-bold text-[10px] uppercase">
          <span>{expanded ? 'Hide' : 'View Text'}</span>
          {expanded ? (
            <ChevronUp className="w-3 h-3" />
          ) : (
            <ChevronDown className="w-3 h-3" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="px-3 pb-3 pt-1 border-t border-[#3A86C8]/20 bg-white text-slate-800 text-xs space-y-2">
          <div className="flex items-center justify-between text-[10px] text-gray-500 pt-1">
            <span className="flex items-center gap-1 font-semibold text-[#3A86C8]">
              <BookOpen className="w-3 h-3" />
              {citation.statutoryAuthority}
            </span>
            <span className="uppercase text-[9px] tracking-wider px-2 py-0.5 rounded-full font-bold bg-[#CFE8FF] text-[#0D1B2A] border border-[#3A86C8]/30">
              {citation.jurisdiction}
            </span>
          </div>

          <div className="font-semibold text-[#0D1B2A] text-xs">
            {citation.title}
          </div>

          <div className="p-2 rounded-lg bg-gray-50 border border-gray-200 text-slate-700 leading-relaxed font-mono text-[11px] max-h-48 overflow-y-auto whitespace-pre-wrap">
            {citation.exactText}
          </div>
        </div>
      )}
    </div>
  );
};
