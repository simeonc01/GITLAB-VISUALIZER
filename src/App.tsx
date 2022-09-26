import "./App.css";
import GitlabProvider from "./components/GitlabProvider";
import Header from "./components/Header";
import GraphExample from "./components/GraphExample";
import CommitComponent from "./components/CommitComponent/CommitComponent";
import Paper from "@mui/material/Paper";

function App() {
  // test token = glpat-B9TXUoQw83CPzkAxQuNF

  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    }
  ]

  const lines = [
    {
      dataKey: 'uv',
      stroke: '#8884d8'
    }, {
      dataKey: 'pv',
      stroke: '#82ca9d'
    }
  ]

  return (
    <GitlabProvider>
      <Header/>
      <GraphExample data={data} xAxisKey={'name'} width={400} height={400} grid={true} lines={lines} />
          <div>
        <h1>Hello world</h1>
      </div>
    </GitlabProvider>
  );
}

export default App;
