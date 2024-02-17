import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import "./feedSelector.css";

import FeedTypeContext from "../../contexts/FeedTypeContext";

const FeedSelector = () => {
  const feedTypeContext = useContext(FeedTypeContext);

  const navigate = useNavigate();

  const handleFeedChange = (feedtype) => {
    feedTypeContext.handleSelectFeed(feedtype);
    setTimeout(() => {
      navigate(`/${feedtype}`);
    }, 100);
  };

  return (
    <div className="feed-type-selector border dark:border-slate-400 bg-gradient-to-b dark:from-gray-800 dark:to-slate-900 rounded-3xl h-20 w-full flex items-center justify-evenly gap-2 p-3">
      <button
        className={` w-2/6 rounded-2xl h-4/6 ${
          feedTypeContext.selectedFeed === "feed" ? "bg-purple-900" : ""
        }`}
        onClick={() => handleFeedChange("feed")}
      >
        Recent
      </button>
      <button
        className={`w-2/6 rounded-2xl h-4/6 ${
          feedTypeContext.selectedFeed === "jobs" ? "bg-purple-900" : ""
        }`}
        onClick={() => handleFeedChange("jobs")}
      >
        Jobs
      </button>
      <button
        className={`w-2/6 rounded-2xl h-4/6 ${
          feedTypeContext.selectedFeed === "events" ? "bg-purple-900" : ""
        }`}
        onClick={() => handleFeedChange("events")}
      >
        Events
      </button>
    </div>
  );
};

export default FeedSelector;
