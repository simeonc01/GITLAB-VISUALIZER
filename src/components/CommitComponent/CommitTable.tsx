import React from "react";
import { Box, Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { createData } from "./CommitComponent";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function CommitTable( props: { rows: ReturnType<typeof createData>[] }) {
  const Row = (props: { row: ReturnType<typeof createData> }) => {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.title}
          </TableCell>
          <TableCell>{row.author}</TableCell>
          <TableCell align="right">{row.commited_date}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1, ml: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Message:
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {row.message}
                </Typography>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  };

  return (
    <div>
      <Typography variant="h6" sx={{ my: 2, ml: 10 }}>
        Commit log
      </Typography>
      <TableContainer sx={{ maxHeight: 440 }} component={Paper}>
        <Table stickyHeader aria-label="Commits-table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell align="right">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.map((row) => (
              <Row key={row.title + row.author} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
