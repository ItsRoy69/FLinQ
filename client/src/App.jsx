import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Feed from "./pages/feed/Feed";
import Home from "./pages/home/Home";
import NavBar from "./constants/navbar/NavBar";
import Event from "./pages/events/Event";

function App() {
  return (
    <Router>
      {/* <NavBar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element= {<Event/>}/>
        <Route path="/feeds" element = {<Feed/>}/>
      </Routes>
    </Router>
  );
}

export default App;