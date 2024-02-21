import "./receivedMessage.css";
import { useEffect, useState } from "react";
import axios from 'axios';

const ReceivedMessage = ({ message }) => {
  const userId = message.sender
  console.log(userId)
  const [username, setUsername] = useState('');

  const getUsername = async() => {
      await axios.post("http://localhost:5000/user/getuser",{userId}).then((response)=>{
      console.log(response.data.result.username)
      setUsername(response.data.result.username)
    })
  }
  useEffect(()=>{
    getUsername()
  },[])
  return (
    <div className="w-full flex flex-col gap-1">
      <div className="flex justify-start">
        <div className="sent-message-container h-fit w-fit max-w-72 p-4 bg-gradient-to-t from-slate-800 to-violet-800 flex flex-col gap-3 justify-center rounded-t-2xl rounded-br-2xl">
          <div className="sent-message-header font-semibold text-yellow-500">
            {username || message.sender}
          </div>
          <div className="sent-message-body">{message.message ||  message.text}</div>
        </div>
      </div>
      <div className="sent-message-footer text-sm font-thin text-start pl-2 text-gray-300">
        {message.timestamp}
      </div>
    </div>
  );
};

export default ReceivedMessage;