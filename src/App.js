import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Profile from "./components/Profile/Profile.js";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Footer from "./components/Footer/Footer.js"
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Navbar />}></Route>
          <Route exact path="/signup"></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
        <Footer />
      </div>
    </Router >
  );
}

export default App;
