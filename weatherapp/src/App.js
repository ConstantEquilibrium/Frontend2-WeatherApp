import React, { Component } from 'react';
import './App.css';
import FetchWeather from './components/FetchWeather';
import Navbar from './components/Navbar';

class App extends Component {
  render() {
  
    return (
      <div className="App">
          <Navbar />

          <FetchWeather />
          
      </div>
    );
  }
}

export default App;
