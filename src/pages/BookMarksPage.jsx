import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import NewsCard from "../components/NewsCard";

// Sample data – Replace this with actual data from context or localStorage
const sampleBookmarkedNews = [
  {
    id: 1,
    category: "Technology",
    isVoting: false,
    timer: "",
    reliability: 92,
    verified: true,
    title: "AI to Take Over Routine Tasks by 2030",
    description: "Experts believe that artificial intelligence will automate many daily tasks...",
    time: "April 5, 2025, 10:30 AM",
    imageUrl: "https://via.placeholder.com/600x300",
  },
  {
    id: 2,
    category: "Politics",
    isVoting: false,
    timer: "",
    reliability: 80,
    verified: false,
    title: "Election 2025: What to Expect",
    description: "As the elections approach, political parties are preparing for a fierce battle...",
    time: "April 4, 2025, 2:00 PM",
    imageUrl: "https://via.placeholder.com/600x300",
  },
];

const categories = ["All", "Technology", "Politics", "Health", "Sports", "Business"];

const BookmarksPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [bookmarkedNews, setBookmarkedNews] = useState([]);

  useEffect(() => {
    // Replace this with actual bookmark fetching logic
    setBookmarkedNews(sampleBookmarkedNews);
  }, []);

  const filteredNews =
    selectedCategory === "All"
      ? bookmarkedNews
      : bookmarkedNews.filter((news) => news.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      {/* Bookmark Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Your Bookmarked News
        </h2>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* News Cards */}
        <div className="flex flex-col items-center gap-5">
          {filteredNews.length > 0 ? (
            filteredNews.map((news) => (
              <NewsCard key={news.id} {...news} />
            ))
          ) : (
            <p className="text-gray-500 text-center text-lg">
              No bookmarks in this category.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookmarksPage;