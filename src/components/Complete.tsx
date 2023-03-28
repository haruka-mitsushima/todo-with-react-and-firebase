import React from "react";
import Button from "@mui/material/Button";
import "../styles/Complete.css";

const Complete = () => {
  return (
    <div className="completePage">
      <div className="messageContainer">
        <div className="message">会員登録が完了しました</div>
        <div className="btn">
          <Button
            variant="contained"
            href="/login"
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: "#4970a3",
              ":hover": { background: "#3b5a84" },
            }}
          >
            ログインする
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Complete;
