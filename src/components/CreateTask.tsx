import React, { useEffect, useState } from "react";
import "../styles/CreateTask.css";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
  const isAuth = sessionStorage.getItem("uid");
  const [title, setTitle] = useState("");
  const [taskText, setTaskText] = useState("");

  const navigate = useNavigate();

  const createTask = async () => {
    // await addDoc(collection(db, "tasks"), {
    //   title,
    //   tasksText: taskText,
    //   author: {
    //     userName: auth.currentUser.displayName,
    //     id: auth.currentUser.uid,
    //   },
    // });
    navigate("/");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  return (
    <div className="createTaskPage">
      <div className="taskContainer">
        <h1>タスクを追加する</h1>
        <div className="inputTask">
          <div>タスク</div>
          <input
            type="text"
            placeholder="タスクを記入"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="inputTask">
          <div>説明</div>
          <textarea
            placeholder="説明を記入"
            onChange={(e) => setTaskText(e.target.value)}
          ></textarea>
        </div>
        <div className="selectTag">
          <div>タグ</div>
          <select name="tag">
            <option value="仕事">仕事</option>
            <option value="家事">家事</option>
            <option value="緊急">緊急</option>
          </select>
        </div>
        <button className="taskButton" onClick={createTask}>
          追加する
        </button>
      </div>
    </div>
  );
};

export default CreateTask;
