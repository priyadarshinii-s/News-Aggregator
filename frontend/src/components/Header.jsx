import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaHome, FaBookmark, FaCompass, FaUserCircle } from "react-icons/fa";
import { EarthLock } from "lucide-react";
import userprofile from "../images/userprofile.jpg";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [animationLoaded, setAnimationLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setAnimationLoaded(true), 100);
  }, []);

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md px-6 py-3 flex justify-between items-center fixed w-full top-0 z-10">
  {/* Logo */}
  <div className="flex items-center">
    <EarthLock className="h-6 w-6 text-blue-600 mr-2" />
    <span className="text-blue-600 font-bold text-lg">VNC</span>
  </div>

  {/* Navigation */}
  <nav className="hidden md:flex space-x-6 text-base">
    <Link to="/" className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
      <FaHome className="h-5 w-5" /> <span>Home</span>
    </Link>
    <Link to="/discover" className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
      <FaCompass className="h-5 w-5" /> <span>Discover</span>
    </Link>
    <Link to="/bookmarks" className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
      <FaBookmark className="h-5 w-5" /> <span>Bookmarks</span>
    </Link>
  </nav>

  {/* Profile Dropdown */}
  <div className="relative">
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="w-10 h-10 rounded-full border border-gray-300 overflow-hidden focus:outline-none"
    >
      <img src={userprofile} alt="User Profile" className="w-full h-full object-cover" />
    </button>
    {isOpen && (
      <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md py-2 text-base">
        <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
        <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
      </div>
    )}
  </div>
</header>

    
  );
};

export default Header;
