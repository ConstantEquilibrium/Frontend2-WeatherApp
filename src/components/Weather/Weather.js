import React, { Component } from 'react'
import DisplayWeather  from './DisplayWeather'
import SearchForm from './SearchForm'
import Sidebar from '../Sidebar/Sidebar'
import UpcomingWeather from './UpcomingWeather'
import Forecast from './Forecast'

export default class Weather extends Component {
  constructor(props) {
    super(props)
  
    this.state = { 
      // forecast: [], 
      currentWeather: { name: "Null", temp: 0, wind: 0, temp_min: 0, temp_max: 0, icon: null, sunrise: "00:00", sunset: "00:00" },
      upcoming: [],
      favoriteCities: [ {id: 1, name: "Stockholm", favorite: true}, {id:2, name: "New York", favorite: false}, {id:3, name: "Dubai", favorite: false} ],
      forecast: null
    }     
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    const city = e.target.city.value; 
    const country = e.target.country.value;

    let type;
    
    if(country == "") {
      type = `${city}`
    } else {
      type = `${city},${country}`
    }

    let url = `http://api.openweathermap.org/data/2.5/weather?q=${type}&appid=b48000371c551d3dcb2d904c4befd61b&units=metric`;

    console.log("fetching")

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

    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${type}&appid=b48000371c551d3dcb2d904c4befd61b&units=metric`)
        .then(response => response.json())
        .then(json => this.setState({ upcoming:json.list }))

    fetch(`http://api.apixu.com/v1/forecast.json?key=e6f25c0113b34dc5bdc73125190904&q=${type}&days=5`)
        .then(response => response.json())
        .then(json => this.setState({ forecast: json.forecast.forecastday}))

    console.log(this.state.upcoming)
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
            .then(json => this.setState({ upcoming:json.list }))
            .then(console.log(this.state.upcoming))

        fetch(`http://api.apixu.com/v1/forecast.json?key=e6f25c0113b34dc5bdc73125190904&q=${city}&days=5`)
            .then(response => response.json())
            .then(json => this.setState({ forecast: json.forecast.forecastday}))
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
      let newCity = {id:Math.random(), name: city, favorite: true};
      this.setState(prevState => ({ favoriteCities: [...prevState.favoriteCities, newCity]}))
      this.saveToLocalStore(newCity)
    }
  }

  saveToLocalStore(newCity) {
    let local = JSON.parse(localStorage.getItem("cities"));
    local.push(newCity)
    localStorage.setItem("cities", JSON.stringify(local));
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
        sunset: json.sys.sunset,

    }}))

    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=b48000371c551d3dcb2d904c4befd61b&units=metric`)
            .then(response => response.json())
            .then(json => this.setState({ upcoming:json.list }))
  }

  render() {
    let container = {
      display: 'flex',
      flexDirection: 'row'
    }

    let weatherMainStyle = {
      background: 'rgba(255,255,255,0.2)',
      padding: '2rem',
      margin: '0 2rem 2rem 2rem',
      maxWidth: '60vw',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }

    return (
      <div style={{display:'flex', flexDirection:'row'}}>
        <div>
          <SearchForm handleSubmit={this.handleSubmit} />
          <Sidebar handleFavorite={this.handleFavorite} handleOnClick={this.handleOnClick} cities={this.state.favoriteCities} />
        </div>
        <div>
          <div style={weatherMainStyle}>
            <DisplayWeather currentWeather={this.state.currentWeather} handleAddFavorite={this.handleAddFavorite} />
            <UpcomingWeather upcoming={this.state.upcoming} />
            {this.state.forecast !== null ? <Forecast forecast={this.state.forecast} /> : null}
          </div>
        </div>
      </div>
    )
  }
}
