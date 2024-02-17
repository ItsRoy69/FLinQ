import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "./chatCommunity.css";

import { DummyChatCommunityArray } from "../../../data/DummyChatCommunity";

import ChatHeader from "../../../components/chat/chat-container/chat-header/ChatHeader";
import ChatBody from "../../../components/chat/chat-container/chat-body/ChatBody";
import ChatFooter from "../../../components/chat/chat-container/chat-footer/ChatFooter";

const ChatCommunity = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const communityParam = queryParams.get("comm");

  const [community, setCommunity] = useState({});
  const [chatArray, setChatArray] = useState([]);

  useEffect(() => {
    if (communityParam === null) {
      navigate("/feed");
    } else {
      DummyChatCommunityArray.map((community) => {
        if (community.name === communityParam) {
          setCommunity(community);
          setChatArray(community.chatHistory);
        }
      });
    }
  }, []);

  const [isScrollingUp, setIsScrollingUp] = useState(false);

  return (
    <>
      <ChatHeader roomName={community.name} />
      <ChatBody
        chatArray={chatArray}
        setChatArray={setChatArray}
        isScrollingUp={isScrollingUp}
        setIsScrollingUp={setIsScrollingUp}
      />
      <ChatFooter
        chatArray={chatArray}
        setChatArray={setChatArray}
        setIsScrollingUp={setIsScrollingUp}
      />
    </>
  );
};

export default ChatCommunity;
