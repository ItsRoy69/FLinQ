import React from "react";
import "./LoginHeader.css";
import MenuIcon from '@mui/icons-material/Menu';
import {motion} from 'framer-motion'
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";



export default function () {
  const [loginBoxOpen,setLoginBoxOpen]  = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();


  // const handleClickLogin = () =>{
  //   setLoginBoxOpen(!loginBoxOpen);
  // }

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  


  return (
    <>
    <nav className="navbar md:items-start md:mx-3 md:fixed  fixed  top-0  h-[80px] md:justify-between w-screen flex items-center bg-transparent  text-white">
      <div className="container mx-4 px-3 md:px-4 border border-1 border-slate-500 md:rounded-[20px] rounded-[14px]  md:mr-10 mt-3 h-full flex backdrop-blur  items-center justify-between">
        <Link className="navbar-brand md:flex" to="/">
          <p className="text-2xl flex md:flex font-mono ">
            <p className="text-2xl text-red-300 font-mono mr-1">F</p>
            <p>l i n Q</p> 
          </p>
        </Link>
        <div className="hidden justify-center md:flex md:items-center  w-auto">
          <Link className="nav-link text-xl mx-4 hover:border-b border-red-300" to="/home">Home</Link>
          <Link className="nav-link text-xl mx-4 hover:border-b border-red-300" to="/map">Assist</Link>
          <Link className="nav-link text-xl mx-4 hover:border-b border-red-300" to="/register"> Jobs</Link>
          <Link className="nav-link text-xl mx-4 hover:border-b border-red-300" to="/register">Events</Link>
        </div>
        <div className="flex justify-end bg-red-300 rounded-[10px] mx-5 py-1 text-black">
          <Link className="hidden md:flex justify-center items-center w-auto px-2 hover:shadow-white" to="/register">Join Us</Link>
        </div>
        <div className="flex md:mx-6 md:hidden md:flex justify-end">
          <button className="text-white focus:outline-none" onClick={handleMobileMenuToggle}>
            <MenuIcon />
          </button>
        </div>
      </div>
    </nav>
    {mobileMenuOpen && (
    <motion.div 
      className="md:hidden mt-3 bg-transparent flex fixed text-white top-0 right-0 backdrop-blur w-[70vw] h-screen"
      initial={{ x: "100%" }}
      animate={{ x: mobileMenuOpen ? 0 : "100%" }}
      exit={{ x: "-100%" }}
      
    >
    <div className="container mx-auto flex flex-col items-center bg-transparent py-8">
      <button className="absolute top-4 border-1 bg-red-300 px-3 mt-3 left-4 text-xl text-black rounded-[3px]" onClick={handleMobileMenuToggle}>
        X
      </button>
      <Link className="text-2xl my-2" to="/home" onClick={handleMobileMenuToggle}>Home</Link>
      <Link className="text-2xl my-2" to="/map" onClick={handleMobileMenuToggle}>Assist</Link>
      <Link className="text-2xl my-2" to="/register">Jobs</Link>
      <Link className="text-2xl my-2" to="/register">Events</Link>
      <div className="md:hidden mt-3 flex justify-end w-[25vw]">
        <Link className="nav-link absolute text-lg mx-2.5 px-3 py-1 bg-red-300 text-black rounded-[10px]" to="/register">Join Us</Link>
      </div>
    </div>
  </motion.div>
)}

  </>
  );  

}


