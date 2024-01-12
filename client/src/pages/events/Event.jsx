import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dummyEventsArray } from '../../data/DummyEvent';
import './event.css';

import EventCard from '../../components/event/EventCard';

//icons
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; 
import AddRounded from '@mui/icons-material/AddRounded';

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
		navigate('/feed')
	}

	const handleSearchValChange = (e) =>{
		setSearchVal(e.target.value)
	}

	const handleAddEvent = () => { 
		console.log("Addition triggered")
	}

	return (
		<div className='dark:bg-custom-dark dark:text-white'>
			<div className="jobs-header fixed top-0 left-0 h-16 w-full dark:bg-custom-dark flex justify-between items-center px-4 z-10">
                <div 
					className="header-backarrow w-8 h-8 rounded-xl dark:bg-rose-500 flex justify-center items-center dark:text-slate-900 absolute"
					onClick={handleBackClick}
				>
                    <ArrowBackIcon />
                </div>
                <div className="jobs-header-title w-full flex justify-center">
                    <p className="text-2xl font-semibold">Events</p>
                </div>
            </div>
			
			<div className="event-container pt-16 pb-10 px-4 flex flex-col min-h-screen h-fit">
				<div className='search-bar w-full dark:text-slate-200 h-16 flex items-center justify-center my-2'>
					<div className='h-16 w-10 flex justify-center items-center absolute left-4 rounded-l-3xl'>
						<SearchIcon/>
					</div>
					<input
						type='text'
						value={searchVal}
						onInput={handleSearchValChange}
						placeholder='Search Events...'
						className='dark:bg-slate-800 rounded-3xl h-full w-full pl-12 focus:outline-none focus:outline-purple-800'
					/>
				</div>
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
					<AddRounded/>
				</div>
			</div>

			
		</div>
	)
}

export default Event