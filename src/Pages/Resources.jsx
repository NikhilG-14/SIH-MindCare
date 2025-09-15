import { useState } from "react";

function Resources() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Real-world mental health resources
  const resources = [
    {
      id: 1,
      title: "National Suicide Prevention Lifeline",
      description: "Free, confidential support for people in distress, 24/7.",
      category: "crisis",
      link: "https://suicidepreventionlifeline.org",
      phone: "1-800-273-8255",
      icon: "📞",
      featured: true,
    },
    {
      id: 2,
      title: "Crisis Text Line",
      description:
        "Free, 24/7 support for those in crisis. Text from anywhere in the US to text with a trained Crisis Counselor.",
      category: "crisis",
      link: "https://www.crisistextline.org",
      phone: "Text HOME to 741741",
      icon: "💬",
      featured: true,
    },
    {
      id: 3,
      title: "National Alliance on Mental Illness (NAMI)",
      description:
        "The nation's largest grassroots mental health organization dedicated to building better lives for Americans affected by mental illness.",
      category: "education",
      link: "https://www.nami.org",
      icon: "📚",
      featured: false,
    },
    {
      id: 4,
      title: "Anxiety and Depression Association of America",
      description:
        "Provides resources, support, and information about anxiety, depression, and related disorders.",
      category: "education",
      link: "https://adaa.org",
      icon: "😰",
      featured: false,
    },
    {
      id: 5,
      title: "Headspace",
      description:
        "Meditation and sleep app that makes mindfulness simple and accessible.",
      category: "apps",
      link: "https://www.headspace.com",
      icon: "🧘",
      featured: false,
    },
    {
      id: 6,
      title: "Calm",
      description:
        "App for meditation, sleep, and relaxation to help you manage stress and anxiety.",
      category: "apps",
      link: "https://www.calm.com",
      icon: "🌊",
      featured: false,
    },
    {
      id: 7,
      title: "Talkspace",
      description:
        "Online therapy platform that connects users with licensed therapists through text, video, and voice messaging.",
      category: "therapy",
      link: "https://www.talkspace.com",
      icon: "💻",
      featured: false,
    },
    {
      id: 8,
      title: "BetterHelp",
      description:
        "Online counseling platform that provides access to licensed, accredited therapists.",
      category: "therapy",
      link: "https://www.betterhelp.com",
      icon: "🛋️",
      featured: false,
    },
    {
      id: 9,
      title: "Mental Health America",
      description:
        "Community-based nonprofit dedicated to addressing the needs of those living with mental illness.",
      category: "education",
      link: "https://www.mhanational.org",
      icon: "🏥",
      featured: false,
    },
    {
      id: 10,
      title: "7 Cups",
      description:
        "Provides free, anonymous, and confidential online text chat with trained listeners.",
      category: "support",
      link: "https://www.7cups.com",
      icon: "☕",
      featured: false,
    },
    {
      id: 11,
      title: "Mindfulness Exercises",
      description:
        "Free mindfulness resources, including guided meditations and worksheets.",
      category: "self-help",
      link: "https://mindfulnessexercises.com",
      icon: "🌿",
      featured: false,
    },
    {
      id: 12,
      title: "The Trevor Project",
      description:
        "Provides crisis intervention and suicide prevention services to LGBTQ youth.",
      category: "crisis",
      link: "https://www.thetrevorproject.org",
      phone: "1-866-488-7386",
      icon: "🌈",
      featured: true,
    },
  ];

  const categories = [
    { id: "all", name: "All Resources", icon: "📚" },
    { id: "crisis", name: "Crisis Support", icon: "🆘" },
    { id: "education", name: "Education", icon: "🎓" },
    { id: "apps", name: "Apps", icon: "📱" },
    { id: "therapy", name: "Therapy", icon: "🛋️" },
    { id: "support", name: "Support", icon: "🤝" },
    { id: "self-help", name: "Self-Help", icon: "🌱" },
  ];

  // Filter resources based on category and search query
  const filteredResources = resources.filter((resource) => {
    const matchesCategory =
      activeCategory === "all" || resource.category === activeCategory;
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredResources = resources.filter((resource) => resource.featured);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">
            Mental Health Resources
          </h1>
          <p className="text-lg text-blue-600 max-w-2xl mx-auto">
            Curated collection of trusted mental health resources, tools, and
            support services.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-xl p-5 mb-8 animate-fade-in-up">
          <div className="flex flex-col md:flex-row items-center">
            <div className="relative flex-1 mb-4 md:mb-0 md:mr-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search for resources..."
                className="w-full pl-10 pr-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex-shrink-0">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Featured Resources */}
        <div className="mb-10 animate-fade-in">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">
            Featured Crisis Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredResources.map((resource) => (
              <div
                key={resource.id}
                className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-red-500 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start mb-4">
                  <div className="text-3xl mr-4">{resource.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-800">
                      {resource.title}
                    </h3>
                    <p className="text-blue-600 text-sm mt-1">
                      {resource.description}
                    </p>
                  </div>
                </div>
                {resource.phone && (
                  <div className="mt-4 p-3 bg-red-50 rounded-lg">
                    <p className="text-red-700 font-semibold flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      {resource.phone}
                    </p>
                  </div>
                )}
                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-blue-600 font-semibold hover:text-blue-800 transition-colors"
                >
                  Visit Website →
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-8 animate-fade-in">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">
            Browse by Category
          </h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-blue-600 text-white"
                    : "bg-white text-blue-600 hover:bg-blue-100 shadow-md"
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-lg transition-all duration-300 animate-fade-in-up"
            >
              <div className="flex items-start mb-4">
                <div className="text-2xl mr-4">{resource.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-800">
                    {resource.title}
                  </h3>
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full mt-2">
                    {
                      categories.find((cat) => cat.id === resource.category)
                        ?.name
                    }
                  </span>
                </div>
              </div>
              <p className="text-blue-600 text-sm mb-4">
                {resource.description}
              </p>
              <a
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors"
              >
                Learn More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-blue-800 text-white rounded-2xl shadow-xl p-8 mb-12 animate-fade-in">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-4">
              Stay Updated with Mental Health Resources
            </h2>
            <p className="mb-6 text-blue-100">
              Join our newsletter to receive monthly updates on new mental
              health resources, tips, and community events.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-lg text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-white text-blue-800 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-50 transition-colors">
                Subscribe
              </button>
            </div>
            <p className="mt-4 text-sm text-blue-200">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>

        {/* Emergency Help Section */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 animate-fade-in">
          <div className="flex items-start">
            <div className="text-red-500 text-2xl mr-4">⚠️</div>
            <div>
              <h3 className="text-xl font-semibold text-red-800 mb-2">
                Emergency Help
              </h3>
              <p className="text-red-600 mb-4">
                If you or someone you know is in immediate danger or
                experiencing a mental health emergency, please call 911 or go to
                the nearest emergency room.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-red-200">
                  <p className="font-semibold text-red-700">
                    National Suicide Prevention Lifeline
                  </p>
                  <p className="text-red-600">1-800-273-8255</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-red-200">
                  <p className="font-semibold text-red-700">Crisis Text Line</p>
                  <p className="text-red-600">Text HOME to 741741</p>
                </div>
              </div>
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
      `}</style>
    </div>
  );
}

export default Resources;
