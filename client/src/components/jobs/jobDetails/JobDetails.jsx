import React from 'react';
import { useNavigate } from 'react-router-dom';
import CloseRounded from "@mui/icons-material/CloseRounded";
import LocationOn from '@mui/icons-material/LocationOn';
import ApprovalIcon from '@mui/icons-material/Approval';

const JobDetails = () => {
    const navigate = useNavigate()
    const handleCloseClicked = () => {
        navigate('/jobs')
    }

    return (
        <div className='bg-custom-dark p-3 backdrop-blur flex flex-col h-screen w-screen'>
            <div className='w-full h-full text-white border border-dashed rounded-xl bg-custom-dark flex flex-col items-center  overflow-hidden'>
                <div className='add-post--header h-20 w-full flex justify-between items-center px-5'>
                    <span className='text-3xl py-5'>Job Details</span>
                    <span className='p-3 rounded-md bg-red-400 text-slate-900 cursor-pointer active:scale-105'  onClick={handleCloseClicked}><CloseRounded /></span>
                </div>
                <div className='flex justify-between w-screen px-10 pt-8 pb-3'>
                    <div className='flex flex-col'>
                        <div className=' h-6 mb-2 font-bold text-xl justify-end'>Software Engineer</div>
                        <div className=' h-6 mb-2  justify-end text-slate-300'>Google</div>
                        <div className=' h-6 mb-2  justify-end'>Bangalore,India<span><LocationOn className='h-6 pr-1'/></span></div>
                        <div className=' flex w-20 rounded items-center bg-slate-300 text-slate-500  justify-center h-6'>Full time</div>
                    </div>
                    <div className='border flex  w-10 h-10 '></div>
                </div>
                <div className='flex flex-col items-start w-screen py-1  justify-start'>
                    <div className='text-lg py-2 px-10 font-bold'>About the Job</div>
                    <div className='px-8'>
                        <ul className='list-disc px-3 text-white'>
                            <li className='p-1'>Working on developing MERN Application</li>
                            <li className='p-1'>Working on developing MERN Application</li>
                            <li className='p-1'>Working on developing MERN Application</li>
                        </ul>
                    </div>
                </div>
                <div className='flex flex-col items-start px-10 w-screen py-1'>
                    <div className='text-lg py-2  font-bold'>About Google</div>
                    <div>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                    </div>
                </div>
                <div className="add-post--footer h-20 w-full flex justify-center items-center">
                    <div
                        className="w-4/5 py-3 rounded-lg text-xl flex justify-center items-center gap-5 bg-gradient-to-b from-pink-600 to-purple-700 cursor-pointer active:scale-105"
                       
                    >
                        Apply
                        <span className="-translate-y-1">
                            <ApprovalIcon />
                        </span>
                    </div>
                </div>
               
            </div>
        </div>
    )
}

export default JobDetails