import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";

const NewsDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [voted, setVoted] = useState(false);
  const [voteCounts, setVoteCounts] = useState({
    trustworthy: 0,
    questionable: 0,
  });

  if (!state) {
    return (
      <div className="pt-32 text-center text-gray-600">
        <p>News article not found.</p>
        <button onClick={() => navigate("/")} className="mt-4 text-blue-500 underline">
          Go back
        </button>
      </div>
    );
  }

  const handleVote = (type) => {
    const updated = {
      ...voteCounts,
      [type]: voteCounts[type] + 1,
    };
    setVoteCounts(updated);
    setVoted(true);
  };

  const getPercentage = (type) => {
    const total = voteCounts.trustworthy + voteCounts.questionable;
    if (total === 0) return "0%";
    return `${Math.round((voteCounts[type] / total) * 100)}%`;
  };

  return (
    <>
      <Header />
      <div className="pt-28 px-4 md:px-8 min-h-screen bg-gray-50">
        <div className="relative max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">

          {/* Close Button */}
          <button
            onClick={() => navigate(-1)} // Goes back to previous page
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl font-bold"
            aria-label="Close"
          >
            &times;
          </button>

          {/* Category */}
          <div className="mb-4 flex flex-wrap gap-3 items-center">
            <span className="bg-gray-200 text-sm px-3 py-1 rounded-full">{state.category}</span>
            {state.verified && (
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                ✅ Verified
              </span>
            )}
            {state.reliability && !state.isVoting && (
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                {state.reliability}% Reliable
              </span>
            )}
            {state.isVoting && (
              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
                ⏳ Voting Open
              </span>
            )}
          </div>

          {/* Title & Time */}
          <h1 className="text-2xl font-bold mb-2">{state.title}</h1>
          <p className="text-gray-500 text-sm mb-4">🕒 {state.time}</p>

          {/* Image */}
          {state.imageUrl && (
            <img
              src={state.imageUrl}
              alt="news"
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
          )}

          {/* Description */}
          <p className="text-gray-800 text-base mb-6">{state.description}</p>

          {/* Voting UI */}
          {state.isVoting && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Cast your vote:</h2>
              {voted ? (
                <div className="flex gap-4 flex-wrap">
                  <div className="bg-green-100 text-green-700 px-4 py-1 rounded-md text-sm font-semibold">
                    ✅ Trustworthy – {getPercentage("trustworthy")}
                  </div>
                  <div className="bg-red-100 text-red-700 px-4 py-1 rounded-md text-sm font-semibold">
                    ⚠️ Questionable – {getPercentage("questionable")}
                  </div>
                </div>
              ) : (
                <div className="flex gap-4 flex-wrap">
                  <button
                    onClick={() => handleVote("trustworthy")}
                    className="bg-green-100 text-green-700 px-4 py-1 rounded-md text-sm font-semibold hover:bg-green-200"
                  >
                    Trustworthy
                  </button>
                  <button
                    onClick={() => handleVote("questionable")}
                    className="bg-red-100 text-red-700 px-4 py-1 rounded-md text-sm font-semibold hover:bg-red-200"
                  >
                    Questionable
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NewsDetails;
