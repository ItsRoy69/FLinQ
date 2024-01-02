import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './index.css';
import Home from "./pages/home/Home";
import NavBar from "./constants/navbar/NavBar";
import Feed from "./pages/feed/Feed";

function App() {
	return (
		<Router>
			{/* <NavBar/> */}
			<Routes>
				<Route path="/" element={<Feed />} />

			</Routes>
		</Router>
	);
}

export default App;