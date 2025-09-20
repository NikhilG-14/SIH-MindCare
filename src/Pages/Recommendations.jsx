import { useEffect, useState } from "react";

// Interactive markdown renderer component
function InteractiveMarkdownRenderer({ content, expandedCard, setExpandedCard, likedTips, bookmarkedTips, toggleLike, toggleBookmark }) {
  const parseMarkdown = (text) => {
    const lines = text.split('\n');
    const elements = [];
    let currentElement = null;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      if (!line.trim()) {
        if (currentElement) {
          elements.push(currentElement);
          currentElement = null;
        }
        continue;
      }
      
      if (line.startsWith('# ')) {
        if (currentElement) elements.push(currentElement);
        elements.push({
          type: 'h1',
          content: line.slice(2),
          key: `h1-${i}`
        });
        currentElement = null;
      } else if (line.startsWith('## ')) {
        if (currentElement) elements.push(currentElement);
        elements.push({
          type: 'h2',
          content: line.slice(3),
          key: `h2-${i}`
        });
        currentElement = null;
      } else if (line.startsWith('• ')) {
        if (currentElement?.type !== 'ul') {
          if (currentElement) elements.push(currentElement);
          currentElement = { type: 'ul', items: [], key: `ul-${i}` };
        }
        currentElement.items.push({
          content: line.slice(2),
          key: `li-${i}`,
          index: currentElement.items.length
        });
      } else {
        if (currentElement?.type !== 'p') {
          if (currentElement) elements.push(currentElement);
          currentElement = { type: 'p', content: '', key: `p-${i}` };
        }
        currentElement.content += (currentElement.content ? ' ' : '') + line;
      }
    }
    
    if (currentElement) elements.push(currentElement);
    return elements;
  };

  const renderElement = (element, sectionIndex) => {
    switch (element.type) {
      case 'h1':
        return (
          <div key={element.key} className="mb-6">
            <h1 className="text-2xl font-bold text-blue-700 mb-2 flex items-center">
              <div className="w-1 h-8 bg-blue-500 rounded-full mr-3"></div>
              {element.content}
            </h1>
          </div>
        );
        
      case 'h2':
        return (
          <div key={element.key} className="mb-6 mt-8">
            <h2 className="text-xl font-semibold text-blue-600 mb-4 flex items-center">
              <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              {element.content}
            </h2>
          </div>
        );
        
      case 'ul':
        return (
          <div key={element.key} className="grid gap-4 mb-6">
            {element.items.map((item, idx) => {
              const itemIndex = `${sectionIndex}-${idx}`;
              const isExpanded = expandedCard === itemIndex;
              const isLiked = likedTips.has(itemIndex);
              const isBookmarked = bookmarkedTips.has(itemIndex);
              
              return (
                <div key={`${element.key}-${idx}`} className="group">
                  <div className={`bg-white rounded-xl shadow-md border border-blue-100 p-4 transition-all duration-300 cursor-pointer hover:shadow-lg hover:scale-[1.01] ${isExpanded ? 'ring-2 ring-blue-300' : ''}`}>
                    <div 
                      className="flex items-start justify-between"
                      onClick={() => setExpandedCard(isExpanded ? null : itemIndex)}
                    >
                      <div className="flex-1">
                        <div className="flex items-start space-x-3">
                          <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mt-1.5 flex-shrink-0"></div>
                          <div className="flex-1">
                            <div dangerouslySetInnerHTML={{
                              __html: item.content
                                .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-blue-700">$1</strong>')
                                .replace(/\*(.*?)\*/g, '<em class="text-blue-600">$1</em>')
                            }}></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLike(itemIndex);
                          }}
                          className={`p-2 rounded-lg transition-all duration-200 ${isLiked ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-400 hover:bg-red-50'}`}
                        >
                          <svg className="w-4 h-4" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleBookmark(itemIndex);
                          }}
                          className={`p-2 rounded-lg transition-all duration-200 ${isBookmarked ? 'text-blue-500 bg-blue-50' : 'text-gray-400 hover:text-blue-400 hover:bg-blue-50'}`}
                        >
                          <svg className="w-4 h-4" fill={isBookmarked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                          </svg>
                        </button>
                        
                        <div className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                          <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-blue-100 animate-fadeIn">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm text-blue-600 font-medium">Quick Actions</span>
                          <div className="flex space-x-2">
                            <button className="px-3 py-1.5 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors">
                              Try Now
                            </button>
                            <button className="px-3 py-1.5 bg-blue-100 text-blue-600 rounded-lg text-sm hover:bg-blue-200 transition-colors">
                              Learn More
                            </button>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">
                          <p>💡 <strong>Pro tip:</strong> Start with just 2-3 minutes daily and gradually increase the duration as it becomes a natural part of your routine.</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        );
        
      default:
        return null;
    }
  };

  const elements = parseMarkdown(content);
  
  return (
    <div className="space-y-4">
      {elements.map((element, index) => renderElement(element, index))}
    </div>
  );
}

