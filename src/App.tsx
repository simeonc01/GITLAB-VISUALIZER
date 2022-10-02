import "./App.css";
import GitlabProvider from "./components/GitlabProvider";
import Header from "./components/Header";
import Activity from "./components/Activity";
import ProjectInfo from './components/ProjectInfo';

function App() {
  // test token = glpat-B9TXUoQw83CPzkAxQuNF

  return (
    <GitlabProvider>
      <Header/>
      <Activity/>
      <ProjectInfo />
    </GitlabProvider>
  );
}

export default App;
