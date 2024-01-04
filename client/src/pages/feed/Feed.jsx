import { useEffect, useState } from 'react'

import "./feed.css"
import SettingsIcon from '@mui/icons-material/Settings';

import { dummyPostArray, dummyStatusArray } from '../../data/DummyFeed';
import { dummyUser } from '../../data/DummyUser';

import FeedPostCard from '../../components/feed/post/FeedPostCard';
import FeedStatusCard from '../../components/feed/status/FeedStatusCard';
import NavBar from '../../constants/navbar/NavBar';

const Feed = () => {

	const [searchVal, setSearchVal] = useState('')
	const [selectedFeed, setSelectedFeed] = useState('recent')
	const [page, setPage] = useState(1)
	const [postArray, setPostArray] = useState([])
	const [statusArray, setStatusArray] = useState([])
	const [user, setUser] = useState(dummyUser)

	useEffect(() => {
		setPostArray(dummyPostArray)
		setStatusArray(dummyStatusArray)
	}, [])

	useEffect(() => {
		const feedBody = document.getElementById('feed-body')
		const handleScroll = () => {
			if (feedBody.scrollHeight - feedBody.offsetHeight - feedBody.scrollTop < 1) {
				// bottom touched
				setPostArray([...postArray, dummyPostArray[0], dummyPostArray[1]])
				window.removeEventListener('wheel', handleScroll)
				setTimeout(() => {
					setPage((page) => page + 1)

				}, 1000)
			}
		}
		
		window.addEventListener('wheel', handleScroll)
		return () => {
			window.removeEventListener('wheel', handleScroll)
		}
	}, [page])

	const handleSearchValChange = (e) => {
		setSearchVal(e.target.value)
	}

	const handleFeedChange = (feedtype) => {
		setSelectedFeed(feedtype)
	}
	
	return (
		<>
			<div className="feed-header-card h-16 flex justify-between items-center fixed top-0 left-0 px-4 w-full z-10 bg-inherit dark:bg-slate-900 dark:text-white">
				<div className="feed-header-greet flex flex-col justify-center items-start w-fit max-w-4/5 h-12">
					<p className="font-medium truncate w-full">Hello {user.name}</p>
					<p className="text-xs sm:text-lg font-thin">Find your interests here!</p>
				</div>
				<div className="feed-settings flex justify-center items-center w-12 h-12 rounded-full bg-gradient-to-b from-pink-600 to-purple-700">
					<SettingsIcon/>
				</div>
			</div>

			<div id="feed-body" className="feed-body h-screen dark:bg-slate-900 dark:text-white px-4 overflow-auto pb-16">
				<div className="feed-contents-extra flex flex-col gap-4 mt-20">
					<div className="feed-search-card flex justify-between items-center h-16">
						<img
							src={user.dp}
							className='h-16 w-16 ml-1 rounded-2xl'
						/>
						<input
							type='text'
							value={searchVal}
							onInput={handleSearchValChange}
							placeholder='Better use search'
							className='bg-slate-700 rounded-3xl h-12 w-3/4 px-5 focus:outline-purple-800'
						/>
					</div>
					<div className="feed-status-card h-20 w-full flex items-center gap-4 overflow-x-auto">
						<div 
							className="feed-status-add-button h-16 w-16 ml-1 rounded-2xl flex items-center justify-center bg-cover overflow-hidden"
							style={{
								backgroundImage: `url(${dummyUser.dp})`
							}}
						>
							<div className="add-icon w-full h-full flex items-center justify-center text-inherit backdrop-blur-[1px]">
								<i className='h-2/5 w-2/5 flex items-center justify-center bx bxs-plus-square text-2xl'></i>
							</div>
						</div>
						<div className="feed-status-content flex items-center gap-4 overflow-x-auto">
							{
								statusArray.map((status, index) => (
									<FeedStatusCard key={index} status={status}/>
								))
							}
						</div>
					</div>
					<div className="feed-type-selector border dark:border-slate-400 bg-gradient-to-b dark:from-gray-800 dark:to-slate-900 rounded-3xl h-20 flex items-center justify-evenly gap-2 p-3">
						<button 
							className={` w-2/6 rounded-2xl h-4/6 ${(selectedFeed === 'recent') ? 'bg-purple-900' : ''}`}
							onClick={() => handleFeedChange('recent')}
						>
							Recent
						</button>
						<button 
							className={`w-2/6 rounded-2xl h-4/6 ${(selectedFeed === 'career') ? 'bg-purple-900' : ''}`}
							onClick={() => handleFeedChange('career')}
						>
							Career
						</button>
						<button 
							className={`w-2/6 rounded-2xl h-4/6 ${(selectedFeed === 'events') ? 'bg-purple-900' : ''}`}
							onClick={() => handleFeedChange('events')}
						>
							Events
						</button>
					</div>
				</div>

				<div className="feed-container overflow-auto mt-2">
					<p className="font-semibold mb-1">Posts</p>
					<div className="feed-post-container-body flex flex-col gap-2">
						{
							postArray.map((post, index) => (
								<FeedPostCard key={index} post={post}/>
							))
						}	
					</div>
				</div>
			</div>
			<NavBar/>
		</>
	);
};

export default Feed;
