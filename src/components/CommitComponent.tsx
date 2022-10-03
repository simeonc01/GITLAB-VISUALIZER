import { useContext, useEffect, useState } from "react";
import { BetterCommit } from "../util/types";
import { GitLabContext } from "./GitlabProvider";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Typography from "@mui/material/Typography";
import Container from "./LayoutContainer";
import { Box } from "@mui/material";

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
      <Container>
        <Typography variant="h5">Commits</Typography>
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
              width: ["400px", "600px"],
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={visualData} barCategoryGap={"30%"}>
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
            </ResponsiveContainer>
          </Box>
          <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            ml: 1
          }}
        >
            <Typography variant="h6">
              Number of commits: {commits.length}
            </Typography>
            <Typography variant="h6">
              Last commit by: {commits[0].author_name}
            </Typography>
            <Typography variant="h6">
              Date of last commit:{" "}
              {commits[0].created_at_date.getDate() +
                "/" +
                (commits[0].created_at_date.getMonth() + 1)}
            </Typography>
          </Box>
        </Box>
      </Container>
    );

  return <></>;
}
