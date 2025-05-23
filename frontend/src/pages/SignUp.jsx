import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signup from "../images/signup.jpg";
import axios from "axios";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [role, setRole] = useState("user"); // New state for role
  const navigate = useNavigate();

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.error("Wallet connection failed", error);
      }
    } else {
      alert("MetaMask is not installed!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !walletAddress || !role) {
      alert("Please fill all fields and connect wallet.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/users/signup", {
        name: username,
        email,
        password,
        wallet: walletAddress,
        role,
      });

      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-t from-blue-300 via-blue-200 to-white"></div>
      <div className="z-10 bg-gradient-to-t from-blue-300 to-white p-8 rounded-2xl shadow-lg flex w-3/4 max-w-4xl">
        <div className="w-1/2 hidden md:flex items-center justify-center">
          <img src={signup} alt="Sign Up" className="w-full h-auto rounded-lg" />
        </div>

        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-center mb-4">Sign Up</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="user">User</option>
              <option value="verifier">Verifier</option>
            </select>
            <button
              type="button"
              onClick={connectWallet}
              className="w-full bg-blue-500 text-white p-3 rounded-xl font-semibold hover:bg-blue-600 transition"
            >
              {walletAddress ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "Connect Wallet"}
            </button>

            <button type="submit" className="w-full bg-green-500 text-white p-3 rounded-xl font-semibold hover:bg-green-600 transition">
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Already have an account? <Link to="/login" className="text-blue-500 font-semibold hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
