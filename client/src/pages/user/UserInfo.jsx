import React from 'react';
import { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/userContext';
import {ReactTyped} from 'react-typed'


const UserInfo = () => {
    const usercontext = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();

    const name = location.state.name;
    const email = location.state.email;

    const[error, setError] = useState('')
    const [creds, setcreds] = useState({
        password: "",
        name:name,
        email : email,
        username: "",
        phone: "",
        occupation: "",
        birthdate:"",
        gender:""
       
      });

      const handleChange = (e) => {
        setcreds({ ...creds, [e.target.name]: e.target.value })
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
          // console.log(user);
          axios.post("http://localhost:5000/user/register",creds).
          then((response)=>{
            console.log(response)
              if(response.status == 200){
              usercontext.updateUser(response.data.user);
              navigate('/feed')
              }
            
          }).catch((err)=>{
            console.log(err.response.data.massage)
            setError(err.response.data.message)
            
          }) 
          
         
      };

    return (
        <div className='md:flex md:flex-row  flex flex-col items-center  font-sans bg-gradient-to-br from-white to-red-200 p-10 h-screen'>
            <div className='justify-between md:py-0 py-5 w-full'>
                <ReactTyped
                className='md:text-5xl text-3xl text-red-400 flex self-start font-bold w-full md:w-1/2'
                strings= {
                    [
                        `Hello ${name}`,
                        "Welcome to FlinQ",
                        "Help us to know you more"
                    ]
                }
                typeSpeed = {70}
                backSpeed = {40}
                loop
                />
                
            </div> 
            <div className="w-full md:px-0  flex flex-col overflow-scroll">
                <h2 className='text-3xl text-black flex self-start items-start font-semibold mb-10'>Please provide more information</h2>

                <div className="flex justify-between">
                <div className="flex flex-col w-1/2 pr-2">
                <label>Phone<span className="text-red-700">*</span></label>
                <input 
                className="w-full text-black py-2 px-2 rounded-[10px] bg-transparent my-4 border border-slate-600 outline-none focus:outline-none"
                type="number"
                placeholder="+91"
                value={creds.phone}
                onChange={handleChange}
                name="phone"
                />
                </div>
                <div className="flex flex-col w-1/2 pl-2">
                  <label>Username<span className="text-red-700">*</span></label>
                <input 
                className="w-full text-black py-2 px-2  rounded-[10px] bg-transparent my-4 border border-slate-600 outline-none focus:outline-none"
                type="text"
                placeholder="eg:user302"
                onChange={handleChange}
                value={creds.username}
                name="username"
                />
                </div>
                </div>
                        
                <div className="flex justify-between">
                <div className="flex flex-col w-1/2 pr-2">
                <label>Gender</label>
                <select 
                  name="gender"
                  value={creds.gender} 
                  onChange={handleChange}
                  className="w-full text-black py-2 px-2 rounded-[10px] bg-transparent my-4 border border-slate-600 outline-none focus:outline-none">
                  <option value="" disabled defaultValue>Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                 
                </select>
                </div>
                <div className="flex flex-col w-1/2 pl-2">
                <label>Birthdate</label>
                <input 
                className="w-full text-black py-2 px-2  rounded-[10px] bg-transparent my-4 border border-slate-600 outline-none focus:outline-none"
                type="date"
                placeholder=""
                onChange={handleChange}
                value={creds.birthdate}
                name="birthdate"
                />
                </div>
                </div>
                <label >Occupation<span className="text-red-700">*</span></label>
                <select 
                  name = "occupation"
                  value={creds.occupation} onChange={handleChange}
                  className="w-full text-black py-2 px-2 rounded-[10px] bg-transparent my-4 border border-slate-600 outline-none focus:outline-none">
                  <option value="" disabled defaultValue>Select Profession</option>
                  <option value="gynaecologist">Gynaecologist</option>
                  <option value="teacher">Teacher</option>
                  <option value="engineer">Engineer</option>
                  <option value="homemaker">Home Maker</option>
                  <option value="other">Other</option>
                </select>
          
                <label>Password<span className="text-red-700">*</span></label>
                <input 
                className="w-full text-black py-2 px-2 rounded-[10px] bg-transparent my-4 border border-slate-600 outline-none focus:outline-none"
                type="password"
                placeholder="Must conatain an uppercase, digits and a special character"
                value={creds.password}
                onChange={handleChange}
                name="password"
                />
                {
                  error ? (
                    <>
                      <div className="w-full flex   font-sans text-lg self-center text-red-600 ">{error}</div>
                    </>
                  ):
                  null
                }
                <div className=" w-full md:flex md:flex-row flex flex-col  justify-between">
                <button className="md:w-1/4 px-3  rounded-[10px] py-2 border border-solid bg-red-300 text-black hover:text-black hover:bg-white" onClick={handleSubmit}>Register</button>
                

                {/* <div className="flex items-center text-slate-400 justify-center  text-lg">Or</div> */}
                {/* <button className="border bg-black text-white px-1 md:mt-0 mt-4 md:px-4 py-2  rounded-[10px]  md:text-lg" onClick={handleGoogleLogin} ><span className="px-2 mr-3 md:mr-5"><GoogleIcon/></span>Sign in with Google</button>  */}
                
                </div>
              </div>           
            </div>
      
    )
}

export default UserInfo