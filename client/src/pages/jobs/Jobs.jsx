import { useState, useEffect, useRef } from "react";

import "./jobs.css";

import { dummyRecommendationsArray } from "../../data/DummyRecommendations";
import { dummyLatestJobsArray } from "../../data/DummyLatestJobs";
import { dummySavedJobsArray } from "../../data/DummySavedJobs";

import JobsRecommendation from "../../components/jobs/recommendations/JobsRecommendation";
import LatestJobCard from "../../components/jobs/latests/LatestJobCard";
import SavedJobCard from "../../components/jobs/saved/SavedJobCard";
import JobCardSkeleton from "../../components/jobs/latests/JobCardSkeleton";
import SearchJobs from "../../constants/search/SearchJobs";
import FeedSelector from "../../constants/feed-selector/FeedSelector";
import AlertIcon from "../../constants/alert/AlertIcon";

import AddRounded from "@mui/icons-material/AddRounded";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import SyncIcon from "@mui/icons-material/Sync";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";

import { motion, AnimatePresence, spring } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const Jobs = () => {
	// NECESSARIES FOR NAVIGATION

	const [searchOpen, setSearchOpen] = useState(false);

	const handleSearchOpen = () => {
		setSearchOpen(true);
	};

	const handleSearchClose = () => {
		setSearchOpen(false);
	};

	const navigate = useNavigate();

	// NECESSARIES FOR LATEST JOBS SECTION

	// states for latest jobs
	const [latestJobsArray, setLatestJobsArray] = useState([]);
	const [latestPage, setLatestPage] = useState(0);
	const [isLatestLoading, setIsLatestLoading] = useState(true);
	const [newLatestLoaded, setNewLatestLoaded] = useState(false);
	const [currentSlide, setCurrentSlide] = useState(0);

	

	// load more latest jobs
	const loadMoreLatest = () => {
		setIsLatestLoading(true);
		setTimeout(() => {
		setLatestJobsArray([...latestJobsArray, ...latestJobsArray]);
		setIsLatestLoading(false);
		setNewLatestLoaded(true);
		}, 1000);
	};

	// load latest jobs on page mount
	useEffect(() => {
		const fetchLatestJobs = async() => {
			try {
				const response = await axios.get(`https://flinq-backend.onrender.com/jobs/`)
				console.log(response.data.result)
				setLatestJobsArray(response.data.result)
			} catch (err) {
				console.log(err)
			} 
		}
		fetchLatestJobs()
	}, []);

	// hide check out prompt on scroll
	useEffect(() => {
		const latestContainer = document.getElementById("latest-container");
		const handleScroll = () => {
		setTimeout(() => {
			setNewLatestLoaded(false);
			latestContainer.removeEventListener("wheel", handleScroll);
		}, 500);
		};
		latestContainer.addEventListener("wheel", handleScroll);
		return () => {
		latestContainer.removeEventListener("wheel", handleScroll);
		};
	}, [latestJobsArray]);

	useEffect(() => {
		const interval = setInterval(() => {
		setCurrentSlide(
			(prevSlide) => (prevSlide + 1) % dummyRecommendationsArray.length
		);
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	// prompt downward arrow

	const [isScrollingUp, setIsScrollingUp] = useState(true);
	const jobsBodyRef = useRef(null);

	const showFromBottom = () => {
		jobsBodyRef.current.scrollTop = jobsBodyRef.current.scrollHeight;
	};

	const handleChatScroll = () => {
		if (
		jobsBodyRef.current.scrollHeight - jobsBodyRef.current.scrollTop >
		500
		) {
		setIsScrollingUp(true);
		} else {
		setIsScrollingUp(false);
		}
	};

	const handlejobsclicked = () =>{
		navigate('/jobdetails')
	}  
		useEffect(() => {
		document.addEventListener("scroll", handleChatScroll);
		document.addEventListener("wheel", handleChatScroll);
		return () => {
		document.removeEventListener("scroll", handleChatScroll);
		document.removeEventListener("wheel", handleChatScroll);
		};
	}, []);

	
	
	return (
		<>
		{searchOpen && (
			<SearchJobs searchClose={handleSearchClose} feedType={"jobs"} />
		)}
		<div className="jobs-header dark:bg-custom-dark dark:text-white fixed top-0 left-0 h-16 w-full flex justify-between items-center px-4 z-10">
			<div className="jobs-header-title w-full flex justify-start">
			<input
				type="text"
				placeholder="Search Jobs..."
				className="dark:bg-slate-800 rounded-3xl h-12 w-5/6 px-5 focus:outline-none focus:outline-purple-800"
				onClick={handleSearchOpen}
			/>
			</div>
			<AlertIcon />
		</div>

		<div
			className="jobs-body dark:bg-custom-dark dark:text-white min-h-screen w-full h-fit py-16 px-4 mt-2 flex flex-col gap-3 items-center overflow-auto"
			ref={jobsBodyRef}
		>
			<FeedSelector />

			<div className="jobs-recommendation flex flex-col w-full h-60 px-1 py-5 gap-3">
			<div className="recommendation-title text-sm font-sm">
				<p className="text-left text-lg font-semibold">Recommended Jobs</p>
			</div>

			<motion.div
				id="recommendation-container"
				className="recommendation-container w-full h-full flex gap-5 overflow-x-auto">
				{dummyRecommendationsArray.map((recommendation, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, x: "100%" }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: "-100%"  }}
						transition={{ delay: index * 0.3, duration: 5, ease: "easeInOut" }}
					>
						<JobsRecommendation job={recommendation} />
					</motion.div>
				))}
			</motion.div>
			</div>
			<div className="jobs-saved flex flex-col w-full h-60 px-1 pb-5 gap-2">
			<div className="saved-title text-sm font-sm">
				<p className="text-left text-lg font-semibold">Saved Jobs</p>
			</div>
			<div
				id="saved-container"
				className="saved-container w-full h-full flex items-center gap-2 overflow-x-auto"
			
			>
				{
					(latestJobsArray) ? latestJobsArray.map((job, index) => (
						<SavedJobCard  key={index} job={job} />
					))
					: 
						<span className="">No jobs saved so far.</span>
				}
			</div>
			</div>
			<div className="jobs-latest flex flex-col w-full h-60 px-1 pb-5 gap-2">
			<div className="latest-title flex items-center justify-between max-h-full text-sm overflow-hidden ">
				<p className="text-left text-lg font-semibold h-full">
				Recently Added
				</p>
				{newLatestLoaded && latestPage > 1 && (
				<div className="flex items-center gap-2 text-slate-200 h-full overflow-hidden ">
					<p className="text-sm font-light underline  overflow-hidden">
					Check Out Fresh!
					<ArrowRightAltIcon fontSize="large" className="" />
					</p>
				</div>
				)}
			</div>
			<div
				id="latest-container"
				className="latest-container w-full h-full flex items-center gap-2 overflow-x-auto"
			>
				{isLatestLoading ? (
				<JobCardSkeleton cards={2} />
				) : (
				latestJobsArray.map((job, index) => (
					<LatestJobCard key={index} job={job} />
				))
				)}
				{!isLatestLoading && latestPage > 0 && (
				<div
					className="latest-more absolute right-5 min-w-10 w-fit p-1 h-11 flex justify-center items-center rounded-full bg-slate-700"
					onClick={loadMoreLatest}
				>
					{isLatestLoading && latestPage > 1 ? (
					<SyncIcon
						className="load-spinner dark:text-slate-200"
						fontSize="medium"
					/>
					) : (
					<div className="flex justify-center items-center ml-2 hover:cursor-pointer">
						<p className="text-sm text-center font-light">More</p>
						<ArrowRightIcon fontSize="medium" />
					</div>
					)}
				</div>
				)}
			</div>
			</div>
		</div>

		{isScrollingUp && (
			<div
			className="w-10 h-10 fixed bottom-24 right-8 border border-slate-600 rounded-full dark:bg-custom-dark dark:text-white flex items-center justify-center"
			onClick={showFromBottom}
			>
			<ArrowDownwardRoundedIcon />
			</div>
		)}

		<div className="jobs-footer dark:bg-custom-dark dark:text-white fixed bottom-0 right-0 h-16 w-full flex justify-center items-center z-10">
			<div className="job-postnew h-4/5 w-11/12 flex justify-center items-center gap-2 rounded-2xl bg-gradient-to-r dark:from-fuchsia-600 dark:to-purple-600 hover:cursor-pointer">
			<AddRounded fontSize="large" />
			<p className="font-medium text-2xl">Post Job</p>
			</div>
		</div>
		</>
	);
};

export default Jobs;
