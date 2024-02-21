import { useState, useEffect } from "react";
import "./feedPostCard.css";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";

const FeedPostCard = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await fetch("http://localhost:5000/post/");
        const data = await response.json();
        setPostData(data.result); 
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };
    fetchPostData();
  }, []);

  const TimeGap = (date) => {
    const postTime = new Date(date);
    const currTime = new Date();

    // year ago
    let yearsGap = currTime.getFullYear() - postTime.getFullYear();
    if (yearsGap > 0) {
      return `${yearsGap} year${yearsGap > 1 ? "s" : ""} ago`;
    }

    // months ago
    let monthsGap = currTime.getMonth() - postTime.getMonth();
    if (monthsGap > 0) {
      return `${monthsGap} month${monthsGap > 1 ? "s" : ""} ago`;
    }

    // weeks ago
    let daysGap = currTime.getDate() - postTime.getDate();
    if (daysGap > 7) {
      return `${Math.round(daysGap / 7)} week${
        Math.round(daysGap / 7) > 1 ? "s" : ""
      } ago`;
    }

    // days ago
    if (daysGap > 0) {
      return `${daysGap} day${daysGap > 1 ? "s" : ""} ago`;
    }

    // hours ago
    let hoursGap = currTime.getHours() - postTime.getHours();
    if (hoursGap > 0) {
      return `${hoursGap} hour${hoursGap > 1 ? "s" : ""} ago`;
    }

    // minutes ago
    let minutesGap = currTime.getMinutes() - postTime.getMinutes();
    if (minutesGap > 0) {
      return `${minutesGap} minute${minutesGap > 1 ? "s" : ""} ago`;
    }

    // seconds ago
    let secondsGap = currTime.getSeconds() - postTime.getSeconds();
    return `${secondsGap} second${secondsGap > 1 ? "s" : ""} ago`;
  };

  const handleLikePress = () => {
    setIsLiked(!isLiked);
  };

  return (
    <>
      {postData &&
        postData.map((post) => (
          <div
            key={post._id}
            className="feed-post-container h-60 sm:h-80 md:h-96 rounded-xl overflow-hidden flex flex-col"
          >
            <div className="feed-post h-5/6 bg-gradient-to-r from-fuchsia-950 to-purple-950 rounded-b-3xl">
              <div className="feed-post-header w-full h-1/5 flex justify-start sm:p-1">
                <div className="feed-post-user flex justify-start items-center gap-3  h-full w-4/6 px-2">
                  <div className="feed-post-user-image rounded-full dark:bg-slate-700 h-8 w-8 md:h-10 md:w-10 flex justify-center items-center border-2 dark:border-white text-xl sm:text-2xl">
                    <i className="bx bxs-user"></i>
                  </div>
                  <p className="truncate text-sm sm:text-lg">{post.username}</p>
                </div>
                <div className="feed-post-header-utilities flex justify-end items-center gap-6 h-full w-2/6 ">
                  <p className="text-xs font-light">
                    {TimeGap(post.postedAt)}
                  </p>
                  <MoreVertOutlinedIcon className="dark:text-white" />
                </div>
              </div>
              <div className="feed-post-body w-full h-4/5 rounded-3xl object-cover overflow-hidden sm:max-h-fit">
                <img className="w-full" src={post.image} />
              </div>
            </div>
            <div className="feed-post-footer-utilities flex justify-between items-center w-full h-1/6 sm:py-2">
              <div className="feed-post-utils-set1 flex items-center gap-3 w-3/12 h-full px-2 text-3xl sm:text-5xl">
                {!isLiked ? (
                  <i className="bx bx-like" onClick={handleLikePress}></i>
                ) : (
                  <i className="bx bxs-like" onClick={handleLikePress}></i>
                )}
                <i className="bx bx-chat"></i>
              </div>
              <div className="feed-post-utils-set2 flex justify-end items-center gap-2 w-3/12 h-full px-2 text-3xl sm:text-5xl">
                <i className="bx bx-send -rotate-45 pl-1"></i>
                <i className="bx bx-bookmark-plus"></i>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default FeedPostCard;
