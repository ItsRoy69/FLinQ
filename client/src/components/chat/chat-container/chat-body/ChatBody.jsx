import { useState, useEffect, useRef, useContext } from "react";

import "./chatBody.css";
import SentMessage from "../../sent/SentMessage";
import ReceivedMessage from "../../received/ReceivedMessage";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import { UserContext } from "../../../../contexts/userContext";
const ChatBody = ({
  chatArray,
  setChatArray,
  isScrollingUp,
  setIsScrollingUp,
}) => {
  const chatContainerBodyRef = useRef(null);
  const { user } = useContext(UserContext);

  const showFromBottom = () => {
    chatContainerBodyRef.current.scrollTop =
      chatContainerBodyRef.current.scrollHeight;
    document.removeEventListener("scroll", handleChatScroll);
    document.removeEventListener("wheel", handleChatScroll);
  };

  const handleChatScroll = () => {
    const isScrolledUp =
      chatContainerBodyRef.current.scrollHeight -
        chatContainerBodyRef.current.scrollTop >
      700;
    setIsScrollingUp(isScrolledUp);
  };

  useEffect(() => {
    showFromBottom();
  }, [chatArray]);

  useEffect(() => {
    document.addEventListener("scroll", handleChatScroll);
    document.addEventListener("wheel", handleChatScroll);
    return () => {
      document.removeEventListener("scroll", handleChatScroll);
      document.removeEventListener("wheel", handleChatScroll);
    };
  }, []);

  return (
    <>
      <div
        id="chat-container-body"
        className="chat-container flex flex-col gap-2 w-screen h-screen px-4 py-20 dark:bg-custom-dark dark:text-white overflow-y-auto"
        ref={chatContainerBodyRef}
      >
        {chatArray.map((message, index) =>
          message.sender === user.username ? (
            <SentMessage message={message} key={index} />
          ) : (
            <ReceivedMessage message={message} key={index} />
          )
        )}
      </div>
      {isScrollingUp && (
        <div
          className="w-10 h-10 fixed bottom-24 right-8 border border-slate-600 rounded-full dark:bg-custom-dark dark:text-white flex items-center justify-center"
          onClick={showFromBottom}
        >
          <ArrowDownwardRoundedIcon />
        </div>
      )}
    </>
  );
};

export default ChatBody;
