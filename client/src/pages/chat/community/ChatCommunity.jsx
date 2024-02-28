import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./chatCommunity.css";
import axios from "axios";

import ChatHeader from "../../../components/chat/chat-container/chat-header/ChatHeader";
import ChatBody from "../../../components/chat/chat-container/chat-body/ChatBody";
import ChatFooter from "../../../components/chat/chat-container/chat-footer/ChatFooter";

const ChatCommunity = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const communityParam = queryParams.get("comm");
  const groupId = queryParams.get("g_id");
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [community, setCommunity] = useState({});
  const [chatArray, setChatArray] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_BACKEND_URL}/group/`)
      .then((response) => {
        const foundCommunity = response.data.groups.find(
          (community) => community.name === communityParam
        );

        if (foundCommunity) {
          setCommunity(foundCommunity);
          setChatArray(foundCommunity.messages);
        } else {
          navigate("/feed");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [communityParam, navigate]);

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
        messagetype="community"
        apiEndPoint={`${import.meta.env.VITE_APP_BACKEND_URL}/group/joingroup`}
        setChatArray={setChatArray}
        chatArray={chatArray}
        setIsScrollingUp={setIsScrollingUp}
        groupId={groupId}
      />
    </>
  );
};

export default ChatCommunity;
