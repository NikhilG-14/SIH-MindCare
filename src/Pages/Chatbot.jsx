import { useState, useEffect, useRef } from "react";

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [conversationStarted, setConversationStarted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const messagesEndRef = useRef(null);

  // Enhanced quick questions with categories
  const quickQuestions = {
    all: [
      "I'm feeling anxious",
      "I need coping strategies", 
      "How can I improve my mood?",
      "Talk to a specialist",
      "What is MindCare?"
    ],
    emotional: [
      "I'm feeling anxious",
      "I'm feeling depressed", 
      "I'm overwhelmed",
      "I can't sleep",
      "I feel lonely"
    ],
    coping: [
      "Breathing exercises",
      "Grounding techniques",
      "Mindfulness tips", 
      "Stress management",
      "Relaxation methods"
    ],
    support: [
      "Talk to a specialist",
      "Emergency resources",
      "Self-care tips",
      "Find a therapist",
      "Support groups"
    ]
  };

  // Enhanced mental health resources with better responses
  const mentalHealthResources = {
    crisis: {
      title: "Crisis Support Available",
      content: "🚨 If you're in immediate danger, please call 911.\n\nFor mental health crisis support:\n• National Suicide Prevention Lifeline: 988\n• Crisis Text Line: Text HOME to 741741\n• Veterans Crisis Line: 1-800-273-8255\n\nYou're not alone, and help is available 24/7.",
      urgent: true,
    },
    anxiety: {
      title: "Managing Anxiety",
      content: "Anxiety is very common and manageable. Here are some immediate techniques:\n\n• 4-7-8 Breathing: Inhale 4, hold 7, exhale 8\n• Ground yourself: Name 5 things you see, 4 you touch, 3 you hear\n• Progressive muscle relaxation\n• Mindful breathing\n\nRemember: This feeling will pass, and you're safe right now.",
    },
    depression: {
      title: "Depression Support",
      content: "Depression can feel overwhelming, but you're taking a brave step by reaching out. Some helpful strategies:\n\n• Small daily goals (even getting dressed counts!)\n• Gentle movement or walking\n• Connecting with one person\n• Practicing self-compassion\n• Professional support when ready\n\nYour feelings are valid, and recovery is possible.",
    },
    stress: {
      title: "Stress Management",
      content: "Stress is your body's response to challenges. Let's work on managing it:\n\n• Identify what you can and can't control\n• Break large tasks into smaller steps\n• Take regular breaks\n• Practice deep breathing\n• Prioritize sleep and nutrition\n\nStress is temporary - you have the strength to get through this.",
    },
    sleep: {
      title: "Better Sleep Habits",
      content: "Good sleep is crucial for mental health:\n\n• Keep a consistent sleep schedule\n• Create a relaxing bedtime routine\n• Avoid screens 1 hour before bed\n• Keep your room cool and dark\n• Try gentle stretching or meditation\n• Limit caffeine after 2 PM\n\nQuality sleep helps everything feel more manageable.",
    }
  };

  // Enhanced AI response system
  const generateAIResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    let response = {};

    // Crisis keywords - highest priority
    if (lowerMessage.includes('suicide') || lowerMessage.includes('kill myself') || 
        lowerMessage.includes('end it all') || lowerMessage.includes('want to die')) {
      response = {
        text: mentalHealthResources.crisis.content + "\n\nWould you like me to help you connect with immediate support?",
        urgent: true,
        options: ["Connect me now", "I'm safe for now", "Tell me more about resources"]
      };
    }
    // Anxiety responses
    else if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety') || 
             lowerMessage.includes('panic') || lowerMessage.includes('worried')) {
      response = {
        text: mentalHealthResources.anxiety.content,
        options: ["Try breathing exercise", "Learn grounding technique", "I need more help", "This is helpful"]
      };
    }
    // Depression responses
    else if (lowerMessage.includes('depressed') || lowerMessage.includes('sad') || 
             lowerMessage.includes('hopeless') || lowerMessage.includes('empty')) {
      response = {
        text: mentalHealthResources.depression.content,
        options: ["Self-care ideas", "Talk to someone", "Find professional help", "Just need support"]
      };
    }
    // Stress responses
    else if (lowerMessage.includes('stress') || lowerMessage.includes('overwhelmed') ||
             lowerMessage.includes('too much') || lowerMessage.includes('pressure')) {
      response = {
        text: mentalHealthResources.stress.content,
        options: ["Quick stress relief", "Help prioritizing", "Relaxation techniques", "Talk it through"]
      };
    }
    // Sleep issues
    else if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia') || 
             lowerMessage.includes('tired') || lowerMessage.includes('can\'t sleep')) {
      response = {
        text: mentalHealthResources.sleep.content,
        options: ["Sleep routine help", "Relaxation for sleep", "More sleep tips", "Other concerns"]
      };
    }
    // Technique requests
    else if (lowerMessage.includes('breathing') || lowerMessage.includes('breath')) {
      response = {
        text: "Let's practice the 4-7-8 breathing technique together:\n\n1. Sit comfortably and exhale completely\n2. Inhale through your nose for 4 counts\n3. Hold your breath for 7 counts\n4. Exhale through your mouth for 8 counts\n5. Repeat 4 times\n\nThis activates your body's relaxation response.",
        options: ["That helped", "Try another technique", "Need more support", "Continue talking"]
      };
    }
    else if (lowerMessage.includes('grounding') || lowerMessage.includes('ground')) {
      response = {
        text: "Here's the 5-4-3-2-1 grounding technique to help you feel more present:\n\n• Look around and name 5 things you can SEE\n• Touch and notice 4 things you can FEEL\n• Listen for 3 things you can HEAR\n• Find 2 things you can SMELL\n• Notice 1 thing you can TASTE\n\nTake your time with each step.",
        options: ["That's helpful", "Try breathing instead", "I feel better", "Need more techniques"]
      };
    }
    // Professional help
    else if (lowerMessage.includes('therapist') || lowerMessage.includes('professional') || 
             lowerMessage.includes('counselor') || lowerMessage.includes('therapy')) {
      response = {
        text: "Seeking professional help shows real strength and self-awareness. Here are some options:\n\n• Psychology Today: Find therapists by location and specialty\n• Your insurance website: Covered providers\n• Community mental health centers: Sliding scale fees\n• Employee Assistance Programs: Often free sessions\n• Crisis counseling: Immediate support\n\nTaking that first step is often the hardest part.",
        options: ["Help finding therapists", "Insurance questions", "Not ready yet", "What to expect"]
      };
    }
    // Positive responses
    else if (lowerMessage.includes('better') || lowerMessage.includes('helped') || 
             lowerMessage.includes('thank') || lowerMessage.includes('good')) {
      response = {
        text: "I'm so glad that was helpful! 😊 It takes real courage to reach out and work on your mental health. You should feel proud of taking these positive steps.\n\nIs there anything else you'd like to explore or talk about today?",
        options: ["Practice more techniques", "Talk about something else", "Learn about self-care", "I'm feeling better"]
      };
    }
    // Greetings
    else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || 
             lowerMessage.includes('hey') || lowerMessage.includes('good morning') || 
             lowerMessage.includes('good afternoon')) {
      response = {
        text: "Hello! 👋 Welcome to MindCare. I'm Mindy, your AI mental health companion. I'm here to provide support, coping strategies, and a safe space to talk.\n\nHow are you feeling today? Remember, there's no judgment here - just support.",
        options: ["I'm struggling today", "Just checking in", "Need coping tools", "Tell me about MindCare"]
      };
    }
    // Self-care requests
    else if (lowerMessage.includes('self-care') || lowerMessage.includes('self care') || 
             lowerMessage.includes('take care')) {
      response = {
        text: "Self-care is so important! Here are some gentle ideas:\n\n• Take 5 deep breaths\n• Drink a glass of water\n• Step outside for fresh air\n• Listen to calming music\n• Practice gratitude for one small thing\n• Reach out to a supportive friend\n• Take a warm shower or bath\n\nSelf-care doesn't have to be big - small acts of kindness to yourself matter.",
        options: ["More self-care ideas", "I'll try these", "Need emotional support", "Feeling overwhelmed"]
      };
    }
    // Default empathetic response
    else {
      response = {
        text: "Thank you for sharing with me. I can hear that you're going through something, and I want you to know that your feelings are completely valid. 💙\n\nSometimes it helps just to be heard and understood. Would you like to tell me more about what's on your mind, or would you prefer some coping strategies?",
        options: ["Tell you more", "Need coping strategies", "Want resources", "Just need support"]
      };
    }

    return {
      id: Date.now() + 1,
      text: response.text,
      sender: "bot",
      timestamp: new Date(),
      urgent: response.urgent,
      options: response.options
    };
  };

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize conversation
  useEffect(() => {
    if (!conversationStarted) {
      const welcomeMessage = {
        id: 1,
        text: "Hello! I'm Mindy, your AI mental health companion. 🌟\n\nI'm here to provide support, coping strategies, and a safe space to talk. Everything you share here is confidential and judgment-free.\n\nHow are you feeling today?",
        sender: "bot",
        timestamp: new Date(),
        options: ["I'm doing well", "I'm struggling", "Just want to chat", "Learn about MindCare"]
      };
      setMessages([welcomeMessage]);
      setConversationStarted(true);
    }
  }, [conversationStarted]);

  // Process messages
  const processMessage = (message) => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: message,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(message);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  // Send message
  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      processMessage(inputMessage.trim());
      setInputMessage("");
    }
  };

  // Handle quick questions and options
  const handleQuickSelect = (text) => {
    processMessage(text);
  };

  // Format timestamp
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-600 rounded-full mb-4 shadow-lg">
            <span className="text-2xl text-white">🧠</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            MindCare AI Companion
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your compassionate AI mental health support system. Safe, confidential, and always here for you.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Main Chat Area */}
          <div className="xl:col-span-3">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-teal-500 to-blue-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                      <span className="text-xl">🤖</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Mindy AI</h3>
                      <p className="text-teal-100">Mental Health Support Companion</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${
                      isTyping ? "bg-yellow-300 animate-pulse" : "bg-green-300"
                    }`}></div>
                    <span className="text-sm font-medium">
                      {isTyping ? "Thinking..." : "Ready to help"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div className="h-[500px] overflow-y-auto p-6 bg-gradient-to-b from-gray-50 to-white">
                <div className="space-y-6">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div className={`max-w-md lg:max-w-2xl ${
                        message.sender === "user" ? "order-2" : "order-1"
                      }`}>
                        {/* Avatar */}
                        <div className={`flex items-center mb-2 ${
                          message.sender === "user" ? "justify-end" : "justify-start"
                        }`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                            message.sender === "user" 
                              ? "bg-blue-500 text-white ml-2" 
                              : "bg-teal-500 text-white mr-2"
                          }`}>
                            {message.sender === "user" ? "👤" : "🤖"}
                          </div>
                          <span className="text-xs text-gray-500 font-medium">
                            {message.sender === "user" ? "You" : "Mindy AI"}
                          </span>
                          <span className="text-xs text-gray-400 ml-2">
                            {formatTime(message.timestamp)}
                          </span>
                        </div>
                        
                        {/* Message Bubble */}
                        <div className={`rounded-2xl p-4 shadow-sm ${
                          message.sender === "user"
                            ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white ml-4"
                            : message.urgent
                            ? "bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 text-red-800 mr-4"
                            : "bg-gradient-to-br from-gray-50 to-white border border-gray-200 text-gray-800 mr-4"
                        }`}>
                          <div className="text-sm leading-relaxed whitespace-pre-line">
                            {message.text}
                          </div>

                          {/* Response Options */}
                          {message.options && (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {message.options.map((option, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleQuickSelect(option)}
                                  className={`text-xs px-3 py-2 rounded-full transition-all hover:scale-105 font-medium ${
                                    message.urgent
                                      ? "bg-red-200 hover:bg-red-300 text-red-800 border border-red-300"
                                      : "bg-teal-100 hover:bg-teal-200 text-teal-700 border border-teal-200"
                                  }`}
                                >
                                  {option}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="max-w-md">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-sm text-white mr-2">
                            🤖
                          </div>
                          <span className="text-xs text-gray-500 font-medium">Mindy AI</span>
                        </div>
                        <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-4 mr-4">
                          <div className="flex items-center gap-2">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                              <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                            </div>
                            <span className="text-xs text-gray-500">Thinking carefully...</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-6 bg-white border-t border-gray-100">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Share what's on your mind..."
                    className="flex-1 border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    disabled={isTyping}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={isTyping || !inputMessage.trim()}
                    className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white px-8 py-3 rounded-2xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            {/* Quick Access */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-5 h-5 bg-teal-500 rounded mr-2"></span>
                Quick Support
              </h3>
              
              {/* Category Tabs */}
              <div className="flex flex-wrap gap-1 mb-4">
                {Object.keys(quickQuestions).map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
                      selectedCategory === category
                        ? "bg-teal-100 text-teal-700 border border-teal-200"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
              
              {/* Questions */}
              <div className="space-y-2">
                {quickQuestions[selectedCategory].map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickSelect(question)}
                    className="w-full text-left text-sm p-3 rounded-xl bg-gray-50 hover:bg-teal-50 hover:border-teal-200 border border-gray-200 transition-all text-gray-700 hover:text-teal-700"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Crisis Resources */}
            <div className="bg-gradient-to-br from-red-50 to-rose-100 rounded-2xl shadow-lg border-2 border-red-200 p-5">
              <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center">
                🚨 Crisis Support
              </h3>
              <div className="space-y-3">
                <div className="bg-white/80 rounded-lg p-3 border border-red-200">
                  <p className="text-sm font-semibold text-red-800">Emergency: 911</p>
                </div>
                <div className="bg-white/80 rounded-lg p-3 border border-red-200">
                  <p className="text-sm font-semibold text-red-800">Crisis Lifeline: 988</p>
                </div>
                <div className="bg-white/80 rounded-lg p-3 border border-red-200">
                  <p className="text-sm font-semibold text-red-800">Text: HOME to 741741</p>
                </div>
                <button
                  onClick={() => handleQuickSelect("I need crisis support right now")}
                  className="w-full bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-3 rounded-xl transition-colors shadow-md"
                >
                  Get Immediate Help
                </button>
              </div>
            </div>

            {/* Wellness Tips */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl shadow-lg border border-green-200 p-5">
              <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                🌱 Daily Wellness
              </h3>
              <div className="space-y-2 text-sm text-green-700">
                <div className="flex items-center p-2 bg-white/60 rounded-lg">
                  <span className="mr-2">💨</span>
                  <span>Take 5 deep breaths</span>
                </div>
                <div className="flex items-center p-2 bg-white/60 rounded-lg">
                  <span className="mr-2">💧</span>
                  <span>Drink water mindfully</span>
                </div>
                <div className="flex items-center p-2 bg-white/60 rounded-lg">
                  <span className="mr-2">🌞</span>
                  <span>Step outside briefly</span>
                </div>
                <div className="flex items-center p-2 bg-white/60 rounded-lg">
                  <span className="mr-2">🙏</span>
                  <span>Practice gratitude</span>
                </div>
                <div className="flex items-center p-2 bg-white/60 rounded-lg">
                  <span className="mr-2">💝</span>
                  <span>Connect with someone</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Disclaimer */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center">
          <div className="flex items-center justify-center mb-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-sm">ℹ</span>
            </div>
            <h4 className="text-lg font-semibold text-blue-800">Important Information</h4>
          </div>
          <p className="text-sm text-blue-700 leading-relaxed max-w-4xl mx-auto">
            <strong>MindCare AI</strong> provides supportive conversations and mental health information, but is not a substitute for professional mental health care, diagnosis, or treatment. In crisis situations, please contact emergency services (911) or crisis hotlines immediately. Always consult with qualified mental health professionals for personalized care.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;