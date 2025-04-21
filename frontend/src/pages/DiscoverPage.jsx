import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import NewsCard from "../components/NewsCard";
import axios from "axios";

const Discover = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/news/", {
                    headers: {
                        Authorization: `Bearer YOUR_JWT_TOKEN`,
                    },
                });
                setNewsData(response.data);
                setLoading(false);
            } catch (error) {
                setError("Failed to fetch news");
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

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
                <Sidebar
                    selectedCategory={selectedCategory}
                    onCategorySelect={setSelectedCategory}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />

                <main className="ml-[350px] pl-6 flex-1 p-6">
                    <h1 className="text-xl font-bold mb-4">{selectedCategory} News</h1>

                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>{error}</p>
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
