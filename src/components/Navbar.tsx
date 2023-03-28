import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LoginIcon from "@mui/icons-material/Login";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const navigation = useNavigate();
  const logout = () => {
    signOut(auth).then(() => {
      sessionStorage.clear();
      navigation("/");
    });
  };
  const isAuth = sessionStorage.getItem("isAuth");
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
