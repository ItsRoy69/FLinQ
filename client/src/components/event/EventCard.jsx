import "./eventCard.css";
import { useNavigate } from "react-router-dom";

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  
  const handleEventsClicked = () =>{
    navigate('/events/eventdetails')
  }

  return (
    <div className="w-full h-60 object-cover flex justify-center rounded-2xl relative backdrop-blur-sm overflow-hidden" onClick={handleEventsClicked}>
      <img
        src={event.image}
        alt="image"
        className="rounded-2xl h-full w-full"
      />
      <div className="w-full absolute top-0 left-0 text-start flex justify-between p-[10px]">
        <div className="company-name">{event.eventOrganizer}</div>
        <div className="event-time text-sm text-center rounded-2xl border border-red-500 bg-red-400 px-2 py-1">
          <p>{event.timestamp}</p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full text-left backdrop-blur-md p-[10px] flex justify-between text-sm ">
        <p className="w-3/5 text-start font-semibold">{event.motive}</p>
        <button className="bg-violet-500 m-[6px] p-[10px] rounded-2xl">
          Book your seat
        </button>
      </div>
    </div>
  );
};

export default EventCard;
