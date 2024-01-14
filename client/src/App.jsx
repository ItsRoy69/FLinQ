
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SkeletonTheme } from 'react-loading-skeleton'

import Feed from "./pages/feed/Feed";
import Home from "./pages/home/Home";
import Jobs from "./pages/jobs/Jobs";
import NavBar from "./constants/navbar/NavBar";
import EditProfile from "./pages/profile/EditProfile";
import Event from "./pages/events/Event";
import MapComponent from "./pages/map/MapComponent";
import Profile from "./pages/profile/Profile";

function App() {
	
	return (
		<SkeletonTheme baseColor='#5c5b5b' highlightColor='#aba9a9'>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/events" element= {<Event/>}/>
					<Route path="/feed" element={<Feed />} />
					<Route path="/jobs" element={<Jobs />}/>
					<Route path="/map" element = {<MapComponent/>}/>
					<Route path="/profile" element = {<Profile/>}/>
					<Route path="/edit" element = {<EditProfile/>}/>
				</Routes>
			</Router>
		</SkeletonTheme>
	)
}

export default App