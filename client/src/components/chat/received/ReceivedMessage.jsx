import "./receivedMessage.css";
import { useEffect, useState } from "react";
import axios from "axios";

const ReceivedMessage = ({ message }) => {
  const [username, setUsername] = useState("");

  if (message.sender != "Bot") {
    const userId = message.sender;
    const getUsername = async () => {
      await axios
        .post(`${import.meta.env.VITE_APP_BACKEND_URL}/user/getuser/${userId}`, {
          userId,
        })
        .then((response) => {
          console.log(response.data.result.username);
          setUsername(response.data.result.username);
        })
        .catch((error) => {
          console.log(error);
          setUsername("Unknown User");
        });
    };
    useEffect(() => {
      getUsername();
    }, []);
  }

  return (
    <div className="w-full flex flex-col gap-1">
      <div className="flex justify-start">
        <div className="sent-message-container h-fit w-fit max-w-72 p-4 bg-gradient-to-t from-slate-800 to-violet-800 flex flex-col gap-3 justify-center rounded-t-2xl rounded-br-2xl">
          {window.location.pathname === "/chat/anonymous" ? (
            <>
              <div className="sent-message-header font-semibold text-yellow-500">
                Anonymous
              </div>
            </>
          ) : (
            <>
              <div className="sent-message-header font-semibold text-yellow-500">
                {username || message.sender}
              </div>
            </>
          )}
          <div className="sent-message-body">
            {message.message || message.text}
          </div>
        </div>
      </div>
      {window.location.pathname === "/chat/anonymous" ||
      window.location.pathname === "/chat/aibot" ? (
        <div className="sent-message-footer text-sm font-thin text-start pl-2 text-gray-300">
          {message.timestamp.substring(11, 16)}
        </div>
      ) : (
        <div className="sent-message-footer text-sm font-thin text-start pl-2 text-gray-300">
          {message.createdAt.substring(11, 16)}
        </div>
      )}
    </div>
  );
};

export default ReceivedMessage;
