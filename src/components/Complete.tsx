import React from "react";
import Button from "@mui/material/Button";
import "../styles/Complete.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Complete = () => {
  return (
    <div className="completePage">
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
        <Typography component="h1" variant="h5">
          会員登録が完了しました
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
    </div>
  );
};

export default Complete;
