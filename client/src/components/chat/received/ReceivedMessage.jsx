import "./receivedMessage.css";

const ReceivedMessage = ({ message }) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <div className="flex justify-start">
        <div className="sent-message-container h-fit w-fit max-w-72 p-4 bg-gradient-to-t from-slate-800 to-violet-800 flex flex-col gap-3 justify-center rounded-t-2xl rounded-br-2xl">
          <div className="sent-message-header font-semibold text-yellow-500">
            {message.sender}
          </div>
          <div className="sent-message-body">{message.text}</div>
        </div>
      </div>
      <div className="sent-message-footer text-sm font-thin text-start pl-2 text-gray-300">
        {message.timestamp}
      </div>
    </div>
  );
};

export default ReceivedMessage;
