import { useEffect, useState } from "react";
import { loadSettings, getLastSession } from "../utils/storage";
import { chatWithOpenRouter } from "../utils/openrouter";
import ReactMarkdown from "react-markdown";

function Recommendations() {
  const [settings] = useState(loadSettings());
  console.log(settings);
  const [tips, setTips] = useState("Generating personalized recommendations…");

  useEffect(() => {
    async function run() {
      const last = getLastSession();
      const mood = last?.analysis?.sentiment?.label || "neutral";
      const risk = last?.presession?.scoring?.depressionRisk ?? 0.5;
      const transcript = last?.messages?.map(m => `${m.role}: ${m.content}`).join("\n").slice(0, 4000) || "";
      try {
        const content = await chatWithOpenRouter({
          apiKey: settings.apiKey,
          model: settings.model,
          messages: [
            { role: "system", content: "You are a wellness coach. Provide gentle, practical, non-clinical tips. Avoid medical advice. Offer 5-7 bullet points, short and actionable." },
            { role: "user", content: `My last session mood was ${mood} and a pre-session estimated depression risk of ${(risk*100).toFixed(0)}%. Based on this and the conversation, suggest relaxation techniques, positive habits, and 3 book suggestions for mental health. Conversation transcript (optional):\n${transcript}` },
          ],
        });
        setTips(content);
      } catch {
        setTips("Here are general tips: Take a short walk, practice deep breathing (4-7-8), write three gratitudes, hydrate, and reach out to a friend. Books: 'Feeling Good', 'The Happiness Trap', 'Atomic Habits'.");
      }
    }
    run();
  }, [settings.apiKey, settings.model]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-4 md:p-6">
        <h2 className="text-xl font-semibold text-blue-800 mb-4">Personalized Recommendations</h2>
        <div className="prose max-w-none text-blue-900">
          <ReactMarkdown>{tips}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default Recommendations;


