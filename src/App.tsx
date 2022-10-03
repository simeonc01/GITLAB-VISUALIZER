import React from 'react';
import GitlabProvider from "./components/GitlabProvider";
import Header from "./components/Header";
import Activity from "./components/Activity";
import Filter from './components/Filter'
import ProjectInfo from './components/ProjectInfo';
import "./App.css";
import { Grid } from '@mui/material';

function App() {
  // test token = glpat-B9TXUoQw83CPzkAxQuNF

  return (
    <GitlabProvider>
      <Header/>
      <Grid container columnSpacing={2} rowSpacing={1}>
        <Grid item xs={12} md={5}>
          <ProjectInfo/>
        </Grid>
        <Grid item xs={12} md={7}>
          <Activity/>
        </Grid>
      </Grid>
      <Filter/>
      <br/>
      <div>
        <h1>Hello world</h1>
      </div>
    </GitlabProvider>
  );
}

export default App;
