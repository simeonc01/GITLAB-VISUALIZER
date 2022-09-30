import React, { useContext, useEffect, useState } from "react";
import { Issue } from "../util/types";
import {
  AreaChart,
  XAxis,
  CartesianGrid,
  YAxis,
  Area,
  Tooltip,
} from "recharts";
import { GitLabContext } from "./GitlabProvider";

function IssuesComponent() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [amount, setAmount] = useState<number>(0);

  const context = useContext(GitLabContext);

  useEffect(() => {
    const tempIssues = context.issues;
    if (tempIssues !== null) setIssues(tempIssues);
    console.log(tempIssues);
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
      console.log(issue.created, now);

      issue.closed === null ? (active += 1) : (active += 0);
      return active;
    });
  }

  const dummyData = [
    {
      date: "12.09",
      issues: countActive(new Date(2022, 9, 12)),
    },
    {
      date: "14.09",
      issues: countActive(new Date(2022, 9, 14)),
    },
    {
      date: "16.09",
      issues: countActive(new Date(2022, 9, 16)),
    },
    {
      date: "18.09",
      issues: countActive(new Date(2022, 9, 18)),
    },
    {
      date: "20.09",
      issues: countActive(new Date(2022, 9, 20)),
    },
    {
      date: "22.09",
      issues: countActive(new Date(2022, 9, 22)),
    },
    {
      date: "24.09",
      issues: countActive(new Date(2022, 9, 24)),
    },
    {
      date: "26.09",
      issues: countActive(new Date(2022, 9, 26)),
    },
    {
      date: "28.09",
      issues: countActive(new Date(2022, 9, 28)),
    },
    {
      date: "30.09",
      issues: countActive(new Date(2022, 9, 30)),
    },
    {
      date: "02.10",
      issues: countActive(new Date(2022, 10, 2)),
    },
    {
      date: "04.10",
      issues: countActive(new Date(2022, 10, 4)),
    },
  ];

  return (
    <div>
      <AreaChart
        width={1000}
        height={250}
        data={dummyData}
        margin={{ top: 4, right: 0, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#154734" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#154734" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" />
        <YAxis />
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
    </div>
  );
}

export default IssuesComponent;
