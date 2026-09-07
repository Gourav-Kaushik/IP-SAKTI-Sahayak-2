import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Bot,
  User,
  ShieldAlert,
  ShieldCheck,
  CheckSquare,
  Square,
  Sparkles,
  HelpCircle,
  Clock,
  ArrowRight,
  Scale,
  FileText,
  Copy,
  Check
} from 'lucide-react';
import {
  ChatMessage,
  Jurisdiction,
  LanguageCode,
  ProductClassification,
  ComplianceItem
} from '../types.js';
import { CitationChip } from './CitationChip.js';
import { STATIC_LOCALIZATION } from '../../server/rag/translator.js';

interface ChatWindowProps {
  messages: ChatMessage[];
  onSendMessage: (query: string) => Promise<void>;
  isLoading: boolean;
  jurisdiction: Jurisdiction;
  productType?: ProductClassification;
  language: LanguageCode;
  onOpenWizard: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  onSendMessage,
  isLoading,
  jurisdiction,
  productType,
  language,
  onOpenWizard
}) => {
  const [inputText, setInputText] = useState('');
  const [checklistState, setChecklistState] = useState<Record<string, boolean>>({});
  const [copiedChunkId, setCopiedChunkId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const loc = STATIC_LOCALIZATION[language] || STATIC_LOCALIZATION.en;

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedChunkId(id);
      setTimeout(() => setCopiedChunkId(null), 2000);
    } catch (e) {
      console.error('Failed to copy', e);
    }
  };

  const extractVerdict = (text: string): string => {
    if (text.includes('⚖️ **Patentability Verdict (One-Liner):**')) {
      const after = text.split('⚖️ **Patentability Verdict (One-Liner):**')[1];
      return after.split('📜 **Required Statutory Document Chunk')[0].trim();
    }
    return text;
  };

  const renderMessageBody = (msg: ChatMessage) => {
    if (msg.text.includes('💡 **Legal Analysis & Next Steps:**')) {
      const parts = msg.text.split('💡 **Legal Analysis & Next Steps:**');
      if (parts.length > 1) {
        return (
          <div className="pt-2">
            <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <span>💡 Legal Analysis & Next Steps:</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-800 whitespace-pre-wrap">{parts[1].trim()}</p>
          </div>
        );
      }
    }
    return <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    const q = inputText;
    setInputText('');
    onSendMessage(q);
  };

  const toggleChecklistItem = (itemId: string) => {
    setChecklistState((prev) => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  // Curated suggested legal questions based on selected jurisdiction & product type
  const getSuggestions = () => {
    if (jurisdiction === 'international') {
      return [
        'How does WIPO GRATK Treaty 2024 mandate disclosure of Indian traditional knowledge?',
        'Can I patent an Ayurvedic botanical innovation under TRIPS Article 27?',
        'Do I need National Biodiversity Authority approval before filing a PCT international patent?',
        'How can I prevent foreign biopiracy challenges against my traditional formulation?'
      ];
    }

    if (productType === 'classical_formulation') {
      return [
        'Can I patent a formulation documented in Charaka Samhita under Section 3(p)?',
        'What are the licensing requirements for classical ASU drugs under Rule 158B?',
        'Can I register a trademark for the name "Ashwagandha" or "Triphala"?',
        'Do I need State Biodiversity Board intimation under Section 7 of BDA 2002?'
      ];
    }

    if (productType === 'phytopharmaceutical') {
      return [
        'How does Section 3(d) of Patents Act apply to an enhanced bioavailability Curcumin extract?',
        'What are the CDSCO requirements for four marker compounds under Rule 2(eb)?',
        'What is the procedure for Form III approval from National Biodiversity Authority?',
        'How do I overcome Section 3(e) mere admixture objections for a polyherbal extract?'
      ];
    }

    if (productType === 'nutraceutical') {
      return [
        'What are the labelling rules and prohibited disease claims for FSSAI Ayurveda Aahar?',
        'Can I patent a polyherbal nutrition powder under Section 3(e)?',
        'Which authoritative books are listed in Schedule A of Ayurveda Aahar Regulations 2022?',
        'Can an Ayurveda Aahar food product claim to treat or cure diabetes?'
      ];
    }

    if (productType === 'cosmetic') {
      return [
        'What is the legal boundary between an Ayurvedic cosmetic vs an Ayurvedic drug?',
        'Can an Ayurvedic hair oil claim to cure alopecia without a medicinal license?',
        'How do I register a brand name in Nice Class 3 for Ayurvedic cosmetics?',
        'What are the heavy metal and safety standards for Ayurvedic cosmetics under BIS?'
      ];
    }

    // Default National suggestions
    return [
      'Can I patent a formulation from Charaka Samhita under Section 3(p)?',
      'Do I need NBA approval before filing an international patent for an Indian herb?',
      'Can I trademark generic Ayurvedic herb names like "Brahmi" or "Ashwagandha"?',
      'What are the Rule 158B licensing requirements for proprietary Ayurvedic medicine?',
      'How does Section 3(d) evaluate therapeutic efficacy for modified herbal extracts?'
    ];
  };

  return (
    <div
      id="chat-window-container"
      className="flex-1 flex flex-col bg-white rounded-2xl shadow-xl border border-[#3A86C8]/10 overflow-hidden h-[calc(100vh-125px)] min-h-[560px]"
    >
      {/* Chat Messages Stream */}
      <div
        id="chat-messages-stream"
        className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-50/30"
      >
        {messages.length === 0 ? (
          /* Empty Initial State */
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 max-w-lg mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-[#CFE8FF] flex items-center justify-center text-[#3A86C8] shadow-xs">
              <Bot className="w-7 h-7 text-[#0D1B2A]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0D1B2A]">
                IP-SAKTI Sahayak Active
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                Source-cited statutory assistance for Ayurveda intellectual property, patent clearance, and compliance.
              </p>
            </div>

            {!productType && (
              <div className="p-3 rounded-xl bg-[#CFE8FF]/30 border border-[#3A86C8]/20 text-xs text-slate-700 w-full text-left flex items-start gap-3">
                <HelpCircle className="w-4 h-4 text-[#3A86C8] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#0D1B2A]">
                    Recommended: Complete Product Classification
                  </p>
                  <p className="text-slate-600 mt-0.5 text-[11px]">
                    Identify whether your product is a Classical Formulation, Phytopharmaceutical, New Drug, Cosmetic, or Ayurveda Aahar.
                  </p>
                  <button
                    type="button"
                    onClick={onOpenWizard}
                    className="mt-2 text-xs font-bold text-[#3A86C8] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Launch 5-Step Classification Wizard</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}

            {/* Quick Suggestion Chips */}
            <div className="w-full text-left pt-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">
                Sample Legal & IP Inquiries:
              </span>
              <div className="flex flex-col gap-2">
                {getSuggestions().slice(0, 3).map((prompt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onSendMessage(prompt)}
                    className="text-left text-xs p-2.5 rounded-xl border border-slate-200 bg-white hover:border-[#3A86C8] hover:bg-[#CFE8FF]/20 text-slate-700 font-medium transition-colors shadow-2xs cursor-pointer flex items-center justify-between group"
                  >
                    <span className="truncate mr-2">{prompt}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#3A86C8] shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          messages.map((msg) => {
            const isUser = msg.sender === 'user';
            const isSystem = msg.sender === 'system';

            if (isSystem) {
              return (
                <div
                  key={msg.id}
                  className="flex items-center justify-center my-2 text-xs"
                >
                  <div className="px-4 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 max-w-lg text-center leading-relaxed">
                    {msg.text}
                  </div>
                </div>
              );
            }

            if (isUser) {
              return (
                <div key={msg.id} id={`chat-message-${msg.id}`} className="flex justify-end">
                  <div className="max-w-[80%] bg-[#3A86C8] text-white px-4 py-3 rounded-2xl rounded-tr-none shadow-sm">
                    <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
                    <div className="mt-1 text-[10px] flex items-center justify-end text-blue-100 gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      <span>
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              );
            }

            // Assistant Guardrail Refusal
            if (msg.isGuardrailRefusal) {
              return (
                <div key={msg.id} id={`chat-message-${msg.id}`} className="flex justify-start items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0 shadow-inner">
                    <span className="text-xs text-red-600">⚠️</span>
                  </div>
                  <div className="max-w-[85%] bg-red-50 text-red-800 px-4 py-3 rounded-2xl border border-red-100">
                    <p className="text-xs italic leading-relaxed">"{msg.text}"</p>
                    <div className="mt-1 text-[10px] text-red-400 text-right">
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>
              );
            }

            // Assistant Substantive Response
            return (
              <div
                key={msg.id}
                id={`chat-message-${msg.id}`}
                className="flex justify-start items-start gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-[#0D1B2A] flex items-center justify-center shrink-0 shadow-inner">
                  <span className="text-[10px] text-white font-bold">AI</span>
                </div>

                <div className="max-w-[85%] space-y-3">
                  <div className="bg-gray-50 text-[#0D1B2A] px-4 py-4 rounded-2xl rounded-tl-none border border-gray-100 shadow-xs">
                    {/* Confidence Grounding Indicator */}
                    {msg.confidenceScore !== undefined && (
                      <div className="flex items-center justify-between gap-2 pb-2 mb-3 border-b border-gray-200 text-[10px]">
                        <span className="flex items-center gap-1 font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                          <span>
                            Verified Statutory Grounding: {Math.round(msg.confidenceScore * 100)}%
                          </span>
                        </span>
                        <span className="text-slate-400 capitalize font-medium">
                          {msg.jurisdiction} Law
                        </span>
                      </div>
                    )}

                    {/* 1. Patentability Verdict: Can you patent or not? (Described in one line) */}
                    {(msg.oneLinerVerdict || msg.text.includes('**Patentability Verdict')) && (
                      <div className="mb-3.5 bg-gradient-to-r from-blue-50/90 via-sky-50/70 to-indigo-50/70 border border-blue-200 rounded-xl p-3.5 shadow-2xs">
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <div className="flex items-center gap-1.5 text-blue-900 font-bold text-xs">
                            <Scale className="w-4 h-4 text-[#3A86C8]" />
                            <span>Can You Patent It? — Statutory Verdict</span>
                          </div>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100/90 text-blue-800 border border-blue-200">
                            One-Line Verdict
                          </span>
                        </div>
                        <p className="text-xs text-slate-800 font-semibold leading-relaxed">
                          {msg.oneLinerVerdict || extractVerdict(msg.text)}
                        </p>
                      </div>
                    )}

                    {/* 2. Required Statutory Document Chunk */}
                    {(msg.statutoryChunkText || (msg.citations && msg.citations.length > 0)) && (
                      <div className="mb-3.5 bg-amber-50/70 border border-amber-200/90 rounded-xl p-3.5 shadow-2xs">
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs">
                            <FileText className="w-3.5 h-3.5 text-amber-700" />
                            <span>Required Statutory Document Chunk</span>
                          </div>
                          {msg.citations && msg.citations[0] && (
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-200">
                                {msg.citations[0].act} — {msg.citations[0].section}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  copyToClipboard(
                                    msg.statutoryChunkText || msg.citations![0].exactText,
                                    `chunk-${msg.id}`
                                  )
                                }
                                title="Copy Statutory Excerpt"
                                className="text-[10px] flex items-center gap-1 text-amber-800 hover:text-amber-950 bg-amber-100 hover:bg-amber-200/80 px-2 py-0.5 rounded-md border border-amber-300/60 transition-colors cursor-pointer"
                              >
                                {copiedChunkId === `chunk-${msg.id}` ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-600" />
                                    <span>Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    <span>Copy</span>
                                  </>
                                )}
                              </button>
                            </div>
                          )}
                        </div>
                        <blockquote className="text-xs text-slate-800 font-serif italic bg-white/80 border-l-3 border-amber-500 pl-3 py-2 pr-2.5 rounded-r-md leading-relaxed shadow-2xs">
                          "{msg.statutoryChunkText || (msg.citations && msg.citations[0]?.exactText)}"
                        </blockquote>
                      </div>
                    )}

                    {/* 3. Substantive Legal Analysis */}
                    {renderMessageBody(msg)}

                    {/* Expandable Citation Chips */}
                    {msg.citations && msg.citations.length > 0 && (
                      <div className="mt-3.5 pt-3 border-t border-gray-200">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                          {loc.sourceLabel}:
                        </span>
                        <div className="space-y-1.5">
                          {msg.citations.map((citation, idx) => (
                            <CitationChip key={idx} citation={citation} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Compliance Checklist Card */}
                  {msg.complianceChecklist && msg.complianceChecklist.length > 0 && (
                    <div className="bg-amber-50 border border-amber-200 px-4 py-3 rounded-xl shadow-xs">
                      <h4 className="text-[10px] font-bold text-amber-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <CheckSquare className="w-3.5 h-3.5 text-amber-600" />
                        <span>{loc.complianceLabel}</span>
                      </h4>
                      <ul className="text-[11px] text-amber-900 space-y-2">
                        {msg.complianceChecklist.map((item) => {
                          const isDone = checklistState[item.id] || false;
                          return (
                            <li
                              key={item.id}
                              onClick={() => toggleChecklistItem(item.id)}
                              className="flex items-start gap-2 cursor-pointer hover:bg-amber-100/50 p-1 rounded-md transition-colors"
                            >
                              <div className="mt-0.5 text-amber-600 shrink-0">
                                {isDone ? (
                                  <CheckSquare className="w-3.5 h-3.5 text-emerald-700" />
                                ) : (
                                  <Square className="w-3.5 h-3.5 text-amber-500" />
                                )}
                              </div>
                              <div className="flex-1">
                                <span className={isDone ? 'line-through text-amber-500' : 'font-medium'}>
                                  {item.task}
                                </span>
                                <span className="block text-[9px] font-mono text-amber-700 mt-0.5">
                                  Ref: {item.statutoryRef}
                                </span>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}

                  <div className="text-[10px] text-slate-400 text-right pr-1">
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>
            );
          })
        )}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex justify-start items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#0D1B2A] flex items-center justify-center shrink-0 shadow-inner animate-pulse">
              <span className="text-[10px] text-white font-bold">AI</span>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl rounded-tl-none px-4 py-3 text-xs text-slate-600 flex items-center gap-3">
              <div className="flex space-x-1.5">
                <div className="w-2 h-2 rounded-full bg-[#3A86C8] animate-bounce" />
                <div
                  className="w-2 h-2 rounded-full bg-[#3A86C8] animate-bounce"
                  style={{ animationDelay: '0.15s' }}
                />
                <div
                  className="w-2 h-2 rounded-full bg-[#3A86C8] animate-bounce"
                  style={{ animationDelay: '0.3s' }}
                />
              </div>
              <span className="font-semibold text-[#0D1B2A]">
                Verifying statutory corpus and calculating legal citations...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Inquiries Quick Bar */}
      {messages.length > 0 && (
        <div className="px-4 py-2 border-t border-gray-100 bg-gray-50/60 flex items-center gap-2 overflow-x-auto whitespace-nowrap text-xs">
          <span className="text-gray-400 font-bold uppercase text-[10px] tracking-wider shrink-0">
            Quick:
          </span>
          {getSuggestions().slice(0, 3).map((prompt, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onSendMessage(prompt)}
              className="px-2.5 py-1 rounded-full border border-gray-200 bg-white hover:border-[#3A86C8] text-slate-700 hover:text-[#0D1B2A] text-[11px] font-medium shrink-0 transition-colors cursor-pointer shadow-2xs"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* High Density Input Form Bar */}
      <form onSubmit={handleSubmit} className="p-4 bg-gray-50 border-t border-gray-100">
        <div className="flex gap-2 items-center bg-white border border-gray-200 rounded-xl px-4 py-2 shadow-inner focus-within:ring-2 focus-within:ring-[#3A86C8] transition-all">
          <input
            type="text"
            id="legal-query-input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask about patent filing, FSSAI, or TRIPS compliance..."
            disabled={isLoading}
            className="flex-1 bg-transparent border-none text-sm text-[#0D1B2A] placeholder-gray-400 focus:outline-hidden"
          />
          <button
            type="submit"
            id="send-query-button"
            disabled={!inputText.trim() || isLoading}
            className="p-2 bg-[#3A86C8] text-white rounded-lg hover:bg-[#0D1B2A] transition-colors cursor-pointer disabled:opacity-40"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-[9px] text-center mt-3 text-gray-400 uppercase tracking-widest font-medium">
          Disclaimer: This tool provides informational guidance, not a substitute for a licensed legal professional.
        </p>
      </form>
    </div>
  );
};
