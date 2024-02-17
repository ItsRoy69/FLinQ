import { useState, useEffect, useRef } from "react";

import "./chatBody.css";

import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";

import ReceivedMessage from "../../received/ReceivedMessage";
import SentMessage from "../../sent/SentMessage";

const ChatBody = ({
  chatArray,
  setChatArray,
  isScrollingUp,
  setIsScrollingUp,
}) => {
  useEffect(() => {
    setChatArray([...chatArray]);
  }, []);

  // NECESSARIES FOR STARTING THE CHAT UI FROM BOTTOM

  const chatContainerBodyRef = useRef(null);

  const showFromBottom = () => {
    chatContainerBodyRef.current.scrollTop =
      chatContainerBodyRef.current.scrollHeight;
    // setTimeout(() => {
    document.removeEventListener("scroll", handleChatScroll);
    document.removeEventListener("wheel", handleChatScroll);
    // }, 1)
  };

  useEffect(() => {
    showFromBottom();
  }, [chatArray]);

  const handleChatScroll = () => {
    if (
      chatContainerBodyRef.current.scrollHeight -
        chatContainerBodyRef.current.scrollTop >
      700
    ) {
      setIsScrollingUp(true);
    } else {
      setIsScrollingUp(false);
    }
  };

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
          message.sender === "You" ? (
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
