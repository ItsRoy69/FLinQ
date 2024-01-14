import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dummyEventsArray } from '../../data/DummyEvent';
import './event.css';

import EventCard from '../../components/event/EventCard';
import FeedSelector from '../../constants/feed-selector/FeedSelector';
import SearchJobs from '../../constants/search/SearchJobs';

//icons
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; 
import AddRounded from '@mui/icons-material/AddRounded';
import GppMaybeRoundedIcon from '@mui/icons-material/GppMaybeRounded';

const Event = () => {

	const navigate = useNavigate()

	const [screenWidth, setScreenWidth] = useState(window.innerWidth)
	const [eventArray, setEventArray] = useState([])
	const [searchVal, setSearchVal] = useState('')
	const [page, setPage] = useState(1)

	useEffect(() => {
		setEventArray(dummyEventsArray)
	}, [])

  	useEffect(() => {
		const eventBody = document.getElementById('event-container-body')
		const handleScroll = () => {
			if (eventBody.scrollHeight - eventBody.offsetHeight - eventBody.scrollTop < 1) {
				// bottom touched
				setEventArray([...eventArray, ...dummyEventsArray])
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

	const handleBackClick=()=>{
		navigate(-1)
	}

	const handleSearchValChange = (e) =>{
		setSearchVal(e.target.value)
	}

	const handleAddEvent = () => { 
		console.log("Addition triggered")
	}

	const [searchOpen, setSearchOpen] = useState(false)

    const handleSearchOpen = () => {
        setSearchOpen(true)
    }

    const handleSearchClose = () => {
        setSearchOpen(false)
    }

	return (
		<>
			{
                searchOpen && <SearchJobs searchClose={handleSearchClose} feedType={'events'}/>
            }
			<div className='dark:bg-custom-dark dark:text-white'>
				<div className="jobs-header fixed top-0 left-0 h-16 w-full dark:bg-custom-dark flex justify-between items-center px-4 z-10">
					<div className="jobs-header-title w-full flex justify-start">
						<input
							type="text"
							placeholder="Search Events..."
							className="dark:bg-slate-800 rounded-3xl h-12 w-11/12 px-5 focus:outline-none focus:outline-purple-800"
							onClick={handleSearchOpen}
						/>
					</div>
					<div
						className="header-alert w-10 h-10 rounded-full border border-red-600 flex justify-center items-center dark:text-white dark:bg-red-900 hover:cursor-pointer"
					>
						<GppMaybeRoundedIcon 
							fontSize="large"
							className="text-red-600"
						/>
					</div>
				</div>
				
				<div className="event-container pt-16 pb-10 px-4 mt-2 flex flex-col min-h-screen h-fit">
					<FeedSelector/>
					
					<div className='pb-2'>
						<p className='text-lg font-semibold pt-2'>Upcoming Events</p>
					</div>

					<div id='event-container-body' className=' min-h-screen h-fit w-full flex flex-col gap-3 overflow-y-auto'>
						{  
							eventArray.map((event, index) => (
								event.status === "active" && 
									<EventCard key={index} event={event}/>
							))
						}
					</div>
				
					<div 
						className="fixed bottom-[20px] right-[20px] bg-gradient-to-tr from-purple-700 to-pink-600 rounded-full border border-white h-[60px] w-[60px] flex justify-center items-center shadow-sm z-10" 
						onClick={handleAddEvent}
					>	
						<AddRounded
							fontSize='large'
						/>
					</div>
				</div>

				
			</div>
		</>
	)
}

export default Event