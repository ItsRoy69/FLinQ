import React from "react";
import "./LoginHeader.css";
import { Link } from "react-router-dom";

export default function () {
  return (
    <>
      <nav className="navbar md:items-start md:mx-3 md:fixed fixed top-0 h-[80px] md:justify-between w-screen flex items-center bg-transparent text-white">
        <div className="px-3 md:px-4 border border-1 border-slate-500 md:rounded-[20px] rounded-[14px] md:mr-10 mt-3 h-full flex backdrop-blur items-center justify-between w-full">
          <Link className="navbar-brand md:flex" to="/">
            <span className="text-2xl flex md:flex font-mono ">FlinQ</span>
          </Link>

          <div className="flex justify-end bg-red-300 rounded-[10px] mx-5 py-1 text-black">
            <Link
              className="md:flex justify-center items-center w-auto px-2 hover:shadow-white"
              to="/register"
            >
              Join Us
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
