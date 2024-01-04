import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Feed from "./pages/feed/Feed";
import Home from "./pages/home/Home";
import Jobs from "./pages/jobs/Jobs";
import NavBar from "./constants/navbar/NavBar";
import Event from "./pages/events/Event";

function App() {
	return (
		<Router>
			{/* <NavBar /> */}
			<Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element= {<Event/>}/>
				<Route path="/feed" element={<Feed />} />
        <Route path="/jobs" element={<Jobs />}/>
			</Routes>
		</Router>
	);
}

export default App;