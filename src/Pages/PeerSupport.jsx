import { useState, useEffect } from "react";

function PeerSupport() {
  const [activeTab, setActiveTab] = useState("community");
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [message, setMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "general",
  });

  // Simulate loading data
  useEffect(() => {
    // Simulate fetching posts from an API
    const mockPosts = [
      {
        id: 1,
        title: "Coping with anxiety during exams",
        author: "Alex J.",
        content:
          "I've been struggling with intense anxiety during my final exams. Does anyone have strategies that have worked for them? I've tried deep breathing but looking for more techniques.",
        category: "anxiety",
        timestamp: "2 hours ago",
        likes: 24,
        comments: 8,
        userAvatar: "👨‍🎓",
        isLiked: false,
      },
      {
        id: 2,
        title: "Dealing with loss and grief",
        author: "Maria L.",
        content:
          "Lost my father last month and finding it hard to cope. Would appreciate connecting with others who have been through similar experiences.",
        category: "grief",
        timestamp: "5 hours ago",
        likes: 42,
        comments: 12,
        userAvatar: "👩",
        isLiked: true,
      },
      {
        id: 3,
        title: "Meditation techniques that actually work",
        author: "David K.",
        content:
          "I've been practicing meditation for 3 months now and found some techniques that really help with my daily stress. Happy to share what I've learned!",
        category: "mindfulness",
        timestamp: "1 day ago",
        likes: 37,
        comments: 15,
        userAvatar: "👨",
        isLiked: false,
      },
      {
        id: 4,
        title: "Sleep issues and depression",
        author: "Sarah T.",
        content:
          "My depression seems to be worse when I don't sleep well, but the depression makes it hard to sleep. It's a vicious cycle. Any advice?",
        category: "depression",
        timestamp: "1 day ago",
        likes: 29,
        comments: 11,
        userAvatar: "👩‍💼",
        isLiked: false,
      },
    ];

    setPosts(mockPosts);

    // Simulate online users count
    setOnlineUsers(124);

    // Simulate updating online users count periodically
    const interval = setInterval(() => {
      setOnlineUsers((prev) =>
        Math.max(100, prev + Math.floor(Math.random() * 5) - 2)
      );
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleLike = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked,
          };
        }
        return post;
      })
    );
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    // In a real app, this would be sent to a backend
    alert(`Comment submitted: ${message}`);
    setMessage("");
  };

  const handleNewPostSubmit = (e) => {
    e.preventDefault();
    if (newPost.title.trim() === "" || newPost.content.trim() === "") return;

    // In a real app, this would be sent to a backend
    const post = {
      id: posts.length + 1,
      title: newPost.title,
      author: "You",
      content: newPost.content,
      category: newPost.category,
      timestamp: "Just now",
      likes: 0,
      comments: 0,
      userAvatar: "😊",
      isLiked: false,
    };

    setPosts([post, ...posts]);
    setNewPost({ title: "", content: "", category: "general" });
    setIsCreatingPost(false);
  };

  const categories = [
    { id: "all", name: "All Topics", icon: "🌐" },
    { id: "anxiety", name: "Anxiety", icon: "😰" },
    { id: "depression", name: "Depression", icon: "😔" },
    { id: "grief", name: "Grief", icon: "💔" },
    { id: "mindfulness", name: "Mindfulness", icon: "🧘" },
    { id: "relationships", name: "Relationships", icon: "💑" },
  ];

  const filteredPosts =
    activeTab === "all"
      ? posts
      : posts.filter((post) => post.category === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">
            Peer Support Community
          </h1>
          <p className="text-lg text-blue-600 max-w-2xl mx-auto">
            Connect with others who understand. Share experiences, find support,
            and grow together in a safe space.
          </p>
          <div className="mt-6 inline-flex items-center bg-white rounded-full px-4 py-2 shadow-md">
            <span className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            <span className="text-blue-700 font-medium">
              {onlineUsers}+ people online now
            </span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Categories and Resources */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-5 mb-6 sticky top-6 animate-slide-in-left">
              <h2 className="text-xl font-semibold text-blue-800 mb-4">
                Discussion Topics
              </h2>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.id}>
                    <button
                      onClick={() => setActiveTab(category.id)}
                      className={`w-full text-left flex items-center px-3 py-2 rounded-lg transition-all duration-300 ${
                        activeTab === category.id
                          ? "bg-blue-100 text-blue-700 font-medium"
                          : "text-blue-600 hover:bg-blue-50"
                      }`}
                    >
                      <span className="text-xl mr-3">{category.icon}</span>
                      <span>{category.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-50 rounded-2xl shadow-md p-5 animate-slide-in-left">
              <h2 className="text-xl font-semibold text-blue-800 mb-4">
                Community Guidelines
              </h2>
              <ul className="space-y-3 text-blue-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Be kind and respectful to everyone</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>
                    Respect privacy - don't share personal information
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Offer support, not medical advice</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Report any concerning content to moderators</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {/* Create Post Card */}
            {!isCreatingPost ? (
              <div
                className="bg-white rounded-2xl shadow-xl p-5 mb-6 cursor-pointer hover:shadow-lg transition-all duration-300 animate-fade-in"
                onClick={() => setIsCreatingPost(true)}
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-xl mr-4">
                    😊
                  </div>
                  <div className="text-blue-500 flex-1">
                    Share something with the community...
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-5 mb-6 animate-fade-in">
                <h3 className="text-lg font-semibold text-blue-800 mb-4">
                  Create a Post
                </h3>
                <form onSubmit={handleNewPostSubmit}>
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Title"
                      className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newPost.title}
                      onChange={(e) =>
                        setNewPost({ ...newPost, title: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-4">
                    <textarea
                      placeholder="What's on your mind?"
                      className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
                      value={newPost.content}
                      onChange={(e) =>
                        setNewPost({ ...newPost, content: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-4">
                    <select
                      className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newPost.category}
                      onChange={(e) =>
                        setNewPost({ ...newPost, category: e.target.value })
                      }
                    >
                      <option value="general">General</option>
                      <option value="anxiety">Anxiety</option>
                      <option value="depression">Depression</option>
                      <option value="grief">Grief</option>
                      <option value="mindfulness">Mindfulness</option>
                      <option value="relationships">Relationships</option>
                    </select>
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      className="px-4 py-2 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
                      onClick={() => setIsCreatingPost(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Post
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Posts List */}
            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-2xl shadow-xl p-5 animate-fade-in-up"
                >
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl mr-4">
                      {post.userAvatar}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-blue-800">
                        {post.title}
                      </h3>
                      <div className="flex items-center text-blue-500 text-sm mt-1">
                        <span>{post.author}</span>
                        <span className="mx-2">•</span>
                        <span>{post.timestamp}</span>
                        <span className="mx-2">•</span>
                        <span className="px-2 py-1 bg-blue-100 rounded-full text-xs">
                          {post.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-blue-700 mb-4">{post.content}</p>

                  <div className="flex items-center justify-between border-t border-blue-100 pt-4">
                    <div className="flex items-center space-x-4">
                      <button
                        className={`flex items-center space-x-1 ${
                          post.isLiked
                            ? "text-blue-600"
                            : "text-blue-400 hover:text-blue-600"
                        }`}
                        onClick={() => handleLike(post.id)}
                      >
                        {post.isLiked ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                        )}
                        <span>{post.likes}</span>
                      </button>

                      <button className="flex items-center space-x-1 text-blue-400 hover:text-blue-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                        <span>{post.comments} comments</span>
                      </button>
                    </div>

                    <button className="text-blue-400 hover:text-blue-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar - Community Features */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-5 mb-6 sticky top-6 animate-slide-in-right">
              <h2 className="text-xl font-semibold text-blue-800 mb-4">
                Upcoming Support Groups
              </h2>
              <div className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="font-medium text-blue-700">
                      Anxiety Support
                    </span>
                  </div>
                  <p className="text-sm text-blue-600">Today, 6:00 PM EST</p>
                  <button className="mt-2 w-full py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors">
                    Join Session
                  </button>
                </div>

                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span className="font-medium text-blue-700">
                      Mindfulness Practice
                    </span>
                  </div>
                  <p className="text-sm text-blue-600">Tomorrow, 7:00 PM EST</p>
                  <button className="mt-2 w-full py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors">
                    RSVP
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-5 mb-6 animate-slide-in-right">
              <h2 className="text-xl font-semibold text-blue-800 mb-4">
                Community Highlights
              </h2>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                  <span className="text-2xl mr-3">🏆</span>
                  <div>
                    <p className="font-medium text-blue-800">
                      Most supportive member
                    </p>
                    <p className="text-sm text-blue-600">
                      @EmmaR helped 12 people this week
                    </p>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-2xl mr-3">💬</span>
                  <div>
                    <p className="font-medium text-blue-800">
                      Active discussion
                    </p>
                    <p className="text-sm text-blue-600">
                      "Coping with seasonal depression" has 42 comments
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-800 text-white rounded-2xl shadow-xl p-5 animate-slide-in-right">
              <h2 className="text-xl font-semibold mb-4">
                Need Immediate Help?
              </h2>
              <p className="mb-4">If you're in crisis, please contact:</p>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-blue-700 rounded-lg">
                  <span className="text-xl mr-3">📞</span>
                  <div>
                    <p className="font-medium">
                      National Suicide Prevention Lifeline
                    </p>
                    <p className="text-sm">1-800-273-8255</p>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-blue-700 rounded-lg">
                  <span className="text-xl mr-3">💬</span>
                  <div>
                    <p className="font-medium">Crisis Text Line</p>
                    <p className="text-sm">Text HOME to 741741</p>
                  </div>
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
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out;
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.5s ease-out;
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default PeerSupport;
