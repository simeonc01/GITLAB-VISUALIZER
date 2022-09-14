import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { ApiHandler } from './util/api';

function App() {
  // test token = glpat-B9TXUoQw83CPzkAxQuNF
  const apiHandler = new ApiHandler("glpat-B9TXUoQw83CPzkAxQuNF", "gitlab-visualizer");

  useEffect(() => {

    const init = async () => {
      await apiHandler.init();
      apiHandler.getCommits().then(d => console.log(d))
    };

    init();

  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
