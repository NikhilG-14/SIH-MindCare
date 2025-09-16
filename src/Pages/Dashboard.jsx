import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [moodScore, setMoodScore] = useState(7);
  const [moodEntries, setMoodEntries] = useState([]);
  const [dailyQuote, setDailyQuote] = useState({});
  const [userData, setUserData] = useState(null);

  // Sample data - in a real app, this would come from an API
  const appointments = [
    {
      id: 1,
      date: "2025-01-15",
      time: "2:00 PM",
      therapist: "Dr. Sarah Johnson",
      type: "Video Call",
      status: "upcoming",
    },
    {
      id: 2,
      date: "2025-01-22",
      time: "3:30 PM",
      therapist: "Dr. Michael Chen",
      type: "Video Call",
      status: "upcoming",
    },
    {
      id: 3,
      date: "2025-01-08",
      time: "10:00 AM",
      therapist: "Dr. Sarah Johnson",
      type: "Video Call",
      status: "completed",
    },
  ];

  const resources = [
    {
      id: 1,
      title: "Managing Anxiety Guide",
      type: "Article",
      duration: "10 min read",
      progress: 100,
    },
    {
      id: 2,
      title: "Mindfulness Meditation",
      type: "Audio",
      duration: "15 min",
      progress: 60,
    },
    {
      id: 3,
      title: "Breathing Techniques",
      type: "Video",
      duration: "8 min",
      progress: 30,
    },
  ];

  const goals = [
    {
      id: 1,
      title: "Daily Meditation",
      target: "7 days",
      current: "5 days",
      progress: 71,
    },
    {
      id: 2,
      title: "Mood Journaling",
      target: "7 entries",
      current: "3 entries",
      progress: 43,
    },
    {
      id: 3,
      title: "Sleep 7+ hours",
      target: "7 days",
      current: "4 days",
      progress: 57,
    },
  ];

  const quotes = [
    {
      text: "You don't have to control your thoughts. You just have to stop letting them control you.",
      author: "Dan Millman",
    },
    {
      text: "Mental health is not a destination, but a process. It's about how you drive, not where you're going.",
      author: "Noam Shpancer",
    },
    {
      text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
      author: "Nelson Mandela",
    },
    {
      text: "What mental health needs is more sunlight, more candor, and more unashamed conversation.",
      author: "Glenn Close",
    },
  ];

  // Simulate loading data
  useEffect(() => {
    // Fetch user data from localStorage or API
    const user = {
      name: "Alex Johnson",
      joinDate: "January 2024",
      nextSession: {
        date: "2025-01-15",
        time: "2:00 PM",
        therapist: "Dr. Sarah Johnson",
        type: "Video Call",
      },
      stats: {
        sessionsCompleted: 12,
        goalsAchieved: 8,
        streak: 5,
      },
    };

    setUserData(user);

    // Generate mock mood entries for the past week
    const mockMoodEntries = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);

      mockMoodEntries.push({
        date: date.toISOString().split("T")[0],
        score: Math.floor(Math.random() * 5) + 6, // Random score between 6-10
        note: i === 0 ? "Feeling optimistic about therapy progress" : "",
      });
    }

    setMoodEntries(mockMoodEntries);

    // Set a random daily quote
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setDailyQuote(randomQuote);
  }, []);

  const handleMoodSubmit = (e) => {
    e.preventDefault();
    const today = new Date().toISOString().split("T")[0];

    // Check if we already have an entry for today
    const existingEntryIndex = moodEntries.findIndex(
      (entry) => entry.date === today
    );

    if (existingEntryIndex >= 0) {
      // Update existing entry
      const updatedEntries = [...moodEntries];
      updatedEntries[existingEntryIndex] = {
        ...updatedEntries[existingEntryIndex],
        score: moodScore,
        note: e.target.note.value,
      };
      setMoodEntries(updatedEntries);
    } else {
      // Add new entry
      setMoodEntries([
        ...moodEntries,
        {
          date: today,
          score: moodScore,
          note: e.target.note.value,
        },
      ]);
    }

    e.target.reset();
    alert("Mood recorded successfully!");
  };

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-blue-700">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold text-blue-800 mb-2">
              Welcome back, {userData.name}!
            </h1>
            <p className="text-blue-600">
              Here's your mental wellness overview
            </p>
          </div>
          <div className="mt-4 md:mt-0 bg-white rounded-xl shadow-md p-3">
            <p className="text-sm text-blue-600">
              Member since {userData.joinDate}
            </p>
          </div>
        </div>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link
            to="/book"
            className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-blue-800">Book Session</h3>
                <p className="text-sm text-blue-600">
                  Schedule with a therapist
                </p>
              </div>
            </div>
          </Link>

          <Link
            to="/resources"
            className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-blue-800">Resources</h3>
                <p className="text-sm text-blue-600">Helpful materials</p>
              </div>
            </div>
          </Link>

          <Link
            to="/peersupport"
            className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-blue-800">Community</h3>
                <p className="text-sm text-blue-600">Peer support</p>
              </div>
            </div>
          </Link>

          <div
            className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center text-yellow-600 mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-blue-800">Progress</h3>
                <p className="text-sm text-blue-600">View your journey</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-2xl shadow-xl p-6 animate-fade-in-up">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-800">
                      {userData.stats.sessionsCompleted}
                    </p>
                    <p className="text-blue-600 text-sm">Sessions Completed</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-6 animate-fade-in-up">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-800">
                      {userData.stats.goalsAchieved}
                    </p>
                    <p className="text-blue-600 text-sm">Goals Achieved</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-6 animate-fade-in-up">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center text-yellow-600 mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-800">
                      {userData.stats.streak}
                    </p>
                    <p className="text-blue-600 text-sm">Day Streak</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Session Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 animate-fade-in-up">
              <h2 className="text-xl font-semibold text-blue-800 mb-4">
                Your Next Session
              </h2>
              <div className="bg-blue-50 rounded-xl p-5 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-800">
                      {userData.nextSession.therapist}
                    </h3>
                    <p className="text-blue-600">
                      {new Date(userData.nextSession.date).toLocaleDateString(
                        "en-US",
                        { weekday: "long", month: "long", day: "numeric" }
                      )}{" "}
                      at {userData.nextSession.time}
                    </p>
                    <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                      {userData.nextSession.type}
                    </span>
                  </div>
                  <div className="text-4xl">👩‍⚕️</div>
                </div>
              </div>
              <div className="flex space-x-3">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-300 text-center">
                  Join Session
                </button>
                <Link
                  to="/book"
                  className="flex-1 bg-white hover:bg-blue-50 text-blue-600 font-semibold py-3 px-4 rounded-lg shadow-md border border-blue-200 transition duration-300 text-center flex items-center justify-center"
                >
                  Reschedule
                </Link>
              </div>
            </div>

            {/* Mood Tracker */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 animate-fade-in-up">
              <h2 className="text-xl font-semibold text-blue-800 mb-4">
                Mood Tracker
              </h2>

              <div className="mb-6 bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-blue-600">
                    How are you feeling today?
                  </span>
                  <span className="text-sm font-semibold text-blue-800">
                    {moodScore}/10
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={moodScore}
                  onChange={(e) => setMoodScore(parseInt(e.target.value))}
                  className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-blue-500 mt-1">
                  <span>😔 Poor</span>
                  <span>😐 Okay</span>
                  <span>😊 Great</span>
                </div>

                <form onSubmit={handleMoodSubmit} className="mt-4">
                  <textarea
                    placeholder="Add a note about your mood (optional)"
                    name="note"
                    className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="2"
                  />
                  <button
                    type="submit"
                    className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
                  >
                    Record Mood
                  </button>
                </form>
              </div>

              <h3 className="text-lg font-medium text-blue-800 mb-3">
                Recent Mood History
              </h3>
              <div className="grid grid-cols-7 gap-2">
                {moodEntries.map((entry, index) => (
                  <div key={index} className="text-center">
                    <div
                      className={`h-10 rounded-t-lg flex items-center justify-center text-white text-xs font-bold ${
                        entry.score >= 8
                          ? "bg-green-500"
                          : entry.score >= 5
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                      style={{ height: `${entry.score * 8}px` }}
                    >
                      {entry.score}
                    </div>
                    <div className="text-xs text-blue-600 mt-1">
                      {new Date(entry.date).toLocaleDateString("en-US", {
                        weekday: "short",
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1">
            {/* Daily Quote */}
            <div className="bg-blue-800 text-white rounded-2xl shadow-xl p-6 mb-8 animate-fade-in-up">
              <h2 className="text-xl font-semibold mb-4">Daily Inspiration</h2>
              <div className="text-blue-100 italic text-lg mb-4">
                "{dailyQuote.text}"
              </div>
              <div className="text-blue-200 text-right">
                - {dailyQuote.author}
              </div>
            </div>

            {/* Upcoming Appointments */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 animate-fade-in-up">
              <h2 className="text-xl font-semibold text-blue-800 mb-4">
                Upcoming Appointments
              </h2>
              <div className="space-y-4">
                {appointments
                  .filter((a) => a.status === "upcoming")
                  .slice(0, 2)
                  .map((appointment) => (
                    <div
                      key={appointment.id}
                      className="border border-blue-100 rounded-xl p-4"
                    >
                      <h3 className="font-medium text-blue-800">
                        {appointment.therapist}
                      </h3>
                      <p className="text-sm text-blue-600">
                        {new Date(appointment.date).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric" }
                        )}{" "}
                        at {appointment.time}
                      </p>
                      <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        {appointment.type}
                      </span>
                    </div>
                  ))}
              </div>
              <Link
                to="/book"
                className="w-full mt-4 text-center text-blue-600 font-medium hover:text-blue-800 transition-colors block"
              >
                View All Appointments →
              </Link>
            </div>

            {/* Goals Progress */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 animate-fade-in-up">
              <h2 className="text-xl font-semibold text-blue-800 mb-4">
                Your Goals
              </h2>
              <div className="space-y-4">
                {goals.map((goal) => (
                  <div key={goal.id}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-blue-800">
                        {goal.title}
                      </span>
                      <span className="text-xs text-blue-600">
                        {goal.current}/{goal.target}
                      </span>
                    </div>
                    <div className="w-full bg-blue-100 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-center text-blue-600 font-medium hover:text-blue-800 transition-colors">
                Set New Goals →
              </button>
            </div>

            {/* Recommended Resources */}
            <div className="bg-white rounded-2xl shadow-xl p-6 animate-fade-in-up">
              <h2 className="text-xl font-semibold text-blue-800 mb-4">
                Recommended for You
              </h2>
              <div className="space-y-4">
                {resources.map((resource) => (
                  <Link
                    to="/resources"
                    key={resource.id}
                    className="flex items-start border border-blue-100 rounded-xl p-3 hover:bg-blue-50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mr-3">
                      {resource.type === "Article"
                        ? "📄"
                        : resource.type === "Audio"
                        ? "🎧"
                        : "📺"}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-blue-800">
                        {resource.title}
                      </h3>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-blue-500">
                          {resource.type} • {resource.duration}
                        </span>
                        {resource.progress > 0 && (
                          <div className="w-16 bg-blue-100 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${resource.progress}%` }}
                            ></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                to="/resources"
                className="w-full mt-4 text-center text-blue-600 font-medium hover:text-blue-800 transition-colors block"
              >
                Browse More Resources →
              </Link>
            </div>
          </div>
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

        /* Custom styling for range input */
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
        }

        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
}

export default Dashboard;
