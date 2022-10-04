import { Paper } from "@mui/material";
import React from "react";
import IssuesComponent from "./IssuesComponent";

export default function IssuesStylerComponent() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "50%",
      }}
    >
      <Paper
        elevation={20}
        sx={{
          width: "50%",
          borderRadius: "15px",
          padding: "20px",
          alignItems: "center",
        }}
      >
        <IssuesComponent />
      </Paper>
    </div>
  );
}
