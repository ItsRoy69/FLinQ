import { useState, useEffect } from "react";

import "./chatBot.css";

import ChatHeader from "../../../components/chat/chat-container/chat-header/ChatHeader";
import ChatBody from "../../../components/chat/chat-container/chat-body/ChatBody";
import ChatFooter from "../../../components/chat/chat-container/chat-footer/ChatFooter";

const ChatBot = () => {
  const [chatArray, setChatArray] = useState([]);

  const [isScrollingUp, setIsScrollingUp] = useState(false);

  return (
    <>
      <ChatHeader roomName={"Helpyy"} />
      <ChatBody
        chatArray={chatArray}
        setChatArray={setChatArray}
        isScrollingUp={isScrollingUp}
        setIsScrollingUp={setIsScrollingUp}
      />
      <ChatFooter
        apiEndPoint={"https://flinq-chatbot.onrender.com/chat"}
        chatArray={chatArray}
        setChatArray={setChatArray}
        setIsScrollingUp={setIsScrollingUp}
      />
    </>
  );
};

export default ChatBot;
