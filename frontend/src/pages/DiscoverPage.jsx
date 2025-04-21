import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import NewsCard from "../components/NewsCard";
import { useContract } from "../contexts/contractContext";


const sampleNews = [
    {
        id: "1",
        category: "Technology",
        title: "AI Startup Raises $200M to Advance General Intelligence",
        description: "A cutting-edge AI startup has raised funding...",
        time: "2 hours ago",
        imageUrl: "https://tse2.mm.bing.net/th?id=OIP.6XC1xcUtltqmM9EsMz9jdQHaFi&pid=Api&P=0&h=180",
        reliability: 92,
        isVoting: false,
    },
    {
        id: "2",
        category: "Politics",
        title: "Global Leaders Meet to Discuss Trade Reforms",
        description: "World leaders are gathering to discuss reforms...",
        time: "1 hour 30 mins remaining",
        imageUrl: "https://tse2.mm.bing.net/th?id=OIP.6t6iDlW-Mq_YIVC_MtPBWwAAAA&pid=Api&P=0&h=180",
        isVoting: true,
    },
    {
        id: "3",
        category: "Health",
        title: "New Vaccine Shows Promise Against Virus",
        description: "A new vaccine has shown 85% effectiveness...",
        time: "1 day ago",
        imageUrl: "https://tse1.mm.bing.net/th?id=OIP.GhuinRLZvfvhmkoQRrZG3gHaER&pid=Api&P=0&h=180",
        reliability: 89,
        isVoting: false,
    },
];

const Discover = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

     const { contract, result } = useContract();

    const filteredNews = sampleNews.filter((news) => {
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
                    <div className="flex flex-col gap-4">
                        {filteredNews.length > 0 ? (
                            filteredNews.map((news) => <NewsCard key={news.id} {...news} />)
                        ) : (
                            <p>No news available in this category.</p>
                        )}
                    </div>
                </main>
            </div>

        </div>
    );
};

export default Discover;
