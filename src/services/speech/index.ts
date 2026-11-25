/**
 * On-Device Browser Speech Synthesis (Zero Cloud Audio Leaks)
 */
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
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang === 'hi' || lang.startsWith('hi') ? 'hi-IN' : 'en-US';
  utterance.rate = 0.92; // Slightly slower, calm cadence for medical clarity
  utterance.pitch = 1.0;

  if (onStart) utterance.onstart = onStart;
  if (onEnd) utterance.onend = onEnd;
  utterance.onerror = () => {
    if (onEnd) onEnd();
  };

  window.speechSynthesis.speak(utterance);
}

export function stopSpeakingLocally() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
