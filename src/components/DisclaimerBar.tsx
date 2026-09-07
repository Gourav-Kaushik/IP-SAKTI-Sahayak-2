import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { LanguageCode } from '../types.js';
import { STATIC_LOCALIZATION } from '../../server/rag/translator.js';

interface DisclaimerBarProps {
  language: LanguageCode;
}

export const DisclaimerBar: React.FC<DisclaimerBarProps> = ({ language }) => {
  const loc = STATIC_LOCALIZATION[language] || STATIC_LOCALIZATION.en;

  return (
    <div
      id="statutory-disclaimer-bar"
      className="w-full bg-[#0D1B2A] text-[#CFE8FF] border-b border-[#3A86C8]/30 px-4 py-2 text-xs flex items-center justify-between gap-2 shadow-sm"
    >
      <div className="flex items-center gap-2 mx-auto max-w-7xl">
        <ShieldAlert className="w-3.5 h-3.5 text-[#CFE8FF] shrink-0" />
        <span className="leading-relaxed font-medium">
          <strong className="text-white font-semibold">Statutory Disclaimer:</strong> {loc.disclaimer}
        </span>
      </div>
    </div>
  );
};
