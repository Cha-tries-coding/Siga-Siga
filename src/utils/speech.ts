let voicesPromise: Promise<SpeechSynthesisVoice[]> | null = null;

function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  if (!voicesPromise) {
    voicesPromise = new Promise((resolve) => {
      const existing = window.speechSynthesis.getVoices();
      if (existing.length > 0) {
        resolve(existing);
        return;
      }

      const onVoicesChanged = () => {
        window.speechSynthesis.removeEventListener("voiceschanged", onVoicesChanged);
        resolve(window.speechSynthesis.getVoices());
      };
      window.speechSynthesis.addEventListener("voiceschanged", onVoicesChanged);
      // Some browsers never fire voiceschanged; fall back after a short wait.
      setTimeout(() => resolve(window.speechSynthesis.getVoices()), 300);
    });
  }
  return voicesPromise;
}

export async function speakGreek(text: string): Promise<boolean> {
  if (!("speechSynthesis" in window)) return false;

  const voices = await loadVoices();
  const greekVoice = voices.find((voice) => voice.lang.toLowerCase().startsWith("el"));

  if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
    window.speechSynthesis.cancel();
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "el-GR";
  utterance.rate = 0.9;
  if (greekVoice) utterance.voice = greekVoice;

  window.speechSynthesis.speak(utterance);
  return true;
}
