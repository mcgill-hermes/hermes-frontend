import "./App.css";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register/Register";
import Footer from "./components/Footer/Footer.js";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./components/Homepage/Homepage";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile.js";
import News from "./components/News/News";
import Preference from "./components/Preference/Preference";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Homepage />}></Route>
          <Route exact path="/news" element={<News />}></Route>
          <Route exact path="/preference" element={<Preference />}></Route>
          <Route exact path="/signup" element={<Register />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
