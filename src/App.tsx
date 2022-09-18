import React from 'react';
import './App.css';
import GitlabProvider from './components/GitlabProvider';
import { ApiHandler } from './util/api';
import Header from './components/Header'

function App() {
  // test token = glpat-B9TXUoQw83CPzkAxQuNF


  return (
    <GitlabProvider>
      <Header/>
      <div>
        <h1>Hello world</h1>
      </div>
    </GitlabProvider>
  );
}

export default App;
