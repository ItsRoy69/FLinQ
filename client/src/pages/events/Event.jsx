import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dummyEventsArray } from '../../data/DummyEvent';
import './event.css';
//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft, faFilter } from '@fortawesome/free-solid-svg-icons'; 


const Event = () => {

  const navigate = useNavigate()

  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const [eventArray,setEventArray] = useState([])
  const [searchVal,setSearchVal] = useState('')

  useEffect(()=>{
    setEventArray(dummyEventsArray)
    console.log(eventArray)
  },[])

  const handleArrowClick=()=>{
    navigate('/')
  }

  const handleSearchValueChange = (e) =>{
    setSearchVal(e.target.value)
  }
  const handleAddEvent = ()=>{
    console.log("Addition triggered")
  }


  return (
    <div className='event_container'>
        <nav> 
           <div className='arrowBox'><FontAwesomeIcon icon={faArrowLeft} className='arrowIcon' 
            onClick={handleArrowClick}/> </div>
            <div className='header'>Events</div>
        </nav>

        <section>
          <div className='search-bar'>
            <FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon'/>
            <input type='text'  value={searchVal} onInput={handleSearchValueChange}  />
            <FontAwesomeIcon icon={faFilter} className='filter-icon' /> 
          </div>
          <div><p className='upcoming_events'>Upcoming Events</p></div>

          <div id='event-body' className='container-fluid'>
            <div className='row'>
                  {  eventArray.map ((event, index)=>(
                    event.status === "active" && (
                      <div className='box' key={index}>
                      <img src={event.image} alt = "imsge" className='dummy'/>
                        <div className='upper_container'>
                          <div className='companyName' style={{color:'black'}}>{event.eventOrganizer}</div>
                          <div className='time_container'><p>{event.timestamp}</p></div>
                        </div>
                        <div className='lower_container'>
                          <p>{event.motive}</p>
                          <button >Book your seat</button>
                        </div>
                      </div>
                    )
                    ))
                  }

               <div class="floating_button" onClick={handleAddEvent}>+</div>
            </div>
          </div>
        </section>
    </div>
  )
}

export default Event