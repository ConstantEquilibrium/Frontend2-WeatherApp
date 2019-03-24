import React, { Component } from 'react'
import ShowWeather from './ShowWeather';

export default class FetchWeather extends Component {
    constructor(props) {
        super(props)
        this.state = { data: [] }
    }

    componentDidMount() {
        fetch('http://api.openweathermap.org/data/2.5/forecast?q=Stockholm,SE&appid=b48000371c551d3dcb2d904c4befd61b&units=metric')
            .then(response => response.json())
            .then(json => this.setState({ data:json.list })
        )
    }

    render() {
        let WeatherMain = {
            'textAlign': 'center',
            'background': 'rgba(255,255,255,0.1',
            'padding': '3rem'
        }

        return (
            <div style={WeatherMain} className="WeatherMain">
                <ShowWeather data = {this.state.data} />
            </div>
        )
    }
}
