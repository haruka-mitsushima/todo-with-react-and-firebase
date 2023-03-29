import React from "react";
import { useSelector } from "react-redux";
import { State } from "../type";
import NotLogin from "./NotLogin";
import "../styles/Home.css";

const Home = () => {
  const { isAuth } = useSelector((state: State) => state.auth);
  return (
    <div className="home">
      {!isAuth ? <NotLogin /> : <div>ホームのまま</div>}
    </div>
  );
};

export default Home;
