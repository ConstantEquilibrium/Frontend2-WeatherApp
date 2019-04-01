import React, { Component } from 'react'
import ShowWeather from './ShowWeather';

export default class FetchWeather extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            forecast: [], 
            currentWeather: { name: null, temp: null, wind: null, temp_min: null, temp_max: null, icon: null, sunrise: null, sunset: null },
            location: { long: null, lat: null }
        }
    }

    componentDidMount() {
        this.getLocation();

        // fetch('http://api.openweathermap.org/data/2.5/forecast?q=Stockholm,SE&appid=b48000371c551d3dcb2d904c4befd61b&units=metric')
        //     .then(response => response.json())
        //     .then(json => this.setState({ forecast:json.list }))

        // fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${this.state.location.lat}&lon=${this.state.location.long}&appid=b48000371c551d3dcb2d904c4befd61b&units=metric`)
        //     .then(response => response.json())
        //     .then(json => console.log(json))
        //     .then(json => this.setState({ currentWeather: {
        //         name: json.name, 
        //         temp:Math.ceil(json.main.temp), 
        //         wind: json.wind.speed, 
        //         temp_min: Math.ceil(json.main.temp_min), 
        //         temp_max: Math.ceil(json.main.temp_max), 
        //         icon: json.weather[0].id,
        //         sunrise: json.sys.sunrise,
        //         sunset: json.sys.sunset
        //     }}))

        // fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm&appid=b48000371c551d3dcb2d904c4befd61b&units=metric')
        //     .then(response => response.json())
        //     .then(json => this.setState({ currentWeather: {
        //         name: json.name, 
        //         temp:Math.ceil(json.main.temp), 
        //         wind: json.wind.speed, 
        //         temp_min: Math.ceil(json.main.temp_min), 
        //         temp_max: Math.ceil(json.main.temp_max), 
        //         icon: json.weather[0].id,
        //         sunrise: json.sys.sunrise,
        //         sunset: json.sys.sunset
        //     }}))
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
            navigator.geolocation.getCurrentPosition(this.setLocation, null, { enableHighAccuracy: false });
        }
        console.log("location set")
        return;
    }

    getWeather() {
        this.getLocation();

        console.log(`fetching weather with coordinates ${this.state.location.lat} & ${this.state.location.long}`);
        fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${this.state.location.lat}&lon=${this.state.location.long}&appid=b48000371c551d3dcb2d904c4befd61b&units=metric`)
            .then(response => response.json())
            .then(console.log("Setting weather to state"))
            .then(json => console.log(json))
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
        let WeatherMain = {
            'textAlign': 'center',
            'background': 'rgba(255,255,255,0.1',
            'padding': '3rem',
            'flexGrow': '2',
            'margin': '0 5rem',
            'maxWidth': '70%'
        }

        return (
            <div style={WeatherMain} className="WeatherMain">
                <ShowWeather forecast = {this.state.forecast} currentWeather = {this.state.currentWeather} />
            </div>
        )
    }
}
