import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './EditProfile.css';
import profile_photo from '../../assets/profile_photo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; 
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

const EditProfile = () => {
    const navigate = useNavigate()
    const[isFocused, setIsFocused] = useState(false);
    const handleBackClick = () =>{
        navigate('/profile')
    }
    const handleSaveClick = () =>{
        navigate('/profile');
    }

  
    return (
        <div className='container bg-slate-900 min-h-screen font-sans text-white'>
            <div className='divide-y divide-solid px-4 w-full h-full'>
                <div className='flex flex-col items-center w-full p-0 mb-2 '>
                    <div className='flex justify-between items-center text-2xl mt-5 mb-3 font-semibold '>
                        <div 
                        className="header-backarrow w-9 h-9 rounded-xl p-2 border-2 border-solid bg-white flex justify-center items-center dark:text-slate-900 absolute top-5 left-3"
                        onClick={handleBackClick}
                        >
                        <ArrowBackIcon />
                        </div>
                        <div className="jobs-header-title w-full flex justify-center">
                        <p className="text-2xl font-semibold">Edit Profile</p>
                        </div>
                    </div>
                    <div className='flex justify-center items-center border-white '>
                    <img className='w-[100px] h-[100px] mt-5 rounded-full border-2 border-white  p-2' src={profile_photo} alt='profile'></img>
            
                    </div>
                    <div className='flex justify-center items-center  text-xl text-white m-[5px] '>Shreya Ganguly</div>
                    <div className='flex justify-center items-center  text-lg text-stone-600 mb-2'>@ganguly</div>
                </div>
                <div className='flex flex-col  p-1 mt-3'>
                    <div className='w-full relative border-2 mt-2 border-slate-500 rounded-[10px]'>
                        <input type='text' id='fullname' className=' w-full bg-transparent mt-4 px-2  py-1 focus:outline-none peer'/>
                        <label for='fullname' className='absolute left-0 pt-2 px-2 top-1 text-slate-400 peer-focus:text-xs cursor-text transition-all peer-focus:top-[-2px] peer-focus:text-slate-600'>Full Name</label>
                    </div>
                    <div className='flex'>
                        <div className='w-[50%] relative border-2 mt-2 border-slate-500 rounded-[10px] mr-1'>
                            <input type='select' id='gender' className=' w-full bg-transparent mt-4 px-2   py-1 focus:outline-none peer'/>
                            <label for='gender' className='absolute left-0 pt-2 px-2 top-1 text-slate-400 peer-focus:text-xs cursor-text transition-all peer-focus:top-[-2px] peer-focus:text-slate-600'>Gender</label>
                        </div>
                        <div className='w-[50%] relative border-2 mt-2 border-slate-500 rounded-[10px] ml-1'>
                            <input type='text' id='birthday' className=' w-full bg-transparent mt-4 px-2  py-1 focus:outline-none peer'/>
                            <label for='birthday' className='absolute left-0 pt-2 px-2 top-1 text-slate-400 peer-focus:text-xs cursor-text transition-all peer-focus:top-[-2px] peer-focus:text-slate-600'>Birthday</label>
                        </div>
                    </div>
                    <div className='w-full relative border-2 mt-2 border-slate-500 rounded-[10px]'>
                        <input type='digit' id='phone' className=' w-full bg-transparent mt-4 px-2  py-1 focus:outline-none peer'/>
                        <label for='phone' className='absolute left-0 pt-2 px-2 top-1 text-slate-400 peer-focus:text-xs cursor-text transition-all peer-focus:top-[-2px] peer-focus:text-slate-600'>Phone Number</label>
                    </div>
                    <div className='w-full relative border-2 mt-2 border-slate-500 rounded-[10px]'>
                        <input type='email' id='email' className=' w-full bg-transparent mt-4 px-2  py-1 focus:outline-none peer'/>
                        <label for='email' className='absolute left-0 pt-2 px-2 top-1 text-slate-400 peer-focus:text-xs cursor-text transition-all peer-focus:top-[-2px] peer-focus:text-slate-600'>Email</label>
                    </div>
                    <div className='w-full relative border-2 mt-2 border-slate-500 rounded-[10px]'>
                        <input type='text' id='username' className=' w-full bg-transparent mt-4 px-2  py-1 focus:outline-none peer'/>
                        <label for='username' className='absolute left-0 pt-2 px-2 top-1 text-slate-400 peer-focus:text-xs cursor-text transition-all peer-focus:top-[-2px] peer-focus:text-slate-600'>Username</label>
                    </div>
                    <div className='bg-color-white w-full pt-4 mt-4'>
                        <button onClick={handleSaveClick} className='flex justify-center border-2 py-2 border-solid border-white rounded-[10px] bg-white text-black text-xl w-full h-full'>Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile