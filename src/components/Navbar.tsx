import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LoginIcon from "@mui/icons-material/Login";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../type";
import { fetchLogout } from "../features/auth/AuthSlice";
import { AppDispatch } from "../store";

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { isAuth } = useSelector((state: State) => state.auth);

  const logout = async () => {
    await dispatch(fetchLogout(auth));
    navigate("/");
  };

  return (
    <nav>
      <Link to="/">
        <AssignmentIcon />
        ホーム
      </Link>

      {!isAuth ? (
        <Link to="/login">
          <LoginIcon />
          ログイン
        </Link>
      ) : (
        <>
          <Link to="/create">
            <DriveFileRenameOutlineIcon />
            タスク追加
          </Link>
          <Link to="#" onClick={() => logout()}>
            <LoginIcon />
            ログアウト
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
