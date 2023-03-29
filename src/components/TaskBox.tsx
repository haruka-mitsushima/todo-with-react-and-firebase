import React from "react";
import { Task } from "../type";
import "../styles/TaskBox.css";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Tags from "./Tags";

const TaskBox = ({ task }: { task: Task }) => {
  return (
    <div className="taskBox">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          bgcolor: "white",
          borderRadius: 3,
          py: 0,
          px: 1,
          height: 90,
          width: 500,
          boxShadow: 10,
          m: 3,
        }}
      >
        <Grid container sx={{ display: "flex", alignItems: "center" }}>
          <Grid item xs={1}>
            <Checkbox
              value={task.id}
              sx={{
                color: "#4970a3",
                "&.Mui-checked": {
                  color: "#d32f2f",
                },
              }}
            />
          </Grid>
          {/* <div className="task"> */}
          <Grid item xs={7} sx={{ pl: 2 }}>
            <Typography component="h1" sx={{ fontSize: 18, fontWeight: 900 }}>
              {task.task}
            </Typography>
            <Typography component="h2" variant="subtitle2">
              {task.detail}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            {task.tags.length > 0 &&
              task.tags.map((tag) => <Tags tag={tag} key={tag} />)}
          </Grid>
          {/* <div className="name">{task.task}</div> */}
          {/* <div className="detail">{task.detail}</div> */}
          {/* </div> */}
          <Grid item xs={2}>
            {/* <div className="btn"> */}
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
              削除
            </Button>
            {/* </div> */}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default TaskBox;
