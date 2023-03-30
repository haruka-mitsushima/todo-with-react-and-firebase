import React from "react";
import { Task } from "../type";
import "../styles/TaskBox.css";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Tags from "./Tags";
import {
  doc,
  query,
  collection,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useDispatch } from "react-redux";
import { setTasks } from "../features/task/TaskSlice";

const TaskBox = ({ task }: { task: Task }) => {
  const dispatch = useDispatch();

  const getTasks = async () => {
    const q = query(
      collection(db, "tasks"),
      where("userId", "==", sessionStorage.getItem("uid")),
      where("deleted", "==", false)
    );
    const data = await getDocs(q);
    console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    const tasks = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    dispatch(setTasks(tasks));
  };

  const setDone = async (id: string, done: boolean) => {
    await updateDoc(doc(db, "tasks", id), { done: !done });
    getTasks();
  };

  const deleteTask = async (id: string) => {
    await updateDoc(doc(db, "tasks", id), { deleted: true });
    getTasks();
  };

  return (
    <div className="taskBox">
      {!task.done ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            bgcolor: "white",
            borderRadius: 3,
            py: 0,
            px: 1,
            height: "auto",
            width: 500,
            boxShadow: 10,
            m: 3,
          }}
        >
          <Grid container sx={{ display: "flex", alignItems: "center" }}>
            <Grid item xs={1}>
              <Checkbox
                onClick={() => setDone(task.id, task.done)}
                value={task.id}
                sx={{
                  color: "#4970a3",
                  "&.Mui-checked": {
                    color: "#d32f2f",
                  },
                }}
              />
            </Grid>
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
      ) : (
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
                onClick={() => setDone(task.id, task.done)}
                defaultChecked
                value={task.id}
                sx={{
                  color: "#4970a3",
                  "&.Mui-checked": {
                    color: "#d32f2f",
                  },
                }}
              />
            </Grid>
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
      )}
    </div>
  );
};

export default TaskBox;
