import React, { Component } from 'react'
import ShowWeather from './ShowWeather';

export default class FetchWeather extends Component {
    constructor(props) {
        super(props)
        this.state = { forecast: [], currentWeather: { name: null, temp: null, wind: null, temp_min: null, temp_max: null, icon: null, sunrise: null, sunset: null } }
    }

    componentDidMount() {
        fetch('http://api.openweathermap.org/data/2.5/forecast?q=Stockholm,SE&appid=b48000371c551d3dcb2d904c4befd61b&units=metric')
            .then(response => response.json())
            .then(json => this.setState({ forecast:json.list }))

        fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm&appid=b48000371c551d3dcb2d904c4befd61b&units=metric')
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
        let WeatherMain = {
            'textAlign': 'center',
            'background': 'rgba(255,255,255,0.1',
            'padding': '3rem',
            'flexGrow': '2',
            'margin': '0 5rem',
            'maxWidth': '80%'
        }

        return (
            <div style={WeatherMain} className="WeatherMain">
                <ShowWeather forecast = {this.state.forecast} currentWeather = {this.state.currentWeather} />
            </div>
        )
    }
}
