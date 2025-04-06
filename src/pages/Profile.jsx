import React from "react";
import Header from "../components/Header";
import NewsCard from "../components/NewsCard";
import userprofile from "../images/userprofile.jpg"; // same image used in Header

const ProfilePage = () => {
  const isVerifier = true; // set to false for normal users

  const user = {
    name: "John Doe",
    email: "john@example.com",
    wallet: "0xABCD...1234",
    tokenBalance: 42,
    isVerifier,
    profileImage: userprofile, // local image
  };

  const sampleNews = [
    {
      id: "1",
      category: "Health",
      verified: true,
      reliability: 85,
      title: "New Vaccine Released",
      description: "A vaccine just cleared phase 3 trials...",
      time: "3 days ago",
      imageUrl: "https://tse2.mm.bing.net/th?id=OIP.6XC1xcUtltqmM9EsMz9jdQHaFi&pid=Api&P=0&h=180",
      isVoting: false,
      postedBy: "john@example.com",
      verifiedBy: "john@example.com",
    },
    {
      id: "2",
      category: "Technology",
      verified: true,
      reliability: 91,
      title: "AI Breakthrough Announced",
      description: "AI researchers claim major milestone...",
      time: "1 week ago",
      imageUrl: "https://tse1.mm.bing.net/th?id=OIP.GhuinRLZvfvhmkoQRrZG3gHaER&pid=Api&P=0&h=180",
      isVoting: false,
      postedBy: "someone@example.com",
      verifiedBy: "john@example.com",
    },
  ];

  const filteredNews = isVerifier
    ? sampleNews.filter((n) => n.verifiedBy === user.email)
    : sampleNews.filter((n) => n.postedBy === user.email);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-[80px] px-4 max-w-4xl mx-auto">
        {/* Profile Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 flex flex-col sm:flex-row sm:gap-10 items-center sm:items-center sm:justify-start">

          <img
            src={user.profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">{user.name}</h2>
            <p className="text-gray-600 text-sm mb-1">📧 {user.email}</p>
            <p className="text-gray-600 text-sm mb-1">💼 Wallet: {user.wallet}</p>
            <p className="text-gray-600 text-sm mb-1">🪙 Tokens: {user.tokenBalance}</p>
            <span className={`mt-2 inline-block px-3 py-1 rounded-full text-xs font-semibold ${isVerifier ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
              {isVerifier ? "✅ Verifier" : "📝 User"}
            </span>
          </div>
        </div>

        {/* News Section */}
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          {isVerifier ? "Verified News" : "Your News"}
        </h3>
        <div className="flex flex-col items-center gap-6">
          {filteredNews.length ? (
            filteredNews.map((news) => <NewsCard key={news.id} {...news} />)
          ) : (
            <p className="text-gray-500">No news found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;




// import userprofile from "../images/userprofile.jpg";
// import Header from "../components/Header";

// const Profile = () => {
//   const user = {
//     name: "John Doe",
//     email: "john.doe@example.com",
//     walletAddress: "0x1234...abcd",
//     tokenBalance: 120
//   };

//   const postsCreated = [
//     "Understanding Blockchain",
//     "The Future of Decentralized Apps"
//   ];

//   const verifiedPosts = [
//     "Crypto Wallet Safety Tips",
//     "Top 5 Smart Contract Platforms"
//   ];

//   return (
//     <>
//       <Header />

//       <div className="bg-[#f9fafb] min-h-screen pt-28 px-4 md:px-8">
//         {/* Profile Card */}
//         <div className="bg-white rounded-xl shadow-md p-6 max-w-4xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-6">
//           <img
//             src={userprofile}
//             alt="Profile"
//             className="w-32 h-32 rounded-full object-cover border border-gray-300"
//           />
//           <div>
//             <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
//             <p className="text-gray-600 mt-1">📧 {user.email}</p>
//             <p className="text-gray-600 mt-1">💼 {user.walletAddress}</p>
//             <p className="text-gray-700 font-medium mt-2">💰 Token Balance: <span className="text-green-600">{user.tokenBalance}</span></p>
//           </div>
//         </div>

//         {/* Posts Section */}
//         <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-8">
//           {/* User Posts */}
//           <div className="bg-white rounded-xl shadow-md p-5">
//             <h3 className="text-lg font-semibold text-gray-800 mb-3">📝 Posts Created</h3>
//             {postsCreated.length > 0 ? (
//               <ul className="space-y-2 text-gray-700 list-disc list-inside">
//                 {postsCreated.map((post, idx) => (
//                   <li key={idx}>{post}</li>
//                 ))}
//               </ul>
//             ) : (
//               <p className="text-gray-500">No posts created yet.</p>
//             )}
//           </div>

//           {/* Verified Posts */}
//           <div className="bg-white rounded-xl shadow-md p-5">
//             <h3 className="text-lg font-semibold text-gray-800 mb-3">✅ Verified Posts</h3>
//             {verifiedPosts.length > 0 ? (
//               <ul className="space-y-2 text-gray-700 list-disc list-inside">
//                 {verifiedPosts.map((post, idx) => (
//                   <li key={idx}>{post}</li>
//                 ))}
//               </ul>
//             ) : (
//               <p className="text-gray-500">No posts verified yet.</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Profile;
