import { createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { Tasks } from "../../type";

let tasks: Tasks = []

const getTasks = async () => {
  const q = query(
    collection(db, "tasks"),
    where("userId", "==", sessionStorage.getItem("uid"))
  );
  const data = await getDocs(q);
  console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  const result = data.docs.map((doc) => ({ id: doc.id, task: doc.data().task, detail: doc.data().detail, tags: doc.data().tags, done: doc.data().done, deleted: doc.data().deleted, userId: doc.data().uid, }));
  tasks = result
};

getTasks()

const initialState: { tasks: Tasks } = { tasks: tasks }

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload
    }
  }
})


export const { setTasks } = taskSlice.actions

export default taskSlice.reducer
