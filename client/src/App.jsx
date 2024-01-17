
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SkeletonTheme } from 'react-loading-skeleton'

import FeedTypeState from "./contexts/FeedTypeState";

import Feed from "./pages/feed/Feed"
import Home from "./pages/home/Home"
import Jobs from "./pages/jobs/Jobs"
import Event from "./pages/events/Event"
import Profile from './pages/profile/Profile';
import EditProfile from "./pages/profile/EditProfile";
import MapComponent from './pages/map/MapComponent'
import ChatBot from "./pages/chat/bot/ChatBot"
import ChatCommunity from "./pages/chat/community/ChatCommunity";
import ChatAnonymous from "./pages/chat/anonymous/ChatAnonymous";

function App() {
	
	return (
		<SkeletonTheme baseColor='#5c5b5b' highlightColor='#aba9a9'>
			<Router>
				<FeedTypeState>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/home" element = {<Home/>}/>
						<Route path="/events" element= {<Event/>}/>
						<Route path="/feed" element={<Feed />} />
						<Route path="/jobs" element={<Jobs />}/>
						<Route path='/chat/aibot' element={<ChatBot/>}/>
						<Route path='/chat/community/*' element={<ChatCommunity/>}/>
						<Route path='/chat/anonymous' element={<ChatAnonymous/>}/>
						<Route path="/map" element ={<MapComponent/>}/>
						<Route path="/profile" element = {<Profile/>}/>
						<Route path="/edit" element ={<EditProfile/>}/>

					</Routes>
				</FeedTypeState>
			</Router>
		</SkeletonTheme>
	)
}

export default App