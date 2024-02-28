import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../contexts/userContext";
import { dummyEventsArray } from "../../data/DummyEvent";

import "./event.css";
import axios from 'axios';
import EventCard from "../../components/event/EventCard";
import FeedSelector from "../../constants/feed-selector/FeedSelector";
import SearchJobs from "../../constants/search/SearchJobs";
import AlertIcon from "../../constants/alert/AlertIcon";

//icons
import AddRounded from "@mui/icons-material/AddRounded";

const Event = () => {

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [eventArray, setEventArray] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/events/`).then((response) =>{
      setEventArray(response.data.result);
    }).catch((err)=>{
      console.log(err)
    })
   
  }, []);
  
  useEffect(() => {
    const eventBody = document.getElementById("event-container-body");
    const handleScroll = () => {
      if (
        eventBody.scrollHeight - eventBody.offsetHeight - eventBody.scrollTop <
        1
      ) {
        // bottom touched
        setEventArray([...eventArray, ...eventArray]);
        window.removeEventListener("wheel", handleScroll);
        setTimeout(() => {
          setPage((page) => page + 1);
        }, 1000);
      }
    };

    window.addEventListener("wheel", handleScroll);
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [page]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSearchValChange = (e) => {
    setSearchVal(e.target.value);
  };

  const handleAddEvent = () => {
    console.log("Addition triggered");
  };

  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearchOpen = () => {
    setSearchOpen(true);
  };

  const handleSearchClose = () => {
    setSearchOpen(false);
  };

  return (
    <>
      {searchOpen && (
        <SearchJobs searchClose={handleSearchClose} feedType={"events"} />
      )}
      <div className="dark:bg-custom-dark dark:text-white">
        <div className="jobs-header fixed top-0 left-0 h-16 w-full dark:bg-custom-dark flex justify-between items-center px-4 z-10">
          <div className="jobs-header-title w-full flex justify-start">
            <input
              type="text"
              placeholder="Search Events..."
              className="dark:bg-slate-800 rounded-3xl h-12 w-5/6 px-5 focus:outline-none focus:outline-purple-800"
              onClick={handleSearchOpen}
            />
          </div>
          <AlertIcon />
        </div>

        <div className="event-container pt-16 pb-10 px-4 mt-2 flex flex-col w-screen min-h-screen h-fit">
          <FeedSelector />

          <div className="pb-2">
            <p className="text-lg font-semibold pt-2">Upcoming Events</p>
          </div>

          <div
            id="event-container-body"
            className=" min-h-screen h-fit w-full flex flex-col gap-3 overflow-y-auto"
          >
            {eventArray.map(
              (event, index) =>
                 (
                  <EventCard key={index} event={event} />
                )
            )}
          </div>

          <div
            className="fixed bottom-[20px] right-[20px] bg-gradient-to-tr from-purple-700 to-pink-600 rounded-full border border-white h-[60px] w-[60px] flex justify-center items-center shadow-sm z-10"
            onClick={handleAddEvent}
          >
            <AddRounded fontSize="large" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Event;
