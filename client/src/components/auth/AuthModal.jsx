import React, { useState, useContext } from "react";

import { GoogleLogin } from "@react-oauth/google";
import { auth, provider } from "./Config";
import { signInWithPopup } from "firebase/auth";
import axios from "axios";
import { UserContext } from "../../contexts/userContext";
import formImg from "../../assets/login-img.jpg";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "react-toastify/dist/ReactToastify.css";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";

const AuthModal = () => {
  const navigate = useNavigate();
  const [isloginClicked, setisloginClicked] = useState(false);
  const [error, setError] = useState("");
  const [loginerror, setLoginError] = useState("");

  const [creds, setcreds] = useState({
    email: "",
    password: "",
    username: "",
    phone: "",
    name: "",
    occupation: "",
    birthdate: "",
    gender: "",
  });
  const userContext = useContext(UserContext);

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider).then((data) => {
      navigate("/userinfo", {
        state: { email: data.user.email, name: data.user.displayName },
      });
    });
  };

  const handleGoogleLogins = async () => {
    await signInWithPopup(auth, provider).then(async (data) => {
      await axios
        .post("http://localhost:5000/user/googleLogin", {
          email: data.user.email,
          verified: data.user.emailVerified,
        })
        .then((response) => {
          if (response.status === 200) {
            userContext.updateUser(response.data.user);
            navigate("/feed");
          }
        })
        .catch((err) => {
          setLoginError(err.response.data.message);
        });
    });
  };

  const handleChange = (e) => {
    setcreds({ ...creds, [e.target.name]: e.target.value });
  };
  const handleGoBack = async () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/user/register", creds)
      .then((response) => {
        if (response.status == 200) {
          userContext.updateUser(response.data.user);
          navigate("/feed");
        }
      })
      .catch((err) => {
        console.log(err.response.data.massage);
        setError(err.response.data.message);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/user/login", {
        email: creds.email,
        password: creds.password,
      })
      .then((response) => {
        if (response.status == 200) {
          userContext.updateUser(response.data.user);
          navigate("/feed");
        }
      })
      .catch((error) => {
        console.log(error);
        setLoginError(error.response.data.message);
      });
  };

  return (
    <>
      <div className="w-full h-screen md:flex md:flex-row flex flex-col items-start">
        <div className="relatve md:w-1/2  md:h-[700px] flex items-center mx-6 my-7 mb-8 flex-col">
          <img
            src={formImg}
            className="w-full h-full rounded-[10px] object-cover"
          />
        </div>
        {!isloginClicked ? (
          <>
            <div className="md:w-1/2 h-full flex flex-col md:p-20 p-10 ">
              <button
                className="text-base text-black font-sans px-3 self-start rounded-[20px] py-2 border border-solid bg-red-300"
                onClick={handleGoBack}
              >
                <span className="p-2">
                  <ArrowBackIcon className="w-5 h-5" />
                </span>
                Go back
              </button>

              <div className="w-full flex flex-col mb-5 ">
                <div className="flex flex-col mb-10 w-full">
                  <h3 className="text-2xl font-semibold mt-2">
                    Register to Join FlinQ
                  </h3>
                </div>
                <div className="w-full flex flex-col overflow-scroll">
                  <label>
                    Email<span className="text-red-700">*</span>
                  </label>
                  <input
                    className="w-full text-black py-2 rounded-[10px] px-2 bg-transparent my-4 border border-slate outline-none focus:outline-none"
                    type="email"
                    placeholder="eg:abc@gmail.com"
                    value={creds.email}
                    onChange={handleChange}
                    name="email"
                  />
                  <label>
                    Name<span className="text-red-700">*</span>
                  </label>
                  <input
                    className="w-full text-black py-2 rounded-[10px] px-2 bg-transparent my-4 border border-slate outline-none focus:outline-none"
                    type="text"
                    placeholder="eg:John Mayer"
                    value={creds.name}
                    onChange={handleChange}
                    name="name"
                  />

                  <div className="flex justify-between">
                    <div className="flex flex-col w-1/2 pr-2">
                      <label>
                        Phone<span className="text-red-700">*</span>
                      </label>
                      <input
                        className="w-full text-black py-2 px-2 rounded-[10px] bg-transparent my-4 border border-slate outline-none focus:outline-none"
                        type="number"
                        placeholder="+91"
                        value={creds.phone}
                        onChange={handleChange}
                        name="phone"
                      />
                    </div>
                    <div className="flex flex-col w-1/2 pl-2">
                      <label>
                        Username<span className="text-red-700">*</span>
                      </label>
                      <input
                        className="w-full text-black py-2 px-2  rounded-[10px] bg-transparent my-4 border border-slate outline-none focus:outline-none"
                        type="text"
                        placeholder="eg:user302"
                        onChange={handleChange}
                        value={creds.username}
                        name="username"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <div className="flex flex-col w-1/2 pr-2">
                      <label>Gender</label>
                      <select
                        name="gender"
                        value={creds.gender}
                        onChange={handleChange}
                        className="w-full text-black py-2 px-2 rounded-[10px] bg-transparent my-4 border border-slate outline-none focus:outline-none"
                      >
                        <option value="" disabled defaultValue>
                          Select Gender
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <div className="flex flex-col w-1/2 pl-2">
                      <label>Birthdate</label>
                      <input
                        className="w-full text-black py-2 px-2  rounded-[10px] bg-transparent my-4 border border-slate outline-none focus:outline-none"
                        type="date"
                        placeholder=""
                        onChange={handleChange}
                        value={creds.birthdate}
                        name="birthdate"
                      />
                    </div>
                  </div>
                  <label>
                    Occupation<span className="text-red-700">*</span>
                  </label>
                  <select
                    name="occupation"
                    value={creds.occupation}
                    onChange={handleChange}
                    className="w-full text-black py-2 px-2 rounded-[10px] bg-transparent my-4 border border-slate outline-none focus:outline-none"
                  >
                    <option value="" disabled defaultValue>
                      Select Profession
                    </option>
                    <option value="gynaecologist">Gynaecologist</option>
                    <option value="teacher">Teacher</option>
                    <option value="engineer">Engineer</option>
                    <option value="homemaker">Home Maker</option>
                    <option value="other">Other</option>
                  </select>

                  <label>
                    Password<span className="text-red-700">*</span>
                  </label>
                  <input
                    className="w-full text-black py-2 px-2 rounded-[10px] bg-transparent my-4 border border-slate outline-none focus:outline-none"
                    type="password"
                    placeholder="Must conatain an uppercase, digits and a special character"
                    value={creds.password}
                    onChange={handleChange}
                    name="password"
                  />
                  {error ? (
                    <>
                      <div className="w-full flex pl-2 font-sans text-lg self-center text-red-600 ">
                        {error}
                      </div>
                    </>
                  ) : null}
                  <div className=" w-full md:flex md:flex-row flex flex-col  justify-between">
                    <button
                      className="md:w-1/4 px-3  rounded-[10px] py-2 border border-solid bg-red-300 text-black hover:text-black hover:bg-white"
                      onClick={handleSubmit}
                    >
                      Register
                    </button>

                    <div className="flex items-center text-slate-400 justify-center  text-lg">
                      Or
                    </div>
                    <button
                      className="border bg-black text-white px-1 md:mt-0 mt-4 md:px-4 py-2  rounded-[10px]  md:text-lg"
                      onClick={handleGoogleLogin}
                    >
                      <span className="px-2 mr-3 md:mr-5">
                        <GoogleIcon />
                      </span>
                      Signup with Google
                    </button>
                  </div>
                </div>
              </div>

              <div className="w-full flex items-center  justify-center">
                <p
                  className="text-lg  font-normal mb-10 text-black"
                  onClick={() => setisloginClicked(true)}
                >
                  Already have an account?
                  <span className="font-semibold underline underline-offset-2 cursor-pointer ml-1">
                    Login
                  </span>
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="md:w-1/2 justify-center w-full h-full flex flex-col md:p-20 p-10 ">
              <button
                className="text-base text-black font-sans px-3 self-start rounded-[20px] py-2 border border-solid bg-red-300"
                onClick={handleGoBack}
              >
                <span className="p-2">
                  <ArrowBackIcon className="w-5 h-5" />
                </span>
                Go back
              </button>
              <div className="w-full flex flex-col  mb-5 md:justify-center md:items-center ">
                <div className="flex flex-col mb-10  w-full">
                  <h3 className="text-2xl font-semibold mt-2 ">
                    Login to FlinQ
                  </h3>
                </div>
                <div className="w-full flex flex-col overflow-scroll">
                  <label>
                    Email<span className="text-red-700">*</span>
                  </label>
                  <input
                    className="w-full text-black py-2 rounded-[10px] px-2 bg-transparent my-4 border border-slate outline-none focus:outline-none"
                    type="email"
                    placeholder="eg:abc@gmail.com"
                    value={creds.email}
                    onChange={handleChange}
                    name="email"
                  />
                  <label>
                    Password<span className="text-red-700">*</span>
                  </label>
                  <input
                    className="w-full text-black py-2 px-2 rounded-[10px] bg-transparent my-4 border border-slate outline-none focus:outline-none"
                    type="password"
                    placeholder="Must conatain 8-16 characters"
                    value={creds.password}
                    onChange={handleChange}
                    name="password"
                  />
                  {loginerror ? (
                    <>
                      <div className="w-full flex pl-2 font-sans text-lg self-center text-red-600 ">
                        {loginerror}
                      </div>
                    </>
                  ) : null}
                  <div className=" w-full  flex md:flex-row flex-col justify-between">
                    <button
                      className="md:w-1/4 px-3  rounded-[10px] py-2 border border-solid bg-red-300 text-black hover:text-black hover:bg-white"
                      onClick={handleLogin}
                    >
                      Login
                    </button>
                    <div className="flex items-center text-slate-400 justify-center text-lg">
                      Or
                    </div>
                    <button
                      className="border  bg-black text-white md:mt-0 mt-4 px-4 py-2 rounded-[10px]"
                      onClick={() => handleGoogleLogins()}
                    >
                      <span className="px-2 md:mr-5 mr-3">
                        <GoogleIcon />
                      </span>
                      Login with Google
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full flex items-center justify-center">
                <p
                  className="text-lg font-normal mb-10 text-black"
                  onClick={() => setisloginClicked(false)}
                >
                  Do not have an account?
                  <span className="font-semibold underline underline-offset-2 cursor-pointer ml-1">
                    Register
                  </span>
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AuthModal;