function Recommendations() {
  const [tips, setTips] = useState("Generating personalized recommendations…");
  const [expandedCard, setExpandedCard] = useState(null);
  const [likedTips, setLikedTips] = useState(new Set());
  const [bookmarkedTips, setBookmarkedTips] = useState(new Set());

  const toggleLike = (index) => {
    const newLiked = new Set(likedTips);
    if (newLiked.has(index)) {
      newLiked.delete(index);
    } else {
      newLiked.add(index);
    }
    setLikedTips(newLiked);
  };

  const toggleBookmark = (index) => {
    const newBookmarked = new Set(bookmarkedTips);
    if (newBookmarked.has(index)) {
      newBookmarked.delete(index);
    } else {
      newBookmarked.add(index);
    }
    setBookmarkedTips(newBookmarked);
  };

  useEffect(() => {
    // Simulate API loading with demo content
    setTimeout(() => {
      setTips(`# Daily Wellness Tips

• **Practice Deep Breathing**: Try the 4-7-8 technique - inhale for 4, hold for 7, exhale for 8. Perfect for instant calm.

• **Daily Gratitude Journal**: Write down 3 things you're grateful for each morning. This simple habit rewires your brain for positivity.

• **Nature Connection**: Spend 10-15 minutes outdoors daily. Even a brief walk can significantly boost mood and reduce stress.

• **Mindful Movement**: Gentle yoga or stretching helps release physical tension and mental stress.

• **Social Connection**: Reach out to one friend or family member today. Human connection is vital for emotional wellbeing.

• **Digital Detox Hour**: Set aside one hour before bed without screens. Use this time for reading, meditation, or relaxation.

## Recommended Reading

• **"Feeling Good" by David D. Burns** - Excellent for understanding cognitive behavioral techniques
• **"The Happiness Trap" by Russ Harris** - Practical acceptance and commitment therapy approaches  
• **"Atomic Habits" by James Clear** - Build sustainable positive habits that stick`);
    }, 2000);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-blue-800">Personal Recommendations</h1>
            <p className="text-blue-600">Interactive wellness tips just for you</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto">
        {tips === "Generating personalized recommendations…" ? (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-blue-700 font-medium">{tips}</span>
            </div>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse mb-4 p-4 bg-blue-50 rounded-xl">
                <div className="h-4 bg-blue-200 rounded mb-2" style={{width: `${70 + Math.random() * 30}%`}}></div>
                <div className="h-3 bg-blue-100 rounded" style={{width: `${50 + Math.random() * 30}%`}}></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <InteractiveMarkdownRenderer 
              content={tips} 
              expandedCard={expandedCard}
              setExpandedCard={setExpandedCard}
              likedTips={likedTips}
              bookmarkedTips={bookmarkedTips}
              toggleLike={toggleLike}
              toggleBookmark={toggleBookmark}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Recommendations;