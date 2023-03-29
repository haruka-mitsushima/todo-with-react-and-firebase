import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../type";
import NotLogin from "./NotLogin";
import "../styles/Home.css";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { setTasks } from "../features/task/TaskSlice";
import TaskBox from "./TaskBox";
import NoTasks from "./NoTasks";

const Home = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state: State) => state.auth);

  const getTasks = async () => {
    const q = query(
      collection(db, "tasks"),
      where("userId", "==", sessionStorage.getItem("uid")),
      where("deleted", "==", false)
    );
    const data = await getDocs(q);
    console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    const tasks = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    dispatch(setTasks(tasks));
  };
  const tasks = useSelector((state: State) => state.task).tasks;

  useEffect(() => {
    getTasks();
  }, []);

  let taskFlg = true;

  if (!tasks.length) {
    taskFlg = false;
  }

  console.log(tasks.length);
  console.log(taskFlg);
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
