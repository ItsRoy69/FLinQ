import React, { useEffect, useState, useContext } from "react";
import "./chatAnonymous.css";
import { UserContext } from "../../../contexts/userContext";
import ChatHeader from "../../../components/chat/chat-container/chat-header/ChatHeader";
import ChatBody from "../../../components/chat/chat-container/chat-body/ChatBody";
import ChatFooter from "../../../components/chat/chat-container/chat-footer/ChatFooter";

const ChatAnonymous = () => {
  const [chatArray, setChatArray] = useState([]);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const userContext = useContext(UserContext);
  const { username } = userContext;

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/chat/messages`);
        if (response.ok) {
          const data = await response.json();
          setChatArray(data.result);
        } else {
          console.error("Failed to fetch chat data");
        }
      } catch (error) {
        console.error("Error fetching chat data:", error);
      }
    };

    fetchChatData();

    const intervalId = setInterval(fetchChatData, 5000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <ChatHeader roomName={"Incognito Chat"} />
      <ChatBody
        chatArray={chatArray}
        setChatArray={setChatArray}
        isScrollingUp={isScrollingUp}
        setIsScrollingUp={setIsScrollingUp}
      />
      <ChatFooter
        messagetype = "anonymous"
        apiEndPoint={`${import.meta.env.VITE_APP_BACKEND_URL}/chat/messages`}
        chatArray={chatArray}
        setChatArray={setChatArray}
        setIsScrollingUp={setIsScrollingUp}
        username={username}
      />
    </>
  );
};

export default ChatAnonymous;
