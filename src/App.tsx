import React from 'react';
import './App.css';
import GitlabProvider from './components/GitlabProvider';

function App() {
  // test token = glpat-B9TXUoQw83CPzkAxQuNF


  return (
    <GitlabProvider>
      <div>
        <h1>Hello world</h1>
      </div>
    </GitlabProvider>
  );
}

export default App;
