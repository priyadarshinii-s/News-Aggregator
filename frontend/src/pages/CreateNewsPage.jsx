import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header"; // Adjust path as needed

const CreateNewsPage = () => {
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("Technology");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newNews = {
      title: heading,
      description: content,
      imageUrl,
      category,
      time: new Date().toLocaleString(),
    };

    try {
      const token = localStorage.getItem("token"); // Get JWT token from localStorage

      const response = await fetch("http://localhost:5000/api/news/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send token in header
        },
        body: JSON.stringify(newNews),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("News created successfully:", data);
        alert("News successfully posted!");
        // Reset form
        setHeading("");
        setContent("");
        setImageUrl("");
        setCategory("technology");
        navigate("/discover");
      } else {
        console.error("Error:", data.message || data.error);
        alert(data.message || "Something went wrong!");
      }
    } catch (err) {
      console.error("Request failed:", err);
      alert("Server not reachable or error occurred.");
    }
  };

  const handleCancel = () => {
    navigate("/discover");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex justify-center items-center p-20">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-md p-6 w-full max-w-xl space-y-5"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            📰 Create News
          </h2>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Heading
            </label>
            <input
              type="text"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter news headline"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={5}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Write your news content here..."
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Image URL
            </label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Paste the image link"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="Technology">Technology</option>
              <option value="Tealth">Health</option>
              <option value="Politics">Politics</option>
              <option value="Education">Education</option>
              <option value="Sports">Sports</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Science">Science</option>
              <option value="Travel">Travel</option>
            </select>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 font-semibold"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNewsPage;