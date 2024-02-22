import "./communityChatCard.css";

const CommunityChatCard = ({ handlePageSwitch, community }) => {
  return (
    <div
      className="w-full h-16 flex cursor-pointer bg-gradient-to-t from-slate-800 to-slate-700 rounded-2xl items-center justify-between py-2 px-4 text-xl"
      onClick={() =>
        handlePageSwitch(
          `chat/community/?comm=${community.name}&g_id=${community._id}`
        )
      }
    >
      {community.name}
    </div>
  );
};

export default CommunityChatCard;
