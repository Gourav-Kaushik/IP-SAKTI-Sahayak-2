import React from 'react';
import {
  Globe,
  Flag,
  RotateCcw,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Languages
} from 'lucide-react';
import {
  Jurisdiction,
  LanguageCode,
  ClassificationResult
} from '../types.js';
import { SUPPORTED_LANGUAGES, STATIC_LOCALIZATION } from '../../server/rag/translator.js';

interface HeaderProps {
  jurisdiction: Jurisdiction;
  onToggleJurisdiction: (j: Jurisdiction) => void;
  language: LanguageCode;
  onChangeLanguage: (l: LanguageCode) => void;
  classification?: ClassificationResult;
  onOpenWizard: () => void;
  onOpenCorpus: () => void;
  onOpenAudit: () => void;
  onOpenGateway?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  jurisdiction,
  onToggleJurisdiction,
  language,
  onChangeLanguage,
  classification,
  onOpenWizard,
  onOpenCorpus,
  onOpenAudit,
  onOpenGateway
}) => {
  const loc = STATIC_LOCALIZATION[language] || STATIC_LOCALIZATION.en;

  return (
    <header
      id="main-header"
      className="flex items-center justify-between px-4 sm:px-6 h-16 bg-[#0D1B2A] text-white shadow-lg shrink-0 sticky top-0 z-30 border-b border-white/10"
    >
      {/* Brand & Identity */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[#3A86C8] rounded-lg flex items-center justify-center font-bold text-xl text-white shadow-sm shrink-0">
          IP
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg font-bold tracking-tight uppercase text-white">
              IP-SAKTI Sahayak
            </h1>
            {onOpenGateway ? (
              <button
                type="button"
                onClick={onOpenGateway}
                title="View Gateway Initialization Telemetry"
                className="text-[#3A86C8] hover:text-blue-300 hover:border-blue-400 text-[10px] font-mono font-bold px-1.5 py-0.5 border border-[#3A86C8] rounded uppercase transition-colors cursor-pointer"
              >
                v1.0 • Citations
              </button>
            ) : (
              <span className="text-[#3A86C8] text-[10px] font-mono font-bold px-1.5 py-0.5 border border-[#3A86C8] rounded uppercase">
                v1.0 • Citations
              </span>
            )}
          </div>
          <p className="hidden sm:block text-[11px] text-slate-400 font-medium leading-none mt-0.5">
            Ayurveda Legal & IP Compliance Assistant
          </p>
        </div>
      </div>

      {/* Controls Toolbar */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Jurisdiction Toggle Pill */}
        <div
          id="jurisdiction-toggle-group"
          className="flex items-center bg-white/10 rounded-full p-1 border border-white/20"
        >
          <button
            type="button"
            id="toggle-national-btn"
            onClick={() => onToggleJurisdiction('national')}
            className={`px-3 sm:px-4 py-1 text-xs font-semibold rounded-full transition-all flex items-center gap-1 cursor-pointer ${
              jurisdiction === 'national'
                ? 'bg-[#3A86C8] text-white shadow-xs font-bold'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Flag className="w-3 h-3 text-orange-400" />
            <span>National</span>
          </button>
          <button
            type="button"
            id="toggle-international-btn"
            onClick={() => onToggleJurisdiction('international')}
            className={`px-3 sm:px-4 py-1 text-xs font-semibold rounded-full transition-all flex items-center gap-1 cursor-pointer ${
              jurisdiction === 'international'
                ? 'bg-[#3A86C8] text-white shadow-xs font-bold'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Globe className="w-3 h-3 text-blue-300" />
            <span>International</span>
          </button>
        </div>

        {/* Language Selector Dropdown */}
        <div className="relative flex items-center">
          <label htmlFor="language-select-dropdown" className="sr-only">
            Select Language
          </label>
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/10 hover:bg-white/15 border border-white/20 rounded-lg text-white text-xs transition-colors">
            <Languages className="w-3.5 h-3.5 text-[#3A86C8]" />
            <select
              id="language-select-dropdown"
              value={language}
              onChange={(e) => onChangeLanguage(e.target.value as LanguageCode)}
              className="bg-transparent text-xs font-medium text-white focus:outline-hidden cursor-pointer [&>option]:text-black"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code} className="text-black">
                  {lang.flag} {lang.nativeLabel}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Knowledge Corpus Explorer */}
        <button
          type="button"
          id="open-corpus-btn"
          onClick={onOpenCorpus}
          title="Browse full statutory corpus"
          className="hidden md:flex items-center gap-1.5 px-2.5 py-1 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-xs font-medium text-white transition-colors cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5 text-[#3A86C8]" />
          <span>Corpus</span>
        </button>

        {/* Test Suite Button */}
        <button
          type="button"
          id="open-audit-btn"
          onClick={onOpenAudit}
          title="Run citation & guardrail audit test suite"
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 rounded-lg text-xs font-semibold text-emerald-300 transition-colors cursor-pointer"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Audit</span>
        </button>
      </div>
    </header>
  );
};

