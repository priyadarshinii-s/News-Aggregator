import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";

const NewsDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="pt-32 text-center text-gray-600">
        <p>News article not found.</p>
        <button onClick={() => navigate("/")} className="mt-4 text-blue-500 underline">Go back</button>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="pt-28 px-4 md:px-8 min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
          <div className="mb-4">
            <span className="bg-gray-200 text-sm px-3 py-1 rounded-full">{state.category}</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">{state.title}</h1>
          <div className="flex items-center gap-3 text-sm text-gray-600 mb-4">
            <span>🕒 {state.time}</span>
            {state.verified && <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded">✅ Verified</span>}
            {state.reliability && <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{state.reliability}% Reliable</span>}
            {state.isVoting && <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">⏳ left</span>}
          </div>
          <img
            src={state.imageUrl}
            alt="news"
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          <p className="text-gray-700 text-base leading-relaxed">{state.description}</p>
        </div>
      </div>
    </>
  );
};

export default NewsDetails;


// import React from "react";
// import { useParams } from "react-router-dom";

// const NewsDetails = () => {
//   const { id } = useParams();

//   // In real apps, fetch data based on ID here
//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-2xl font-bold text-center mb-4">News Detail: {id}</h1>
//       <p className="text-center text-gray-600">
//         You clicked on the news card with ID: <strong>{id}</strong>
//       </p>
//     </div>
//   );
// };

// export default NewsDetails;
