import { useState, useEffect } from "react";
import { useContext } from "react";

import "./chatCommunityPrompt.css";
import axios from "axios";
import CommunityChatCard from "./community-chat-card/CommunityChatCard";
import { DummyChatCommunityArray } from "../../../data/DummyChatCommunity";
import { UserContext } from "../../../contexts/userContext";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";

const ChatCommunityPrompt = ({
  handlePageSwitch,
  handleChatCommunityPromptClose,
}) => {
  const [communityChatArray, setCommunityChatArray] = useState([]);

  const usercontext = useContext(UserContext);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_BACKEND_URL}/group/`)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          setCommunityChatArray(response.data.groups);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [commAddPromptOpen, setCommAddPromptOpen] = useState(false);
  const [newCommunityName, setNewCommunityName] = useState("");
  const [addCommunityError, setAddCommunityError] = useState("");

  const handleCommunityNameChange = (e) => {
    setAddCommunityError("");
    setNewCommunityName(e.target.value);
  };

  const handleCommAddPromptOpen = () => {
    setCommAddPromptOpen(true);
  };

  const handleCommAddPromptClose = () => {
    setCommAddPromptOpen(false);
    setAddCommunityError("");
  };

  const addCommunity = () => {
    if (newCommunityName?.length > 0) {
      const newCommunity = {
        name: newCommunityName,
      };
      axios
        .post(`${import.meta.env.VITE_APP_BACKEND_URL}/group/creategroup`, {
          groupName: newCommunity.name,
          sender: usercontext.user._id,
        })
        .then((response) => {
          console.log(response);
          if (response.status == 201) {
            axios
              .get(`${import.meta.env.VITE_APP_BACKEND_URL}/group/`)
              .then((response) => {
                console.log(response);
                if (response.status === 200) {
                  setCommunityChatArray(response.data.groups);
                  setNewCommunityName("");
                  setCommAddPromptOpen(false);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setAddCommunityError("Community name cannot be blank.");
    }
  };

  return (
    <>
      <div className="w-full h-fit flex items-center justify-between">
        {commAddPromptOpen ? (
          <>
            <input
              id="add-community-input"
              type="text"
              placeholder="Add New Community..."
              value={newCommunityName}
              onInput={handleCommunityNameChange}
              className="bg-gradient-to-b dark:from-gray-800 dark:to-slate-900 rounded-3xl h-full w-full border border-slate-600 focus:outline-none outline-purple-800 py-2 px-4 dark:text-white"
            />
            <div
              id="add-community-accept"
              className="w-10 h-full flex items-center justify-center border-r border-slate-600 hover:cursor-pointer"
              onClick={() => addCommunity()}
            >
              <DoneRoundedIcon />
            </div>
            <div
              id="add-community-cancel"
              className="w-10 h-full flex items-center justify-center hover:cursor-pointer"
              onClick={() => handleCommAddPromptClose()}
            >
              <CloseRoundedIcon />
            </div>
          </>
        ) : (
          <>
            <div
              id="back-to-chat-prompt"
              className="h-10 w-fit rounded-xl flex justify-center items-center gap-2 hover:cursor-pointer"
              onClick={() => handleChatCommunityPromptClose()}
            >
              <ArrowBackRoundedIcon />
              <p className="text-lg font-thin">Go Back</p>
            </div>
            <div
              id="add-community"
              className="flex w-fit gap-2 items-center border border-slate-600 rounded-xl px-2 hover:cursor-pointer"
              onClick={handleCommAddPromptOpen}
            >
              <p id="add-community-text" className="text-lg font-thin">
                Add
              </p>
              <AddRoundedIcon id="add-community-icon" />
            </div>
          </>
        )}
      </div>

      {addCommunityError?.length > 0 && (
        <div className="text-red-300 text-sm font-semibold text-center">
          {addCommunityError}
        </div>
      )}

      <div className="flex flex-col gap-4">
        {communityChatArray.length === 0 ? (
          <p>No groups to show</p>
        ) : (
          communityChatArray.map((community, index) => (
            <CommunityChatCard
              handlePageSwitch={handlePageSwitch}
              community={community}
              key={index}
            />
          ))
        )}
      </div>
    </>
  );
};

export default ChatCommunityPrompt;
