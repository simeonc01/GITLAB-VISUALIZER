import React, { useContext, useEffect, useState } from "react";
import { Issue } from "../util/types";
import { GitLabContext } from "./GitlabProvider";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Description } from "@mui/icons-material";

function IssuesComponent() {
  const [issues, setIssues] = useState<Issue[]>([]);

  const context = useContext(GitLabContext);

  useEffect(() => {
    const tempIssues = context.issues;
    if (tempIssues !== null) setIssues(tempIssues);
    console.log(issues);
  }, [context.issues]);

  function createData(
    title: string,
    assignee: string,
    created: Date,
    price: number,
    description: string
  ) {
    return {
      title,
      assignee,
      created,
      price,
      description,
      history: [
        {
          description: "2020-01-02",
          customerId: "11091700",
          amount: 3,
        },
        {
          date: "2020-01-02",
          customerId: "Anonymous",
          amount: 1,
        },
      ],
    };
  }

  const rows: ReturnType<typeof createData>[] = issues.map((issue) => {
    return createData(
      issue.title,
      "Navn",
      issue.created_at,
      3.3,
      issue.description
    );
  });

  function Row(props: { row: ReturnType<typeof createData> }) {
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
          <TableCell>{row.assignee}</TableCell>
          <TableCell align="right">{row.created.toString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Description
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableBody>
                    <TableRow>
                      <TableCell>{row.description}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  return (
    <div>
      <h1>Issues Component</h1>
      <TableContainer component={Paper}>
        <Table aria-label="Commits-table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Issue</TableCell>
              <TableCell>Author</TableCell>
              <TableCell align="right">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.title} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default IssuesComponent;
