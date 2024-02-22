import { useNavigate } from "react-router-dom";

import "./chatHeader.css";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AlertIcon from "../../../../constants/alert/AlertIcon";

const ChatHeader = ({ roomName }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="chat-header fixed top-0 left-0 h-16 w-full dark:bg-custom-dark dark:text-white flex justify-between items-center px-4 z-10 border-b border-b-slate-600">
      <div
        className="header-backarrow w-8 h-8 rounded-xl dark:bg-rose-500 flex justify-center items-center dark:text-slate-900 absolute"
        onClick={handleBackClick}
      >
        <ArrowBackRoundedIcon />
      </div>
      <div className="jobs-header-title w-full flex justify-center">
        <p className="text-2xl font-semibold text-center">{roomName}</p>
      </div>
      <AlertIcon />
    </div>
  );
};

export default ChatHeader;
