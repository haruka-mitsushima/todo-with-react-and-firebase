import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../type";
import NotLogin from "./NotLogin";
import "../styles/Home.css";
import { fetchGetTask } from "../features/task/TaskSlice";
import TaskBox from "./TaskBox";
import NoTasks from "./NoTasks";
import { AppDispatch } from "../store";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuth } = useSelector((state: State) => state.auth);

  const tasks = useSelector((state: State) => state.task).tasks;

  useEffect(() => {
    dispatch(fetchGetTask());
  }, [dispatch]);

  let taskFlg = true;

  if (!tasks.length) {
    taskFlg = false;
  }

  return (
    <div className="home">
      {!isAuth ? (
        <div className="no">
          <NotLogin />
        </div>
      ) : !taskFlg ? (
        <div className="no">
          <NoTasks />
        </div>
      ) : (
        <div className="taskBox">
          {tasks.map((task) => (
            <TaskBox task={task} key={task.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
