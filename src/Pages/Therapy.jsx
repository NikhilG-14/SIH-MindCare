import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { chatWithOpenRouter } from "../utils/openrouter";
import { appendSession, loadSettings } from "../utils/storage";
import { summarizeConversation } from "../utils/sentiment";

function Therapy() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState(loadSettings());
  const [isListening, setIsListening] = useState(false);
  const [interimText, setInterimText] = useState("");
  const [echoUserVoice, setEchoUserVoice] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello, I'm your AI therapist. When you're ready, press the microphone and share what's on your mind.",
    },
  ]);
  const recognitionRef = useRef(null);
  const [recognitionAvailable, setRecognitionAvailable] = useState(false);
  const [thinking, setThinking] = useState(false);

  useEffect(() => {
    setSettings(loadSettings());
  }, []);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = true;
      rec.lang = "en-US";
      rec.onresult = (e) => {
        let finalText = "";
        let interim = "";
        for (let i = e.resultIndex; i < e.results.length; i += 1) {
          const res = e.results[i];
          if (res.isFinal) finalText += res[0].transcript;
          else interim += res[0].transcript;
        }
        setInterimText(interim);
        if (finalText) {
          setInterimText("");
          handleUserInput(finalText.trim());
        }
      };
      rec.onend = () => {
        setIsListening(false);
        setInterimText("");
      };
      recognitionRef.current = rec;
      setRecognitionAvailable(true);
    } else {
      setRecognitionAvailable(false);
    }
  }, []);

  function speak(text) {
    if (!window.speechSynthesis) return;
    const utter = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    if (settings.voice && voices && voices.length) {
      const preferred = voices.find((v) =>
        settings.voice === "male" ? v.name.toLowerCase().includes("male") : settings.voice === "female" ? v.name.toLowerCase().includes("female") : false
      );
      if (preferred) utter.voice = preferred;
    }
    window.speechSynthesis.speak(utter);
  }

  async function handleUserInput(text) {
    if (!text?.trim()) return;
    const next = [...messages, { role: "user", content: text }];
    setMessages(next);
    if (echoUserVoice) {
      speak(text);
    }
    setThinking(true);
    try {
      const ai = await chatWithOpenRouter({
        apiKey: settings.apiKey,
        model: settings.model,
        messages: [
          { role: "system", content: "You are a supportive, empathetic therapist. Keep replies concise and soothing. Avoid medical claims. Encourage help-seeking if crisis is mentioned." },
          ...next,
        ],
      });
      const updated = [...next, { role: "assistant", content: ai }];
      setMessages(updated);
      speak(ai);
    } catch {
      const fallback =
        "I'm here with you. I couldn't reach the AI service. Would you like to continue talking?";
      const updated = [...next, { role: "assistant", content: fallback }];
      setMessages(updated);
      speak(fallback);
    } finally {
      setThinking(false);
    }
  }

  function toggleListen() {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch {
        // ignore start errors if already started
      }
    }
  }

  function endSession() {
    const analysis = summarizeConversation(messages);
    const presessionRaw = sessionStorage.getItem("mindcare_presession");
    let presession = null;
    try {
      presession = presessionRaw ? JSON.parse(presessionRaw) : null;
    } catch {
      // ignore
    }
    const session = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      messages,
      analysis,
      presession,
    };
    appendSession(session);
    navigate("/analytics");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left: Doctor avatar (video-call style) */}
        <div className="md:col-span-2 bg-black rounded-2xl overflow-hidden relative shadow-lg">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.2),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(99,102,241,0.2),transparent_40%)]" />
          <div className="relative h-[320px] md:h-[520px] grid place-items-center">
            <div className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-blue-200 to-indigo-200 grid place-items-center shadow-2xl animate-pulse">
              <span className="text-5xl md:text-6xl">🧑‍⚕️</span>
            </div>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
              <button
                onClick={toggleListen}
                disabled={!recognitionAvailable}
                className={
                  "h-12 w-12 rounded-full text-white grid place-items-center shadow transition " +
                  (isListening ? "bg-red-600 animate-pulse" : "bg-blue-600 hover:bg-blue-700")
                }
                title={recognitionAvailable ? "Toggle microphone" : "Speech recognition not supported"}
              >
                🎤
              </button>
              <button
                onClick={endSession}
                className="h-12 px-4 rounded-full bg-green-600 text-white hover:bg-green-700 shadow"
              >
                End
              </button>
            </div>
          </div>
        </div>

        {/* Right: Chat panel */}
        <div className="md:col-span-1 bg-white/80 backdrop-blur rounded-2xl shadow-lg p-4 flex flex-col">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-200 to-indigo-200 grid place-items-center">🧑‍⚕️</div>
            <div className="text-blue-800 font-semibold">AI Therapist</div>
          </div>
          <div className="flex items-center gap-3 mb-3 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={echoUserVoice} onChange={(e) => setEchoUserVoice(e.target.checked)} />
              <span className="text-blue-700">Echo my voice</span>
            </label>
            {isListening && (
              <span className="text-xs text-blue-600">Listening… {interimText && <em className="opacity-70">{interimText}</em>}</span>
            )}
          </div>
          <div className="border rounded-xl flex-1 overflow-y-auto p-3 bg-gradient-to-b from-blue-50 to-white">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
                <div
                  className={
                    "inline-block max-w-[90%] my-2 px-4 py-2 rounded-2xl transition-all " +
                    (m.role === "user"
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-white text-blue-900 border shadow-sm")
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}
            {thinking && (
              <div className="text-left">
                <div className="inline-block bg-white text-blue-900 border px-4 py-2 rounded-2xl animate-pulse">
                  Thinking...
                </div>
              </div>
            )}
          </div>
          <div className="mt-3">
            <ManualInput onSend={handleUserInput} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ManualInput({ onSend }) {
  const [text, setText] = useState("");
  return (
    <div className="flex gap-2 w-full">
      <input
        className="flex-1 border rounded-lg px-3 py-2"
        placeholder="Type your thoughts…"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSend(text);
            setText("");
          }
        }}
      />
      <button
        onClick={() => {
          onSend(text);
          setText("");
        }}
        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
      >
        Send
      </button>
    </div>
  );
}

export default Therapy;


