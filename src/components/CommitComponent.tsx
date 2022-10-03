import { useContext, useEffect, useState } from "react";
import "./CommitComponent.css";
import { BetterCommit, Commit } from "../util/types";
import { GitLabContext } from "./GitlabProvider";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Typography from "@mui/material/Typography";

interface IVisualData {
  author: string;
  numberOfCommits: number;
}

export default function CommitComponent() {
  const [commits, setCommits] = useState<BetterCommit[]>([]);
  const [visualData, setVisualData] = useState<IVisualData[]>([]);

  const context = useContext(GitLabContext);

  useEffect(() => {
    const tempCommits = context.commits;
    if (tempCommits !== null) {
      tempCommits.sort((a, b) => {
        if (a.created_at < b.created_at) return 1;
        return -1;
      });
      setCommits(tempCommits);
    }
    createVisualData();
    console.log(tempCommits);
  }, [context.commits]);

  const createVisualData = () => {
    const tempVisualData: IVisualData[] = [];
    let found = false;

    commits.forEach((commit) => {
      const author = commit.author_email.split("@")[0].replace(/[^a-z]/gi, "");
      tempVisualData.forEach((object) => {
        if (object.author === author) {
          object.numberOfCommits += 1;
          found = true;
        }
      });
      if (!found) {
        tempVisualData.push({
          author,
          numberOfCommits: 1,
        });
      }
      found = false;
    });

    setVisualData(tempVisualData);
  };

  if (commits.length !== 0)
    return (
      <div className="row">
        <div className="column">
          <Typography variant="h6" sx={{ my: 2, ml: 5 }}>
            Commits
          </Typography>
          <BarChart
            width={500}
            height={250}
            data={visualData}
            barCategoryGap={"30%"}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="author" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              name="Number of Commits"
              dataKey="numberOfCommits"
              fill="#8884d8"
            />
          </BarChart>
        </div>
        <div className="column">
          <Typography variant="h6" sx={{ mt: 8, ml: 3 }}>
            Number of commits: {commits.length}
          </Typography>
          <Typography variant="h6" sx={{ my: 1, ml: 3 }}>
            Last commit by: {commits[0].author_name}
          </Typography>
          <Typography variant="h6" sx={{ my: 1, ml: 3 }}>
            Date of last commit: {commits[0].created_at_date.getDate() + "/" + (commits[0].created_at_date.getMonth()+1)}
          </Typography>
        </div>
      </div>
    );

  return <></>;
}
