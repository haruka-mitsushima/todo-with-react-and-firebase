import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Tasks, Task } from "../../type";
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../firebase";

const initialState: { tasks: Tasks } = { tasks: [] }
type PostTask = Omit<Task, "id">

export const fetchCreateTask = createAsyncThunk<Task, PostTask>("task/post", async (task) => {
  const res = await addDoc(collection(db, "tasks"), {
    ...task
  });
  return { ...task, id: res.id }
})

export const fetchGetTask = createAsyncThunk<Tasks, undefined, { rejectValue: string }>("task/get", async (_, { rejectWithValue }) => {
  const q = query(
    collection(db, "tasks"),
    where("userId", "==", sessionStorage.getItem("uid")),
    where("deleted", "==", false)
  );
  const data = await getDocs(q);
  const tasks = data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Tasks;
  return tasks
})

export const fetchDeleteTask = createAsyncThunk<string, string>("task/delete", async (id) => {
  await updateDoc(doc(db, "tasks", id), { deleted: true });
  return id
})

export const fetchUpdateTask = createAsyncThunk<string, { id: string, done: boolean }>("task/update", async ({ id, done }) => {
  await updateDoc(doc(db, "tasks", id), { done: !done });
  return id
})

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCreateTask.fulfilled, (state, action) => {
      return {
        tasks: [...state.tasks, action.payload]
      }
    })
    builder.addCase(fetchGetTask.fulfilled, (state, action) => {
      return {
        tasks: action.payload
      }
    })
    builder.addCase(fetchDeleteTask.fulfilled, (state, action) => {
      return {
        tasks: state.tasks.filter((task) =>
          task.id !== action.payload
        )
      }
    })
    builder.addCase(fetchUpdateTask.fulfilled, (state, action) => {
      return {
        tasks: state.tasks.map((task) =>
          task.id === action.payload ? { ...task, done: !task.done } : task)
      }
    })
  }
})


export const { setTasks } = taskSlice.actions

export default taskSlice.reducer
