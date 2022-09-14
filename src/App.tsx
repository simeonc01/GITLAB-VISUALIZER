import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { ApiHandler } from './util/api';

function App() {
  // test token = glpat-9o4Fc7dKM59j-w5anp3S
  const apiHandler = new ApiHandler("glpat-9o4Fc7dKM59j-w5anp3S", "17389");

  useEffect(() => {
    apiHandler.getCommits().then(a => console.log(a))
  }, [])

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
