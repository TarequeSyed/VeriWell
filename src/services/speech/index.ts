/**
 * On-Device Browser Speech Synthesis (Zero Cloud Audio Leaks)
 * Supports natural dual-language playback: English (en-US) and Hindi (hi-IN)
 */

let activeUtterance: SpeechSynthesisUtterance | null = null;

// Cache loaded voices
let cachedVoices: SpeechSynthesisVoice[] = [];

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  cachedVoices = window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoices = window.speechSynthesis.getVoices();
  };
}

/**
 * Get available voices, attempting eager fetch if initially empty
 */
function getVoices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
  if (cachedVoices.length === 0) {
    cachedVoices = window.speechSynthesis.getVoices();
  }
  return cachedVoices;
}

/**
 * Find best matching voice for the target language (English or Hindi)
 */
function findBestVoice(lang: string): SpeechSynthesisVoice | null {
  const voices = getVoices();
  if (!voices || voices.length === 0) return null;

  const isHindi = lang === 'hi' || lang.startsWith('hi') || lang === 'hi-IN';

  if (isHindi) {
    // 1. Exact hi-IN or hi match
    const exact = voices.find(v => v.lang.toLowerCase().replace('_', '-') === 'hi-in' || v.lang.toLowerCase() === 'hi');
    if (exact) return exact;

    // 2. Name-based match (e.g., "Google हिन्दी", "Microsoft Hemant", "Microsoft Kalpana", "Madhur", "Swara")
    const named = voices.find(v => {
      const name = v.name.toLowerCase();
      return name.includes('hindi') || name.includes('हिन्दी') || name.includes('hemant') || name.includes('kalpana') || name.includes('madhur') || name.includes('swara');
    });
    if (named) return named;

    // 3. Any Indian voice fallback (e.g. en-IN can phonetically pronounce Devanagari loanwords if Hindi not installed)
    const indian = voices.find(v => v.lang.toLowerCase().includes('in'));
    if (indian) return indian;
  } else {
    // English preference: Google US English, Natural, or clear default
    const natural = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
    if (natural) return natural;

    const anyEnglish = voices.find(v => v.lang.startsWith('en'));
    if (anyEnglish) return anyEnglish;
  }

  return voices[0] || null;
}

/**
 * Clean text for audio narration (removes markdown symbols, URLs, asterisks)
 */
function sanitizeTextForSpeech(raw: string): string {
  return raw
    .replace(/https?:\/\/\S+/g, '') // strip URLs
    .replace(/[*_#`~[\]()]/g, ' ') // strip markdown punctuation
    .replace(/\s+/g, ' ')
    .trim();
}

export function speakTextLocally(
  text: string, 
  onStart?: () => void, 
  onEnd?: () => void,
  lang: string = 'en-US'
) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn("Browser SpeechSynthesis not supported on this device.");
    return;
  }

  // Cancel any ongoing speech
  stopSpeakingLocally();

  const cleanText = sanitizeTextForSpeech(text);
  if (!cleanText) {
    if (onEnd) onEnd();
    return;
  }

  const isHindi = lang === 'hi' || lang.startsWith('hi');
  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = isHindi ? 'hi-IN' : 'en-US';
  utterance.rate = isHindi ? 0.90 : 0.93; // Calibrated for clear clinical cadence
  utterance.pitch = 1.0;

  const matchedVoice = findBestVoice(isHindi ? 'hi' : 'en');
  if (matchedVoice) {
    utterance.voice = matchedVoice;
    utterance.lang = matchedVoice.lang;
  }

  utterance.onstart = () => {
    if (onStart) onStart();
  };

  utterance.onend = () => {
    activeUtterance = null;
    if (onEnd) onEnd();
  };

  utterance.onerror = (e) => {
    console.warn("Speech synthesis notice:", e);
    activeUtterance = null;
    if (onEnd) onEnd();
  };

  // Hold reference to prevent Chrome garbage-collection cancellation bug
  activeUtterance = utterance;
  window.speechSynthesis.speak(utterance);
}

export function stopSpeakingLocally() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    activeUtterance = null;
  }
}

export function isSpeakingLocally(): boolean {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    return window.speechSynthesis.speaking || activeUtterance !== null;
  }
  return false;
}
