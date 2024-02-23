import { useState, useEffect, useContext } from "react";
import axios from "axios";

import { UserContext } from "../../../contexts/userContext";
import "./feedPostCard.css";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";

import CommentsModal from "./CommentsModal";

const FeedPostCard = ({ post, deletePostFromFeed }) => {
	const [isLiked, setIsLiked] = useState(false);

	const { user } = useContext(UserContext)

	useEffect(() => {
		console.log(user._id)
		console.log(user.username)
	}, [])

	const TimeGap = (date) => {
		const postTime = new Date(date);
		const currTime = new Date();

		// year ago
		let yearsGap = currTime.getFullYear() - postTime.getFullYear();
		if (yearsGap > 0) {
		return `${yearsGap} year${yearsGap > 1 ? "s" : ""} ago`;
		}

		// months ago
		let monthsGap = currTime.getMonth() - postTime.getMonth();
		if (monthsGap > 0) {
		return `${monthsGap} month${monthsGap > 1 ? "s" : ""} ago`;
		}

		// weeks ago
		let daysGap = currTime.getDate() - postTime.getDate();
		if (daysGap > 7) {
		return `${Math.round(daysGap / 7)} week${
			Math.round(daysGap / 7) > 1 ? "s" : ""
		} ago`;
		}

		// days ago
		if (daysGap > 0) {
		return `${daysGap} day${daysGap > 1 ? "s" : ""} ago`;
		}

		// hours ago
		let hoursGap = currTime.getHours() - postTime.getHours();
		if (hoursGap > 0) {
		return `${hoursGap} hour${hoursGap > 1 ? "s" : ""} ago`;
		}

		// minutes ago
		let minutesGap = currTime.getMinutes() - postTime.getMinutes();
		if (minutesGap > 0) {
		return `${minutesGap} minute${minutesGap > 1 ? "s" : ""} ago`;
		}

		// seconds ago
		let secondsGap = currTime.getSeconds() - postTime.getSeconds();
		return `${secondsGap} second${secondsGap > 1 ? "s" : ""} ago`;
	};

	const handleLikePress = () => {
		if (isLiked) {
			unlikePost()
		} else {
			likePost()
		}
		setIsLiked((liked) => !liked)
	};

	const [captionReadMoreRequired, setCaptionReadMoreRequired] = useState(false)
	const [readingMore, setReadingMore] = useState(false)

	const likePost = async() => {
		try {
			const response = await axios.post(`https://flinq-backend.onrender.com/post/${post._id}/like`, {userId: user._id})
			console.log(response.data.message)
		} catch (err) {
			console.log('An error occurred: ', err)
		}
	}

	const unlikePost = async() => {
		try {
			const response = await axios.post(`https://flinq-backend.onrender.com/post/${post._id}/unlike`, {userId: user._id})
			console.log(response.data.message)
		} catch (err) {
			console.log('An error occurred: ', err)
		}
	} 

	useEffect(() => {
		if (post?.postName?.length > 50) {
			console.log('long cap')
			setCaptionReadMoreRequired(true)
			setReadingMore(false)
		}
		
	}, [post])

	const openFullCaption = () => {
		setReadingMore(true)
	}

	const [postOptionsModalOpen, setPostOptionsModalOpen] = useState(false)

	const closePostOptionsModalOnOutsideClick = (e) => {
		if (e.target.matches('#post-options-modal')) {
            return
        } else {
            setTimeout(() => {
                setPostOptionsModalOpen(false)
				document.removeEventListener('click', closePostOptionsModalOnOutsideClick)
            }, 1)
        }
	}

	useEffect(() => {
		if (postOptionsModalOpen) {
			setTimeout(() => {
				document.addEventListener('click', closePostOptionsModalOnOutsideClick)
			}, 1)
		} else {
		}
		return () => {
			document.removeEventListener('click', closePostOptionsModalOnOutsideClick)
		}
	}, [postOptionsModalOpen])

	const [comments, setComments] = useState([])
	const [commentsModalOpen, setCommentsModalOpen] = useState(false)
	const getComments = async() => {
		setComments(post?.comments)
	}

	useEffect(() => {
		console.log(post?._id)
	}, [])

	return (
		<>
			<div
				key={post._id}
				className="feed-post-container h-fit rounded-xl overflow-hidden flex flex-col"
			>
				<div className="feed-post h-5/6 bg-gradient-to-r from-fuchsia-950 to-purple-950 rounded-b-3xl">
					<div className="feed-post--header w-full h-12 flex justify-start">
						<div className="feed-post-user flex justify-start items-center gap-3 h-full w-4/6 px-2 ml-4 ">
							<div className="feed-post-user-image rounded-full dark:bg-slate-700 h-8 w-8 md:h-10 md:w-10 flex justify-center items-center border-2 dark:border-white text-xl sm:text-2xl">
								<i className="bx bxs-user"></i>
							</div>
							<p className="truncate text-base sm:text-lg">
								{post.username}
							</p>
						</div>
						<div className="feed-post-header-utilities flex justify-end items-center gap-2 h-full w-2/6 ">
							<p className="text-sm font-light">{TimeGap(post.postedAt)}</p>
							<div 
								className="mr-4 h-8 w-8 flex justify-center items-center rounded-full  active:bg-slate-700 active:opacity-90 cursor-pointer relative"
								onClick={() => setPostOptionsModalOpen(true)}
							>
								<MoreVertOutlinedIcon className="dark:text-white"/>
								{
									(postOptionsModalOpen) &&
										<div id="post-options-modal" className="absolute top-full right-0 h-32 w-44 z-10 rounded-lg bg-slate-700 flex flex-col gap-2 p-2">
											<div 
												className="border rounded-lg flex-1 p-2 flex items-center justify-start gap-2"
												onClick={() => {deletePostFromFeed(post._id)}}
											>
												<i className='bx bx-block pt-[2px]'></i>
												Not interested
											</div>
											<div 
												className="border rounded-lg flex-1 p-2 flex items-center justify-start gap-2 text-red-500"
												onClick={() => {deletePostFromFeed(post._id)}}
											>
												<i className='bx bxs-edit' ></i>
												Report this post
											</div>
										</div>
								}
							</div>
						</div>
					</div>
					
					<div className="feed-post-body w-full min-h-52 h-fit rounded-3xl object-cover overflow-hidden">
						<img className="w-full" src={post.image} />
					</div>
				</div>
				<div className="feed-post-footer-utilities flex justify-between items-center w-full h-14 sm:py-2">
					<div className="feed-post-utils-set1 flex items-center gap-4 w-3/12 h-full px-2 text-3xl sm:text-5xl">
						{!isLiked ? (
						<i className="bx bx-like" onClick={handleLikePress}></i>
						) : (
						<i className="bx bxs-like" onClick={handleLikePress}></i>
						)}
						<i className="bx bx-chat" onClick={() => setCommentsModalOpen(true)}></i>
					</div>
					<div className="feed-post-utils-set2 flex justify-end items-center gap-4 w-3/12 h-full px-2 text-3xl sm:text-5xl">
						<i className="bx bx-send -rotate-45 pl-1"></i>
						<i className="bx bx-bookmark-plus"></i>
					</div>
				</div>
				<div className="feed-post--details flex flex-col w-full px-2">
					<div className={`feed-post--caption flex gap-2 ${(readingMore) ? 'h-fit' : 'h-7'}`}>
						
						<p className={`${(captionReadMoreRequired && !readingMore) ? 'w-52 h-5 truncate' : 'w-fit' }`}>
							<span className="font-bold mr-2">{post.username}</span>
							{post.postName}
						</p>
						{
							(captionReadMoreRequired && !readingMore) &&
								<span 
									className="font-bold cursor-pointer"
									onClick={() => openFullCaption()}
								>
									Read More
								</span>
						}
					</div>
				</div>
			</div>
			{
				(commentsModalOpen) && 
					<CommentsModal 
						comments={post?.comments} 
						setCommentsModalOpen={setCommentsModalOpen}
					/>
			}
		</>
	);
};

export default FeedPostCard;
