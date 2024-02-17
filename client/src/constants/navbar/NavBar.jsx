import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./navbar.css";

import ChatPromptWindow from "../../components/navbar/ChatPromptWindow";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import TextsmsIcon from "@mui/icons-material/Textsms";
import Person2Icon from "@mui/icons-material/Person2";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import PlaceIcon from "@mui/icons-material/Place";

const NavBar = () => {
  // NECESSARIES FOR NAVIGATION

  const [selectedPage, setSelectedPage] = useState("home");

  const navigate = useNavigate();
  const location = useLocation();

  const handlePageSwitch = (path) => {
    setSelectedPage(path);
    navigate(`/${path}`);
  };

  // NECESSARIES FOR TEMPORARY CHAT REDIRECTION WINDOW PROMPT

  const [chatPromptWindowOpen, setChatPromptWindowOpen] = useState(false);

  const openChatPromptWindow = () => {
    if (!chatPromptWindowOpen) {
      setChatPromptWindowOpen(true);
    }
  };

  const closeChatPromptWindow = () => {
    if (chatPromptWindowOpen) {
      setChatPromptWindowOpen(false);
    }
  };

  return (
    <>
      {chatPromptWindowOpen && (
        <ChatPromptWindow
          chatPromptWindowOpen={chatPromptWindowOpen}
          closeChatPromptWindow={closeChatPromptWindow}
          handlePageSwitch={handlePageSwitch}
        />
      )}

      <nav className="navbar h-14 dark:bg-slate-900 dark:text-white fixed bottom-0 flex w-screen justify-between items-center gap-2 px-2 z-20">
        <div
          className="nav-home h-full w-1/5 flex items-center justify-center rounded-xl hover:cursor-pointer"
          onClick={() => handlePageSwitch("home")}
        >
          <HomeRoundedIcon
            className={`${selectedPage === "home" ? "text-pink-600" : ""}`}
            fontSize="medium"
          />
        </div>

        <div
          className="nav-chats h-full w-1/5 flex items-center justify-center rounded-xl hover:cursor-pointer"
          onClick={openChatPromptWindow}
        >
          <TextsmsIcon
            className={`${
              selectedPage.startsWith("chat/") ? "text-pink-600" : ""
            }`}
            fontSize="medium"
          />
        </div>

        <div className="w-1/5 flex justify-center">
          <div className="create-post flex justify-center items-center h-16 w-16 rounded-full bg-gradient-to-b from-pink-600 to-purple-700 -translate-y-2">
            <AddRoundedIcon fontSize="large" />
          </div>
        </div>

        <div
          className="nav-maps h-full w-1/5 flex items-center justify-center rounded-xl hover:cursor-pointer"
          onClick={() => handlePageSwitch("map")}
        >
          <PlaceIcon
            className={`${selectedPage === "maps" ? "text-pink-600" : ""}`}
            fontSize="medium"
          />
        </div>

        <div
          className="nav-profile h-full w-1/5 flex items-center justify-center rounded-xl hover:cursor-pointer"
          onClick={() => handlePageSwitch("profile")}
        >
          <Person2Icon
            className={`${selectedPage === "profile" ? "text-pink-600" : ""}`}
            fontSize="medium"
          />
        </div>
      </nav>
    </>
  );
};

export default NavBar;
