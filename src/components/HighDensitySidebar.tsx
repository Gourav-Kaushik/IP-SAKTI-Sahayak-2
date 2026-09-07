import React from 'react';
import {
  FileText,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Shield,
  Layers,
  FileCheck
} from 'lucide-react';
import {
  ClassificationResult,
  Jurisdiction,
  Citation,
  ChatMessage
} from '../types.js';

interface HighDensitySidebarProps {
  classification?: ClassificationResult;
  jurisdiction: Jurisdiction;
  messages: ChatMessage[];
  onOpenWizard: () => void;
  onOpenCorpus: () => void;
  onOpenAudit: () => void;
}

export const HighDensitySidebar: React.FC<HighDensitySidebarProps> = ({
  classification,
  jurisdiction,
  messages,
  onOpenWizard,
  onOpenCorpus,
  onOpenAudit
}) => {
  // Extract all citations from the latest messages to show in Live Citations feed
  const liveCitations: Citation[] = [];
  const seenIds = new Set<string>();

  for (let i = messages.length - 1; i >= 0; i--) {
    const msg = messages[i];
    if (msg.citations && msg.citations.length > 0) {
      for (const cit of msg.citations) {
        if (!seenIds.has(cit.chunkId)) {
          seenIds.add(cit.chunkId);
          liveCitations.push(cit);
        }
      }
    }
  }

  // Fallback default statutory highlights if no chat queries have been answered yet
  const defaultHighlights =
    jurisdiction === 'international'
      ? [
          {
            act: 'WIPO GRATK Treaty 2024',
            section: 'Article 3 & 4',
            summary: 'Mandatory disclosure of country of origin and traditional knowledge in patent applications.',
            borderClass: 'border-[#3A86C8]'
          },
          {
            act: 'WTO TRIPS Agreement',
            section: 'Article 27.3(b)',
            summary: 'Exclusions of diagnostic/therapeutic methods and plants from mandatory patentability.',
            borderClass: 'border-amber-500'
          },
          {
            act: 'WIPO Intergovernmental Committee (IGC)',
            section: 'TK Standards',
            summary: 'Defense against foreign misappropriation of Ayurvedic formulations.',
            borderClass: 'border-emerald-500'
          }
        ]
      : [
          {
            act: 'Patents Act, 1970',
            section: 'Section 3(p)',
            summary: 'Traditional knowledge is not an invention; strict TKDL cross-referencing.',
            borderClass: 'border-[#3A86C8]'
          },
          {
            act: 'Biological Diversity Act, 2002',
            section: 'Section 6',
            summary: 'Prior approval of National Biodiversity Authority (NBA) required before patent grant.',
            borderClass: 'border-amber-500'
          },
          {
            act: 'Drugs & Cosmetics Act, 1940',
            section: 'Rule 158B & Schedule T',
            summary: 'Differentiates classical texts from proprietary ASU manufacturing licenses.',
            borderClass: 'border-emerald-500'
          }
        ];

  return (
    <aside
      id="high-density-sidebar"
      className="w-full lg:w-72 xl:w-80 flex flex-col gap-4 shrink-0"
    >
      {/* 1. Product Profile Section */}
      <section className="bg-white rounded-2xl p-4 shadow-sm border border-[#3A86C8]/20 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#3A86C8] flex items-center gap-2">
            <Layers className="w-4 h-4" />
            <span>Product Profile</span>
          </h2>
          <span className="text-[10px] font-bold text-slate-400 font-mono">
            {jurisdiction === 'national' ? '🇮🇳 IN-IP' : '🌐 INT-IP'}
          </span>
        </div>

        <div className="space-y-3">
          {/* Main Classification Pill */}
          <div className="p-3 bg-[#CFE8FF]/30 border border-[#3A86C8]/10 rounded-xl">
            <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">
              Classification
            </p>
            <p className="text-sm font-bold text-[#0D1B2A] truncate">
              {classification ? classification.categoryName : 'Unclassified Product'}
            </p>
            {classification?.hindiName && (
              <p className="text-[11px] text-slate-500 font-medium">
                {classification.hindiName}
              </p>
            )}
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 border border-gray-100 rounded-lg bg-slate-50/50">
              <p className="text-[9px] uppercase font-bold text-gray-400">
                Formulation
              </p>
              <p className="text-xs font-semibold text-[#0D1B2A] truncate">
                {classification
                  ? classification.category === 'classical_formulation'
                    ? 'Classical Text'
                    : classification.category === 'phytopharmaceutical'
                    ? 'Standardized 4-M'
                    : classification.category === 'nutraceutical'
                    ? 'Schedule A Food'
                    : classification.category === 'cosmetic'
                    ? 'Topical BIS'
                    : 'Novel IND'
                  : 'Pending'}
              </p>
            </div>

            <div className="p-2 border border-gray-100 rounded-lg bg-slate-50/50">
              <p className="text-[9px] uppercase font-bold text-gray-400">
                TKDL Check
              </p>
              <p
                className={`text-xs font-semibold truncate ${
                  classification?.category === 'classical_formulation'
                    ? 'text-red-600'
                    : 'text-emerald-600'
                }`}
              >
                {classification
                  ? classification.category === 'classical_formulation'
                    ? 'Prior Art (3p)'
                    : 'Novelty Clear'
                  : 'Pending'}
              </p>
            </div>
          </div>

          {/* Regulatory Authority Line */}
          {classification && (
            <div className="p-2 rounded-lg border border-slate-100 bg-slate-50/50 text-xs">
              <span className="text-[9px] uppercase font-bold text-slate-400 block">
                Primary Authority
              </span>
              <span className="text-[11px] font-semibold text-[#0D1B2A] truncate block">
                {classification.primaryRegulatoryBody}
              </span>
            </div>
          )}

          {/* Re-run Wizard Button */}
          <button
            type="button"
            id="sidebar-rerun-wizard-btn"
            onClick={onOpenWizard}
            className="w-full py-2 text-[11px] font-bold text-[#3A86C8] border border-[#3A86C8] rounded-lg hover:bg-[#3A86C8]/5 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{classification ? 'Re-run Wizard (5/5)' : 'Run 5-Step Wizard'}</span>
          </button>
        </div>
      </section>

      {/* 2. Live Citations / Statutory Anchors */}
      <section className="bg-white rounded-2xl p-4 shadow-sm border border-[#3A86C8]/20 flex-1 flex flex-col min-h-[260px]">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#3A86C8] flex items-center gap-2">
            <Scale className="w-4 h-4" />
            <span>Live Citations</span>
          </h2>
          <button
            type="button"
            onClick={onOpenCorpus}
            className="text-[10px] font-bold text-slate-400 hover:text-[#3A86C8] uppercase tracking-wider cursor-pointer"
          >
            Corpus (15) →
          </button>
        </div>

        <div className="space-y-3 overflow-y-auto pr-1 flex-1 max-h-[340px]">
          {liveCitations.length > 0 ? (
            liveCitations.slice(0, 4).map((cit, idx) => {
              const borderColors = [
                'border-[#3A86C8]',
                'border-amber-500',
                'border-emerald-500',
                'border-purple-500'
              ];
              const borderClass = borderColors[idx % borderColors.length];

              return (
                <div
                  key={cit.chunkId}
                  className={`border-l-2 ${borderClass} pl-3 py-1 bg-slate-50/40 rounded-r-lg hover:bg-slate-50 transition-colors`}
                >
                  <p className="text-[11px] font-bold text-[#0D1B2A] truncate">
                    {cit.act}
                  </p>
                  <p className="text-[10px] font-semibold text-[#3A86C8]">
                    {cit.section}
                  </p>
                  <p className="text-[10px] text-gray-500 leading-tight line-clamp-2 mt-0.5">
                    {cit.title}
                  </p>
                </div>
              );
            })
          ) : (
            defaultHighlights.map((dh, idx) => (
              <div
                key={idx}
                className={`border-l-2 ${dh.borderClass} pl-3 py-1 bg-slate-50/40 rounded-r-lg hover:bg-slate-50 transition-colors`}
              >
                <p className="text-[11px] font-bold text-[#0D1B2A]">
                  {dh.act}
                </p>
                <p className="text-[10px] font-semibold text-[#3A86C8]">
                  {dh.section}
                </p>
                <p className="text-[10px] text-gray-500 leading-tight mt-0.5">
                  {dh.summary}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Action quick links */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
          <button
            type="button"
            onClick={onOpenCorpus}
            className="text-[#3A86C8] font-bold hover:underline cursor-pointer"
          >
            Explore Corpus
          </button>
          <button
            type="button"
            onClick={onOpenAudit}
            className="text-emerald-700 font-bold hover:underline cursor-pointer"
          >
            Audit Suite (3/3)
          </button>
        </div>
      </section>
    </aside>
  );
};
