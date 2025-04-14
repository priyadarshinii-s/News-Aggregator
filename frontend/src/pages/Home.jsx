import React from "react";
import Header from "../components/Header";
import NewsCard from "../components/NewsCard";

const HomePage = () => {
  const sampleNews = [
    {
      id: "1",
      category: "Technology",
      verified: true,
      reliability: 92,
      title: "AI Startup Raises $200M to Advance General Intelligence",
      description:
        "A cutting-edge AI startup has raised $200 million in Series B funding to accelerate the development of general AI systems...",
      time: "2 hours ago",
      imageUrl: "https://tse2.mm.bing.net/th?id=OIP.6XC1xcUtltqmM9EsMz9jdQHaFi&pid=Api&P=0&h=180",
      isVoting: false,
    },
    {
      id: "2",
      category: "Politics",
      title: "Global Leaders Meet to Discuss Trade Reforms",
      description:
        "In a historic summit, world leaders are gathering to discuss reforms in international trade and economic growth...",
      time: "1 hour 30 mins remaining",
      imageUrl: "https://tse2.mm.bing.net/th?id=OIP.6t6iDlW-Mq_YIVC_MtPBWwAAAA&pid=Api&P=0&h=180",
      isVoting: true,
      timer: "1:30 hours"
    },
    {
      id: "3",
      category: "Health",
      verified: true,
      reliability: 89,
      title: "New Vaccine Shows Promise Against Emerging Virus",
      description:
        "A new vaccine has shown 85% effectiveness against a rapidly spreading virus in initial clinical trials...",
      time: "1 day ago",
      imageUrl: "https://tse1.mm.bing.net/th?id=OIP.GhuinRLZvfvhmkoQRrZG3gHaER&pid=Api&P=0&h=180",
      isVoting: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-[80px] px-4 flex flex-col items-center gap-6">
        {sampleNews.map((news) => (
          <NewsCard
            key={news.id}
            {...news}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
