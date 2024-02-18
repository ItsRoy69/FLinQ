import "./feedStatusCard.css";

const FeedStatusCard = ({ status }) => {
  return (
    <div
      className={`feed-status-container  ${
        !status.seen
          ? "h-[68px] w-[68px] bg-gradient-to-b from-pink-600 to-purple-700"
          : "h-16 w-16"
      } rounded-2xl flex justify-center items-center`}
    >
      <img
        src={status.image}
        className={`h-16 w-16 rounded-2xl aspect-square ${
          !status.seen ? "m-0.5" : ""
        }`}
      />
    </div>
  );
};

export default FeedStatusCard;
