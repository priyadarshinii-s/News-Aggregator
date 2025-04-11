import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewsCard = ({
  id,
  category,
  isVoting,
  timer,
  reliability,
  verified,
  title,
  description,
  time,
  imageUrl,
  onVote,
}) => {
  const navigate = useNavigate();
  const [voted, setVoted] = useState(false);
  const [voteCounts, setVoteCounts] = useState({
    trustworthy: 0,
    questionable: 0,
  });

  const handleClick = () => {
      navigate(`/news/${id}`, {
        state: {
          id,
          category,
          isVoting,
          timer,
          reliability,
          verified,
          title,
          description,
          time,
          imageUrl,
        },
      });
  };

  const handleVote = (type) => {
    const newCounts = {
      ...voteCounts,
      [type]: voteCounts[type] + 1,
    };
    setVoteCounts(newCounts);
    setVoted(true);
    onVote?.(id, type);
  };

  const getPercentage = (type) => {
    const total = voteCounts.trustworthy + voteCounts.questionable;
    if (total === 0) return "0%";
    return `${Math.round((voteCounts[type] / total) * 100)}%`;
  };

  return (
    <div
      onClick={handleClick}
      className={`bg-white rounded-xl shadow-md p-4 mb-4 max-w-3xl w-full transform transition-transform hover:scale-105 hover:shadow-lg ${
        isVoting ? "cursor-default" : "cursor-pointer"
      }`}
    >
      {/* Header Row */}
      <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
        <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">
          {category}
        </span>

        {verified && !isVoting && (
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
            ✅ Verified
          </span>
        )}

        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            isVoting
              ? "bg-yellow-100 text-yellow-600"
              : "bg-blue-100 text-blue-600"
          }`}
        >
          {isVoting ? `⏳ ${timer} left` : `${reliability}% Reliable`}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Left Section */}
        <div className="flex flex-col justify-between flex-1">
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">{title}</h2>
            <p className="text-gray-700 text-sm mb-2">{description}</p>
          </div>

          <div className="text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <span className="h-2 w-2 bg-green-500 rounded-full"></span>
              <span>{time}</span>
            </div>
          </div>

          {isVoting && (
            <div className="flex gap-4 mt-3 flex-wrap">
              {voted ? (
                <>
                  <div className="bg-green-100 text-green-700 px-4 py-1 rounded-md text-sm font-semibold">
                    ✅ Trustworthy – {getPercentage("trustworthy")}
                  </div>
                  <div className="bg-red-100 text-red-700 px-4 py-1 rounded-md text-sm font-semibold">
                    ⚠️ Questionable – {getPercentage("questionable")}
                  </div>
                </>
              ) : (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleVote("trustworthy");
                    }}
                    className="bg-green-100 text-green-700 px-4 py-1 rounded-md text-sm font-semibold hover:bg-green-200"
                  >
                    Trustworthy
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleVote("questionable");
                    }}
                    className="bg-red-100 text-red-700 px-4 py-1 rounded-md text-sm font-semibold hover:bg-red-200"
                  >
                    Questionable
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Right Section (Image) */}
        <div className="flex-shrink-0 self-start mt-2 sm:mt-0">
          <img
            src={imageUrl}
            alt="news"
            className="w-full sm:w-40 h-32 object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
