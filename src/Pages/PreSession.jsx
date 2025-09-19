import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadSettings } from "../utils/storage";

const QUESTIONS = [
  { id: "mood", label: "How have you felt most of the time this week?", type: "select", options: ["Very negative", "Negative", "Neutral", "Positive", "Very positive"] },
  { id: "sleep", label: "How has your sleep been?", type: "select", options: ["Very poor", "Poor", "Okay", "Good", "Very good"] },
  { id: "energy", label: "Your energy levels today?", type: "select", options: ["Very low", "Low", "Average", "High", "Very high"] },
  { id: "anxiety", label: "Anxiety level right now", type: "select", options: ["Severe", "High", "Moderate", "Low", "None"] },
  { id: "goal", label: "What would you like to focus on today?", type: "text" },
];

function scoreAnswers(values) {
  const map = {
    mood: { "Very negative": 0, Negative: 1, Neutral: 2, Positive: 3, "Very positive": 4 },
    sleep: { "Very poor": 0, Poor: 1, Okay: 2, Good: 3, "Very good": 4 },
    energy: { "Very low": 0, Low: 1, Average: 2, High: 3, "Very high": 4 },
    anxiety: { Severe: 0, High: 1, Moderate: 2, Low: 3, None: 4 },
  };
  let total = 0;
  let count = 0;
  Object.keys(map).forEach((k) => {
    if (values[k] != null) {
      total += map[k][values[k]] ?? 0;
      count += 1;
    }
  });
  const avg = count ? total / (count * 4) : 0.5; // 0..1
  const depressionRisk = 1 - avg; // higher risk when avg low
  return { avg, depressionRisk };
}

function PreSession() {
  const navigate = useNavigate();
  const [values, setValues] = useState({});
  const settings = loadSettings();

  function handleChange(id, v) {
    setValues((s) => ({ ...s, [id]: v }));
  }

  function handleStart() {
    const scoring = scoreAnswers(values);
    const payload = { values, scoring, startedAt: new Date().toISOString() };
    sessionStorage.setItem("mindcare_presession", JSON.stringify(payload));
    navigate("/therapy");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 p-6">
      <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-blue-800 mb-4">Pre-Session Check-in</h2>
        <p className="text-blue-700 mb-4">Answer a few questions to personalize today's session. This stays on your device.</p>
        <div className="grid gap-4">
          {QUESTIONS.map((q) => (
            <div key={q.id}>
              <label className="block text-sm text-blue-700 mb-1">{q.label}</label>
              {q.type === "select" ? (
                <select
                  className="w-full border rounded-lg px-3 py-2"
                  value={values[q.id] || ""}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                >
                  <option value="" disabled>Choose...</option>
                  {q.options.map((op) => (
                    <option key={op} value={op}>{op}</option>
                  ))}
                </select>
              ) : (
                <input
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Type here..."
                  value={values[q.id] || ""}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                />
              )}
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end">
          <button onClick={handleStart} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Start Session</button>
        </div>
      </div>
    </div>
  );
}

export default PreSession;


