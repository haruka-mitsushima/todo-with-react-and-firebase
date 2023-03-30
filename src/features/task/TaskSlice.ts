import { createSlice } from "@reduxjs/toolkit";
import { Tasks } from "../../type";

const initialState: { tasks: Tasks } = { tasks: [] }

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
