import React, { useEffect } from 'react';
import './App.css';
import { ApiHandler } from './util/api';
import Header from './components/Header'

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
    <div>
      <Header/>
      <h1>Hello world</h1>
    </div>
  );
}

export default App;
