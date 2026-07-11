export interface ScamPattern {
  id: string;
  name: string;
  /** how strongly a match indicates fraud, 0–1 */
  weight: number;
  /** regexes tested against the lowercased message */
  signals: RegExp[];
  /** minimum distinct signal hits for the pattern to count */
  minHits: number;
  explain: string;
  advice: string;
}

export interface PatternMatch {
  pattern: ScamPattern;
  /** matched snippets, for evidence highlighting */
  evidence: string[];
  hits: number;
}

export type Band = 'scam' | 'suspicious' | 'ok';

export interface Verdict {
  /** 0–100 */
  risk: number;
  band: Band;
  matches: PatternMatch[];
  genericFlags: { label: string; evidence: string }[];
  advice: string[];
}
