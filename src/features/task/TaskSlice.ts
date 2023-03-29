import { createSlice } from "@reduxjs/toolkit";

const initialState = { tasks: [] }

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
