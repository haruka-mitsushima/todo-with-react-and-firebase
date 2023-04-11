import React from "react";
import { Task } from "../type";
import "../styles/TaskBox.css";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Tags from "./Tags";
import { useDispatch } from "react-redux";
import { fetchDeleteTask, fetchUpdateTask } from "../features/task/TaskSlice";
import FormControlLabel from "@mui/material/FormControlLabel";
import { AppDispatch } from "../store";

const TaskBox = ({ task }: { task: Task }) => {
  const dispatch = useDispatch<AppDispatch>();

  const setDone = async (id: string, done: boolean) => {
    await dispatch(fetchUpdateTask({ id, done }));
  };

  const deleteTask = async (id: string) => {
    await dispatch(fetchDeleteTask(id));
  };

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
          <Grid item xs={8} sx={{ pl: 2 }}>
            <FormControlLabel
              control={
                !task.done ? (
                  <Checkbox
                    // onClick={() => setDone(task.id, task.done)}
                    checked={false}
                    value={task.id}
                    sx={{
                      color: "#4970a3",
                      "&.Mui-checked": {
                        color: "#d32f2f",
                      },
                    }}
                  />
                ) : (
                  <Checkbox
                    // onClick={() => setDone(task.id, task.done)}
                    checked={true}
                    value={task.id}
                    sx={{
                      color: "#4970a3",
                      "&.Mui-checked": {
                        color: "#d32f2f",
                      },
                    }}
                  />
                )
              }
              label={
                <Grid item xs={12} sx={{ pl: 2 }}>
                  <Typography
                    component="h1"
                    sx={{ fontSize: 18, fontWeight: 900 }}
                  >
                    {task.task}
                  </Typography>
                  <Typography component="h2" variant="subtitle2">
                    {task.detail}
                  </Typography>
                </Grid>
              }
              onChange={() => setDone(task.id, task.done)}
            />
          </Grid>
          <Grid item xs={2}>
            {task.tags.length > 0 &&
              task.tags.map((tag) => <Tags tag={tag} key={tag} />)}
          </Grid>
          <Grid item xs={2}>
            <Button
              onClick={() => deleteTask(task.id)}
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
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default TaskBox;
