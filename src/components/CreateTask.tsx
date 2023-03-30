import React, { FormEvent, useEffect, useState } from "react";
import "../styles/CreateTask.css";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import { Theme, useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { State } from "../type";

const tags = ["仕事", "家事", "緊急"];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const CreateTask = () => {
  const theme = useTheme();
  const isAuth = useSelector((state: State) => state.auth);
  const [tagName, setTagName] = useState<string[]>([]);

  const navigate = useNavigate();

  const handleChange = (event: SelectChangeEvent<typeof tagName>) => {
    const {
      target: { value },
    } = event;
    setTagName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const task = data.get("task")?.toString();
    const detail = data.get("detail")?.toString();
    if (!task || !detail) return;
    let tags = data.get("tag")?.toString().split(",");
    if (!tags || tags[0] === "") tags = [];
    await addDoc(collection(db, "tasks"), {
      task,
      detail,
      tags,
      done: false,
      deleted: false,
      userId: auth.currentUser?.uid,
    });
    navigate("/");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  return (
    <div className="createTaskPage">
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
          タスクを追加する
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="task"
                label="タスク"
                name="task"
                // autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="detail"
                label="詳細"
                name="detail"
                // autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ width: 500 }}>
                <InputLabel id="tag">タグ</InputLabel>
                <Select
                  labelId="tag"
                  id="tag"
                  name="tag"
                  multiple
                  value={tagName}
                  onChange={handleChange}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Chip" />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {tags.map((tag) => (
                    <MenuItem
                      key={tag}
                      value={tag}
                      style={getStyles(tag, tagName, theme)}
                    >
                      {tag}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
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
            登録する
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default CreateTask;
