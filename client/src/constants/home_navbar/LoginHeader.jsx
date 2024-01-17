import React from "react";
import "./LoginHeader.css";
import AuthModal from "../../components/auth/AuthModal";
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useState } from "react";
import { userModal } from "../../contexts/userContext";


export default function () {
  const [loginBoxOpen,setLoginBoxOpen]  = useState(false);

  const handleClickLogin = () =>{
    setLoginBoxOpen(true);
  }

  // const { setopenauthmodal, setisuser } = userModal();

  return (
    <>
      <nav className="navbar fixed top-0 w-screen h-[100px]  navbar-expand-lg flex items-center text-white" style={{backgroundColor: '#322332'}}>
        <div className="container-fluid w-full h-full flex justify-between items-center px-5">
          <a className="navbar-brand" href="/">
            <h1 className="text-3xl">ＦｌｉｎＱ</h1>
          </a>
          <Link className="nav-link text-xl" onClick={handleClickLogin}>Join Us</Link>
          {/* <button
            className="navbar-toggler flex justify-end absolute mx-3"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            >
            
        </button> */}
          {/* <div className="flex justify-end " id="navbarSupportedContent">
            <ul className=" absolute top-0 mt-6 navbar-nav  mb-2 mb-lg-0"> */}
              {/* <li className="nav-item"> */}
              
                {/* <Link className="nav-link" to={"/"}>
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="#services">
                  Services
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/donate">
                  Donate
                </Link>
              </li> */}
{/* 
              <li className="nav-item" onClick={() => {
                setopenauthmodal(true)
                document.body.classList.add("fixed");

                setisuser(false)
              }} >
                <Link className="nav-link">Register as Professional</Link>
              </li> */}

              {/* <li
                className="nav-item"

                style={{ paddingRight: "130px" }}
                onClick={() => {
                  setopenauthmodal(true)
                  document.body.classList.add("fixed");
                  setisuser(true)
                }}
              >
                <Link className="nav-link" onClick={handleClickLogin}>Join Us</Link>
              </li>
            </ul>
          </div> */}
        </div>
      </nav>
        {
        loginBoxOpen && (
          <AuthModal/>
        )
      }

      
    </>
  );
}