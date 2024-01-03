import { useState } from 'react'

import "./feed.css"
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications'
import AddIcon from '@mui/icons-material/Add';

import FeedPostCard from "../../components/profile/FeedPostCard";
import FeedStatusCard from '../../components/profile/FeedStatusCard';
import NavBar from '../../constants/navbar/NavBar';

const Feed = () => {

	const [searchVal, setSearchVal] = useState('')
	const [selectedFeed, setSelectedFeed] = useState('recent')

	const handleSearchValChange = (e) => {
		setSearchVal(e.target.value)
	}

	const handleFeedChange = (feedtype) => {
		setSelectedFeed(feedtype)
	}

	const user = {
		name: 'Samita',
		dp: 'https://rb.gy/vozm3f'
	}

	const dummyPostArray = [
		{	
			user: 'Samantha',
			image: 'https://reductress.com/wp-content/uploads/2019/06/petite-woman-1-820x500.jpg',
			timestamp: '2024-01-03T04:00:00Z'
		},
		{
			user: 'Rose Williams',
			image: 'https://images.pexels.com/photos/247322/pexels-photo-247322.jpeg?cs=srgb&dl=pexels-pixabay-247322.jpg&fm=jpg',
			timestamp: '2024-01-03T06:50:00Z'
		}
	]

	const dummyStatusArray = [
		{	
			user: 'Samantha',
			image: 'https://rb.gy/6eez7x',
			timestamp: '2024-01-03T04:00:00Z',
			seen: false
		},
		{
			user: 'Rose Williams',
			image: 'https://rb.gy/jxjhlq',
			timestamp: '2024-01-03T06:50:00Z',
			seen: false
		}
	]

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

			<div className="feed-body h-screen dark:bg-slate-900 dark:text-white px-4 overflow-auto pb-16">
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
								backgroundImage: `url(${user.dp})`
							}}
						>
							<div className="add-icon w-full h-full flex items-center justify-center text-inherit backdrop-blur-[1px]">
								<i className='h-2/5 w-2/5 flex items-center justify-center bx bxs-plus-square text-2xl'></i>
							</div>
						</div>
						<div className="feed-status-content flex items-center gap-4 overflow-x-auto">
							{
								dummyStatusArray.map((status, index) => (
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
							dummyPostArray.map((post, index) => (
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
