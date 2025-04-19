import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import NewsCard from "../components/NewsCard";
import userprofile from "../images/userprofile.jpg";
import axios from "axios";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(userprofile);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No token found in localStorage");
          setLoading(false);
          return;
        }

        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const userId = decodedToken?.id;

        if (!userId) {
          console.error("Invalid token. No user ID found.");
          setLoading(false);
          return;
        }

        const userRes = await axios.get(
          `http://localhost:5000/api/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!userRes.data || !userRes.data.email) {
          console.error("User not found in backend");
          setLoading(false);
          return;
        }

        setUser(userRes.data);
        setProfileImage(userRes.data.profileImage || userprofile);

        // You can uncomment this later when news feature is needed
        // const newsRes = await axios.get("http://localhost:5000/api/news", {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // });
        // setNews(newsRes.data);
      } catch (error) {
        console.error(
          "Error fetching user/news:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUrlSubmit = async () => {
    const token = localStorage.getItem("token");

    if (!urlInput.trim() || !user || !token) return;

    const newUrl = urlInput.trim();
    setProfileImage(newUrl);
    setShowUrlInput(false);
    setUrlInput("");

    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userId = decodedToken?.id;

      await axios.put(
        `http://localhost:5000/api/users/profile-image/${userId}`,
        { profileImage: newUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser((prev) => ({ ...prev, profileImage: newUrl }));
    } catch (err) {
      console.error("Error updating profile image:", err.response?.data || err.message);
    }
  };

  const handleImageError = () => {
    setProfileImage(userprofile);
  };

  const filteredNews =
    user?.role === "verifier"
      ? news.filter((n) => n.verifiedBy === user.email)
      : news.filter((n) => n.postedBy === user.email);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-blue-500 animate-pulse">Loading Profile...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center mt-20 text-red-500 font-medium">
        User not found!
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="pt-[80px] px-4 max-w-4xl mx-auto">
        {/* Profile Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 flex flex-col sm:flex-row gap-6 items-center">
          <div className="flex flex-col items-center">
            <img
              src={profileImage}
              alt="Profile"
              onError={handleImageError}
              className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
            />
            {!showUrlInput ? (
              <button
                onClick={() => setShowUrlInput(true)}
                className="mt-2 text-sm text-blue-500 hover:underline"
              >
                Change Picture (via URL)
              </button>
            ) : (
              <div className="mt-2 flex flex-col items-center gap-2">
                <input
                  type="text"
                  placeholder="Enter image URL"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="border px-2 py-1 rounded text-sm w-52"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleUrlSubmit}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => {
                      setShowUrlInput(false);
                      setUrlInput("");
                    }}
                    className="bg-gray-300 px-3 py-1 rounded text-sm hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-700">
              Wallet: <span className="font-medium">{user.wallet}</span>
            </p>
            <p className="capitalize text-gray-700">
              Role: <span className="font-medium">{user.role}</span>
            </p>
          </div>
        </div>

        {/* News Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Your News</h3>
          {filteredNews.length === 0 ? (
            <p className="text-gray-600">No news posted yet.</p>
          ) : (
            <div className="grid gap-4">
              {filteredNews.map((n) => (
                <NewsCard key={n._id} news={n} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;