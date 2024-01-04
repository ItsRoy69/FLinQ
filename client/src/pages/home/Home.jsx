import React from "react";
import "./home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="home">
        <div className="home-container">
          Write here
          <Link to={'/events'}><button style={{color : 'blue', padding : '10px'}}>Events</button></Link>
        </div>
        
      </div>
    </>
  );
};

export default Home;
