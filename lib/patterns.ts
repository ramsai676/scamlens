import type { ScamPattern } from './types';

/**
 * Indian scam pattern library — calibrated against fraud patterns
 * documented by RBI, I4C (cybercrime.gov.in) and news reporting through 2026.
 * Signals are tested against the lowercased message.
 */
export const PATTERNS: ScamPattern[] = [
  {
    id: 'digital-arrest',
    name: 'Digital arrest',
    weight: 1.0,
    minHits: 1,
    signals: [
      /digital\s*arrest/,
      /\b(cbi|police|customs|narcotics|ncb|cyber\s*cell|crime\s*branch|trai|ed)\b.{0,60}(arrest|case|warrant|fir|legal action|investigation)/,
      /(arrest|warrant|fir).{0,60}(video\s*call|skype|whatsapp\s*call)/,
      /(parcel|courier).{0,40}(drugs|narcotics|illegal|contraband)/,
      /aadhaar.{0,50}(money\s*launder|crime|misuse|illegal)/,
    ],
    explain:
      'Police, CBI, customs and courts NEVER arrest anyone over a phone or video call, and "digital arrest" does not exist in Indian law. This script isolates you on a call and escalates fear until you transfer money.',
    advice: 'Hang up immediately. Real agencies send written summons, never demand video calls or money. Report at cybercrime.gov.in or call 1930.',
  },
  {
    id: 'upi-collect',
    name: 'UPI collect-request fraud',
    weight: 0.9,
    minHits: 1,
    signals: [
      /(accept|approve).{0,40}(request|collect).{0,40}(receive|get|refund)/,
      /(enter|share).{0,30}(upi\s*pin|mpin).{0,40}(receive|refund|cashback|credit)/,
      /to\s*receive.{0,30}(money|amount|payment|refund).{0,40}(pin|approve|accept)/,
      /scan.{0,30}qr.{0,40}(receive|refund|get)/,
    ],
    explain:
      'Receiving money on UPI never requires entering your PIN, approving a request, or scanning a QR. Those actions SEND money. This inversion is the single most common UPI fraud.',
    advice: 'Decline the request. You never need a PIN to receive money — only to pay.',
  },
  {
    id: 'kyc-expiry',
    name: 'KYC / SIM expiry scam',
    weight: 0.9,
    minHits: 1,
    signals: [
      /kyc.{0,50}(expire|expiry|suspend|block|update|pending|complete)/,
      /(pan|aadhaar)\s*(card)?.{0,40}(link|update|verify).{0,40}(block|suspend|deactivat|expire)/,
      /(sim|number|account).{0,30}(deactivat|block|suspend).{0,50}(24|48)?\s*(hours|hrs|today|tonight)/,
      /(yono|netbanking|net\s*banking).{0,40}(block|suspend|expire)/,
    ],
    explain:
      'Banks and telecom companies do not suspend accounts via SMS ultimatums with links or callback numbers. "Complete your KYC or lose access today" is a fear-plus-deadline template.',
    advice: 'Never click the link. If worried, walk into the branch or call the number on the back of your card — not the number in the message.',
  },
  {
    id: 'courier-scam',
    name: 'Courier / parcel scam',
    weight: 0.85,
    minHits: 1,
    signals: [
      /(fedex|dhl|bluedart|blue\s*dart|india\s*post|courier|parcel|package|shipment).{0,60}(seized|held|stuck|custom|clearance|illegal|return|fee|charge)/,
      /(pay|fee|charge).{0,30}(₹|rs\.?|inr)?\s*\d{1,4}.{0,40}(release|deliver|clear|redeliver)/,
      /(delivery|address).{0,30}(failed|incomplete|unsuccessful).{0,60}(click|link|update|confirm)/,
    ],
    explain:
      'Fake courier notices come in two flavors: a small "release fee" (harvesting your card) or a parcel "containing drugs" that escalates into the digital-arrest script.',
    advice: 'Track parcels only on the courier’s official site by typing the URL yourself. Never pay release fees via links.',
  },
  {
    id: 'electricity',
    name: 'Electricity disconnection scam',
    weight: 0.9,
    minHits: 1,
    signals: [
      /(electricity|power|bijli).{0,50}(disconnect|cut|discontinue)/,
      /(electricity|power|bill).{0,40}(tonight|today|9\.?30|10\s*pm|immediately)/,
      /electricity\s*officer|bill\s*not\s*updated?/,
    ],
    explain:
      'Power companies never announce same-night disconnection by SMS from a personal number, and never settle bills over WhatsApp calls. The urgency window ("tonight 9:30 PM") is the tell.',
    advice: 'Check dues only on the official discom app/site. Ignore the callback number.',
  },
  {
    id: 'task-job',
    name: 'Task / part-time job scam',
    weight: 0.85,
    minHits: 1,
    signals: [
      /(earn|salary|income).{0,30}(₹|rs\.?|inr)\s*\d{3,6}.{0,30}(day|daily|per\s*task|hour)/,
      /(lik(e|ing)|subscrib(e|ing)|review(ing)?|rat(e|ing)).{0,30}(youtube\s*)?(videos?|hotels?|products?|movies?|channels?)/,
      /(part.?time|work\s*from\s*home).{0,140}(telegram|whatsapp)/,
      /(prepaid|advance|deposit|recharge).{0,40}(task|next\s*level|withdraw|unlock)/,
    ],
    explain:
      '"Earn ₹3000/day liking videos" starts with small real payouts, then requires deposits to "unlock" bigger tasks. The deposits are the scam — withdrawals stop once you’re invested.',
    advice: 'No legitimate job pays you to like videos, and none requires deposits to release your own earnings. Exit the group.',
  },
  {
    id: 'lottery',
    name: 'Lottery / prize scam',
    weight: 0.85,
    minHits: 1,
    signals: [
      /(won|winner|selected).{0,40}(lottery|lucky\s*draw|prize|jackpot)/,
      /kbc|kaun\s*banega/,
      /(claim|processing|registration)\s*(fee|charge|tax).{0,40}(prize|amount|winning)/,
      /(won|winning).{0,30}(₹|rs\.?|inr)\s*\d{2}\s*(lakh|lac|crore)/,
    ],
    explain:
      'You cannot win a lottery you never entered. The "prize" always requires a fee or tax first — that fee is the entire scam.',
    advice: 'Delete it. KBC does not run WhatsApp lotteries. Never pay to receive a prize.',
  },
  {
    id: 'army-olx',
    name: 'Army-officer marketplace scam',
    weight: 0.8,
    minHits: 1,
    signals: [
      /(army|crpf|bsf|defence|military|soldier|jawan).{0,60}(posting|transfer|cantonment|selling|buying|olx|urgent)/,
      /(can'?t|cannot)\s*(meet|come).{0,50}(pay|advance|transfer|courier)/,
    ],
    explain:
      'The fake army officer builds instant trust with uniform photos, can never meet in person due to "posting", and pushes advance payment or a reverse-UPI trick.',
    advice: 'On marketplaces, deal face to face, cash on inspection. Anyone refusing to meet but discussing payment is a scam.',
  },
  {
    id: 'screen-share',
    name: 'Remote access / screen-share attack',
    weight: 0.95,
    minHits: 1,
    signals: [
      /(anydesk|any\s*desk|teamviewer|team\s*viewer|quick\s*support|rustdesk|screen\s*shar)/,
      /(install|download).{0,40}(app|application).{0,40}(support|verify|refund|help|kyc)/,
    ],
    explain:
      'Once you install a screen-sharing app, the "support agent" watches you type your PIN and empties the account. No bank or company support flow requires AnyDesk.',
    advice: 'Never install remote-access apps at a stranger’s request. If installed, uninstall now and check your accounts.',
  },
  {
    id: 'otp-request',
    name: 'OTP / PIN harvesting',
    weight: 0.95,
    minHits: 1,
    signals: [
      /(share|send|tell|give|forward).{0,30}(otp|one\s*time\s*password|verification\s*code|pin|cvv)/,
      /(otp|code).{0,40}(sent|shared).{0,30}(by\s*mistake|wrongly|accidentally)/,
    ],
    explain:
      'An OTP is the final key to your money or your WhatsApp account. "I sent you a code by mistake, please forward it" is account takeover in one message.',
    advice: 'Never share an OTP with anyone — not "bank staff", not friends whose accounts may be hijacked. No exceptions.',
  },
  {
    id: 'family-emergency',
    name: 'Family emergency / voice-clone setup',
    weight: 0.8,
    minHits: 1,
    signals: [
      /(son|daughter|beta|beti|nephew|grandson|child).{0,60}(arrest|accident|hospital|police|custody|trouble)/,
      /(urgent|immediately|abhi|right\s*now).{0,40}(send|transfer|pay).{0,30}(money|₹|rs\.?|amount)/,
      /don'?t\s*(tell|call|inform).{0,30}(anyone|family|papa|mummy)/,
    ],
    explain:
      'The pressure to act instantly and secretly ("don’t tell anyone, send now") is engineered panic. With AI voice cloning, even a familiar voice on a call proves nothing.',
    advice: 'Hang up and call your family member directly on their own number. Agree on a family code word for real emergencies.',
  },
  {
    id: 'investment',
    name: 'Investment / trading group scam',
    weight: 0.8,
    minHits: 1,
    signals: [
      /(guaranteed|assured|fixed|sure)\s*(returns?|profit|income)/,
      /(double|triple|2x|3x).{0,30}(money|investment|amount).{0,40}(days?|weeks?|month)/,
      /(stock|crypto|bitcoin|forex|trading).{0,50}(tips|group|expert|guru).{0,50}(telegram|whatsapp)/,
      /(sebi|rbi)\s*(registered|approved).{0,30}(guaranteed|assured)/,
    ],
    explain:
      'Guaranteed returns are illegal to promise and impossible to deliver. The Telegram "trading group" shows fake profit screenshots until your withdrawal "needs a tax payment".',
    advice: 'If returns are guaranteed, it’s a scam by definition. Verify any advisor on SEBI’s site; invest only via regulated platforms.',
  },
  {
    id: 'loan-app',
    name: 'Instant loan app trap',
    weight: 0.75,
    minHits: 1,
    signals: [
      /(instant|5\s*min|quick).{0,30}loan.{0,40}(no\s*documents?|without\s*cibil|aadhaar\s*only)/,
      /loan.{0,30}(approved|sanctioned).{0,40}(click|link|apk|download)/,
      /(processing|insurance|gst)\s*fee.{0,40}(loan|disbursal|release)/,
    ],
    explain:
      'Predatory loan apps demand fees before "disbursal" that never comes, or harvest your contacts and photos for blackmail-driven recovery.',
    advice: 'Borrow only from RBI-regulated lenders. Never pay an upfront fee to receive a loan, and never install loan APKs from links.',
  },
  {
    id: 'phishing-link',
    name: 'Impersonation phishing link',
    weight: 0.7,
    minHits: 2,
    signals: [
      /(bank|sbi|hdfc|icici|axis|pnb|paytm|phonepe|gpay|amazon|flipkart|netflix|irctc|income\s*tax)/,
      /(bit\.ly|tinyurl|t\.co|cutt\.ly|rb\.gy|is\.gd|shorturl|\.xyz\b|\.top\b|\.club\b|\.online\b)/,
      /(click|tap|visit).{0,30}(link|below|here).{0,50}(verify|update|claim|unlock|confirm)/,
      /\.apk\b/,
    ],
    explain:
      'A brand name plus a shortened or odd-domain link is the classic phishing pair. The page will look exactly like the real one — that’s the point.',
    advice: 'Never log in through message links. Type the site address yourself or use the official app.',
  },
  {
    id: 'wrong-transfer',
    name: '“Wrong transfer” refund trick',
    weight: 0.75,
    minHits: 1,
    signals: [
      /(sent|transferred).{0,30}(money|₹|rs\.?|amount).{0,30}(by\s*mistake|wrongly|accidentally|galti)/,
      /(please|kindly)\s*(return|refund|send\s*back).{0,30}(money|amount|₹|rs\.?)/,
    ],
    explain:
      'Either the "credit" SMS is fake, or the money is stolen and you become the mule when you "return" it to a different account.',
    advice: 'Check your actual bank statement (not SMS). If money really arrived, tell them to reverse it through their own bank — never send it yourself.',
  },
  {
    id: 'sextortion',
    name: 'Video-call sextortion',
    weight: 0.9,
    minHits: 1,
    signals: [
      /(video|nude|private|intimate).{0,40}(viral|upload|share|send).{0,40}(family|contacts|facebook|youtube|instagram)/,
      /(recorded|screen\s*record).{0,30}(video\s*call|your\s*video)/,
      /pay.{0,40}(delete|remove|not\s*(share|upload|send))/,
    ],
    explain:
      'The blackmailer’s power is your panic. Paying never ends it — it marks you as someone who pays.',
    advice: 'Do not pay. Stop responding, screenshot everything, block, and report at cybercrime.gov.in (helpline 1930). You are not alone and not at fault.',
  },
];

/** Generic risk signals that add to the score regardless of pattern. */
export const GENERIC_SIGNALS: { id: string; label: string; re: RegExp; weight: number }[] = [
  { id: 'urgency', label: 'Manufactured urgency', re: /(urgent|immediately|within\s*(24|48)\s*(hours|hrs)|right\s*now|today\s*only|last\s*(chance|warning)|expires?\s*(today|tonight|soon)|act\s*now|jaldi|turant)/, weight: 8 },
  { id: 'secrecy', label: 'Asks for secrecy', re: /(don'?t|do\s*not)\s*(tell|share|inform|disclose).{0,30}(anyone|family|bank|police)/, weight: 10 },
  { id: 'money-out', label: 'Asks you to send money', re: /(send|transfer|pay|deposit)\s*(₹|rs\.?|inr)?\s*\d/, weight: 8 },
  { id: 'short-link', label: 'Shortened / suspicious link', re: /(bit\.ly|tinyurl|t\.co|cutt\.ly|rb\.gy|is\.gd|shorturl)/, weight: 8 },
  { id: 'apk', label: 'Asks to install an APK / app', re: /\.apk\b|install\s*(this|the)\s*app/, weight: 10 },
  { id: 'credentials', label: 'Asks for OTP / PIN / CVV / password', re: /(otp|upi\s*pin|mpin|cvv|password|net\s*banking\s*id)/, weight: 10 },
  { id: 'grammar-authority', label: 'Claims to be an authority', re: /(rbi|cbi|police|customs|income\s*tax|court|govt|government|ministry|telecom\s*department|trai)/, weight: 5 },
  { id: 'too-good', label: 'Too good to be true', re: /(free|won|winner|guaranteed|100%|risk.?free|lucky)/, weight: 5 },
];
