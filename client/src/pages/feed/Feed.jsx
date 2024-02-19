import { useEffect, useState, useContext } from "react";

import "./feed.css";

import { dummyPostArray, dummyStatusArray } from "../../data/DummyFeed";
import { dummyUser } from "../../data/DummyUser";
import { UserContext } from "../../contexts/userContext";
import FeedPostCard from "../../components/feed/post/FeedPostCard";
import FeedStatusCard from "../../components/feed/status/FeedStatusCard";
import NavBar from "../../constants/navbar/NavBar";
import FeedSelector from "../../constants/feed-selector/FeedSelector";
import AlertIcon from "../../constants/alert/AlertIcon";

const Feed = () => {
  const [searchVal, setSearchVal] = useState("")
  const [page, setPage] = useState(1);
  const [postArray, setPostArray] = useState([]);
  const [statusArray, setStatusArray] = useState([]);
  const [user, setUser] = useState(dummyUser);

  const usercontext = useContext(UserContext);

  useEffect(() => {
    setPostArray(dummyPostArray);
    setStatusArray(dummyStatusArray);
  }, []);

  useEffect(() => {
    const feedBody = document.getElementById("feed-body");
    const handleScroll = () => {
      if (
        feedBody.scrollHeight - feedBody.offsetHeight - feedBody.scrollTop <
        1
      ) {
        // bottom touched
        setPostArray([...postArray, ...dummyPostArray]);
        window.removeEventListener("wheel", handleScroll);
        window.removeEventListener("scroll", handleScroll);
        setTimeout(() => {
          setPage((page) => page + 1);
        }, 1000);
      }
    };

    window.addEventListener("wheel", handleScroll);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page]);

  const handleSearchValChange = (e) => {
    setSearchVal(e.target.value);
  };

  return (
    <>
      <div className="feed-header-card h-16 flex justify-between items-center fixed top-0 left-0 px-4 w-full z-10 bg-inherit dark:bg-slate-900 dark:text-white">
        <div className="feed-header-greet flex flex-col justify-center items-start w-fit max-w-4/5 h-12">
          <p className="font-medium truncate w-full">
            Hello {usercontext.user.name}
          </p>
          <p className="text-xs sm:text-lg font-thin">
            Find your interests here!
          </p>
        </div>
        <AlertIcon />
      </div>

      <div
        id="feed-body"
        className="feed-body h-screen dark:bg-slate-900 dark:text-white px-4 overflow-auto pb-16"
      >
        <div className="feed-contents-extra flex flex-col gap-4 mt-20">
          <div className="feed-search-card flex justify-between items-center gap-2 h-16">
            <img src={user.dp} className="h-16 w-16 ml-1 rounded-2xl" />
            <input
              type="text"
              value={searchVal}
              onInput={handleSearchValChange}
              placeholder="Search Recent Posts..."
              className="bg-slate-700 rounded-3xl h-12 w-3/4 px-5 focus:outline-purple-800"
            />
          </div>
          <div className="feed-status-card h-20 w-full flex items-center gap-4 overflow-x-auto">
            <div
              className="feed-status-add-button h-16 w-16 ml-1 rounded-2xl flex items-center justify-center bg-cover overflow-hidden"
              style={{
                backgroundImage: `url(${dummyUser.dp})`,
              }}
            >
              <div className="add-icon w-full h-full flex items-center justify-center text-inherit backdrop-blur-[1px]">
                <i className="h-2/5 w-2/5 flex items-center justify-center bx bxs-plus-square text-2xl"></i>
              </div>
            </div>
            <div className="feed-status-content flex items-center gap-4 overflow-x-auto">
              {statusArray.map((status, index) => (
                <FeedStatusCard key={index} status={status} />
              ))}
            </div>
          </div>
          <FeedSelector />
        </div>

        <div className="feed-container overflow-auto mt-2">
          <p className="font-semibold mb-1">Posts</p>
          <div className="feed-post-container-body flex flex-col gap-2">
            {postArray.map((post, index) => (
              <FeedPostCard key={index} post={post} />
            ))}
          </div>
        </div>
      </div>
      <NavBar />
    </>
  );
};

export default Feed;
