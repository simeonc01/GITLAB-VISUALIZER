import React, { useEffect } from 'react';
import './App.css';
import GitlabProvider from './components/GitlabProvider';
import { ApiHandler } from './util/api';

function App() {
  // test token = glpat-B9TXUoQw83CPzkAxQuNF
  const apiHandler = new ApiHandler("glpat-B9TXUoQw83CPzkAxQuNF", "gitlab-visualizer");

  useEffect(() => {

    const init = async () => {
      await apiHandler.init();
    };

    init();

  })

  return (
    <GitlabProvider>
      <div>
        <h1>Hello world</h1>
      </div>
    </GitlabProvider>
  );
}

export default App;
