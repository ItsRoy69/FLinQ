import React, { useEffect } from "react";
import { useState } from "react";
import axios from 'axios'
import { TimeGap } from "../EventCard";
import { useNavigate } from "react-router-dom";
import CloseRounded from "@mui/icons-material/CloseRounded";
import LocationOn from "@mui/icons-material/LocationOn";
import ApprovalIcon from "@mui/icons-material/Approval";
import DoneIcon from "@mui/icons-material/Done";

const EventDetails = () => {
    const [booked, setBooked] = useState(false)
    const [eventDetails, setEventDetails] = useState({})
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const eventParam = queryParams.get("eid");

    useEffect(()=>{
        const initEventLoad = async() => {
            await axios.get(`https://flinq-backend.onrender.com/events/${eventParam}`).then((response)=>{
                setEventDetails(response.data.result)
                setBooked(response.data.result.booking)
            }).catch((err)=>{
                console.log(err)
            })
        }
        initEventLoad()
    },[])

    const handleBookChange = () =>{
        
        handleEventBook()
    }
    
    const handleEventBook = async() =>{ 
        
        // console.log("Booking Status: ",booked)

        const updatedEvent = {
            ...eventDetails,
           booking: !booked
        }
        setEventDetails(updatedEvent)
        console.log(updatedEvent)
        await axios.put(`https://flinq-backend.onrender.com/events/${eventParam}`,{updatedEvent}).then((response) =>{
            
            setBooked(response.data.result.booking)
        }).catch((err) =>{
            console.log(err)
        })
    }
    const handleCloseClicked = () => {
        navigate("/events");
    };

    return (
        <div className="bg-custom-dark p-3 backdrop-blur flex flex-col h-screen w-screen">
            <div className="w-full h-full text-white border border-dashed rounded-xl bg-custom-dark flex flex-col items-center  overflow-hidden">
                <div className="add-post--header h-20 w-full flex justify-between items-center px-5">
                <span className="text-3xl py-5">Event Details</span>
                <span
                    className="p-3 rounded-md bg-red-400 text-slate-900 cursor-pointer active:scale-105"
                    onClick={handleCloseClicked}
                >
                    <CloseRounded />
                </span>
                </div>
                <div className="flex justify-between w-screen px-10 pt-8 pb-3">
                <div className="flex flex-col">
                    <div className=" py-2  w-27 font-bold text-xl justify-end">
                        {eventDetails.eventName}
                    </div>
                    <div className=" py-1  justify-end text-slate-300">{eventDetails.companyName}</div>
                    <div className=" py-1  justify-end">
                        Bangalore,India
                    <span>
                        <LocationOn className="h-6 pr-1" />
                    </span>
                    </div>
                    <div className=" flex w-[130px]  rounded items-center bg-slate-300 text-slate-500  justify-center h-6">
                    {TimeGap(eventDetails.timeAllocated)}
                    </div>
                </div>
                <div className="border flex  w-10 h-10 "></div>
                </div>
                <div className="flex flex-col items-start px-10 w-screen py-1">
                    <div className="text-lg py-2  font-bold">About The Event</div>
                    <div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                </div>
                <div className="flex flex-col items-start w-screen py-1  px-10  justify-start">
                    <div className="text-lg py-2 font-bold">Perks</div>
                    <div className="px-2">
                        <ul className="list-disc px-3 text-white">
                        <li className="p-1">Learn Industrial Skill</li>
                        <li className="p-1">Learn Industrial Skill</li>
                        <li className="p-1">Learn Industrial Skill</li>
                        </ul>
                    </div>
                </div>
                
                <div
                className="add-post--footer fixed-bottom h-20 w-full flex justify-center items-center"
                onClick={handleBookChange}
                >
                {!booked ? (
                    <>
                    <div className="w-4/5 py-3 rounded-lg text-xl flex justify-center items-center gap-5 bg-gradient-to-b from-pink-600 to-purple-700 fixed bottom-7 cursor-pointer active:scale-105">
                        Book your seat
                        <span className="-translate-y-1">
                        <ApprovalIcon />
                        </span>
                    </div>
                    </>
                ) : (
                    <>
                    <div className="w-4/5 py-3 rounded-lg text-xl flex justify-center items-center gap-5 bg-gradient-to-b fixed bottom-7 from-pink-600 to-purple-700 cursor-pointer active:scale-105">
                        Seat booked
                        <span className="-translate-y-1">
                        <DoneIcon />
                        </span>
                    </div>
                    </>
                )}
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
