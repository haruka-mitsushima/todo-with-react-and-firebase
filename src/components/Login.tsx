import React, { FormEvent } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { useDispatch } from "react-redux";
import { fetchLogin } from "../features/auth/AuthSlice";
import { AppDispatch } from "../store";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString();
    const password = data.get("password")?.toString();
    if (!email || !password) return;
    await dispatch(fetchLogin({ auth, email, password }));
    if (sessionStorage.getItem("isAuth") === "true") {
      navigation("/");
    } else {
      return;
    }
  };

  return (
    <div className="loginPage">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "white",
          borderRadius: 10,
          py: 0,
          px: 4,
          height: 450,
          width: 500,
          boxShadow: 10,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#869dc0" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          ログイン
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="メールアドレス"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="パスワード"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: "#4970a3",
              ":hover": { background: "#3b5a84" },
            }}
          >
            ログインする
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signup" variant="body2">
                {"ユーザー登録はこちら"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default Login;
