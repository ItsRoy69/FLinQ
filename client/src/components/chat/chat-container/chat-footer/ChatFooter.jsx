import React, { useState, useEffect, useContext } from "react";
import MicRoundedIcon from "@mui/icons-material/MicRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { UserContext } from "../../../../contexts/userContext";

const ChatFooter = ({
  setChatArray,
  chatArray,
  setIsScrollingUp,
  apiEndPoint,
  groupId,
  messagetype
}) => {
  const usercontext = useContext(UserContext);
  const [user,setUser] = useState({})
  const storedUser = localStorage.getItem('userData');
  useEffect(()=>{
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  },[])
 
  const [queryInputVal, setQueryInputVal] = useState("");

  const handleQueryInputChange = (e) => {
    setQueryInputVal(e.target.value);
  };

  const sendQuery = async () => {
    if (queryInputVal?.length > 0) {
      
      const date = new Date();
      
      const newMessage = {
        sender: user.username || "Anonymous",
        senderId: user._id,
        text: queryInputVal,
        message: queryInputVal,
        messagetype : messagetype,
        question: queryInputVal,
        timestamp: date.toISOString(),
        groupId: groupId,
        type: "sent",
      };
      console.log("newMessage",newMessage)
      setChatArray([...chatArray,newMessage])
      let responseData;
      try {
        const response = await fetch(`${apiEndPoint}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMessage),
        });
        responseData = await response.json();
        if (!response.ok) {
          console.error("Failed to send message to the server");
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }
      if (responseData.response) {
        console.log("response found");
        const responseMessage = {
          sender: "Bot",
          text: responseData.response,
          timestamp: date.toString(),
          type: "received",
        };
        setChatArray([...chatArray, newMessage, responseMessage]);
      } else {
        setChatArray([...chatArray, newMessage]);
      }
      setQueryInputVal("");
      setIsScrollingUp(false);
    }
  };
  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
      sendQuery();
    }
  };

  useEffect(() => {
    const chatFooter = document.getElementById("chat-footer");

    chatFooter.addEventListener("keydown", handleEnterPress);

    return () => {
      chatFooter.removeEventListener("keydown", handleEnterPress);
    };
  }, []);

  return (
    <div
      id="chat-footer"
      className="chat-footer fixed bottom-0 left-0 w-full h-16 p-2 z-10 dark:bg-custom-dark flex items-center border-t border-t-slate-600"
    >
      <input
        className="bg-gradient-to-b dark:from-gray-800 dark:to-slate-900 rounded-3xl h-full w-full border border-slate-600 focus:outline-none outline-purple-800 py-2 pl-4 pr-12 dark:text-white"
        type="text"
        placeholder="Ask something..."
        value={queryInputVal}
        onChange={handleQueryInputChange}
        onKeyDown={handleEnterPress}
      />
      {queryInputVal?.length > 0 ? (
        <div
          className="mic-container fixed right-3 w-10 h-10 dark:text-white  border-slate-600 flex items-center justify-center"
          onClick={sendQuery}
        >
          <SendRoundedIcon />
        </div>
      ) : (
        <div className="mic-container fixed right-3 w-10 h-10 rounded-full dark:text-white border border-slate-600 flex items-center justify-center">
          <MicRoundedIcon />
        </div>
      )}
    </div>
  );
};

export default ChatFooter;
