import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SkeletonTheme } from 'react-loading-skeleton'

import Feed from "./pages/feed/Feed"
import Home from "./pages/home/Home"
import Jobs from "./pages/jobs/Jobs"
import Event from "./pages/events/Event"
// import SearchLocation from "./pages/SearchLocation"
// import MapComponent from "./pages/MapComponent"

import ChatBot from "./pages/chat/bot/ChatBot";

function App() {
	// const [selectedLocation, setSelectedLocation] = useState({
	// 	lat: 28.7041,
	// 	lng: 77.1025,
	//   })
	return (
		<SkeletonTheme baseColor='#5c5b5b' highlightColor='#aba9a9'>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/events" element= {<Event/>}/>
					<Route path="/feed" element={<Feed />} />
					<Route path="/jobs" element={<Jobs />}/>
					<Route path='/chat/aibot' element={<ChatBot/>}/>
				</Routes>
			</Router>
		</SkeletonTheme>
	)
}

export default App