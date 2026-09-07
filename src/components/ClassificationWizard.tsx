import React, { useState } from 'react';
import {
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Shield,
  FileCheck,
  AlertCircle,
  Award,
  Layers
} from 'lucide-react';
import {
  WizardQuestion,
  ClassificationResult,
  ProductClassification
} from '../types.js';
import {
  WIZARD_QUESTIONS,
  evaluateClassification,
  getClassificationDetails
} from '../../server/data/wizardQuestions.js';

interface ClassificationWizardProps {
  onComplete: (result: ClassificationResult) => void;
  onCancel?: () => void;
  currentClassification?: ClassificationResult;
}

export const ClassificationWizard: React.FC<ClassificationWizardProps> = ({
  onComplete,
  onCancel,
  currentClassification
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<ClassificationResult | null>(
    currentClassification || null
  );

  const question = WIZARD_QUESTIONS[currentStep];

  const handleSelectOption = (optionId: string) => {
    const updated = [...selectedAnswers];
    updated[currentStep] = optionId;
    setSelectedAnswers(updated);

    if (currentStep < WIZARD_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Completed all 5 questions
      const evaluated = evaluateClassification(updated);
      setResult(evaluated);
    }
  };

  const handleQuickPreset = (category: ProductClassification) => {
    const details = getClassificationDetails(category);
    setResult(details);
  };

  const handleFinish = () => {
    if (result) {
      onComplete(result);
    }
  };

  return (
    <div
      id="product-classification-wizard"
      className="w-full max-w-4xl mx-auto my-4 bg-white border border-[#CFE8FF] rounded-2xl shadow-lg p-6 sm:p-8"
    >
      {/* Wizard Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#CFE8FF] text-[#1A365D]">
              <Layers className="w-5 h-5 text-[#3A86C8]" />
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-[#0D1B2A]">
              Ayurvedic Product Statutory Classification Wizard
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Classifies your product under Indian & International IP law into one of 5 statutory categories.
          </p>
        </div>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-xs font-semibold text-slate-400 hover:text-slate-600 px-2.5 py-1 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Close
          </button>
        )}
      </div>

      {!result ? (
        <div>
          {/* Step Indicator Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
              <span className="text-[#3A86C8] font-bold">
                Step {currentStep + 1} of {WIZARD_QUESTIONS.length}: {question.subtitle}
              </span>
              <span>
                {Math.round(((currentStep + 1) / WIZARD_QUESTIONS.length) * 100)}% Completed
              </span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#3A86C8] to-[#0D1B2A] transition-all duration-300 rounded-full"
                style={{
                  width: `${((currentStep + 1) / WIZARD_QUESTIONS.length) * 100}%`
                }}
              />
            </div>
          </div>

          {/* Question Title */}
          <div className="mb-6">
            <h3 className="text-base sm:text-lg font-bold text-[#0D1B2A] leading-snug">
              {question.question}
            </h3>
          </div>

          {/* Option Cards */}
          <div className="space-y-3 mb-6">
            {question.options.map((opt) => {
              const isSelected = selectedAnswers[currentStep] === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  id={`option-${opt.id}`}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                    isSelected
                      ? 'border-[#3A86C8] bg-[#CFE8FF]/30 shadow-xs ring-2 ring-[#3A86C8]/20'
                      : 'border-slate-200 hover:border-[#3A86C8]/60 hover:bg-slate-50'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border mt-0.5 shrink-0 flex items-center justify-center ${
                      isSelected
                        ? 'border-[#3A86C8] bg-[#3A86C8] text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0D1B2A]">
                      {opt.label}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {opt.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Wizard Navigation Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              type="button"
              disabled={currentStep === 0}
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              className={`flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                currentStep === 0
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'text-slate-600 hover:bg-slate-100 cursor-pointer'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            {/* Direct Presets for Convenience */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500">
              <span>Quick category:</span>
              <button
                type="button"
                onClick={() => handleQuickPreset('classical_formulation')}
                className="hover:text-[#3A86C8] underline cursor-pointer"
              >
                Classical
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => handleQuickPreset('phytopharmaceutical')}
                className="hover:text-[#3A86C8] underline cursor-pointer"
              >
                Phyto
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => handleQuickPreset('nutraceutical')}
                className="hover:text-[#3A86C8] underline cursor-pointer"
              >
                Aahar
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => handleQuickPreset('cosmetic')}
                className="hover:text-[#3A86C8] underline cursor-pointer"
              >
                Cosmetic
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Classification Result Card */
        <div id="classification-result-card" className="space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#CFE8FF]/50 to-white border border-[#3A86C8]/40 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#3A86C8] text-white">
                Statutory Assessment Complete
              </span>
              <span className="text-xs font-bold text-slate-500">
                {result.hindiName}
              </span>
            </div>

            <h3 className="text-2xl font-bold text-[#0D1B2A] tracking-tight">
              {result.categoryName}
            </h3>

            <p className="text-sm text-slate-700 mt-2 leading-relaxed">
              {result.description}
            </p>
          </div>

          {/* Key Legal Implications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1A365D] mb-1">
                <Shield className="w-4 h-4 text-[#3A86C8]" />
                <span>Primary Regulatory Authority</span>
              </div>
              <p className="text-xs text-slate-700 font-semibold mt-1">
                {result.primaryRegulatoryBody}
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                Statutory Basis: {result.statutoryBasis}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1A365D] mb-1">
                <Award className="w-4 h-4 text-[#3A86C8]" />
                <span>Patentability Status</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed mt-1">
                {result.patentabilityStatus}
              </p>
            </div>
          </div>

          {/* Key Compliance Checklist */}
          <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100">
            <h4 className="text-xs font-bold text-[#0D1B2A] mb-2 flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-[#3A86C8]" />
              <span>Key Statutory Compliance Directives:</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {result.keyComplianceRequirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3A86C8] shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setResult(null);
                setCurrentStep(0);
                setSelectedAnswers([]);
              }}
              className="text-xs font-semibold text-slate-600 hover:text-[#0D1B2A] py-2 px-3 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer w-full sm:w-auto"
            >
              Re-run Classification Questions
            </button>

            <button
              type="button"
              id="confirm-classification-btn"
              onClick={handleFinish}
              className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#3A86C8] to-[#0D1B2A] hover:opacity-95 text-white font-bold text-sm shadow-md transition-all cursor-pointer w-full sm:w-auto"
            >
              <Sparkles className="w-4 h-4 text-[#CFE8FF]" />
              <span>Confirm & Start Legal Consultation</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
