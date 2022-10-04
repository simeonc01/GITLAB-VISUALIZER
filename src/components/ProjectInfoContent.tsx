import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import { Label, Milestone, Project } from "../util/types";
import LabelComponent from "./LabelComponent";

export default function ProjectInfoContent(props: {
  project: Project;
  labels: Label[];
  milestones: Milestone[];
}) {
    return (
        <>
          <Typography
            variant="h5"
            sx={{
              textTransform: "capitalize",
            }}
          >
            {props.project.name}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: 1,
              flexDirection: "row",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexGrow: 1,
                flexDirection: "column",
                width: "fit-content",
                marginRight: 0.5,
              }}
            >
              <Typography variant="body1">
                ⭐ Your project has {props.project.star_count} stars
              </Typography>
              <Typography variant="body1">
                💪 The last activity was at{" "}
                {new Date(props.project.last_activity_at).toDateString()}
              </Typography>
              <Typography variant="body1">
                🥚 Your project was created at{" "}
                {new Date(props.project.created_at).toDateString()}
              </Typography>
              <Typography variant="body1">
                🍴 Your project has been forked {props.project.forks_count} times
              </Typography>
              <Typography variant="body1">
                🚩 Your project has {props.milestones.length} milestone
                {props.milestones.length === 1 ? "" : "s"}
              </Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                float: "right",
                alignItems: "center",
                marginLeft: 1,
                mb: 2,
                height: 230,
                overflow: "hidden",
                overflowY: "scroll",
               // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
              }}
            >
              <Typography variant="body1">Your projects labels:</Typography>
              {props.labels.map((l) => (
                <LabelComponent key={l.id} label={l} />
              ))}
            </Box>
          </Box>
        </>
      );
}
