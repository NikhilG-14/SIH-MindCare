import { useEffect, useRef, useState } from "react";

// Mock functions for demonstration
const loadSettings = () => ({ apiKey: "demo", model: "gpt-3.5", voice: "female" });
const chatWithOpenRouter = async ({ messages }) => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  return "I understand what you're sharing. That sounds like a challenging experience. How are you feeling about it right now?";
};
const summarizeConversation = (messages) => ({ mood: "reflective", topics: ["stress", "work"] });
const appendSession = (session) => console.log("Session saved:", session);

function Therapy() {
  const [settings, setSettings] = useState(loadSettings());
  const [isListening, setIsListening] = useState(false);
  const [interimText, setInterimText] = useState("");
  const [echoUserVoice, setEchoUserVoice] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello, I'm your AI therapist. When you're ready, press the microphone and share what's on your mind.",
    },
  ]);
  const recognitionRef = useRef(null);
  const [recognitionAvailable, setRecognitionAvailable] = useState(false);
  const [thinking, setThinking] = useState(false);

  useEffect(() => {
    setSettings(loadSettings());
  }, []);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
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
      const fallback = "I'm here with you. I couldn't reach the AI service. Would you like to continue talking?";
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
    alert("Session ended and saved!");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 p-4 md:p-6 relative overflow-hidden">
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-200/30 rounded-full blur-2xl animate-float" />
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-indigo-200/20 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-3/4 w-24 h-24 bg-blue-300/40 rounded-full blur-xl animate-float-slow" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            AI Therapy Session
          </h1>
          <p className="text-blue-600/80 text-lg">A safe space for your thoughts and feelings</p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 relative z-10">
          
          {/* Doctor Video Section */}
          <div className="xl:col-span-3 relative">
            <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-500" />
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-300/20 to-indigo-300/20 rounded-full blur-2xl" />
              
              {/* Session info bar */}
              <div className="flex justify-between items-center mb-8 p-4 bg-blue-50/50 rounded-2xl border border-blue-200/30">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full animate-pulse shadow-lg" />
                  <span className="text-blue-700 font-semibold">Live Session</span>
                </div>
                <div className="text-blue-600/70 font-mono text-sm">
                  {new Date().toLocaleTimeString()}
                </div>
              </div>

              {/* Avatar container */}
              <div className="flex justify-center items-center h-[400px] md:h-[500px] relative">
                {/* Background glow */}
                <div className="absolute inset-0 flex justify-center items-center">
                  <div className="w-80 h-80 bg-gradient-to-r from-blue-200/40 via-indigo-200/30 to-blue-300/40 rounded-full blur-3xl animate-pulse" />
                </div>
                
                {/* Main avatar */}
                <div className="relative z-10">
                  {/* Outer ring */}
                  <div className="w-56 h-56 md:w-72 md:h-72 rounded-full bg-gradient-to-tr from-blue-300 via-indigo-300 to-blue-400 p-2 shadow-2xl animate-float">
                    {/* Inner container */}
                    <div className="w-full h-full bg-gradient-to-br from-white to-blue-50 rounded-full flex items-center justify-center relative border-4 border-white/50">
                      {/* Avatar */}
                      <div className="text-8xl md:text-9xl drop-shadow-2xl transform hover:scale-105 transition-transform duration-500">
                        🧑‍⚕️
                      </div>
                      
                      {/* Floating indicators */}
                      <div className="absolute -top-3 -right-3 w-6 h-6 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Orbiting elements */}
                  <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-1/4 -left-4 w-3 h-3 bg-blue-400 rounded-full animate-ping" />
                    <div className="absolute bottom-1/4 -right-4 w-2 h-2 bg-indigo-400 rounded-full animate-ping animation-delay-1000" />
                    <div className="absolute top-3/4 left-1/4 w-2.5 h-2.5 bg-blue-500 rounded-full animate-ping animation-delay-2000" />
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-center items-center gap-6 mt-8">
                <button
                  onClick={toggleListen}
                  disabled={!recognitionAvailable}
                  className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                    isListening 
                      ? "bg-gradient-to-r from-red-400 to-pink-500 shadow-2xl shadow-red-400/50 animate-pulse" 
                      : "bg-gradient-to-r from-blue-500 to-indigo-600 shadow-2xl shadow-blue-400/50 hover:shadow-blue-500/60"
                  } ${!recognitionAvailable ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative text-3xl text-white drop-shadow-lg">🎤</span>
                  
                  {isListening && (
                    <>
                      <div className="absolute -inset-2 bg-red-400/30 rounded-2xl animate-ping" />
                      <div className="absolute -inset-4 bg-red-400/20 rounded-2xl animate-ping animation-delay-500" />
                    </>
                  )}
                </button>
                
                <button
                  onClick={endSession}
                  className="group relative overflow-hidden bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 rounded-2xl px-8 py-4 text-white font-bold shadow-2xl shadow-emerald-400/40 hover:shadow-emerald-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex items-center gap-3">
                    <span className="text-lg">End Session</span>
                    <span className="text-2xl">✨</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Chat Panel */}
          <div className="xl:col-span-2">
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 h-full flex flex-col relative overflow-hidden">
              {/* Decorative top border */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-500" />
              
              {/* Chat Header */}
              <div className="p-6 border-b border-blue-200/30 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-2xl">🧑‍⚕️</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-800">Dr. AI Assistant</h3>
                    <p className="text-blue-600/70 text-sm">Professional Counselor</p>
                  </div>
                </div>
              </div>

              {/* Settings Panel */}
              <div className="p-4 bg-blue-50/30 border-b border-blue-200/20">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        checked={echoUserVoice} 
                        onChange={(e) => setEchoUserVoice(e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`w-12 h-6 rounded-full transition-all duration-300 ${echoUserVoice ? 'bg-gradient-to-r from-blue-500 to-indigo-600' : 'bg-blue-200'}`}>
                        <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 transform ${echoUserVoice ? 'translate-x-6' : 'translate-x-0.5'} mt-0.5`} />
                      </div>
                    </div>
                    <span className="text-blue-700 font-medium">Echo voice</span>
                  </label>
                  
                  {isListening && (
                    <div className="flex items-center gap-2 text-sm text-blue-600">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce animation-delay-200" />
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce animation-delay-400" />
                      </div>
                      <span>Listening...</span>
                    </div>
                  )}
                </div>
                {isListening && interimText && (
                  <div className="mt-2 text-sm text-blue-500 italic">"{interimText}"</div>
                )}
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gradient-to-b from-transparent to-blue-50/20">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] px-5 py-3 rounded-3xl shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl ${
                      m.role === "user"
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-blue-400/30"
                        : "bg-white/80 text-blue-800 border border-blue-200/50 shadow-blue-200/20"
                    }`}>
                      <p className="text-sm leading-relaxed">{m.content}</p>
                    </div>
                  </div>
                ))}
                
                {thinking && (
                  <div className="flex justify-start">
                    <div className="bg-white/80 border border-blue-200/50 text-blue-700 px-5 py-3 rounded-3xl shadow-lg backdrop-blur-sm">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce animation-delay-200" />
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce animation-delay-400" />
                        </div>
                        <span className="text-sm">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-blue-200/30 bg-gradient-to-r from-blue-50/30 to-indigo-50/30">
                <ManualInput onSend={handleUserInput} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-180deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(90deg); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-500 { animation-delay: 0.5s; }
        .animation-delay-1000 { animation-delay: 1s; }
        .animation-delay-2000 { animation-delay: 2s; }
      `}</style>
    </div>
  );
}

function ManualInput({ onSend }) {
  const [text, setText] = useState("");
  
  return (
    <div className="flex gap-3">
      <div className="flex-1 relative group">
        <input
          className="w-full bg-white/60 border-2 border-blue-200/50 rounded-2xl px-4 py-3 text-blue-800 placeholder-blue-400/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 transition-all duration-300 shadow-inner"
          placeholder="Share your thoughts here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSend(text);
              setText("");
            }
          }}
        />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/5 to-indigo-400/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
      
      <button
        onClick={() => {
          onSend(text);
          setText("");
        }}
        disabled={!text.trim()}
        className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-blue-300 disabled:to-indigo-400 text-white font-semibold shadow-lg shadow-blue-400/30 hover:shadow-blue-500/40 disabled:shadow-blue-300/20 transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:scale-100"
      >
        <div className="flex items-center gap-2">
          <span>Send</span>
          <span className="text-lg">💬</span>
        </div>
      </button>
    </div>
  );
}

export default Therapy;