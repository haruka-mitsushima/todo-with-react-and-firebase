import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import React from "react";

const Notasks = () => {
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
        タスクがありません
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
        タスクを登録する
      </Button>
    </Box>
  );
};

export default Notasks;
