import { createSlice } from "@reduxjs/toolkit";
import { Tasks } from "../../type";

const initialState: { tasks: Tasks } = { tasks: [] }

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    getAll: (state, action) => {
      state.tasks = action.payload
    }
  }
})


export const { getAll } = taskSlice.actions

export default taskSlice.reducer
