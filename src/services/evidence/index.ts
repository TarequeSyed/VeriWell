import evidenceData from '../../data/evidence.json';
import { EvidenceCard } from '../../types';

export const evidenceCorpus: EvidenceCard[] = evidenceData as EvidenceCard[];

/**
 * Find evidence cards matching keywords or topic
 */
export function findRelevantEvidence(query: string, topic?: string): EvidenceCard[] {
  const normalizedQuery = query.toLowerCase();
  
  return evidenceCorpus.filter((card) => {
    if (topic && card.topic !== topic) return false;
    
    // Check keyword match
    const keywordMatch = card.keywords.some((kw) => normalizedQuery.includes(kw.toLowerCase()));
    if (keywordMatch) return true;

    // Check title / paraphrase match
    const titleMatch = card.title.toLowerCase().includes(normalizedQuery);
    const textMatch = card.paraphrase.toLowerCase().includes(normalizedQuery);
    return titleMatch || textMatch;
  });
}

/**
 * Retrieve evidence card by ID
 */
export function getEvidenceById(id: string): EvidenceCard | undefined {
  return evidenceCorpus.find((c) => c.id === id);
}

/**
 * Validate that an AI model only cited authentic, existing evidence IDs
 */
export function validateCitations(citedIds: string[]): { valid: boolean; validatedCards: EvidenceCard[]; hallucinatedIds: string[] } {
  const validatedCards: EvidenceCard[] = [];
  const hallucinatedIds: string[] = [];

  for (const id of citedIds) {
    const card = getEvidenceById(id);
    if (card) {
      validatedCards.push(card);
    } else {
      hallucinatedIds.push(id);
    }
  }

  return {
    valid: hallucinatedIds.length === 0,
    validatedCards,
    hallucinatedIds,
  };
}
