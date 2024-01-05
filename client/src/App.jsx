import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Feed from "./pages/feed/Feed";
import Home from "./pages/home/Home";
import Jobs from "./pages/jobs/Jobs";
import NavBar from "./constants/navbar/NavBar";
import Event from "./pages/events/Event";
// import SearchLocation from "./pages/SearchLocation";
// import MapComponent from "./pages/MapComponent";




function App() {
	// const [selectedLocation, setSelectedLocation] = useState({
	// 	lat: 28.7041,
	// 	lng: 77.1025,
	//   });
	return (
		<Router>
			{/* <NavBar /> */}
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/events" element= {<Event/>}/>
				<Route path="/feed" element={<Feed />} />
				<Route path="/jobs" element={<Jobs />}/>
				{/* <Route path="/search" element ={<SearchLocation selectedLocation={selectedLocation} />}/> */}
				{/* <Route path="/map" element = {<MapComponent setSelectedLocation={setSelectedLocation}/>}/> */}
			</Routes>
		</Router>
	);
}

export default App;