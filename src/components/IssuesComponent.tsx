import React, { useContext, useEffect, useState } from "react";
import { Issue } from "../util/types";
import {
  AreaChart,
  XAxis,
  CartesianGrid,
  YAxis,
  Area,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { GitLabContext } from "./GitlabProvider";
import Container from "./LayoutContainer";
import { Box, CircularProgress, Typography } from "@mui/material";

function IssuesComponent() {
  const [issues, setIssues] = useState<Issue[]>([]);

  const context = useContext(GitLabContext);

  useEffect(() => {
    const tempIssues = context.issues;
    if (tempIssues !== null) setIssues(tempIssues);
  }, [context.issues]);

  function createData(
    title: string,
    assignee: string,
    created: Date,
    closed: Date | null,
    description: string
  ) {
    return {
      title,
      assignee,
      created,
      closed,
      description,
    };
  }

  const myData: ReturnType<typeof createData>[] = issues.map((issue) => {
    return createData(
      issue.title,
      issue.author.username,
      issue.created_at,
      issue.closed_at,
      issue.description
    );
  });

  function countActive(now: Date) {
    let active = 0;
    myData.filter((issue) => {
      const thisDate = new Date(issue.created);
      thisDate.setHours(0, 0, 0, 0);

      if (+thisDate < +now) {
        if (issue.closed === null || new Date(issue.closed) > now) {
          active++;
        }
      }
    });
    return active;
  }

  function countAllClosed() {
    let closed = 0;
    myData.filter((issue) => {
      issue.closed !== null ? (closed += 1) : (closed += 0);
    });
    return closed;
  }

  function lastAuthor(): string {
    const authors: string[] = issues.map((issue) => issue.author.name);
    return authors && authors[0];
  }

  //   Date.prototype.addDays = function(days) {
  //     let date = new Date(this.valueOf());
  //     date.setDate(date.getDate() + days);
  //     return date;
  // }

  function getDates(startDate: Date, stopDate: Date) {
    const dateArray: Date[] = [];
    let currentDate = startDate;
    while (currentDate <= stopDate) {
      dateArray.push(new Date(currentDate));
      const tempDate = new Date(currentDate.valueOf());
      tempDate.setDate(tempDate.getDate() + 1);
      currentDate = tempDate;
    }
    return dateArray;
  }

  function getGraphData() {
    const graphData: { date: string; issues: number }[] = [];
    const dates = issues.sort((a, b) => {
      if (a.created_at < b.created_at) return 1;
      return -1;
    });
    if (dates.length > 0) {
      const maxDate = new Date(dates[0].created_at.toString());
      const minDate = new Date(dates[dates.length - 1].created_at.toString());
      const allDates = getDates(minDate, maxDate);

      allDates.forEach((date) => {
        graphData.push({
          date: date.getDate() + "." + (date.getMonth() + 1),
          issues: countActive(
            new Date(date.getFullYear(), date.getMonth(), date.getDate())
          ),
        });
      });

      return graphData;
    }

    return [];
  }

  if (!context.loading)
    return (
      <Container>
        <Typography variant="h5">Active issues</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: ["300px", "400px", "600px"],
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={getGraphData()}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#154734" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#154734" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" />
                <YAxis padding={{ top: 10 }} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="issues"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorUv)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              ml: 1,
              fontSize: {
                xs: "12",
                sm: "14px",
                md: "20px",
              },
            }}
          >
            <Box
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                },
              }}
            >
              <Typography variant="h6" fontSize="inherit">
                Total issues: {myData.length}
              </Typography>
              <Typography variant="h6" fontSize="inherit">
                Total closed issues: {countAllClosed()}
              </Typography>
              <Typography variant="h6" fontSize="inherit">
                The last issue was created by: {lastAuthor()}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    );

  return (
    <Container>
      <Typography variant="h5">Commits</Typography>
      <Box
        sx={{
          width: ["300px", "400px", "600px"],
          height: "250px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    </Container>
  );
}

export default IssuesComponent;
