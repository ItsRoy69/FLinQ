import "./jobsRecommendation.css";

import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";

const JobsRecommendation = ({ job }) => {
  return (
    <>
      <div className="h-full w-full flex-shrink-0 flex-grow-0 bg--500 rounded-3xl flex flex-col justify-evenly items-center bg-violet-500 overflow-hidden">
        <div className="job-description flex justify-between items-center w-11/12 px-2">
          <div className="job-details w-7/12 h-4/5 flex flex-col justify-between items-center">
            <p className="text-lg sm:text-xl font-semibold w-full h-4/5 flex items-center overflow-hidden text-ellipsis">
              {job.role}
            </p>
            <div className="salary-details h-2/5 w-full flex gap-5 items-center">
              <p className="text-sm font-light truncate">{job.salary}</p>
              <p className="text-sm font-light truncate">{job.location}</p>
            </div>
          </div>
          <div className="company-logo w-fit max-w-20 max-h-28 p-1 flex flex-col items-center justify-between gap-0.5">
            <div className="h-16 w-16 rounded-xl overflow-hidden object-cover shadow-md dark:bg-slate-300 shadow-slate-900">
              <img src={job.logo} className="h-full w-full" />
            </div>
            <p className="max-w-full max-h-8 overflow-hidden text-ellipsis text-xs font-thin text-center">
              by {job.company}
            </p>
          </div>
        </div>
        <div className="apply-bar h-10 w-11/12 flex justify-between items-center py-1 px-4 rounded-3xl bg-purple-700">
          <div className="w-3/5">
            <div className="apply-button w-4/5 h-7 bg-violet-500 rounded-lg flex items-center justify-center">
              <p className="font-semibold">Apply Now</p>
            </div>
          </div>
          <div className="w-2/5 border-l border-l-slate-300">
            <div className="bookmark h-7 flex items-center justify-end gap-6">
              <p className="text-sm">Save</p>
              <BookmarkAddIcon className="text-emerald-400" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobsRecommendation;
