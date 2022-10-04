import "./App.css";
import GitlabProvider from "./components/GitlabProvider";
import Header from "./components/Header";
import Activity from "./components/Activity";
import React from 'react';
import './App.css';
import Filter, { Filter2 } from './components/Filter'
import ProjectInfo from './components/ProjectInfo';

function App() {
  // test token = glpat-B9TXUoQw83CPzkAxQuNF

  return (
    <GitlabProvider>
      <Header/>
      <Activity/>
      <Filter2/>
      <ProjectInfo />
    </GitlabProvider>
  );
}

export default App;
