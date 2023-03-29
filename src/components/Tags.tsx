import Chip from "@mui/material/Chip";
import WorkIcon from "@mui/icons-material/Work";
import HomeIcon from "@mui/icons-material/Home";
import WarningIcon from "@mui/icons-material/Warning";
import React from "react";

const Tags = ({ tag }: { tag: string }) => {
  return (
    <div>
      {tag === "緊急" ? (
        <Chip
          icon={<WarningIcon />}
          label={tag}
          size="small"
          variant="outlined"
        />
      ) : tag === "仕事" ? (
        <Chip icon={<WorkIcon />} label={tag} size="small" variant="outlined" />
      ) : (
        <Chip icon={<HomeIcon />} label={tag} size="small" variant="outlined" />
      )}
    </div>
  );
};

export default Tags;
