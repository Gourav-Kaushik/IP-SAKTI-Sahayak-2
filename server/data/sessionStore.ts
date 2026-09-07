import {
  SessionState,
  ChatMessage,
  Jurisdiction,
  LanguageCode,
  ClassificationResult,
  LowConfidenceLog
} from '../../src/types.js';

export class SessionStore {
  private sessions: Map<string, SessionState> = new Map();
  private lowConfidenceLogs: LowConfidenceLog[] = [];
  private rateLimitMap: Map<string, { count: number; resetTime: number }> = new Map();

  public getOrCreateSession(sessionId?: string): SessionState {
    const id = sessionId && sessionId.trim().length > 0 ? sessionId : `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    let session = this.sessions.get(id);

    if (!session) {
      session = {
        sessionId: id,
        jurisdiction: 'national',
        language: 'en',
        history: [],
        createdAt: Date.now(),
        lastActiveAt: Date.now()
      };
      this.sessions.set(id, session);
    } else {
      session.lastActiveAt = Date.now();
    }

    return session;
  }

  public getSession(sessionId: string): SessionState | undefined {
    return this.sessions.get(sessionId);
  }

  public updateJurisdiction(sessionId: string, jurisdiction: Jurisdiction): SessionState {
    const session = this.getOrCreateSession(sessionId);
    session.jurisdiction = jurisdiction;
    session.lastActiveAt = Date.now();
    return session;
  }

  public updateLanguage(sessionId: string, language: LanguageCode): SessionState {
    const session = this.getOrCreateSession(sessionId);
    session.language = language;
    session.lastActiveAt = Date.now();
    return session;
  }

  public updateClassification(sessionId: string, classification: ClassificationResult): SessionState {
    const session = this.getOrCreateSession(sessionId);
    session.classification = classification;
    session.lastActiveAt = Date.now();
    return session;
  }

  public addMessage(sessionId: string, message: ChatMessage): SessionState {
    const session = this.getOrCreateSession(sessionId);
    session.history.push(message);
    session.lastActiveAt = Date.now();
    return session;
  }

  public logLowConfidence(log: Omit<LowConfidenceLog, 'id' | 'timestamp'>) {
    this.lowConfidenceLogs.push({
      id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp: Date.now(),
      ...log
    });

    // Keep last 200 logs
    if (this.lowConfidenceLogs.length > 200) {
      this.lowConfidenceLogs.shift();
    }
  }

  public getLowConfidenceLogs(): LowConfidenceLog[] {
    return this.lowConfidenceLogs;
  }

  public checkRateLimit(key: string, limit = 45, windowMs = 60000): boolean {
    const now = Date.now();
    const entry = this.rateLimitMap.get(key);

    if (!entry || now > entry.resetTime) {
      this.rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
      return true;
    }

    if (entry.count >= limit) {
      return false;
    }

    entry.count++;
    return true;
  }

  public sanitizeInput(input: string): string {
    if (typeof input !== 'string') return '';
    return input
      .trim()
      .replace(/<[^>]*>/g, '') // strip HTML
      .substring(0, 1500); // cap query length
  }
}

export const sessionStore = new SessionStore();
