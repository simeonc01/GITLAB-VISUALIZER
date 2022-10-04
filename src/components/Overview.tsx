import { Grid, Typography } from "@mui/material";
import { useContext } from "react";
import Activity from "./Activity";
import CommitComponent from "./CommitComponent";
import Filter from "./Filter";
import { GitLabContext } from "./GitlabProvider";
import IssuesComponent from "./IssuesComponent";
import ProjectInfo from "./ProjectInfo";

function Overview() {
  const context = useContext(GitLabContext);

  console.log(context.instanciated)
  if (context.instanciated) {
    return (
      <Grid container columnSpacing={2} rowSpacing={1}>
        <Grid item xs={12} md={5}>
          <ProjectInfo />
        </Grid>
        <Grid item xs={12} md={7}>
          <Activity />
        </Grid>
        <Grid item xs={12} md={12}>
          <Filter />
        </Grid>
        <Grid item xs={12} md={12}>
          <CommitComponent />
        </Grid>
        <Grid item xs={12} md={12}>
          <IssuesComponent />
        </Grid>
      </Grid>
    );
  }

  return <Typography variant="h4" sx={{m:5}}>No project loaded</Typography>;
}

export default Overview;
