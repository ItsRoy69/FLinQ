import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";

import FeedTypeState from "./contexts/FeedTypeState";

import Feed from "./pages/feed/Feed";
import Home from "./pages/home/Home";
import Jobs from "./pages/jobs/Jobs";
import JobDetails from "./components/jobs/jobDetails/JobDetails";
import Event from "./pages/events/Event";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import MapComponent from "./pages/map/MapComponent";
import ChatBot from "./pages/chat/bot/ChatBot";
import AuthModal from "./components/auth/AuthModal";
import UserInfo from "./pages/user/UserInfo";
import Error404 from "./pages/error/Error404";
import ChatCommunity from "./pages/chat/community/ChatCommunity";
import ChatAnonymous from "./pages/chat/anonymous/ChatAnonymous";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserProvider } from "./contexts/userContext";
import { useEffect, useState } from "react";

function App() {
  const client_id = import.meta.env.VITE_CLIENT_ID;
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth > 506);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <main className="flex">
      {isSmallScreen ? (
        <div className="flex items-center justify-center h-screen w-screen">
          <p className="text-red-500">Sorry, no responsiveness, it is for mobile screens</p>
        </div>
      ) : (
        <>
          <GoogleOAuthProvider clientId={client_id}>
            <SkeletonTheme baseColor="#5c5b5b" highlightColor="#aba9a9">
              <UserProvider>
                <Router>
                  <FeedTypeState>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/events" element={<Event />} />
                      <Route path="/feed" element={<Feed />} />
                      <Route path="/jobs" element={<Jobs />} />
                      <Route
                         path="/jobs/jobdetails"
                         element = {<JobDetails/>}
                      />
                      <Route path="/chat/aibot" element={<ChatBot />} />
                      <Route
                        path="/chat/community/*"
                        element={<ChatCommunity />}
                      />
                      <Route
                        path="/chat/anonymous"
                        element={<ChatAnonymous />}
                      />
                      <Route path="/map" element={<MapComponent />} />
                      <Route path="/register" element={<AuthModal />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/edit" element={<EditProfile />} />
                      <Route path="/userinfo" element={<UserInfo />} />
                      <Route path="/error" element={<Error404 />} />
                    </Routes>
                  </FeedTypeState>
                </Router>
              </UserProvider>
            </SkeletonTheme>
          </GoogleOAuthProvider>
        </>
      )}
    </main>
  );
}

export default App;
