import "./eventCard.css";
import { useNavigate } from "react-router-dom";


export const TimeGap = (date) => {
		
  const postTime = new Date(date);
  const currTime = new Date();

  // year ago
  let yearsGap =  postTime.getFullYear() - currTime.getFullYear();
  if (yearsGap > 0) {
  return `After ${yearsGap} year${yearsGap > 1 ? "s" : ""}`;
  }

  // months ago
  let monthsGap =  postTime.getMonth() -currTime.getMonth();
  if (monthsGap > 0) {
  return `After ${monthsGap} month${monthsGap > 1 ? "s" : ""}`;
  }

  // weeks ago
  let daysGap =  postTime.getDate() - currTime.getDate();
  if (daysGap > 7) {
  return `After ${Math.round(daysGap / 7)} week${
    Math.round(daysGap / 7) > 1 ? "s" : ""
  }`;
  }

  // days ago
  if (daysGap > 0) {
  if(daysGap == 1){
    return `Tommorrow`
  }
    return `After ${daysGap} day${daysGap > 1 ? "s" : ""} `;
  }
  else {
    return `Today`
  }

  // hours ago
  let hoursGap = postTime.getHours() - currTime.getHours();
  if (hoursGap > 0) {
  return `After ${hoursGap} hour${hoursGap > 1 ? "s" : ""} `;
  }

  // minutes ago
  let minutesGap =   postTime.getMinutes() - currTime.getMinutes();
  if (minutesGap > 0) {
  return `After ${minutesGap} minute${minutesGap > 1 ? "s" : ""}`;
  }

  // seconds ago
  let secondsGap =  postTime.getSeconds() - currTime.getSeconds();
  return `After ${secondsGap} second${secondsGap > 1 ? "s" : ""}`;
};

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  
  const handleEventsClicked = () =>{
    navigate(`/events/eventdetails/?eid=${event._id}`)
  }
  
  
  

  return (
    <div className="w-full h-60 object-cover flex justify-center rounded-2xl relative backdrop-blur-sm overflow-hidden" onClick={handleEventsClicked}>
      <img
        src={event.eventPic}
        alt="image"
        className="rounded-2xl h-full w-full"
      />
      <div className="w-full absolute top-0 left-0 text-start  flex justify-between p-[10px]">
        <div className="company-name borde rounded-md items-center text-black px-2 bg-slate-400">{event.companyName}</div>
        <div className="event-time text-sm text-center rounded-2xl border border-red-500 bg-red-400 px-2 py-1">
          <p>{TimeGap(event.timeAllocated)}</p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full text-left backdrop-blur-md p-[10px] flex justify-between text-sm ">
        <p className="w-3/5 text-start text-xl  font-semibold">{event.eventName}</p>
        {!event.booking?(
          <button className="bg-violet-500 m-[6px] p-[10px] rounded-2xl">
            Book your seat
          </button>
        ):
          <button className="bg-violet-500 m-[6px] p-[10px] rounded-2xl">
            Seat Booked
          </button>
        }
        
      </div>
    </div>
  );
};

export default EventCard;
