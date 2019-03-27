import React, { Component } from 'react'
import DisplayWeather  from './DisplayWeather'
import SearchForm from './SearchForm'
import Sidebar from '../Sidebar/Sidebar'
import ShowWeatherMain from '../ShowWeather/ShowWeatherMain'

export default class Weather extends Component {
  constructor(props) {
    super(props)
  
    this.state = { 
      // forecast: [], 
      currentWeather: { name: null, temp: null, wind: null, temp_min: null, temp_max: null, icon: null, sunrise: null, sunset: null },
      favoriteCities: [ {id: 1, name: "Stockholm", favorite: true}, {id:2, name: "New York", favorite: false}, {id:3, name: "Dubai", favorite: false} ]
    }     
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    const city = e.target.city.value; 
    const country = e.target.country.value;

    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=b48000371c551d3dcb2d904c4befd61b&units=metric`

    fetch(url)
        .then(response => response.json())
        .then(json => this.setState({ currentWeather: {
            name: json.name, 
            temp:Math.ceil(json.main.temp), 
            wind: json.wind.speed, 
            temp_min: Math.ceil(json.main.temp_min), 
            temp_max: Math.ceil(json.main.temp_max), 
            icon: json.weather[0].id,
            sunrise: json.sys.sunrise,
            sunset: json.sys.sunset
        }}))
  }

  handleOnClick = (e) => {
    e.preventDefault();
    const city = e.target.innerText;
    // const country = e.target.country.value;

    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b48000371c551d3dcb2d904c4befd61b&units=metric`

    fetch(url)
        .then(response => response.json())
        .then(json => this.setState({ currentWeather: {
            name: json.name, 
            temp:Math.ceil(json.main.temp), 
            wind: json.wind.speed, 
            temp_min: Math.ceil(json.main.temp_min), 
            temp_max: Math.ceil(json.main.temp_max), 
            icon: json.weather[0].id,
            sunrise: json.sys.sunrise,
            sunset: json.sys.sunset
        }}))
  }

  handleFavorite = (e) => {
    console.log(this.state.favoriteCities[e-1].favorite);

    this.setState((prevState) => ({
      ...prevState.favoriteCities,
      [this.state.favoriteCities[e-1].favorite]: false
    }))

    console.log(this.state.favoriteCities[e-1].favorite);
  }

  setLocation = (location) => {
      this.setState({location: { long: location.coords.longitude, lat: location.coords.latitude }});
      console.log(location)
  }

  error = () => {
      return null;
  }

  getLocation() {
      console.log("setting location")
      if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.fetchWeather, null, { enableHighAccuracy: false });
      }
      
      return;
  }

  componentDidMount() {
    this.getLocation();
    
  }

  fetchWeather = (location) => {
    console.log("Fetching");
    
    const lat = location.coords.latitude;
    const long = location.coords.longitude;
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=b48000371c551d3dcb2d904c4befd61b&units=metric`

    fetch(url)
    .then(response => response.json())
    .then(json => this.setState({ currentWeather: {
        name: json.name, 
        temp:Math.ceil(json.main.temp), 
        wind: json.wind.speed, 
        temp_min: Math.ceil(json.main.temp_min), 
        temp_max: Math.ceil(json.main.temp_max), 
        icon: json.weather[0].id,
        sunrise: json.sys.sunrise,
        sunset: json.sys.sunset
    }}))
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <SearchForm handleSubmit={this.handleSubmit} />
          <Sidebar handleFavorite={this.handleFavorite} handleOnClick={this.handleOnClick} cities={this.state.favoriteCities} />
        </div>
        <div>
        <ShowWeatherMain currentWeather={this.state.currentWeather} />
        {/* <DisplayWeather currentWeather={this.state.currentWeather} /> */}
        </div>
      </React.Fragment>
    )
  }
}
