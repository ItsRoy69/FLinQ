import React,{useState} from "react";
import LoginHeader from "../../constants/home_navbar/LoginHeader";
import NavBar from "../../constants/navbar/NavBar";
import img1 from "../../assets/home_image.png";
import img2 from "../../assets/child.png";
import img3 from "../../assets/cline.png";
import img4 from "../../assets/self-def.png";
import '../../constants/home_navbar/LoginHeader.css';
import './home.css';
// import AuthModal from "../../components/auth/AuthModal";
// import { userModal } from "../../contexts/userContext";

const Home = () => {

  // const { openauthmodal } =
  // userModal();




  return (

    <div id="homemain" className="w-screen h-screen overflow-y-auto overflow-x-hidden">
    {/* {openauthmodal && <AuthModal />} */}
    <LoginHeader/>
    {/* <NavBar/> */}
    <div >
     
      <div className="home-bod-first">
      
        <div className="hfl">
          <p className="hh">Your One-stop Solution To every Problem</p>
          <img src={img2} alt="" className="cline" />
          <p className="ph px-4 mb-3">
            FlinQ is a website dedicated to empowering women in all aspects of
            their life. Be it tech, medicines, health or consulting doctors, we
            have you covered! 
          </p>
          <a href="#services">
            <button className="btns">Get Started</button>
          </a>
        </div>
        <div className="hfr mt-4">
          <img src={img1} alt="" />
        </div>
      </div>
      <div className="home-bod-second" id="services">
        <h1 className="hs">Services We Provide</h1>
        <div className="hss">
          <div className="hss-card mt-2">
            <img
              src="https://images.pexels.com/photos/5910953/pexels-photo-5910953.jpeg"
              alt=""
            />
            <p className="bl1">
              <b> Pharmacies & Other Supplies </b>
            </p>
            <a className="bl" href="/meds">
              <b> Explore your needs</b>
            </a>
          </div>
          <div className="hss-card">
            <img
              src="http://whg-pc.com/wp-content/uploads/2020/07/shutterstock_780769447-1.jpg"
              alt=""
            />
            <p className="bl1">
              <b>Consult with doctors & gynecologists</b>
            </p>
            <a className="bl" href="/professionals">
              <b> Get online consultation</b>
            </a>
          </div>
          <div className="hss-card">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH_ef_tzmvgQwPFNAaV6kbFDcFnPKUXXtZwkfCqycwAZRxTOWS9iX4azlQuo16fLwWdAI&usqp=CAU"
              alt=""
            />
            <p className="bl1">
              <b>Education, Technology & Empowerment</b>
            </p>

            <a className="bl" href="/edtech">
              <b> Check upcoming events</b>
            </a>
          </div>
        </div>
      </div>
      <div className="home-bod-secondlast">
        <div className="hfr3">
          <img src={img4} alt="" />
        </div>
        <div className="hfl-def">
          <p className="hh">Making Your Safety a Priority</p>

          <p className="ph">Self defense techniques and helpline numbers</p>
          <a href="/safety">
            <button className="btns">Learn How</button>
          </a>
        </div>
      </div>
      <div className="home-bod-last">
        <div className="hfl-def">
          <p className="hh">Lend a Helping Hand</p>

          <p className="ph">
            Donations for senior citizens, widows and orphans
          </p>
          <a href="/donate">
            <button className="btns">Donate</button>
          </a>
        </div>
        <div className="hfr2">
          <img src={img3} alt="" />
        </div>
      </div>
    </div>
  </div>


  );
};

export default Home;