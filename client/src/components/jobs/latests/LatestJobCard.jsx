import { useState, useEffect } from "react";
import "./latestJobCard.css";

import randomcolor from "randomcolor";

const LatestJobCard = ({ job }) => {
  const [bgColor, setBgColor] = useState("");

  useEffect(() => {
    setBgColor(randomcolor());
  }, []);

  return (
    <>
      <div
        className="job-card-container flex-shrink-0 flex-grow-0 flex flex-col justify-between w-64 h-44 rounded-3xl p-3"
        style={{
          backgroundColor: `${bgColor}`,
        }}
      >
        <div className="job-card-header w-full flex items-center gap-5">
          <div className="h-16 w-16 rounded-xl overflow-hidden object-cover shadow-md dark:bg-slate-200 shadow-slate-900">
            <img src={job.logo} className="h-full w-full" />
          </div>
          <p className="text-xl font-bold text-black truncate">{job.companyName}</p>
        </div>
        <div className="job-card-content w-full flex flex-col justify-evenly items-center">
          <p className="text-black font-semibold">{job.jobRole}</p>
          {job.isFullTime ? (
            <p className="text-sm font-medium text-slate-700">Full Time</p>
          ) : (
            <></>
          )}
        </div>
        <div className="job-card-footer w-full flex justify-end items-center px-4">
          <div className="applied-tag px-2 py-1 bg-purple-300 rounded-xl">
            <p className="text-purple-900 font-semibold">Apply Now</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LatestJobCard;
