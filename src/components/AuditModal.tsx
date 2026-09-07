import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, CheckCircle2, XCircle, RotateCcw, AlertTriangle } from 'lucide-react';
import { TestResult } from '../types.js';

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuditModal: React.FC<AuditModalProps> = ({ isOpen, onClose }) => {
  const [results, setResults] = useState<TestResult[]>([]);
  const [summary, setSummary] = useState<{ total: number; passed: number; failed: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runTests = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/test-run', { method: 'POST' });
      const data = await res.json();
      if (data.results) {
        setResults(data.results);
        setSummary(data.summary);
      } else {
        setError('No test output returned');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to execute test suite');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      runTests();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      id="audit-test-modal-overlay"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
    >
      <div
        id="audit-test-dialog"
        className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-[#CFE8FF]"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#0D1B2A]">
                Automated Legal & Citation Audit Suite
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Mandatory verification of zero-hallucination guardrails and statutory citation completeness
              </p>
            </div>
          </div>
          <button
            type="button"
            id="close-audit-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-[#0D1B2A] hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Summary Bar */}
        <div className="p-4 border-b border-slate-100 bg-emerald-50/40 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs font-semibold">
            {summary ? (
              <>
                <span className="flex items-center gap-1 text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-md">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  {summary.passed} Passed
                </span>
                {summary.failed > 0 && (
                  <span className="flex items-center gap-1 text-red-800 bg-red-100 px-2.5 py-1 rounded-md">
                    <XCircle className="w-3.5 h-3.5 text-red-600" />
                    {summary.failed} Failed
                  </span>
                )}
                <span className="text-slate-500">
                  Total Tests: {summary.total}
                </span>
              </>
            ) : (
              <span className="text-slate-500">Executing verification tests...</span>
            )}
          </div>

          <button
            type="button"
            id="re-run-audit-btn"
            disabled={loading}
            onClick={runTests}
            className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#3A86C8] text-[#0D1B2A] shadow-2xs transition-colors cursor-pointer disabled:opacity-50"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Re-run Audit</span>
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 sm:p-6 space-y-4 max-h-[60vh] overflow-y-auto bg-slate-50/50">
          {loading ? (
            <div className="text-center py-12 text-slate-500 text-sm space-y-2">
              <div className="w-6 h-6 border-2 border-[#3A86C8] border-t-transparent rounded-full animate-spin mx-auto" />
              <p>Running automated legal reasoner verification...</p>
            </div>
          ) : error ? (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          ) : (
            results.map((test) => {
              const isPassed = test.status === 'passed';
              return (
                <div
                  key={test.id}
                  id={test.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isPassed
                      ? 'bg-white border-slate-200'
                      : 'bg-red-50/50 border-red-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="text-sm font-bold text-[#0D1B2A] flex items-center gap-2">
                      {isPassed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                      )}
                      <span>{test.title}</span>
                    </h4>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isPassed
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {test.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 mb-2">
                    {test.description}
                  </p>

                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 leading-relaxed">
                    {test.details}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#0D1B2A] text-white text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Close Audit Report
          </button>
        </div>
      </div>
    </div>
  );
};
