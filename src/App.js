import React, { Component } from 'react';
import './App.css';
import FetchWeather from './components/FetchWeather';
import Navbar from './components/Navbar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Navbar />

          <FetchWeather />
          
        </header>
      </div>
    );
  }
}

export default App;
