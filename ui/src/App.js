import React from 'react';
import logo from './logo.svg';
import Headers from './component/header';
import './App.css';

const App =() =>{
  return (
    <div className="App">
      <Headers/>
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to React/Electron</h2>
      </div>
      <p className="App-intro">
        Electron!
      </p>       
    </div>
  )
}     
      

export default App;
