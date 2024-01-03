import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './event.css';
//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft, faFilter } from '@fortawesome/free-solid-svg-icons'; 
//images
import image1 from  '../../assets/image1.jpg';
import image2 from '../../assets/image2.jpg';
import image3 from '../../assets/image3.jpg';


const Event = () => {

  const navigate = useNavigate()

  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  const handleArrowClick=()=>{
    navigate('/')
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
            <input type='text'  />
            <FontAwesomeIcon icon={faFilter} className='filter-icon' /> 
          </div>
          <div><p className='upcoming_events'>Upcoming Events</p></div>
          <div className='container-fluid'>
            <div className='row'>
               <div className='box'>
                  <img src={image1} alt = 'image1' className='dummy'/>
                  <div className='upper_container'>
                    <div className='companyName' style={{color:'black'}}>Amazon</div>
                    <div className='time_container'><p>Today 8pm</p></div>
                  </div>
                  <div className='lower_container'>
                    <p>Advance your career in marketing</p>
                    <button >Book your seat</button>
                  </div>
               </div>
               <div className='box'>
                  <img src={image2} alt = 'image2' className='dummy'/>
                  <div className='upper_container'>
                    <div className='companyName'>Zara</div>
                    <div className='time_container'><p>Tommorrow 12pm</p></div>
                  </div>
                  <div className='lower_container'>
                    <p>How to start your career in fashion industry</p>
                    <button >Book your seat</button>
                  </div>
               </div>
               <div className='box'>
                  <img src={image3} alt = 'image1' className='dummy'/>
                  <div className='upper_container'>
                    <div className='companyName'>Google</div>
                    <div className='time_container'><p>Tommorrow 6pm</p></div>
                  </div>
                  <div className='lower_container'>
                    <p>Advance your career in IT</p>
                    <button >Book your seat</button>
                  </div>
               </div>
               <div class="floating_button">+</div>
            </div>
          </div>
        </section>
    </div>
  )
}

export default Event