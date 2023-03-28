import { createSlice } from "@reduxjs/toolkit";

let initialState

if (sessionStorage.getItem("isAuth") === null) {
  initialState = { isAuth: false }
} else {
  initialState = { isAuth: true }
}


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuth = true
    },
    logoutAction: (state) => {
      state.isAuth = false
    }
  }
})

export const { login, logoutAction } = authSlice.actions

export default authSlice.reducer
