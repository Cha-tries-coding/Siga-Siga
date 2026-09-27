export function speakGreek(text: string): boolean {
  // Vérifie que le navigateur prend en charge la synthèse vocale
  if (!("speechSynthesis" in window)) {
    console.error("Speech synthesis is not supported by this browser.");
    return false;
  }

  const synth = window.speechSynthesis;

  // Arrête la lecture précédente
  synth.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  // Indique explicitement que le texte est en grec
  utterance.lang = "el-GR";
  utterance.rate = 0.9;
  utterance.pitch = 1;
  utterance.volume = 1;

  // Cherche une voix grecque si elle est disponible
  const voices = synth.getVoices();

  const greekVoice = voices.find(
    (voice) =>
      voice.lang.toLowerCase() === "el-gr" ||
      voice.lang.toLowerCase().startsWith("el")
  );

  if (greekVoice) {
    utterance.voice = greekVoice;
  }

  utterance.onerror = (event) => {
    console.error("Speech synthesis error:", event.error);
  };

  utterance.onstart = () => {
    console.log("Greek speech started");
  };

  // IMPORTANT :
  // speak() est appelé immédiatement pendant l'interaction utilisateur.
  synth.speak(utterance);

  return true;
}
