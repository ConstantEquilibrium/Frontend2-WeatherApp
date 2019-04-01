import React, { Component } from 'react'
import DisplayWeather  from './DisplayWeather'
import SearchForm from './SearchForm'
import Sidebar from '../Sidebar/Sidebar'
import ShowWeatherMain from '../ShowWeather/ShowWeatherMain'
import UpcomingWeather from './UpcomingWeather'

export default class Weather extends Component {
  constructor(props) {
    super(props)
  
    this.state = { 
      // forecast: [], 
      currentWeather: { name: "Null", temp: 0, wind: 0, temp_min: 0, temp_max: 0, icon: null, sunrise: "00:00", sunset: "00:00" },
      forecast: [],
      favoriteCities: [ {id: 1, name: "Stockholm", favorite: true}, {id:2, name: "New York", favorite: false}, {id:3, name: "Dubai", favorite: false} ]
    }     
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    const city = e.target.city.value; 
    const country = e.target.country.value;

    let url;

    if(country == "") {
      url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b48000371c551d3dcb2d904c4befd61b&units=metric`
    } else {
      url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=b48000371c551d3dcb2d904c4befd61b&units=metric`
    }

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

    const currentWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b48000371c551d3dcb2d904c4befd61b&units=metric`

    fetch(currentWeatherUrl)
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

        fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=b48000371c551d3dcb2d904c4befd61b&units=metric`)
            .then(response => response.json())
            .then(json => this.setState({ forecast:json.list }))
  }

  handleFavorite = (e) => {
    console.log(this.state.favoriteCities[e-1].favorite);

    this.setState((prevState) => ({
      ...prevState.favoriteCities,
      [this.state.favoriteCities[e-1].favorite]: false
    }))
  }

  setLocation = (location) => {
      this.setState({location: { long: location.coords.longitude, lat: location.coords.latitude }});
  }

  error = () => {
      return null;
  }

  getLocation() {
      if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.fetchWeather, null, { enableHighAccuracy: false });
      }
      
      return;
  }

  handleAddFavorite = (city) => {
    let matching = this.state.favoriteCities.filter(function(e) {
      return (e.name === city);
    })

    if(matching.length > 0) {
      console.log("City exists!")
    } else {
      this.setState(prevState => ({ favoriteCities: [...prevState.favoriteCities, {id:Math.random(), name: city, favorite: true}]}))
      this.saveToLocalStore();
    }
  }

  saveToLocalStore() {
    console.log("Saving to local storage")
    console.log(this.state.favoriteCities)
    let stateString = JSON.stringify(this.state.favoriteCities);
    console.log(stateString)
    localStorage.setItem("cities", stateString);
  }

  componentDidMount() {
    this.getLocation();

    if(localStorage.getItem("cities") === null) {
      localStorage.setItem("cities", JSON.stringify(this.state.favoriteCities));
    } else {
      console.log("Setting state from localstorage")
      this.setState({favoriteCities: JSON.parse(localStorage.getItem("cities"))})
    }
  }

  fetchWeather = (location) => {    
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

    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=b48000371c551d3dcb2d904c4befd61b&units=metric`)
            .then(response => response.json())
            .then(json => this.setState({ forecast:json.list }))
  }

  render() {
    let container = {
      display: 'flex',
      flexDirection: 'row'
    }

    let weatherMainStyle = {
      background: 'rgba(255,255,255,0.2)',
      padding: '2rem',
      margin: '2rem',
      maxWidth: '60vw',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }

    return (
      <div style={container}>
        <div>
          <SearchForm handleSubmit={this.handleSubmit} />
          <Sidebar handleFavorite={this.handleFavorite} handleOnClick={this.handleOnClick} cities={this.state.favoriteCities} />
        </div>
        <div style={weatherMainStyle}>
          <ShowWeatherMain currentWeather={this.state.currentWeather} handleAddFavorite={this.handleAddFavorite} />
          <UpcomingWeather forecast={this.state.forecast} />
        {/* <DisplayWeather currentWeather={this.state.currentWeather} /> */}
        </div>
      </div>
    )
  }
}
