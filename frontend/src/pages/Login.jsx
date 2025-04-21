import { useState } from "react";
import { Link } from "react-router-dom";
import login from "../images/login.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const navigate = useNavigate();


  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
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
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });
  
      const { token, message, user } = response.data;

      localStorage.setItem("isVerifier", false);
      if(user.role == "verifier") localStorage.setItem("isVerifier", true);

  
      if (token) {
        localStorage.setItem("token", token); 
        alert(message || "Login successful!");
        navigate("/home");
      } else {
        alert("Login failed: No token received");
      }
    } 
    catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data?.message || "Login failed. Please try again.");
    }
  };
  

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-t from-blue-300 via-blue-200 to-white"></div>
      <div className="z-10 bg-gradient-to-t from-blue-300 to-white  p-8 rounded-2xl shadow-lg flex w-3/4 max-w-4xl">
      
        <div className="w-1/2 hidden md:flex items-center justify-center">
          <img src={login} alt="Sign In" className="w-full h-auto rounded-lg" />
        </div>

        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-center mb-6">Sign In</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
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
            <button type="submit" className="w-full bg-green-500 text-white p-3 rounded-xl font-semibold hover:bg-green-600 transition">
              Login
            </button>
            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-4 text-gray-500">or</span>
              <hr className="flex-grow border-gray-300" />
            </div>
            <button
              type="button"
              onClick={connectWallet}
              className="w-full bg-blue-500 text-white p-3 rounded-xl font-semibold hover:bg-blue-600 transition"
            >
              {walletAddress ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "Connect Wallet"}
            </button>
          </form>
          <p className="mt-6 text-center text-gray-600">
            Don't have an account? <Link to="/signup" className="text-blue-500 font-semibold hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;