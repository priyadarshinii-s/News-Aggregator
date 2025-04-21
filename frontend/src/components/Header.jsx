import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaHome, FaBookmark, FaCompass, FaPen } from "react-icons/fa";
import { EarthLock, BadgeCheck } from "lucide-react";
import userprofile from "../images/userprofile.jpg";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [animationLoaded, setAnimationLoaded] = useState(false);
  const navigate = useNavigate();

  const userType = "creator"; 

  useEffect(() => {
    setTimeout(() => setAnimationLoaded(true), 100);
  }, []);

  const handleLogout = () => {
    navigate("/login");
  };

  const handleCreateClick = () => {
    navigate("/create");
  };

  return (
    <header className="bg-white shadow-md px-6 py-3 flex justify-between items-center fixed w-full top-0 z-10">
      <div className="flex items-center">
        <EarthLock className="h-6 w-6 text-blue-600 mr-2" />
        <span className="text-blue-600 font-bold text-lg">VNC</span>
      </div>

      <nav className="hidden md:flex space-x-6 text-base">
        <Link to="/discover" className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
          <FaCompass className="h-5 w-5" /> <span>Discover</span>
        </Link>
      </nav>

      <div className="relative flex items-center gap-2">
        {userType === "creator" && (
          <button
            onClick={handleCreateClick}
            title="Create"
            className="text-green-600 hover:text-green-700 transition-colors"
          >
            <FaPen className="w-5 h-5" />
          </button>
        )}

        {userType === "verifier" && (
          <BadgeCheck className="text-purple-600 w-5 h-5" title="Verifier" />
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 rounded-full border border-gray-300 overflow-hidden focus:outline-none"
        >
          <img src={userprofile} alt="User Profile" className="w-full h-full object-cover" />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-14 w-40 bg-white shadow-lg rounded-md py-2 text-base z-20">
            <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
            <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
