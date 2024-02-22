import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./savedJobCard.css";

import randomcolor from "randomcolor";

const SavedJobCard = ({ job }) => {
  const [bgColor, setBgColor] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setBgColor(randomcolor());
  }, []);

  const handlejobsclicked = () =>{
      navigate('/jobs/jobdetails')
  }

  return (
    <>
      <div
        className="job-card-container flex-shrink-0 flex-grow-0 flex flex-col justify-between w-64 h-44 rounded-3xl border border-blue-700 p-3"
        style={{
          backgroundColor: `${bgColor}`,
        }}
        onClick= {handlejobsclicked}
      >
        <div className="job-card-header w-full flex items-center gap-5">
          <div className="h-16 w-16 rounded-xl overflow-hidden object-cover shadow-md dark:bg-slate-200 shadow-slate-900">
            <img src={job.logo} className="h-full w-full" />
          </div>
          <p className="text-xl font-bold text-black truncate">{job.company}</p>
        </div>
        <div className="job-card-content w-full flex flex-col justify-evenly items-center">
          <p className="text-black font-semibold">{job.role}</p>
          {job.fullTime ? (
            <p className="text-sm font-medium text-slate-700">Full Time</p>
          ) : (
            <></>
          )}
        </div>
        <div className="job-card-footer w-full flex justify-end items-center px-4">
          <div className="applied-tag px-2 py-1 bg-emerald-300 rounded-xl">
            <p className="text-emerald-900 font-semibold">Applied!</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SavedJobCard;
