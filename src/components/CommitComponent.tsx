import React, { useContext, useEffect, useState } from "react";
import { Commit } from "../util/types";
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

export default function CommitComponent() {
  const [commits, setCommits] = useState<Commit[]>([]);

  const context = useContext(GitLabContext);

  useEffect(() => {
    const tempCommits = context.commits;
    if (tempCommits !== null) setCommits(tempCommits);
    console.log(commits);
  }, [context.commits]);

  function createData(title: string, author: string, commited_date: string, message: string) {
    return {
      title: title,
      author: author,
      commited_date: commited_date,
      message: message,
    };
  }

  /*
  const oldRows = [
    createData("bb", 159,  4.0, 3.99),
    createData('Ice cream sandwich', 237,  4.3, 4.99),
    createData('Eclair', 262,  6.0, 3.79),
    createData('Cupcake', 305,  4.3, 2.5),
    createData('Gingerbread', 356,  3.9, 1.5),
  ];
  */
  const rows: ReturnType<typeof createData>[] = commits.map((commit) => {
      const date = new Date(commit.comitted_date)
      console.log(date)
    return createData(commit.title, commit.author_name, "dato", commit.message);
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
          <TableCell>{row.author}</TableCell>
          <TableCell align="right">{row.commited_date}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="body2" gutterBottom component="div">
                  Message: {row.message}
                  Author email:
                </Typography>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  return (
    <div>
      <h1>Commit Component</h1>
      <TableContainer component={Paper}>
        <Table aria-label="Commits-table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Title</TableCell>
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
