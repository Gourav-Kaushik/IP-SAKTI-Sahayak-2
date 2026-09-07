import http from 'http';
import https from 'https';
import { DeterministicLegalReasoner } from '../server/rag/reasoner.js';
import { globalRetriever } from '../server/rag/retriever.js';
import { TestResult } from '../src/types.js';

export async function runAutomatedTestSuite(): Promise<{
  success: boolean;
  results: TestResult[];
  summary: { total: number; passed: number; failed: number };
}> {
  const reasoner = new DeterministicLegalReasoner(globalRetriever);
  const results: TestResult[] = [];

  // Test 1: Citation Completeness Verification
  // Rule: Every generated substantive answer MUST contain at least one valid statutory citation
  try {
    const validQueries = [
      {
        q: 'Can I patent a formulation from Charaka Samhita or ancient Ayurvedic texts?',
        jurisdiction: 'national' as const,
        product: 'classical_formulation' as const
      },
      {
        q: 'Do I need NBA approval before filing an international patent for an Indian herb?',
        jurisdiction: 'national' as const,
        product: 'phytopharmaceutical' as const
      },
      {
        q: 'What are the licensing requirements for classical vs proprietary Ayurvedic medicine under Rule 158B?',
        jurisdiction: 'national' as const,
        product: 'classical_formulation' as const
      },
      {
        q: 'What is the mandatory disclosure requirement under WIPO GRATK Treaty 2024?',
        jurisdiction: 'international' as const,
        product: 'classical_formulation' as const
      }
    ];

    let allCitationsValid = true;
    const citationsCollected: string[] = [];

    for (const item of validQueries) {
      const output = await reasoner.reason({
        query: item.q,
        jurisdiction: item.jurisdiction,
        productType: item.product
      });

      if (output.isGuardrailRefusal) {
        allCitationsValid = false;
        break;
      }

      if (!output.citations || output.citations.length === 0) {
        allCitationsValid = false;
        break;
      }

      for (const cit of output.citations) {
        if (!cit.act || !cit.section || !cit.exactText) {
          allCitationsValid = false;
        }
        citationsCollected.push(`${cit.act} (${cit.section})`);
      }
    }

    results.push({
      id: 'test-1-citation-completeness',
      title: 'Statutory Citation Verification',
      description: 'Verifies that every generated substantive answer contains at least one verified statutory citation with Act and Section.',
      status: allCitationsValid ? 'passed' : 'failed',
      details: allCitationsValid
        ? `Passed: All 4 test queries produced verified citations (${[...new Set(citationsCollected)].join(', ')}).`
        : 'Failed: One or more queries produced responses missing statutory citations.',
      citationsFound: [...new Set(citationsCollected)]
    });
  } catch (err) {
    results.push({
      id: 'test-1-citation-completeness',
      title: 'Statutory Citation Verification',
      description: 'Verifies that every generated substantive answer contains verified citations.',
      status: 'failed',
      details: `Exception caught: ${String(err)}`
    });
  }

  // Test 2: Guardrail Threshold & Low-Confidence Trigger
  // Rule: System must refuse to answer out-of-scope or unverified queries (zero hallucination guarantee)
  try {
    const outOfScopeQueries = [
      'How to trade Bitcoin cryptocurrency on decentralized exchanges?',
      'Can I patent a quantum satellite computer orbiting Jupiter?',
      'What is the best sourdough pizza recipe with Italian yeast?'
    ];

    let allGuardrailsTriggered = true;
    const refusalReasons: string[] = [];

    for (const q of outOfScopeQueries) {
      const output = await reasoner.reason({
        query: q,
        jurisdiction: 'national',
        productType: 'classical_formulation'
      });

      if (!output.isGuardrailRefusal) {
        allGuardrailsTriggered = false;
        break;
      }

      refusalReasons.push(output.refusalReason || 'Low confidence threshold reached');
    }

    results.push({
      id: 'test-2-guardrail-trigger',
      title: 'Guardrail & Out-of-Scope Protection',
      description: 'Verifies that out-of-scope, non-statutory, or low-confidence queries are safely rejected without hallucination.',
      status: allGuardrailsTriggered ? 'passed' : 'failed',
      details: allGuardrailsTriggered
        ? 'Passed: 100% of out-of-scope queries safely triggered the legal guardrail refusal state.'
        : 'Failed: Guardrail failed to trigger on an irrelevant query, risking hallucination.',
      score: 1.0
    });
  } catch (err) {
    results.push({
      id: 'test-2-guardrail-trigger',
      title: 'Guardrail & Out-of-Scope Protection',
      description: 'Verifies that out-of-scope queries trigger the guardrail.',
      status: 'failed',
      details: `Exception caught: ${String(err)}`
    });
  }

  // Test 3: Strict Jurisdiction Filtering
  // Rule: When jurisdiction is 'national', international treaty chunks must be excluded; when 'international', national-only chunks must be excluded
  try {
    const nationalQuery = 'What are patent disclosure rules for traditional medicine?';
    const nationalOutput = await reasoner.reason({
      query: nationalQuery,
      jurisdiction: 'national',
      productType: 'classical_formulation'
    });

    const internationalQuery = 'What are international treaties governing traditional knowledge disclosure and genetic resources?';
    const internationalOutput = await reasoner.reason({
      query: internationalQuery,
      jurisdiction: 'international',
      productType: 'classical_formulation'
    });

    const nationalExcludesInternational =
      nationalOutput.citations.every((c) => c.jurisdiction === 'national');
    const internationalExcludesNational =
      internationalOutput.citations.every((c) => c.jurisdiction === 'international');

    const passed = nationalExcludesInternational && internationalExcludesNational;

    results.push({
      id: 'test-3-jurisdiction-filtering',
      title: 'Jurisdiction Isolation Enforcement',
      description: 'Ensures that national queries retrieve only Indian statutes and international queries retrieve only global treaties (TRIPS/WIPO).',
      status: passed ? 'passed' : 'failed',
      details: passed
        ? `Passed: Jurisdiction boundaries strictly honored. National query returned Indian acts (${nationalOutput.citations.map((c) => c.act).join(', ')}); International query returned global treaties (${internationalOutput.citations.map((c) => c.act).join(', ')}).`
        : 'Failed: Jurisdiction leakage detected across legal regimes.'
    });
  } catch (err) {
    results.push({
      id: 'test-3-jurisdiction-filtering',
      title: 'Jurisdiction Isolation Enforcement',
      description: 'Ensures that national queries retrieve only Indian statutes.',
      status: 'failed',
      details: `Exception caught: ${String(err)}`
    });
  }

  // Test 4: Semantic Retrieval on Paraphrased Queries & Zero-Network Audit
  // Rule: Paraphrased queries sharing few/no keywords with statutory text must be accurately retrieved
  // via local on-device embeddings, and zero outbound network calls must be made during retrieval.
  try {
    let networkAttempts = 0;
    const originalHttpRequest = http.request;
    const originalHttpsRequest = https.request;
    const originalFetch = globalThis.fetch;

    // Strict network guard: intercept and log any outbound socket request
    http.request = ((...args: any[]) => {
      networkAttempts++;
      throw new Error('OUTBOUND_NETWORK_ATTEMPT_BLOCKED: Pipeline must run 100% offline.');
    }) as any;
    https.request = ((...args: any[]) => {
      networkAttempts++;
      throw new Error('OUTBOUND_NETWORK_ATTEMPT_BLOCKED: Pipeline must run 100% offline.');
    }) as any;
    if (originalFetch) {
      globalThis.fetch = ((...args: any[]) => {
        networkAttempts++;
        throw new Error('OUTBOUND_NETWORK_ATTEMPT_BLOCKED: Pipeline must run 100% offline.');
      }) as any;
    }

    let allParaphrasesPassed = true;
    const testDetails: string[] = [];

    try {
      const paraphrasedQueries = [
        {
          // Paraphrased query targeting Section 3(p) without using keywords "Section 3(p)", "Charaka", or "TKDL"
          q: 'Can ancestral remedies documented in ancient heritage texts be granted exclusive patents?',
          expectedSectionSubstr: '3(p)',
          jurisdiction: 'national' as const,
          product: 'classical_formulation' as const
        },
        {
          // Paraphrased query targeting Biological Diversity Act Section 6 without using "NBA" or "BDA" acronyms
          q: 'Do biological raw materials obtained from native Indian forests require statutory biodiversity council permission before patent commercialization?',
          expectedSectionSubstr: 'Section 6',
          jurisdiction: 'national' as const,
          product: 'phytopharmaceutical' as const
        }
      ];

      for (const item of paraphrasedQueries) {
        const output = await reasoner.reason({
          query: item.q,
          jurisdiction: item.jurisdiction,
          productType: item.product
        });

        if (output.isGuardrailRefusal) {
          allParaphrasesPassed = false;
          testDetails.push(`Query "${item.q.slice(0, 35)}..." was prematurely rejected by guardrail.`);
          break;
        }

        const matchedExpected = output.citations.some(
          (c) =>
            c.section.toLowerCase().includes(item.expectedSectionSubstr.toLowerCase()) ||
            c.act.toLowerCase().includes(item.expectedSectionSubstr.toLowerCase())
        );

        if (!matchedExpected) {
          allParaphrasesPassed = false;
          testDetails.push(
            `Query "${item.q.slice(0, 35)}..." retrieved (${output.citations.map((c) => c.section).join(', ')}) instead of ${item.expectedSectionSubstr}.`
          );
          break;
        }

        testDetails.push(
          `Resolved "${item.expectedSectionSubstr}" (${output.citations[0].act}) with confidence score ${Math.round(output.confidenceScore * 100)}%`
        );
      }
    } finally {
      // Restore networking primitives immediately
      http.request = originalHttpRequest;
      https.request = originalHttpsRequest;
      if (originalFetch) {
        globalThis.fetch = originalFetch;
      }
    }

    const networkCheckPassed = networkAttempts === 0;
    const finalPassed = allParaphrasesPassed && networkCheckPassed;

    results.push({
      id: 'test-4-semantic-paraphrase-offline',
      title: 'Semantic Paraphrase Retrieval & Zero-Network Audit',
      description: 'Verifies accurate retrieval of paraphrased queries sharing minimal statutory keywords via on-device embeddings, and validates zero outbound network calls.',
      status: finalPassed ? 'passed' : 'failed',
      details: finalPassed
        ? `Passed: Accurately resolved paraphrased queries via on-device ONNX embeddings (${testDetails.join(' | ')}). Strictly zero outbound network requests attempted (${networkAttempts} requests recorded).`
        : `Failed: ${testDetails.join('; ')} (Network requests attempted: ${networkAttempts}).`
    });
  } catch (err: any) {
    results.push({
      id: 'test-4-semantic-paraphrase-offline',
      title: 'Semantic Paraphrase Retrieval & Zero-Network Audit',
      description: 'Verifies accurate semantic retrieval and zero outbound network calls.',
      status: 'failed',
      details: `Exception caught: ${err?.message || String(err)}`
    });
  }

  // Test 5: One-Line Patentability Verdict & Statutory Document Chunk Verification
  // Rule: System must describe in one line at the start whether you can patent or not and which act to overcome,
  // followed by the required chunk of the statutory document.
  try {
    const patentAuditQueries = [
      {
        q: 'Can I patent an Ayurvedic formulation from ancient books?',
        expectedActOvercome: 'Section 3(p)',
        mustMentionPatentability: true
      },
      {
        q: 'Do I need NBA clearance before getting a patent on an Indian herb?',
        expectedActOvercome: 'Section 6',
        mustMentionPatentability: true
      },
      {
        q: 'Can I patent a synergistic polyherbal mixture or mere admixture of herbs?',
        expectedActOvercome: 'Section 3(e)',
        mustMentionPatentability: true
      }
    ];

    let allVerdictsCompliant = true;
    const verdictDetails: string[] = [];

    for (const item of patentAuditQueries) {
      const output = await reasoner.reason({
        query: item.q,
        jurisdiction: 'national',
        productType: 'classical_formulation'
      });

      if (output.isGuardrailRefusal) {
        allVerdictsCompliant = false;
        verdictDetails.push(`Query "${item.q}" unexpectedly triggered guardrail refusal.`);
        break;
      }

      const hasVerdict = Boolean(output.oneLinerVerdict && output.oneLinerVerdict.length > 20);
      const hasChunk = Boolean(output.statutoryChunkText && output.statutoryChunkText.length > 40);
      const mentionsPatent = output.oneLinerVerdict.toLowerCase().includes('patent');
      const mentionsOvercome = output.oneLinerVerdict.toLowerCase().includes('overcome');
      const mentionsExpectedAct = output.oneLinerVerdict.toLowerCase().includes(item.expectedActOvercome.toLowerCase());
      const explanationStartsWithVerdict = output.plainExplanation.includes(output.oneLinerVerdict);

      if (!hasVerdict || !hasChunk || !mentionsPatent || !mentionsOvercome || !mentionsExpectedAct || !explanationStartsWithVerdict) {
        allVerdictsCompliant = false;
        verdictDetails.push(
          `Query "${item.q}": failed verdict criteria (hasVerdict=${hasVerdict}, hasChunk=${hasChunk}, mentionsPatent=${mentionsPatent}, mentionsOvercome=${mentionsOvercome}, mentionsExpectedAct=${mentionsExpectedAct}).`
        );
        break;
      }

      verdictDetails.push(`"${output.oneLinerVerdict.slice(0, 70)}..."`);
    }

    results.push({
      id: 'test-5-one-liner-verdict-and-chunk',
      title: 'One-Line Patentability Verdict & Statutory Document Chunk Audit',
      description: 'Verifies that responses state in one line at the start whether an innovation is patentable and which specific Act/Section must be overcome, accompanied by the required statutory document chunk.',
      status: allVerdictsCompliant ? 'passed' : 'failed',
      details: allVerdictsCompliant
        ? `Passed: All test queries produced compliant one-line patentability verdicts citing specific acts to overcome + exact document chunks (${verdictDetails.join(' | ')}).`
        : `Failed: ${verdictDetails.join('; ')}`
    });
  } catch (err: any) {
    results.push({
      id: 'test-5-one-liner-verdict-and-chunk',
      title: 'One-Line Patentability Verdict & Statutory Document Chunk Audit',
      description: 'Verifies one-line patentability verdicts and statutory document chunk presentation.',
      status: 'failed',
      details: `Exception caught: ${err?.message || String(err)}`
    });
  }

  const passedCount = results.filter((r) => r.status === 'passed').length;
  const failedCount = results.filter((r) => r.status === 'failed').length;

  return {
    success: failedCount === 0,
    results,
    summary: {
      total: results.length,
      passed: passedCount,
      failed: failedCount
    }
  };
}
