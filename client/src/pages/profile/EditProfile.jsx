import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Editprofile.css";
import { UserContext } from "../../contexts/userContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const EditProfile = () => {
  const navigate = useNavigate();
  const [documentFile, setDocumentFile] = useState(null);
  const [user, setUser] = useState([]);
  const usercontext = useContext(UserContext);
  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const [creds, setcreds] = useState({
    email: user.email,
    password: user.password,
    username: user.username,
    phone: user.phone,
    name: user.name,
    occupation: user.occupation,
    birthdate: user.birthdate,
    gender: user.gender,
    image: user.image,
  });

  const handleBackClick = () => {
    navigate("/profile");
  };
  const handleSaveClick = (e) => {
    try {
      if (profilePhoto) {
        const base64Image = profilePhoto.split(",")[1];
        const blob = atob(base64Image);
        const arrayBuffer = new ArrayBuffer(blob.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < blob.length; i++) {
          uint8Array[i] = blob.charCodeAt(i);
        }

        const imageSizeInBytes = uint8Array.length;
        const imageSizeInKB = imageSizeInBytes / 1024;

        if (imageSizeInKB > 50) {
          alert("Image size should be within 50KB.");
          return;
        }

        const formData = new FormData();
        formData.append("file", documentFile);
        formData.append("name", creds.name);

        // Send document file to the server
        const response =  axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/uploadDocument`, formData);
        console.log(response.data);
      }
      const userId = user._id;
      e.preventDefault();

      axios
        .put(
          `${import.meta.env.VITE_APP_BACKEND_URL}/user/update/${userId}`,
          creds
        )
        .then((response) => {
          if (response.status == 200) {
            const updatedUserData = response.data.result || response.data.user;
            usercontext.updateUser(response.data.result);
            saveUserDataToLocalStorage(updatedUserData);
            navigate("/profile");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      setProfilePhoto(user.image);
      console.log("Failed to upload image");
    }
  };

  const [profilePhoto, setProfilePhoto] = useState(null);

  const handleChange = (e) => {
    setcreds({ ...creds, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePhoto(e.target.result);
        setcreds({ ...creds, image: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    document.getElementById("fileInput").click();
  };
  const saveUserDataToLocalStorage = (userData) => {
    localStorage.setItem("userData", JSON.stringify(userData));
  };

  const handleDocumentChange = (e) => {
    const file = e.target.files[0];
    setDocumentFile(file);
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
              <p className="text-2xl font-semibold">Edit Profile</p>
            </div>
          </div>
          <div className="flex relative justify-center items-center border-white">
            {profilePhoto ? (
              <img
                className="w-[100px] h-[100px] mt-5 rounded-full border-2 border-white p-2 cursor-pointer"
                src={profilePhoto}
                value={creds.image}
                alt="profile"
                onClick={handleImageClick}
              />
            ) : (
              <img
                className="w-[100px] h-[100px] mt-5 rounded-full border-2 border-white p-2 cursor-pointer"
                src={user.image}
                alt="profile"
                onClick={handleImageClick}
              />
            )}
            <span className="absolute right-0 bottom-[-2px]">
              <FontAwesomeIcon
                className="border-2 rounded-[50%] p-2 bg-white text-black cursor-pointer"
                icon={faCamera}
                onClick={handleImageClick}
              />
            </span>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>
          <div className="flex justify-center items-center  text-xl text-white m-[5px] ">
            {user.name}
          </div>
          <div className="flex justify-center items-center  text-lg text-stone-600 mb-2">
            {user.username}
          </div>
          <div className="w-full relative border-2 mt-2 border-slate-500 rounded-[10px]">
            <label
              htmlFor="fileInput"
              className="cursor-pointer w-full bg-transparent mt-4 px-2  py-1.5 focus:outline-none peer"
            >
              Upload Identity Document
            </label>
            <input
              id="fileInput"
              type="file"
              accept=".jpg, .jpeg, .png, .pdf, .doc, .docx"
              style={{ display: "none" }}
              onChange={handleDocumentChange}
            />
          </div>
        </div>
        <div className="flex flex-col  p-1 mt-3">
          <div className="w-full relative border-2 mt-2 border-slate-500 rounded-[10px]">
            <input
              type="text"
              id="fullname"
              value={creds.name}
              onChange={handleChange}
              name="name"
              className=" w-full bg-transparent mt-4 px-2  py-1.5 focus:outline-none peer"
            />
            <label
              htmlFor="fullname"
              className="absolute left-0 pt-1 px-2  text-slate-400 peer-focus:text-xs cursor-text transition-all peer-focus:top-[-2px] peer-focus:text-slate-600"
            >
              Full Name
            </label>
          </div>
          <div className="flex">
            <div className="w-[50%] relative border-2 mt-2 border-slate-500 rounded-[10px] mr-1">
              <input
                type="select"
                id="gender"
                value={creds.gender}
                onChange={handleChange}
                name="gender"
                className=" w-full bg-transparent mt-4 px-2   py-1.5 focus:outline-none peer"
              />
              <label
                htmlFor="gender"
                className="absolute left-0 pt-1 px-2  text-slate-400 peer-focus:text-xs cursor-text transition-all peer-focus:top-[-2px] peer-focus:text-slate-600"
              >
                Gender
              </label>
            </div>
            <div className="w-[50%] relative border-2 mt-2 border-slate-500 rounded-[10px] ml-1">
              <input
                type="text"
                id="birthday"
                value={creds.birthdate}
                onChange={handleChange}
                name="birthdate"
                className=" w-full bg-transparent mt-4 px-2  py-1.5 focus:outline-none peer"
              />
              <label
                htmlFor="birthday"
                className="absolute left-0 pt-1 px-2  text-slate-400 peer-focus:text-xs cursor-text transition-all peer-focus:top-[-2px] peer-focus:text-slate-600"
              >
                Birthday
              </label>
            </div>
          </div>
          <div className="w-full relative border-2 mt-2 border-slate-500 rounded-[10px]">
            <input
              type="digit"
              id="phone"
              value={creds.phone}
              onChange={handleChange}
              className=" w-full bg-transparent mt-4 px-2  py-1.5 focus:outline-none peer"
            />
            <label
              htmlFor="phone"
              className="absolute left-0 pt-1 px-2  text-slate-400 peer-focus:text-xs cursor-text transition-all peer-focus:top-[-2px] peer-focus:text-slate-600"
            >
              Phone Number
            </label>
          </div>
          <div className="w-full relative border-2 mt-2 border-slate-500 rounded-[10px]">
            <input
              type="email"
              id="email"
              value={creds.email}
              onChange={handleChange}
              className=" w-full bg-transparent mt-4 px-2  py-1.5 focus:outline-none peer"
            />
            <label
              htmlFor="email"
              className="absolute left-0 pt-1 px-2  text-slate-400 peer-focus:text-xs cursor-text transition-all peer-focus:top-[-2px] peer-focus:text-slate-600"
            >
              Email
            </label>
          </div>
          <div className="w-full relative border-2 mt-2 border-slate-500 rounded-[10px]">
            <input
              type="text"
              id="username"
              value={creds.username}
              onChange={handleChange}
              className=" w-full bg-transparent mt-4 px-2  py-1.5 focus:outline-none peer"
            />
            <label
              htmlFor="username"
              className="absolute left-0 pt-1 px-2  text-slate-400 peer-focus:text-xs cursor-text transition-all peer-focus:top-[-2px] peer-focus:text-slate-600"
            >
              Username
            </label>
          </div>
          <div className="bg-color-white w-full pt-4 mt-1.5">
            <button
              onClick={handleSaveClick}
              className="flex justify-center border-2 py-2 border-solid border-white rounded-[10px] bg-white text-black text-xl w-full h-full"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
