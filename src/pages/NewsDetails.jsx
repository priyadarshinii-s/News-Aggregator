import React from "react";
import { useParams } from "react-router-dom";

const NewsDetails = () => {
  const { id } = useParams();

  // In real apps, fetch data based on ID here
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-4">News Detail: {id}</h1>
      <p className="text-center text-gray-600">
        You clicked on the news card with ID: <strong>{id}</strong>
      </p>
    </div>
  );
};

export default NewsDetails;
