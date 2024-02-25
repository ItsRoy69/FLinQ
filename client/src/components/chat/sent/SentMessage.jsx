import "./sentMessage.css";

const SentMessage = ({ message }) => {
  console.log("message ",message)
  return (
    <div className="w-full flex flex-col gap-1">
      <div className="flex justify-end">
        <div className="sent-message-container h-fit w-fit max-w-72 p-4  bg-gradient-to-t from-violet-900 to-pink-700 flex flex-col gap-3 justify-center rounded-t-2xl rounded-bl-2xl">
          <div className="sent-message-header font-semibold text-pink-400">
            You
          </div>
          <div className="sent-message-body">
            {message.message || message.text}
          </div>
        </div>
      </div>
      {window.location.pathname === "/chat/anonymous" ||
      window.location.pathname === "/chat/aibot" ? (
        <div className="sent-message-footer text-sm font-thin text-end pl-2 text-gray-300">
          {message.timestamp.substring(11,16)}
        </div>
      ) : (
        <div className="sent-message-footer text-sm font-thin text-end pl-2 text-gray-300">
          {message.timestamp|| message.createdAt.substring(11,16)}
        </div>
      )}
    </div>
  );
};

export default SentMessage;
