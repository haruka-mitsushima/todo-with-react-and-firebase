import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../type";
import NotLogin from "./NotLogin";
import "../styles/Home.css";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { getAll } from "../features/task/TaskSlice";
import TaskBox from "./TaskBox";
import Notasks from "./Notasks";

const Home = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state: State) => state.auth);

  const getTasks = async () => {
    const q = query(
      collection(db, "tasks"),
      where("userId", "==", sessionStorage.getItem("uid"))
    );
    const data = await getDocs(q);
    console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    const tasks = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    dispatch(getAll(tasks));
  };
  useEffect(() => {
    getTasks();
  }, []);

  const tasks = useSelector((state: State) => state.task).tasks;
  return (
    <div className="home">
      {!isAuth ? (
        <NotLogin />
      ) : !tasks.length ? (
        <Notasks />
      ) : (
        <div>
          {tasks.map((task) => (
            <TaskBox task={task} key={task.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
