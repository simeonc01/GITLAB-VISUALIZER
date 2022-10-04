import GitlabProvider from "./components/GitlabProvider";
import Header from "./components/Header";
import "./App.css";
import Overview from "./components/Overview";

function App() {
  return (
    <GitlabProvider>
      <Header />
      <Overview />
    </GitlabProvider>
  );
}

export default App;
