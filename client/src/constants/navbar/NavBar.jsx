import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './navbar.css'

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import TextsmsIcon from '@mui/icons-material/Textsms';
import Person2Icon from '@mui/icons-material/Person2';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

const NavBar = () => {

	const [selectedPage, setSelectedPage] = useState('home')

	const navigate = useNavigate()

	const handlePageSwitch = (path) => {
		setSelectedPage(path)
		// navigate(`/${path}`)
	}

	return (
		<>
			<nav className="navbar h-14 dark:bg-slate-900 dark:text-white fixed bottom-0 flex w-screen justify-between items-center gap-2 px-2 z-10">
				
				<div 
					className='nav-home h-full w-1/5 flex items-center justify-center rounded-xl'
					onClick={() => handlePageSwitch('home')}
				>
					<HomeRoundedIcon
						className={`${(selectedPage === 'home') ? "text-pink-600" : ""}`}
						fontSize='medium'
					/>
				</div>
				
				<div
					className='nav-messages h-full w-1/5 flex items-center justify-center rounded-xl'
					onClick={() => handlePageSwitch('message')}
				>
					<TextsmsIcon
						className={`${(selectedPage === 'message') ? "text-pink-600" : ''}`} 
						fontSize='medium'
					/>
				</div>
				
				<div className="w-1/5 flex justify-center">
					<div className="create-post flex justify-center items-center h-16 w-16 rounded-full bg-gradient-to-b from-pink-600 to-purple-700 -translate-y-2">
						<AddRoundedIcon 
							fontSize='large'
						/>
					</div>
				</div>
				

				<div 
					className="nav-reels h-full w-1/5 flex items-center justify-center rounded-xl"
					onClick={() => handlePageSwitch('reels')}
				>
					<PlayCircleIcon
						className={`${(selectedPage === 'reels') ? "text-pink-600" : ''}`}
						fontSize='medium'
					/>
				</div>
				
				<div
					className='nav-profile h-full w-1/5 flex items-center justify-center rounded-xl'
					onClick={() => handlePageSwitch('profile')}
				>
					<Person2Icon
						className={`${(selectedPage === 'profile') ? "text-pink-600" : ''}`}
						fontSize='medium'
					/>
				</div>
				
			</nav>
		</>
	);
};

export default NavBar;
