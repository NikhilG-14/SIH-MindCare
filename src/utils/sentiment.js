// Extremely simple rule-based sentiment analysis for demo purposes

const positiveWords = [
  "good",
  "great",
  "happy",
  "joy",
  "hope",
  "calm",
  "relieved",
  "better",
  "improved",
  "love",
  "grateful",
  "okay",
];

const negativeWords = [
  "sad",
  "depressed",
  "anxious",
  "worried",
  "angry",
  "bad",
  "worse",
  "terrible",
  "hopeless",
  "tired",
  "lonely",
  "cry",
  "suicidal",
];

export function analyzeSentiment(text) {
  if (!text) return { label: "neutral", score: 0 };
  const lowered = text.toLowerCase();
  let score = 0;

  positiveWords.forEach((w) => {
    if (lowered.includes(w)) score += 1;
  });
  negativeWords.forEach((w) => {
    if (lowered.includes(w)) score -= 1;
  });

  let label = "neutral";
  if (score > 0) label = "positive";
  if (score < 0) label = "negative";

  return { label, score };
}

export function summarizeConversation(messages) {
  // messages: [{role: 'user'|'assistant', content: string}]
  const userTexts = messages.filter(m => m.role === 'user').map(m => m.content).join("\n");
  const sentiment = analyzeSentiment(userTexts);
  return { sentiment };
}


