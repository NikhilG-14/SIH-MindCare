import { useState, useEffect, useRef } from "react";

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [conversationStarted, setConversationStarted] = useState(false);
  const messagesEndRef = useRef(null);

  // Predefined quick questions
  const quickQuestions = [
    "I'm feeling anxious",
    "How can I improve my mood?",
    "I need coping strategies",
    "Talk to a human specialist",
    "What is MindCare?",
  ];

  // Mental health resources
  const mentalHealthResources = {
    crisis: {
      title: "Crisis Support",
      content:
        "If you're in crisis, please contact: National Suicide Prevention Lifeline: 1-800-273-8255 or Crisis Text Line: Text HOME to 741741",
      urgent: true,
    },
    breathing: {
      title: "Breathing Exercise",
      content:
        "Try the 4-7-8 technique: Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds. Repeat 4 times. This can help reduce anxiety quickly.",
    },
    grounding: {
      title: "Grounding Technique",
      content:
        "Name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste. This helps during anxiety or panic attacks.",
    },
    therapist: {
      title: "Professional Help",
      content:
        "Would you like me to help you book a session with one of our licensed therapists? I can show you available specialists.",
    },
  };

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize with welcome message
  useEffect(() => {
    if (!conversationStarted) {
      setMessages([
        {
          id: 1,
          text: "Hello! I'm Mindy, your mental health support assistant. How are you feeling today?",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
      setConversationStarted(true);
    }
  }, [conversationStarted]);

  // Simulate typing delay
  const simulateTyping = (callback, delay = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      callback();
      setIsTyping(false);
    }, delay);
  };

  // Process user message and generate bot response
  const processMessage = (message) => {
    const userMessage = {
      id: Date.now(),
      text: message,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Generate bot response based on user message
    simulateTyping(() => {
      let botResponse = {};
      const lowerMessage = message.toLowerCase();

      if (
        lowerMessage.includes("anxious") ||
        lowerMessage.includes("anxiety") ||
        lowerMessage.includes("nervous")
      ) {
        botResponse = {
          id: Date.now() + 1,
          text: "I understand you're feeling anxious. Would you like to try a breathing exercise or grounding technique to help?",
          sender: "bot",
          timestamp: new Date(),
          options: [
            "Breathing exercise",
            "Grounding technique",
            "Other strategies",
          ],
        };
      } else if (
        lowerMessage.includes("sad") ||
        lowerMessage.includes("depress") ||
        lowerMessage.includes("down")
      ) {
        botResponse = {
          id: Date.now() + 1,
          text: "I'm sorry you're feeling this way. It might help to talk about what's on your mind, or I can suggest some mood-boosting activities.",
          sender: "bot",
          timestamp: new Date(),
          options: ["Talk about it", "Mood activities", "Professional help"],
        };
      } else if (
        lowerMessage.includes("stress") ||
        lowerMessage.includes("overwhelm") ||
        lowerMessage.includes("stressed")
      ) {
        botResponse = {
          id: Date.now() + 1,
          text: "Stress can be challenging to manage. I can guide you through some quick stress-relief techniques or help you identify stressors.",
          sender: "bot",
          timestamp: new Date(),
          options: [
            "Stress techniques",
            "Identify stressors",
            "Mindfulness exercise",
          ],
        };
      } else if (
        lowerMessage.includes("help") ||
        lowerMessage.includes("crisis") ||
        lowerMessage.includes("emergency")
      ) {
        botResponse = {
          id: Date.now() + 1,
          text: mentalHealthResources.crisis.content,
          sender: "bot",
          timestamp: new Date(),
          urgent: true,
          options: [
            "I need immediate help",
            "I'm okay now",
            "Show coping techniques",
          ],
        };
      } else if (
        lowerMessage.includes("breath") ||
        lowerMessage.includes("calm down")
      ) {
        botResponse = {
          id: Date.now() + 1,
          text: mentalHealthResources.breathing.content,
          sender: "bot",
          timestamp: new Date(),
          options: [
            "Try another technique",
            "I need more help",
            "Talk to specialist",
          ],
        };
      } else if (
        lowerMessage.includes("ground") ||
        lowerMessage.includes("panic")
      ) {
        botResponse = {
          id: Date.now() + 1,
          text: mentalHealthResources.grounding.content,
          sender: "bot",
          timestamp: new Date(),
          options: [
            "Breathing exercise",
            "Other techniques",
            "Professional help",
          ],
        };
      } else if (
        lowerMessage.includes("therapist") ||
        lowerMessage.includes("specialist") ||
        lowerMessage.includes("professional")
      ) {
        botResponse = {
          id: Date.now() + 1,
          text: mentalHealthResources.therapist.content,
          sender: "bot",
          timestamp: new Date(),
          options: ["Book a session", "Not right now", "More information"],
        };
      } else if (
        lowerMessage.includes("hello") ||
        lowerMessage.includes("hi") ||
        lowerMessage.includes("hey")
      ) {
        botResponse = {
          id: Date.now() + 1,
          text: "Hello there! How can I support your mental wellness today?",
          sender: "bot",
          timestamp: new Date(),
        };
      } else if (
        lowerMessage.includes("thank") ||
        lowerMessage.includes("thanks")
      ) {
        botResponse = {
          id: Date.now() + 1,
          text: "You're welcome! I'm here whenever you need support. Is there anything else you'd like to talk about?",
          sender: "bot",
          timestamp: new Date(),
        };
      } else {
        botResponse = {
          id: Date.now() + 1,
          text: "I'm here to listen and support you. Could you tell me a bit more about how you're feeling or what's on your mind?",
          sender: "bot",
          timestamp: new Date(),
          options: [
            "I'm feeling anxious",
            "I'm feeling down",
            "I need resources",
            "Just wanted to talk",
          ],
        };
      }

      setMessages((prev) => [...prev, botResponse]);
    });
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    processMessage(inputMessage);
    setInputMessage("");
  };

  const handleQuickQuestion = (question) => {
    processMessage(question);
  };

  const handleOptionSelect = (option) => {
    processMessage(option);
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">
            MindCare Chat Support
          </h1>
          <p className="text-lg text-blue-600">
            Your compassionate AI mental health assistant is here to listen and
            help
          </p>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in-up">
          {/* Chat Header */}
          <div className="bg-blue-600 text-white p-4 flex items-center">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
              M
            </div>
            <div>
              <h3 className="font-semibold">Mindy</h3>
              <p className="text-sm text-blue-100">
                Mental Health Support Assistant
              </p>
            </div>
            <div className="ml-auto flex items-center">
              <span
                className={`w-3 h-3 rounded-full mr-2 ${
                  isTyping ? "bg-green-400 animate-pulse" : "bg-green-500"
                }`}
              ></span>
              <span className="text-sm">
                {isTyping ? "Typing..." : "Online"}
              </span>
            </div>
          </div>

          {/* Messages Container */}
          <div className="h-96 overflow-y-auto p-4 bg-blue-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex mb-4 ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-blue-500 text-white"
                      : message.urgent
                      ? "bg-red-100 border border-red-200"
                      : "bg-white border border-blue-200"
                  }`}
                >
                  <div className="flex items-center mb-1">
                    <span className="font-semibold text-sm">
                      {message.sender === "user" ? "You" : "Mindy"}
                    </span>
                    <span className="text-xs opacity-75 ml-2">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm">{message.text}</p>

                  {/* Response Options */}
                  {message.options && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {message.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleOptionSelect(option)}
                          className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 py-1 px-2 rounded-full transition-colors"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="bg-white border border-blue-200 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          <div className="p-4 bg-white border-t border-blue-200">
            <p className="text-sm text-blue-600 mb-2">Quick questions:</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 px-3 rounded-full transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-blue-200">
            <div className="flex">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your message here..."
                className="flex-1 border border-blue-200 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={isTyping || inputMessage.trim() === ""}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Resources Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-6 animate-fade-in-up">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">
            Mental Health Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <h3 className="font-semibold text-red-800 mb-2">
                Crisis Support
              </h3>
              <p className="text-red-600 text-sm">
                National Suicide Prevention Lifeline:{" "}
                <span className="font-semibold">1-800-273-8255</span>
              </p>
              <p className="text-red-600 text-sm">
                Crisis Text Line:{" "}
                <span className="font-semibold">Text HOME to 741741</span>
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h3 className="font-semibold text-blue-800 mb-2">
                Therapy Options
              </h3>
              <p className="text-blue-600 text-sm">
                Connect with licensed therapists through our platform for
                professional support.
              </p>
              <button className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-semibold">
                Browse therapists →
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 p-4 bg-blue-100 rounded-lg text-center">
          <p className="text-sm text-blue-700">
            <strong>Important:</strong> Mindy is an AI assistant and not a
            substitute for professional mental health care. If you're in crisis,
            please contact the emergency resources listed above.
          </p>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default ChatBot;
