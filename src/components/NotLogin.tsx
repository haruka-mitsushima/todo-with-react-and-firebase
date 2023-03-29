import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import Avatar from "@mui/material/Avatar";

const NotLogin = () => {
  return (
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
      <Avatar sx={{ mb: 3, bgcolor: "#869dc0" }}>
        <FactCheckIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        ログインしてタスク管理をはじめよう！
      </Typography>
      <Button
        variant="contained"
        href="/login"
        sx={{
          mt: 3,
          mb: 2,
          bgcolor: "#4970a3",
          ":hover": { background: "#3b5a84" },
          width: 250,
        }}
      >
        ログインする
      </Button>
    </Box>
  );
};

export default NotLogin;
