import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Feed from "./pages/feed/Feed";
import Home from "./pages/home/Home";
import NavBar from "./constants/navbar/NavBar";

function App() {
	return (
		<Router>
			{/* <NavBar /> */}
			<Routes>
				<Route path="/" element={<Feed />} />
			</Routes>
		</Router>
	);
}

export default App;