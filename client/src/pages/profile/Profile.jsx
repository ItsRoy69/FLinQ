import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavBar from "../../constants/navbar/NavBar";

const Profile = () => {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  const usercontext = useContext(UserContext);
  useEffect(() => {
    setUser(usercontext.user);
  }, []);
  const handleBackClick = () => {
    navigate("/feed");
  };
  const handleEditProfileClick = () => {
    navigate("/edit");
  };
  const handleLogout = () => {
    localStorage.removeItem("userData");
    usercontext.logout();
    navigate("/");
  };
  return (
    <div className="container bg-slate-900 min-h-screen font-sans text-white">
      <div className="divide-y divide-solid px-4 w-full h-full">
        <div className="flex flex-col items-center w-full p-0 mb-2 ">
          <div className="flex justify-between items-center text-2xl mt-5 mb-3 font-semibold ">
            <div
              className="header-backarrow w-9 h-9 rounded-xl p-2 border-2 border-solid bg-white flex justify-center items-center dark:text-slate-900 absolute top-5 left-3"
              onClick={handleBackClick}
            >
              <ArrowBackIcon />
            </div>
            <div className="jobs-header-title w-full flex justify-center">
              <p className="text-2xl font-semibold">Profile</p>
            </div>
          </div>
          <div className="flex justify-center items-center border-white ">
            <img
              className="w-[100px] h-[100px] mt-5 rounded-full border-2 border-white  p-2"
              src={user.image}
              alt="profile"
            ></img>
          </div>
          <div className="flex justify-center items-center  text-xl text-white m-[5px] ">
            {user.name}
          </div>
          <div className="flex justify-center items-center  text-lg text-stone-600 mb-2">
            {user.username}
          </div>
          <button
            onClick={handleEditProfileClick}
            className="flex justify-center items-center text-xl rounded-[10px] text-black border-solid border-none bg-white border-2 cursor-pointer m-[12px] mb-5 py-2 px-5"
          >
            Edit Profile
          </button>
        </div>
        <div className="flex flex-col items-start w-full p-0 m-0 mb-5">
          <ul className="mt-2">
            <div className="flex justify-between items-start ">
              <div>
                <li className="flex m-2 font-sans text-xl">
                  <span className="mr-4">
                    <FontAwesomeIcon
                      icon={faMapLocationDot}
                      className="px-2 h-6 w-6"
                    />
                  </span>
                  Address
                </li>
              </div>
              <div>
                <span className="ml-auto absolute m-2 right-5">
                  <FontAwesomeIcon icon={faAngleRight} />
                </span>
              </div>
            </div>
            <div className="flex justify-between items-start ">
              <div>
                <li className="flex m-2 font-sans text-xl">
                  <span className="mr-4">
                    <FontAwesomeIcon icon={faLock} className="px-2 h-6 w-6" />
                  </span>
                  Change Password
                </li>
              </div>
              <div>
                <span className="ml-auto absolute m-2 right-5">
                  <FontAwesomeIcon icon={faAngleRight} />
                </span>
              </div>
            </div>
          </ul>
        </div>
        <div className="flex flex-col items-start w-full p-0 m-0 mb-5">
          <ul className="mt-2">
            <div className="flex justify-between items-start ">
              <div>
                <li className="flex m-2 font-sans text-xl">
                  <span className="mr-4">
                    <FontAwesomeIcon
                      icon={faCircleQuestion}
                      className="px-2 h-6 w-6"
                    />
                  </span>
                  Help and Support
                </li>
              </div>
              <div>
                <span className="ml-auto absolute m-2 right-5">
                  <FontAwesomeIcon icon={faAngleRight} />
                </span>
              </div>
            </div>
            <div className="flex justify-between items-start ">
              <div onClick={handleLogout}>
                <li className="flex m-2 font-sans text-xl cursor-pointer">
                  <span className="mr-4">
                    <FontAwesomeIcon
                      icon={faArrowRightFromBracket}
                      className="px-2 h-6 w-6"
                    />
                  </span>
                  Logout
                </li>
              </div>
            </div>
          </ul>
        </div>
      </div>
      <NavBar />
    </div>
  );
};

export default Profile;
