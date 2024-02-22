import "./sentMessage.css";
import {useState, useEffect} from 'react';
import axios from 'axios'

const SentMessage = ({ message }) => {
  const [username, setUsername] = useState('');

  if(message.sender != "Bot")  {
      const userId = message.sender
      console.log("userId:",userId)
      const getUsername = async() => {
        await axios.post(`http://localhost:5000/user/getuser/${userId}`,{userId}).then((response)=>{
        console.log(response.data.result.username)
        setUsername(response.data.result.username)
      })
    }
    useEffect(()=>{
      getUsername()
    },[])
  }
  return (
    <div className="w-full flex flex-col gap-1">
      <div className="flex justify-end">
        <div className="sent-message-container h-fit w-fit max-w-72 p-4  bg-gradient-to-t from-violet-900 to-pink-700 flex flex-col gap-3 justify-center rounded-t-2xl rounded-bl-2xl">
          <div className="sent-message-header font-semibold text-pink-400">
            {message.sender || username}
          </div>
          <div className="sent-message-body">{message.message||message.text}</div>
        </div>
      </div>

      <div className="sent-message-footer text-sm font-thin text-end pr-2 text-gray-300">
        {message.timestamp}
      </div>
    </div>
  );
};

export default SentMessage;