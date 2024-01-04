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
  const [page,setPage] = useState(1)

  useEffect(()=>{
    setEventArray(dummyEventsArray)
  },[])

  useEffect(() => {
		const eventBody = document.getElementById('event-body')
		const handleScroll = () => {
			if (eventBody.scrollHeight - eventBody.offsetHeight - eventBody.scrollTop < 1) {
				// bottom touched
				setEventArray([...eventArray, dummyEventsArray[0], dummyEventsArray[1]])
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
        <nav className='nav_events'> 
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
                          <div className='companyName'>{event.eventOrganizer}</div>
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