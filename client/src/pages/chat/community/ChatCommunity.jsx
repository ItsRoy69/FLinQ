import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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
  const community_id = queryParams.get("g_id");
  const [communityArray, setCommunityArray] = useState([]);
  const [community, setCommunity] = useState({});
  const [chatArray, setChatArray] = useState([]);

  useEffect(() => {
    axios
      .get("https://flinq-backend.onrender.com/group/")
      .then((response) => {
        setCommunityArray(response.data.groups);
       
        if (communityParam === null) {
          navigate("/feed");
        } else {
          const foundCommunity = response.data.groups.find(
            (community) => community.name === communityParam
          );
        
          if (foundCommunity) {
            setCommunity(foundCommunity);
            setChatArray(...chatArray, foundCommunity.messages);
           
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
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
        apiEndPoint={"https://flinq-backend.onrender.com/group/joingroup"}
        chatArray={chatArray}
        setChatArray={setChatArray}
        setIsScrollingUp={setIsScrollingUp}
        groupId={community_id}
      />
    </>
  );
};

export default ChatCommunity;
