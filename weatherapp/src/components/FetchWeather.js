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
        return (
            <div>
                <ShowWeather data = {this.state.data} />
            </div>
        )
    }
}
