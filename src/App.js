import React, { Component } from 'react';
import './App.css';
import FetchWeather from './components/FetchWeather';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Weather from './components/Weather/Weather';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="Container">
          {/* <Sidebar /> */}
          {/* <FetchWeather /> */}
          <Weather />
        </div>
      </div>
    );
  }
}

export default App;
