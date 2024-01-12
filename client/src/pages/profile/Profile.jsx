import React from 'react';
import { useNavigate } from 'react-router-dom';
import profile_photo from '../../assets/profile_photo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
    const navigate = useNavigate()
    return (
        <div className='container bg-slate-900 min-h-screen'>
            <div className='flex flex-col items-center w-full p-0 m-0 '>
                <div className='flex justify-space-between items-center text-2xl m-10 font-sans font-semibold text-white '>Profile</div>
                <div className='flex justify-center items-center border-white '><img className='w-[125px] h-[125px] rounded-full  p-2' src={profile_photo} alt='profile'></img></div>
            </div>
        </div>
    )
}

export default Profile