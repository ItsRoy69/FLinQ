import React, { useEffect, useState, useContext } from "react";
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import axios from "axios";
import {userModal} from '../../contexts/userContext';
import formImg from '../../assets/login-img.jpg'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "react-toastify/dist/ReactToastify.css";
import GoogleIcon from '@mui/icons-material/Google';
import {jwtDecode} from 'jwt-decode'
import { useNavigate } from "react-router-dom";
import { faJarWheat } from "@fortawesome/free-solid-svg-icons";



const AuthModal = () => {
  const navigate = useNavigate();
  const[isloginClicked,setisloginClicked] = useState(false);
  const [error, setError] = useState('');
  
  const [creds, setcreds] = useState({
    email: "",
    password: "",
    username: "",
    address: "",
    phone: "",
    name: "",
    profession: "",
  });

  const userContext = useContext(userModal);

  const login =  
  useGoogleLogin({
    onSuccess: codeResponse => console.log(codeResponse),
    flow: 'auth-code',
  })
  // firebase.auth().signInWithGoogle()
  // .then((userCredential) => {
  //   const user = jwtDecode(userCredential.user);
  //   userContext.updateUser(user)
  //   navigate('/feed')
  // })
  // .catch((error) => {
   
  //   console.error(error.message);
  // });


 
  
  const handleChange = (e) => {
    setcreds({ ...creds, [e.target.name]: e.target.value });
    console.log(creds)
  };
  const handleGoBack = async() =>{
    navigate('/home')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
      const user = {
        email : creds.email,
        name: creds.name,
        address : creds.address,
        password : creds.password,
        phone : creds.phone,
        profession: creds.profession
      }
      console.log(user);
      axios.post("http://localhost:5173/user/register",creds).
      then((response)=>{
        console.log(response.data)
        if(response.status == 201 ){
          console.log("Registration Successfull");
          userContext.updateUser(response.data.user);
        }
      }).catch((err)=>{
        console.log(err)
        setError(response.data.error);
      }) 
      
      navigate('/feed');     
  };

  const handleLogin = () =>{
    axios.post("http://localhost:5173/user/login",{email : creds.email, password : creds.password}).
    then((response)=>{
      console.log(response.data);
      userContext.updateUser(response.data.user)
    })
    .catch((error)=>{
      console.log(error);
    })
    navigate('/feed');
  }

  const handleSuccess = () =>{
    console.log("Login Success")
    navigate('/feed')
  }

  return (
    <>
    <div className="w-full h-screen md:flex md:flex-row flex flex-col items-start">
      <div className="relatve md:w-1/2  md:h-[700px] flex items-center mx-6 my-7 mb-8 flex-col"> 
        <img src={formImg} className="w-full h-full rounded-[10px] object-cover"/> 
       
      </div>
      {!isloginClicked ? (
        <>
      <div className="md:w-1/2 h-full flex flex-col md:p-20 p-10 ">
          <button className="text-base text-black font-sans px-3 self-start rounded-[20px] py-2 border border-solid bg-red-300" onClick={handleGoBack}><span className="p-2"><ArrowBackIcon className="w-10 h-10"/></span>Go back</button>      
         
          
              <div className="w-full flex flex-col mb-5 ">
              <div className="flex flex-col mb-10 w-full">
                <h3 className="text-2xl font-semibold mt-2">Register to Join FlinQ</h3>
              </div>
              <div className="w-full flex flex-col overflow-scroll">
                <label>Email</label>
                <input 
                className="w-full text-black py-2 rounded-[10px] px-2 bg-transparent my-4 border border-slate outline-none focus:outline-none"
                type="email"
                placeholder="eg:abc@gmail.com"
                value={creds.email}
                onChange={handleChange}
                name="email"
                />
                <label>Name</label>
                <input 
                className="w-full text-black py-2 rounded-[10px] px-2 bg-transparent my-4 border border-slate outline-none focus:outline-none"
                type="text"
                placeholder="eg:John Mayer"
                value={creds.name}
                onChange={handleChange}
                name="name"
                />
                <label>Address</label>
                <input 
                className="w-full text-black py-2 rounded-[10px] px-2 bg-transparent my-4 border border-slate outline-none focus:outline-none"
                type="text"
                placeholder="29,Shakespeer Street."
                value={creds.address}
                onChange={handleChange}
                name="address"
                />
                <div className="flex justify-between">
                <div className="flex flex-col w-1/2 px-2">
                <label>Phone</label>
                <input 
                className="w-full text-black py-2 px-2 rounded-[10px] bg-transparent my-4 border border-slate outline-none focus:outline-none"
                type="number"
                placeholder="+91"
                value={creds.phone}
                onChange={handleChange}
                name="phone"
                />
                </div>
                <div className="flex flex-col w-1/2 px-2">
                  <label>Username</label>
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
                <label value={creds.profession} onChange={handleChange}>Proffession</label>
                <select 
                  className="w-full text-black py-2 px-2 rounded-[10px] bg-transparent my-4 border border-slate outline-none focus:outline-none">
                  <option value="" disabled defaultValue>Select Profession</option>
                  <option value="gynaecologist">Gynaecologist</option>
                  <option value="teacher">Teacher</option>
                  <option value="engineer">Engineer</option>
                  <option value="homemaker">Home Maker</option>
                  <option value="other">Other</option>
                </select>
          
                <label>Password</label>
                <input 
                className="w-full text-black py-2 px-2 rounded-[10px] bg-transparent my-4 border border-slate outline-none focus:outline-none"
                type="password"
                placeholder="Must conatain 8-16 characters"
                value={creds.password}
                onChange={handleChange}
                name="password"
                />
                <div className=" w-full md:flex md:flex-row flex flex-col  justify-between">
                <button className="md:w-1/4 px-3  rounded-[10px] py-2 border border-solid bg-red-300 text-black hover:text-black hover:bg-white" onClick={handleSubmit}>Register</button>
                  {/* <div>
                  
                  <GoogleLogin className="rounded[10px]"
                  onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}  
                />

                  </div> */}
                <div className="flex items-center text-slate-400 justify-center text-lg">Or</div>
                <button className="border bg-black text-white px-1 md:mt-0 mt-4 md:px-4 py-2  rounded-[10px]  md:text-lg" onClick={() => login()} ><span className="px-2 mr-3 md:mr-5"><GoogleIcon/></span>Sign in with Google</button>
                </div>
              </div>           
            </div>
            {
              error ? (
                <>
                  <div className="w-full flex jusify-center text-center text-xl ">{error.message}</div>
                </>
              ):
              null
            }
            <div className="w-full flex items-center  justify-center">
              <p className="text-lg  font-normal mb-10 text-black"  onClick={()=>setisloginClicked(true)}>Already have an account?<span className="font-semibold underline underline-offset-2 cursor-pointer ">Login</span></p>
            </div>
            </div>
          
            </>
          ):(
            <>
            <div className="md:w-1/2 justify-center w-full h-full flex flex-col md:p-20 p-10 ">
            <button className="text-base text-black font-sans px-3 self-start rounded-[20px] py-2 border border-solid bg-red-300" onClick={handleGoBack}><span className="p-2"><ArrowBackIcon className="w-10 h-10"/></span>Go back</button>
            <div className="w-full  flex flex-col  mb-5 md:justify-center md:items-center ">
              <div className="flex flex-col mb-10  w-full">
                <h3 className="text-2xl font-semibold mt-2 ">Login to FlinQ</h3>
              </div>
              <div className="w-full flex flex-col overflow-scroll">
                <label>Email</label>
                <input 
                className="w-full text-black py-2 rounded-[10px] px-2 bg-transparent my-4 border border-slate outline-none focus:outline-none"
                type="email"
                placeholder="eg:abc@gmail.com"
                value={creds.email}
                onChange={handleChange}
                name="email"
                />
                 <label>Password</label>
                <input 
                className="w-full text-black py-2 px-2 rounded-[10px] bg-transparent my-4 border border-slate outline-none focus:outline-none"
                type="password"
                placeholder="Must conatain 8-16 characters"
                value={creds.password}
                onChange={handleChange}
                name="password"
                />
              <div className=" w-full  flex md:flex-row flex-col justify-between">
                <button className="md:w-1/4 px-3  rounded-[10px] py-2 border border-solid bg-red-300 text-black hover:text-black hover:bg-white" onClick={handleLogin}>Login</button>
                <div className="flex items-center text-slate-400 justify-center text-lg">Or</div>
                <button className="border  bg-black text-white md:mt-0 mt-4 px-4 py-2 rounded-[10px]" onClick={() => login()}><span className="px-2 md:mr-5 mr-3"><GoogleIcon/></span>Sign in with Google</button>
              </div>
                
              </div>
            </div>
            <div className="w-full flex items-center  justify-center">
              <p className="text-lg font-normal mb-10 text-black"  onClick={()=>setisloginClicked(false)}>Do not have an account?<span className="font-semibold underline underline-offset-2 cursor-pointer ">Register</span></p>
            </div>
            </div>
            </>
          )
          }
      </div>
    
    </>
  );
};

export default AuthModal;
