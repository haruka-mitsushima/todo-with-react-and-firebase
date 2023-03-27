import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Done from "./components/Done";
import CreateTask from "./components/CreateTask";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Signup from "./components/Signup";
import Complete from "./components/Complete";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/done" element={<Done />}></Route>
        <Route path="/create" element={<CreateTask />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/complete" element={<Complete />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
