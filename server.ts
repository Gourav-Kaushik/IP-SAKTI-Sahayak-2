import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

import { sessionStore } from './server/data/sessionStore.js';
import { globalRetriever } from './server/rag/retriever.js';
import { DeterministicLegalReasoner } from './server/rag/reasoner.js';
import { LegalTranslator } from './server/rag/translator.js';
import { initializeSemanticIndex } from './server/rag/semanticSearch.js';
import {
  WIZARD_QUESTIONS,
  evaluateClassification,
  getClassificationDetails
} from './server/data/wizardQuestions.js';
import { runAutomatedTestSuite } from './tests/auditTests.js';
import {
  ChatMessage,
  Jurisdiction,
  LanguageCode,
  ProductClassification
} from './src/types.js';

dotenv.config();

// ES Module / CommonJS environment compatibility
const currentDirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json({ limit: '1mb' }));

  const reasoner = new DeterministicLegalReasoner(globalRetriever);

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'IP-SAKTI Sahayak Legal Backend',
      timestamp: new Date().toISOString()
    });
  });

  // Wizard Questions endpoint
  app.get('/api/wizard-questions', (req, res) => {
    res.json({
      questions: WIZARD_QUESTIONS
    });
  });

  // Classification submission
  app.post('/api/classify', (req, res) => {
    try {
      const { sessionId, answers, selectedCategory } = req.body;
      let classification;

      if (selectedCategory) {
        classification = getClassificationDetails(selectedCategory as ProductClassification);
      } else if (Array.isArray(answers)) {
        classification = evaluateClassification(answers);
      } else {
        return res.status(400).json({ error: 'Provide answers array or selectedCategory' });
      }

      const session = sessionStore.updateClassification(sessionId, classification);

      // Add system greeting / classification confirmation into chat history
      const systemMessage: ChatMessage = {
        id: `msg_sys_${Date.now()}`,
        sender: 'system',
        timestamp: Date.now(),
        text: `Product classified as: **${classification.categoryName}** (${classification.hindiName}). Regulatory route: ${classification.primaryRegulatoryBody}. ${classification.patentabilityStatus}`,
        jurisdiction: session.jurisdiction,
        productType: classification.category,
        language: session.language
      };
      sessionStore.addMessage(session.sessionId, systemMessage);

      res.json({
        success: true,
        classification,
        session
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Classification failed' });
    }
  });

  // Jurisdiction toggle
  app.post('/api/jurisdiction', (req, res) => {
    const { sessionId, jurisdiction } = req.body;
    if (jurisdiction !== 'national' && jurisdiction !== 'international') {
      return res.status(400).json({ error: 'Invalid jurisdiction' });
    }
    const session = sessionStore.updateJurisdiction(sessionId, jurisdiction as Jurisdiction);
    res.json({ success: true, jurisdiction: session.jurisdiction, session });
  });

  // Language selection
  app.post('/api/language', (req, res) => {
    const { sessionId, language } = req.body;
    const session = sessionStore.updateLanguage(sessionId, language as LanguageCode);
    res.json({ success: true, language: session.language, session });
  });

  // History retrieval
  app.get('/api/history', (req, res) => {
    const sessionId = (req.query.sessionId as string) || '';
    const session = sessionStore.getOrCreateSession(sessionId);
    res.json({
      session,
      history: session.history
    });
  });

  // Legal Corpus explorer
  app.get('/api/corpus', (req, res) => {
    const jurisdiction = req.query.jurisdiction as Jurisdiction | undefined;
    const all = globalRetriever.getAllChunks();
    const filtered = jurisdiction ? all.filter((c) => c.jurisdiction === jurisdiction) : all;
    res.json({
      total: filtered.length,
      chunks: filtered
    });
  });

  // Low confidence logs
  app.get('/api/low-confidence-logs', (req, res) => {
    res.json({
      logs: sessionStore.getLowConfidenceLogs()
    });
  });

  // Automated Test Suite Runner
  app.post('/api/test-run', async (req, res) => {
    try {
      const suiteResults = await runAutomatedTestSuite();
      res.json(suiteResults);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Test suite failed' });
    }
  });

  // Main Chat Query endpoint
  app.post('/api/chat', async (req, res) => {
    try {
      const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
      if (!sessionStore.checkRateLimit(String(clientIp))) {
        return res.status(429).json({
          error: 'Rate limit exceeded. Please wait a moment before sending another legal query.'
        });
      }

      const {
        sessionId,
        query,
        jurisdiction: clientJurisdiction,
        productType: clientProductType,
        language: clientLanguage
      } = req.body;

      const sanitizedQuery = sessionStore.sanitizeInput(query);
      if (!sanitizedQuery) {
        return res.status(400).json({ error: 'Query text is required' });
      }

      const session = sessionStore.getOrCreateSession(sessionId);
      const activeJurisdiction: Jurisdiction = clientJurisdiction || session.jurisdiction || 'national';
      const activeLanguage: LanguageCode = clientLanguage || session.language || 'en';
      const activeProductType: ProductClassification | undefined =
        clientProductType || session.classification?.category;

      session.jurisdiction = activeJurisdiction;
      session.language = activeLanguage;

      // 1. Record User Message
      const userMessage: ChatMessage = {
        id: `msg_user_${Date.now()}`,
        sender: 'user',
        timestamp: Date.now(),
        text: sanitizedQuery,
        jurisdiction: activeJurisdiction,
        productType: activeProductType,
        language: activeLanguage
      };
      sessionStore.addMessage(session.sessionId, userMessage);

      // 2. Multilingual: Translate incoming non-English query to English for legal retrieval
      let queryForRetrieval = sanitizedQuery;
      if (activeLanguage !== 'en') {
        queryForRetrieval = await LegalTranslator.translateQueryToEnglish(sanitizedQuery, activeLanguage);
      }

      // 3. Core AI Layer: Deterministic Legal Reasoner (Zero Hallucination)
      const reasonerOutput = await reasoner.reason({
        query: queryForRetrieval,
        jurisdiction: activeJurisdiction,
        productType: activeProductType,
        language: activeLanguage
      });

      // 4. Handle Guardrail / Out-of-scope logging
      if (reasonerOutput.isGuardrailRefusal) {
        sessionStore.logLowConfidence({
          query: sanitizedQuery,
          jurisdiction: activeJurisdiction,
          productType: activeProductType,
          language: activeLanguage,
          topScore: reasonerOutput.confidenceScore,
          reason: reasonerOutput.refusalReason || 'Relevance score below threshold'
        });
      }

      // 5. Multilingual Synthesis: Translate response back to user's selected language
      // while keeping all statutory citations strictly intact
      let finalExplanation = reasonerOutput.plainExplanation;
      if (activeLanguage !== 'en' && !reasonerOutput.isGuardrailRefusal) {
        finalExplanation = await LegalTranslator.translateAnswerToTargetLanguage(
          reasonerOutput.plainExplanation,
          activeLanguage
        );
      }

      // 6. Record Assistant Message
      const assistantMessage: ChatMessage = {
        id: `msg_asst_${Date.now()}`,
        sender: 'assistant',
        timestamp: Date.now(),
        text: finalExplanation,
        oneLinerVerdict: reasonerOutput.oneLinerVerdict,
        statutoryChunkText: reasonerOutput.statutoryChunkText,
        plainExplanation: finalExplanation,
        citations: reasonerOutput.citations,
        complianceChecklist: reasonerOutput.complianceChecklist,
        confidenceScore: reasonerOutput.confidenceScore,
        isGuardrailRefusal: reasonerOutput.isGuardrailRefusal,
        refusalReason: reasonerOutput.refusalReason,
        jurisdiction: activeJurisdiction,
        productType: activeProductType,
        language: activeLanguage
      };
      sessionStore.addMessage(session.sessionId, assistantMessage);

      res.json({
        message: assistantMessage,
        session
      });
    } catch (err: any) {
      console.error('Chat endpoint error:', err);
      res.status(500).json({ error: err.message || 'Legal reasoning service encountered an error' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Precompute local semantic embeddings for all statutory chunks at startup (100% offline)
  console.log('Precomputing local statutory chunk embeddings (all-MiniLM-L6-v2 ONNX)...');
  await initializeSemanticIndex();
  console.log('Local statutory chunk embeddings indexed in-memory.');

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n  🚀 IP-SAKTI Sahayak Server running at:`);
    console.log(`  ➜  Local:   http://localhost:${PORT}/`);
    console.log(`  ➜  Network: http://127.0.0.1:${PORT}/\n`);
  });
}

startServer();
