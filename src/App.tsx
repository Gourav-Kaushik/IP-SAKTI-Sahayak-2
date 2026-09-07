import { useState, useEffect } from 'react';
import { Header } from './components/Header.js';
import { DisclaimerBar } from './components/DisclaimerBar.js';
import { ClassificationWizard } from './components/ClassificationWizard.js';
import { ChatWindow } from './components/ChatWindow.js';
import { HighDensitySidebar } from './components/HighDensitySidebar.js';
import { CorpusExplorerModal } from './components/CorpusExplorerModal.js';
import { AuditModal } from './components/AuditModal.js';
import {
  ChatMessage,
  ClassificationResult,
  Jurisdiction,
  LanguageCode
} from './types.js';

export default function App() {
  const [sessionId, setSessionId] = useState<string>('');
  const [jurisdiction, setJurisdiction] = useState<Jurisdiction>('national');
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [classification, setClassification] = useState<ClassificationResult | undefined>(undefined);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Modals & Wizard visibility
  const [showWizard, setShowWizard] = useState<boolean>(true);
  const [showCorpusModal, setShowCorpusModal] = useState<boolean>(false);
  const [showAuditModal, setShowAuditModal] = useState<boolean>(false);

  // Initialize session on mount
  useEffect(() => {
    let existingSession = localStorage.getItem('ipsakti_session_id');
    if (!existingSession) {
      existingSession = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
      localStorage.setItem('ipsakti_session_id', existingSession);
    }
    setSessionId(existingSession);

    // Load conversation history from backend
    fetch(`/api/history?sessionId=${encodeURIComponent(existingSession)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.session) {
          if (data.session.jurisdiction) {
            setJurisdiction(data.session.jurisdiction);
          }
          if (data.session.language) {
            setLanguage(data.session.language);
          }
          if (data.session.classification) {
            setClassification(data.session.classification);
            setShowWizard(false); // If already classified, show chat window directly
          }
        }
        if (data.history && Array.isArray(data.history) && data.history.length > 0) {
          setMessages(data.history);
        }
      })
      .catch((err) => console.warn('Could not load history:', err));
  }, []);

  // Toggle Jurisdiction
  const handleToggleJurisdiction = async (newJurisdiction: Jurisdiction) => {
    setJurisdiction(newJurisdiction);
    if (sessionId) {
      try {
        await fetch('/api/jurisdiction', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId, jurisdiction: newJurisdiction })
        });
      } catch (err) {
        console.warn('Jurisdiction sync failed:', err);
      }
    }
  };

  // Change Language
  const handleChangeLanguage = async (newLanguage: LanguageCode) => {
    setLanguage(newLanguage);
    if (sessionId) {
      try {
        await fetch('/api/language', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId, language: newLanguage })
        });
      } catch (err) {
        console.warn('Language sync failed:', err);
      }
    }
  };

  // Complete Wizard Classification
  const handleClassificationComplete = async (result: ClassificationResult) => {
    setClassification(result);
    setShowWizard(false);

    if (sessionId) {
      try {
        const res = await fetch('/api/classify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId,
            selectedCategory: result.category
          })
        });
        const data = await res.json();
        if (data.session?.history) {
          setMessages(data.session.history);
        }
      } catch (err) {
        console.warn('Classification sync failed:', err);
      }
    }
  };

  // Send substantive query
  const handleSendMessage = async (queryText: string) => {
    if (!queryText.trim() || isLoading) return;

    // Optimistically add user message
    const tempUserMsg: ChatMessage = {
      id: `temp_${Date.now()}`,
      sender: 'user',
      timestamp: Date.now(),
      text: queryText,
      jurisdiction,
      productType: classification?.category,
      language
    };
    setMessages((prev) => [...prev, tempUserMsg]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          query: queryText,
          jurisdiction,
          productType: classification?.category,
          language
        })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Server error');
      }

      const data = await res.json();
      if (data.message) {
        // Replace temp or append
        setMessages((prev) => {
          const filtered = prev.filter((m) => m.id !== tempUserMsg.id);
          return [...filtered, tempUserMsg, data.message];
        });
      }
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMsg: ChatMessage = {
        id: `err_${Date.now()}`,
        sender: 'assistant',
        timestamp: Date.now(),
        text: `Error connecting to statutory reasoner: ${err.message || 'Please check your connection and retry.'}`,
        isGuardrailRefusal: true,
        jurisdiction,
        language
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#CFE8FF] font-sans text-[#0D1B2A]">
      {/* 1. Persistent Disclaimer Bar */}
      <DisclaimerBar language={language} />

      {/* 2. Main Navigation Header */}
      <Header
        jurisdiction={jurisdiction}
        onToggleJurisdiction={handleToggleJurisdiction}
        language={language}
        onChangeLanguage={handleChangeLanguage}
        classification={classification}
        onOpenWizard={() => setShowWizard(true)}
        onOpenCorpus={() => setShowCorpusModal(true)}
        onOpenAudit={() => setShowAuditModal(true)}
      />

      {/* 3. High Density Main Dashboard Container */}
      <main className="flex-1 flex flex-col lg:flex-row p-3 sm:p-4 gap-4 overflow-hidden w-full max-w-[1600px] mx-auto">
        {/* Left Sidebar: Product Profile & Live Citations */}
        <HighDensitySidebar
          classification={classification}
          jurisdiction={jurisdiction}
          messages={messages}
          onOpenWizard={() => setShowWizard(true)}
          onOpenCorpus={() => setShowCorpusModal(true)}
          onOpenAudit={() => setShowAuditModal(true)}
        />

        {/* Right Main Interface */}
        <section className="flex-1 flex flex-col min-w-0">
          {showWizard ? (
            /* Step 1: 5-Question Classification Wizard */
            <div className="flex-1 flex items-center justify-center bg-white rounded-2xl shadow-xl border border-[#3A86C8]/10 p-4 sm:p-6 overflow-y-auto">
              <ClassificationWizard
                onComplete={handleClassificationComplete}
                onCancel={classification ? () => setShowWizard(false) : undefined}
                currentClassification={classification}
              />
            </div>
          ) : (
            /* Step 2: Main Legal Chat Interface */
            <ChatWindow
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
              jurisdiction={jurisdiction}
              productType={classification?.category}
              language={language}
              onOpenWizard={() => setShowWizard(true)}
            />
          )}
        </section>
      </main>

      {/* 4. Modals */}
      <CorpusExplorerModal
        isOpen={showCorpusModal}
        onClose={() => setShowCorpusModal(false)}
      />

      <AuditModal
        isOpen={showAuditModal}
        onClose={() => setShowAuditModal(false)}
      />
    </div>
  );
}
