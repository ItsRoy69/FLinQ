import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { dummyEventsArray } from '../../data/DummyEvent';
import { Container } from '@mui/material';

const EventCard = ({event}) => {

    const TimeGap = ({data}) =>{
        const currTime = new Date();
        const eventTime = new Date(data);

        //year gap
        let yearGap = eventTime.getFullYear() - currTime.getFullYear()
        if(yearGap > 0)
        {
            return `After ${yearGap} year`
        }
        //months gap
        let monthsGap = eventTime.getMonth() - currTime.getMonth()
        if(monthsGap > 0)
        {
            if(monthsGap == 1)
            {
                return `After ${monthsGap} month`
            }
            else {
                return `After ${monthsGap} months`
            }
        }
        //days gap
        let daysGap = eventTime.getDay() - currTime.getDay()
        let time = eventTime.getTime();
        if(daysGap > 0 )
        {
            if(daysGap > 1)
            {
                return `After ${daysGap} days at ${time}`
            }
            else {
                return `Tommorrow ${time}`
            }
        }
        //hours gap 
        let hoursGap = eventTime.getHours() - currTime.getHours()
        if(hoursGap > 0)
        {
            if(hoursGap == 1)
            {
                `Within ${hoursGap} hour at ${time}`
            }
            else {
                `Within ${hoursGap} hours at ${time}`
            }
        }
        //minutes gap 
        let minutesGap = eventTime.getMinutes() - currTime.getMinutes()
        if(minutesGap > 0)
        {
            if(minutesGap == 1)
            {
                `Within ${minutesGap} minute`;
            }
            else {
                `Within ${minutesGap} minutes`;
            }
        }
    }

    return (
        <div className='bg-indigo-500' >
            <div className='box relative rounded-15 flex justify-center m-15 mx-10 mt-0 mb-10 backdrop-blur-5px'>
                <img src={event.image} alt = "image" className= "980"/>
                <div className="upper-container absolute top-0 left-0 w-full text-left flex justify-between p-10">
                    <div className='company_name-text-white-font-extrabold '>{event.eventOrganizer}</div>
                    <div className='time_container'><p className='text-center-text-white-text-sm-px-13-py-4-mr-5-rounded-14-bg-rgb-223-114-114'>{TimeGap (event.timestamp)}</p></div>
                </div>
                <div className='lower_container-absolute-bottom-0-right-0-w-full-text-left-backdrop-blur-10-p-10-flex-justify-between-text-sm-rounded-20 '>
                    <p className='w-150-text-left-text-white-font-medium'>{event.motive}</p>
                    <button className='bg-rgb-125-125-189-text-white-m-6-p-10-rounded-15'>Book your seat</button>
                </div>
            </div>
        </div>
        
    
    )
}

export default EventCard