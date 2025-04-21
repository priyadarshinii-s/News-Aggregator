import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import NewsCard from "../components/NewsCard";
import axios from "axios";

const Discover = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(true); // To track loading state
    const [error, setError] = useState(null); // To track errors

    // Fetch news data from backend
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/news/", {
                    headers: {
                        Authorization: `Bearer YOUR_JWT_TOKEN`, // Include the token here if necessary
                    },
                });
                setNewsData(response.data); // Update newsData state with the fetched data
                setLoading(false); // Set loading to false once data is fetched
            } catch (error) {
                setError("Failed to fetch news"); // Handle error
                setLoading(false);
            }
        };

        fetchNews();
    }, []); // Empty dependency array, so it runs only once on mount

    // Filter news based on category and search term
    const filteredNews = newsData.filter((news) => {
        const matchCategory =
          selectedCategory === "All" || news.category === selectedCategory;
        const matchSearch =
          news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          news.description.toLowerCase().includes(searchTerm.toLowerCase());

        return matchCategory && matchSearch;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="pt-[80px] flex">
                {/* Sidebar */}
                <Sidebar
                    selectedCategory={selectedCategory}
                    onCategorySelect={setSelectedCategory}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />

                {/* Main Content */}
                <main className="ml-[350px] pl-6 flex-1 p-6">
                    <h1 className="text-xl font-bold mb-4">{selectedCategory} News</h1>

                    {loading ? (
                        <p>Loading...</p> // Show loading text while fetching
                    ) : error ? (
                        <p>{error}</p> // Show error message if any
                    ) : (
                        <div className="flex flex-col gap-4">
                            {filteredNews.length > 0 ? (
                                filteredNews.map((news) => <NewsCard key={news.id} {...news} />)
                            ) : (
                                <p>No news available in this category.</p>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Discover;
