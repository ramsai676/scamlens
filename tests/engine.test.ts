import { analyze, SAMPLES } from '../lib/engine';
import { PATTERNS } from '../lib/patterns';

let passed = 0;
let failed = 0;

function assert(cond: boolean, label: string) {
  if (cond) passed++;
  else {
    failed++;
    console.error(`  FAIL: ${label}`);
  }
}

function expectPattern(text: string, patternId: string, label: string) {
  const v = analyze(text);
  const found = v.matches.some((m) => m.pattern.id === patternId);
  if (!found) console.error(`    matched instead: ${v.matches.map((m) => m.pattern.id).join(', ') || 'nothing'} (risk ${v.risk})`);
  assert(found && v.band !== 'ok', label);
}

console.log('scam detection — one per pattern');
expectPattern(
  'You are under digital arrest. CBI has registered a case against your Aadhaar. Join the video call immediately.',
  'digital-arrest',
  'digital arrest'
);
expectPattern(
  'To receive your refund of Rs 4999, please accept the collect request and enter your UPI PIN.',
  'upi-collect',
  'UPI collect fraud'
);
expectPattern(
  'Dear customer your KYC will expire today. Your account will be suspended in 24 hours. Update immediately.',
  'kyc-expiry',
  'KYC expiry'
);
expectPattern(
  'Your FedEx parcel has been seized at customs. Pay Rs 250 clearance fee to release your shipment.',
  'courier-scam',
  'courier scam'
);
expectPattern(
  'Dear consumer your electricity power will be disconnected tonight at 9.30pm. Contact electricity officer.',
  'electricity',
  'electricity disconnection'
);
expectPattern(
  'Earn Rs 5000 daily by liking YouTube videos. Part time work from home. Join our Telegram group.',
  'task-job',
  'task job scam'
);
expectPattern(
  'Congratulations! You have won KBC lucky draw prize of Rs 25 lakh. Pay registration fee to claim your winning amount.',
  'lottery',
  'lottery scam'
);
expectPattern(
  'I am army officer posted in Kashmir cantonment, selling my car urgent. I cannot meet, please transfer advance payment.',
  'army-olx',
  'army OLX scam'
);
expectPattern(
  'Madam for your refund please install AnyDesk app so our support executive can help you.',
  'screen-share',
  'screen share attack'
);
expectPattern(
  'I accidentally sent you a 6 digit verification code by mistake, please forward the OTP to me.',
  'otp-request',
  'OTP harvesting'
);
expectPattern(
  'Aunty your son is in police custody after an accident. Send Rs 50000 immediately. Do not tell anyone in the family.',
  'family-emergency',
  'family emergency'
);
expectPattern(
  'Join our stock trading expert group on Telegram. Guaranteed returns, double your money in 15 days. SEBI registered.',
  'investment',
  'investment scam'
);
expectPattern(
  'Instant loan in 5 minutes, no documents, no CIBIL. Pay small processing fee for disbursal. Download app from link.',
  'loan-app',
  'loan app trap'
);
expectPattern(
  'Your HDFC account will be blocked. Click the link below to verify: http://bit.ly/hdfc-verify',
  'phishing-link',
  'phishing link'
);
expectPattern(
  'Sir I transferred Rs 8000 to your account by mistake, kindly return the money to this number.',
  'wrong-transfer',
  'wrong transfer'
);
expectPattern(
  'I have recorded your video call. Pay 20000 or I will upload the video and share with your family and Facebook contacts.',
  'sextortion',
  'sextortion'
);

console.log('benign messages stay clean');
{
  const benign = [
    'Hi Ramesh, the electrician came by today and fixed the kitchen switch. Will send you the bill photo later.',
    'Meeting moved to 3pm tomorrow, same room. Please bring the Q2 numbers.',
    'Happy birthday! Party at our place on Saturday 7pm. Bring the kids.',
    'Your Swiggy order #4821 has been delivered. Rate your experience in the app.',
    'Beta, call me when you reach home. Amma made your favourite sambar.',
  ];
  for (const b of benign) {
    const v = analyze(b);
    if (v.band !== 'ok') console.error(`    "${b.slice(0, 40)}…" → ${v.band} (${v.risk}), matches: ${v.matches.map((m) => m.pattern.id).join(',')}`);
    assert(v.band === 'ok', `benign: "${b.slice(0, 40)}…"`);
  }
}

console.log('samples behave as labeled');
{
  for (const s of SAMPLES) {
    const v = analyze(s.text);
    if (s.label === 'A normal message') {
      assert(v.band === 'ok', `sample "${s.label}" is ok`);
    } else {
      assert(v.band === 'scam', `sample "${s.label}" flagged as scam (got ${v.band}, risk ${v.risk})`);
    }
  }
}

console.log('engine sanity');
{
  const ids = new Set(PATTERNS.map((p) => p.id));
  assert(ids.size === PATTERNS.length, 'pattern ids unique');
  const v = analyze('');
  assert(v.risk === 0 && v.band === 'ok', 'empty message → 0 risk');
  const scamV = analyze(SAMPLES[0].text);
  assert(scamV.risk >= 70, `strong scam scores high (${scamV.risk})`);
  assert(scamV.advice.some((a) => a.includes('1930')), 'scam verdict includes 1930 helpline');
  assert(scamV.matches[0].evidence.length > 0, 'evidence snippets captured');
}

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
