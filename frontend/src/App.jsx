import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import Header from "./components/Header.jsx";
import NewsCard from "./components/NewsCard.jsx";
import HomePage from "./pages/Home.jsx";
import NewsDetails from "./pages/NewsDetails.jsx";
import Profile from "./pages/Profile.jsx";
import Discover from "./pages/DiscoverPage.jsx";
import CreateNewsPage from "./pages/CreateNewsPage.jsx";
import BookmarksPage from "./pages/BookMarksPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/header" element={<Header/>} /> 
        <Route path="/home" element={<HomePage/>} />
        <Route path="newsCard" element={<NewsCard/>} />
        <Route path="/news/:id" element={<NewsDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/discover" element={<Discover/>} />
        <Route path="/create" element={<CreateNewsPage/>} />
        <Route path="/bookmarks" element={<BookmarksPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
