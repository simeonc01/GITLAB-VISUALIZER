import GitlabProvider from "./components/GitlabProvider";
import Header from "./components/Header";
import Activity from "./components/Activity";
import Filter from "./components/Filter";
import ProjectInfo from "./components/ProjectInfo";
import "./App.css";
import { Grid } from "@mui/material";
import CommitComponent from "./components/CommitComponent";
import IssuesComponent from "./components/IssuesComponent";

function App() {
  return (
    <GitlabProvider>
      <Header />
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
          <IssuesComponent/>
        </Grid>
      </Grid>
    </GitlabProvider>
  );
}

export default App;
