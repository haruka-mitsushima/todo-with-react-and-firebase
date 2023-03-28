import React from "react";
import { useSelector } from "react-redux";
import { State } from "../type";
import NotLogin from "./NotLogin";

const Home = () => {
  const { isAuth } = useSelector((state: State) => state.auth);
  console.log("Homeがレンダーされました");
  return (
    <div className="home">
      {!isAuth ? <NotLogin /> : <div>ホームのまま</div>}
    </div>
  );
};

export default Home;
