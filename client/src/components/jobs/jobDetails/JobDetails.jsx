import React from 'react'

const JobDetails = () => {
  return (
    <div className='bg-custom-dark flex flex-col h-screen w-screen'>
        <div className='flex justify-center w-auto text-3xl text-white mt-3'>Job Details</div>
        <div className='flex justify-between w-screen p-10'>
            <div className='border w-10 h-10  justify-start'></div>
            <div className='border w-10 h-10  justify-end'></div>
        </div>
    </div>
  )
}

export default JobDetails