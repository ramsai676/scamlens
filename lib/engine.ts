import { GENERIC_SIGNALS, PATTERNS } from './patterns';
import type { Band, PatternMatch, Verdict } from './types';

/**
 * Fully local scam analysis — no network, no upload.
 * Score = strongest pattern match (dominant) + secondary patterns + generic flags.
 */
export function analyze(message: string): Verdict {
  const text = message.toLowerCase().replace(/\s+/g, ' ').trim();

  const matches: PatternMatch[] = [];
  for (const pattern of PATTERNS) {
    const evidence: string[] = [];
    let hits = 0;
    for (const re of pattern.signals) {
      const m = text.match(re);
      if (m && m[0]) {
        hits++;
        evidence.push(m[0].trim());
      }
    }
    if (hits >= pattern.minHits) {
      matches.push({ pattern, evidence, hits });
    }
  }
  matches.sort(
    (a, b) => b.pattern.weight * (1 + 0.15 * b.hits) - a.pattern.weight * (1 + 0.15 * a.hits)
  );

  const genericFlags: Verdict['genericFlags'] = [];
  let genericScore = 0;
  for (const g of GENERIC_SIGNALS) {
    const m = text.match(g.re);
    if (m && m[0]) {
      genericFlags.push({ label: g.label, evidence: m[0].trim() });
      genericScore += g.weight;
    }
  }

  // Pattern score: dominant pattern carries most of the weight,
  // each additional distinct pattern adds a little.
  let patternScore = 0;
  if (matches.length > 0) {
    const top = matches[0];
    patternScore = top.pattern.weight * 62 + Math.min(2, top.hits - 1) * 6;
    patternScore += Math.min(12, (matches.length - 1) * 6);
  }

  const risk = Math.min(100, Math.round(patternScore + Math.min(30, genericScore)));

  const band: Band = risk >= 55 ? 'scam' : risk >= 25 ? 'suspicious' : 'ok';

  const advice: string[] = [];
  for (const m of matches.slice(0, 3)) advice.push(m.pattern.advice);
  if (band !== 'ok' && advice.length === 0) {
    advice.push('Verify through an official channel you find yourself — never through numbers or links in the message.');
  }
  if (band === 'scam') {
    advice.push('If money already moved: call 1930 (national cyber-fraud helpline) within the hour and file at cybercrime.gov.in — speed matters for freezing funds.');
  }

  return { risk, band, matches, genericFlags, advice };
}

export const BAND_META: Record<Band, { title: string; line: string }> = {
  scam: {
    title: 'Almost certainly a scam',
    line: 'This message matches known fraud scripts. Do not reply, click, pay, or call back.',
  },
  suspicious: {
    title: 'Suspicious — verify first',
    line: 'Several fraud signals present. Treat as hostile until independently verified through official channels.',
  },
  ok: {
    title: 'No known scam pattern',
    line: 'Nothing matched our fraud library — but new scripts appear weekly. Stay skeptical of links, urgency and payment requests.',
  },
};

/** Sample messages for the demo buttons — real scam scripts, lightly anonymized. */
export const SAMPLES: { label: string; text: string }[] = [
  {
    label: 'Courier + digital arrest',
    text: 'This is Delhi Customs. A parcel in your name from FedEx containing illegal drugs has been seized. A case is registered against your Aadhaar. Join the video call with CBI officer immediately for verification or an arrest warrant will be issued today. Do not tell anyone, this is a confidential investigation.',
  },
  {
    label: 'Electricity bill',
    text: 'Dear Consumer your electricity power will be disconnected tonight at 9.30pm because your previous month bill was not updated. immediately contact our electricity officer 9xxxxxxx21 Thank you',
  },
  {
    label: 'Task job offer',
    text: 'Hello! I am Priya from HR team. We offer part time work from home job. Earn Rs 3000 to 8000 daily by just liking YouTube videos and rating hotels. No experience needed. Join our Telegram channel to start earning today: t.me/xxxxx',
  },
  {
    label: 'KYC expiry',
    text: 'Dear customer your SBI YONO account KYC has expired. Your account will be blocked within 24 hours. Please click below link to update your KYC immediately http://bit.ly/sbi-kyc-update',
  },
  {
    label: 'UPI refund trick',
    text: 'Sir I have sent Rs 5000 to your PhonePe by mistake instead of my brother. Please check and kindly return the money. I am sending a collect request, just accept it and enter your UPI PIN to send back. Very urgent sir my mother is in hospital.',
  },
  {
    label: 'A normal message',
    text: 'Hi Ramesh, the electrician came by today and fixed the kitchen switch. He said the wiring is old but fine for now. Will send you the bill photo later. Also amma asked if you are coming home for Sankranti.',
  },
];
