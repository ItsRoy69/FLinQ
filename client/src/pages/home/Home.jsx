import React,{useState} from "react";
import LoginHeader from "../../constants/home_navbar/LoginHeader";
import {motion} from 'framer-motion';
import NavBar from "../../constants/navbar/NavBar";
import img1 from "../../assets/home_image.png";
import img2 from "../../assets/cline.png";
import img3 from "../../assets/child.png";
import img4 from "../../assets/self-def.png";
import '../../constants/home_navbar/LoginHeader.css';
import './home.css';


const Home = () => {

  return (

    <div id="homemain" className="bg-fixed">
    
    <LoginHeader/>
    
    <div> 
      <div  className="home-bd-main md:flex flex flex-col md:flex-row  w-auto justify-center  md:justify-evenly bg-slate-900 font-sans font-normal items-center pt-[15vh] text-white text-center md:text-start">
        <div  className="hf1 flex flex-col mt-10 md:w-[40vw] w-screen">
            <p className="hh text-2xl md:text-4xl md:w-[34vw] w-screen flex justify-center md:justify-start font-sans font-normal md:leading-loose" id="hh">Your One-stop Solution To every Problem</p>
          <img src={img2} alt="" className=" w-[250px] md:w-[300px] h-auto md:ml-[0.51vw] md:mt-[0vh] md:mb-[20px] md:p-[0]  p-[20px] md:justify-start justify-center mb-0 md:self-start self-center" />
          <p  className="ph md:w-[40vw] w-screen flex items-center justify-center text-lg font-Imprima font-normal">
            FlinQ is a website dedicated to empowering women in all aspects of
            their life. Be it tech, medicines, health or consulting doctors, we
            have you covered! 
          </p>
          <a href="#services" id="getStarted">
            <button  className="btns w-[200px] md:w-[10vw] bg-red-300 mt-5 border-1 border-#372837 rounded-[4px] color-white h-[40px]">Get Started</button>
          </a>
        </div>
        <div  className="hfr flex items-center justify-center">
          <img src={img1} className="h-auto w-[400px] mt-[10vh] p-[20px] md:w-[500px]" alt="" />
        </div>
      </div>
      <div  className="home-bod-second text-white pt-[20px]  md:pt-[70px] md:pr-[50px] flex flex-col items-center justify-center bg-slate-900 font-sans" id="services">
        <p className="hs w-auto leading-10  flex font-sans md:text-4xl text-2xl justify-center text-center md:mt-[0] mt-[14px] ">Services We Provide</p>
        <div className="hss mt-[20px] md:mt-[40px] md:flex flex flex-col md:flex-row  item-center justify-center md:justify-around gap-[60px]">
          <div className="hss-card w-[15rem]  md:w-[20vw] h-[380px] mb-2 md:h-[400px] flex flex-col items-center bg-white rounded-[10px]  ">
            <img
              src="https://images.pexels.com/photos/5910953/pexels-photo-5910953.jpeg" 
              className=" w-[15rem] md:w-[20vw] min-h-[200px] max-h-[200px] object-cover rounded-[10px] "
              alt=""
            />
            <p className="bl1 font-sans fonr-normal text-black text-lg leading-7 text-center mt-[5vh] ">
              <b> Pharmacies & Other Supplies </b>
            </p>
            <a className="bl cursor-pointer font-normal text-center text-lg text-black p-[10px] border-b-1 font-sans" href="/meds">
              <b> Explore your needs</b>
            </a>
          </div>
          <div className="hss-card w-[15rem]  md:w-[20vw] h-[380px] mb-2 md:h-[400px] flex flex-col items-center bg-white rounded-[10px]">
            <img
              src="https://drsmart.me/wp-content/uploads/2018/08/iStock-672830958.jpg"
              alt=""
              className="w-[15rem] md:w-[20vw] min-h-[200px] max-h-[200px] object-cover rounded-[10px]  "
            />
            <p className="bl1 font-sans text-black fonr-normal color-[#5f475f] text-lg leading-7 text-center mt-[5vh]  ">
              <b>Consult with doctors & gynecologists</b>
            </p>
            <a className="bl cursor-pointer font-normal text-center text-lg text-black p-[10px] border-b-1 font-sans " href="/professionals">
              <b> Get online consultation</b>
            </a>
          </div>
          <div className="hss-card w-[15rem]  md:w-[20vw] h-[380px] mb-2 md:h-[400px] flex flex-col items-center bg-white rounded-[10px] ">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH_ef_tzmvgQwPFNAaV6kbFDcFnPKUXXtZwkfCqycwAZRxTOWS9iX4azlQuo16fLwWdAI&usqp=CAU"
              alt=""
              className="w-[15rem] md:w-[20vw] min-h-[200px] max-h-[200px] object-cover rounded-[10px] "
            />
            <p className="bl1 px-2 font-sans font-normal text-black color-[#5f475f] text-lg leading-7 text-center mt-[5vh] ">
              <b>Education, Technology & Empowerment</b>
            </p>

            <a className="bl cursor-pointer font-normal text-center text-lg text-black p-[10px] border-b-1 font-sans" href="/events">
              <b> Check upcoming events</b>
            </a>
          </div>
        </div>
      </div>
      <div className="home-bod-secondlast flex items-center bg-slate-900 justify-evenly pt-[10vh]">
        <div className="hfr3 flex items-center justify-center">
          <img src={img4} alt="" className="height-auto w-[500px]" />
        </div>
        <div className="hfl-def flex flex-col w-[40vw] text-white">
          <p className="hh text-2xl md:text-4xl md:w-[34vw] w-screen flex justify-center md:justify-start font-sans font-normal md:leading-loose">Making Your Safety a Priority</p>

          <p className="ph md:w-[40vw] w-screen flex  md:justify-start items-center justify-center text-lg font-Imprima font-normal ">Self defense techniques and helpline numbers</p>
          <a href="/safety">
            <button className="btns w-[200px] md:w-[10vw] bg-red-300 mt-5 border-1 border-#372837 rounded-[4px] color-white h-[40px]">Learn How</button>
          </a>
        </div>
      </div>
      <div className="home-bod-last flex items-center bg-slate-900 justify-evenly pt-[10vh]">
        <div className="hfl-def flex flex-col w-[40vw] text-white">
          <p className="hh text-2xl md:text-4xl md:w-[34vw] w-screen flex justify-center md:justify-start font-sans font-normal md:leading-loose">Form a community</p>

          <p className="ph md:w-[40vw] w-screen flex  md:justify-start items-center justify-center text-lg font-Imprima font-normal">
            Reach people like you . Learn new aspects of life.
          </p>
          <a href="/donate">
            <button className="btns w-[200px] md:w-[10vw] bg-red-300 mt-5 border-1 border-#372837 rounded-[4px] color-white h-[40px]">Donate</button>
          </a>
        </div>
        <div className="hfr2 " >
          <img src={img3} className="h-auto w-[500px]" alt="" />
        </div>
      </div>
    </div>
  </div>
  );
};

export default Home;
