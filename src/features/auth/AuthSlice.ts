import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Auth, signInWithEmailAndPassword, signOut } from "firebase/auth";

let initialState

if (sessionStorage.getItem("isAuth") === null) {
  initialState = { isAuth: false }
} else {
  initialState = { isAuth: true }
}

export const fetchLogin = createAsyncThunk<Auth, { auth: Auth, email: string, password: string }>("auth/login", async ({ auth, email, password }) => {
  await signInWithEmailAndPassword(auth, email, password)
  return auth
})

export const fetchLogout = createAsyncThunk<void, Auth>("auth/logout", async (auth) => {
  signOut(auth)
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutAction: (state) => {
      state.isAuth = false
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      sessionStorage.setItem("isAuth", "true");
      if (action.payload.currentUser?.uid.toString()) {
        sessionStorage.setItem("uid", action.payload.currentUser?.uid);
      }
      return {
        isAuth: true
      }
    })
    builder.addCase(fetchLogin.rejected, (state) => {
      sessionStorage.setItem("isAuth", "false");
      return {
        isAuth: false
      }
    })
    builder.addCase(fetchLogout.fulfilled, (state) => {
      sessionStorage.clear();
      return {
        isAuth: false
      }
    })
  }
})

export const { logoutAction } = authSlice.actions

export default authSlice.reducer
