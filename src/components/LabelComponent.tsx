import { Box, Tooltip, Typography } from '@mui/material';
import React from 'react'
import { Label } from "../util/types";

export default function LabelComponent(props: { label: Label }) {
    if (props.label.description !== null && props.label.description !== "") {
        return (
          <Tooltip title={props.label.description} placement="bottom">
            <Box
              style={{
                backgroundColor: props.label.color,
                color: props.label.text_color,
              }}
              borderRadius={1}
              display={"inline-block"}
            >
              <Typography variant="body1" paddingX={1}>
                {props.label.name}
              </Typography>
            </Box>
          </Tooltip>
        );
      } else {
        return (
          <Box
            sx={{
              backgroundColor: props.label.color,
              color: props.label.text_color,
              borderRadius: 1,
              display: "inline-block",
              width: "fit-content",
              margin: 0.25,
            }}
          >
            <Typography variant="body2" paddingX={1}>
              {props.label.name}
            </Typography>
          </Box>
        );
      }
}
