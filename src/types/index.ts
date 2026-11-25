import { z } from 'zod';

export type Verdict = 'supported' | 'misleading' | 'contradicted' | 'insufficient_evidence' | 'out_of_scope';

export interface EvidenceCard {
  id: string;
  topic: string;
  title: string;
  title_hi?: string;
  organization: string;
  organization_hi?: string;
  url: string;
  publishedAt?: string;
  checkedAt: string;
  paraphrase: string;
  paraphrase_hi?: string;
  scope: string;
  scope_hi?: string;
  keywords: string[];
  reviewStatus: 'developer_checked' | 'clinician_reviewed';
}

export interface Claim {
  id: string;
  text: string;
  excerpt: string;
  startSec?: number;
  endSec?: number;
  safetyFlag: boolean;
}

export interface ClaimResult {
  claimId: string;
  verdict: Verdict;
  rationale: string;
  evidenceIds: string[];
  caveat: string;
  nextStep: string;
}

export interface BeliefResult {
  concern: 'cost' | 'side_effects' | 'trust' | 'access' | 'misunderstanding' | 'other' | 'unknown';
  tentative: boolean;
  reply: string;
  teachBackQuestion: string;
  evidenceIds: string[];
}

export interface TeachBackResult {
  comprehension: 'understood' | 'partial' | 'unclear';
  explanation: string;
  nextQuestion?: string;
}

export interface InferenceTrace {
  id: string;
  task: string;
  requestedMode: string;
  actualSource: 'ON_DEVICE' | 'IN_CLOUD' | 'UNKNOWN';
  elapsedMs: number;
  outcome: 'ok' | 'error';
  timestamp: string;
  details?: string;
}

// Zod schemas for runtime validation
export const ClaimResultSchema = z.object({
  claimId: z.string(),
  verdict: z.enum(['supported', 'misleading', 'contradicted', 'insufficient_evidence', 'out_of_scope']),
  rationale: z.string(),
  evidenceIds: z.array(z.string()),
  caveat: z.string(),
  nextStep: z.string(),
});

export const ClaimsAnalysisResponseSchema = z.object({
  claims: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
      excerpt: z.string(),
      safetyFlag: z.boolean().default(false),
      result: ClaimResultSchema,
    })
  ),
  overallSummary: z.string(),
});

export const BeliefResultSchema = z.object({
  concern: z.enum(['cost', 'side_effects', 'trust', 'access', 'misunderstanding', 'other', 'unknown']),
  tentative: z.boolean(),
  reply: z.string(),
  teachBackQuestion: z.string(),
  evidenceIds: z.array(z.string()),
});

export const TeachBackResultSchema = z.object({
  comprehension: z.enum(['understood', 'partial', 'unclear']),
  explanation: z.string(),
  nextQuestion: z.string().optional(),
});
