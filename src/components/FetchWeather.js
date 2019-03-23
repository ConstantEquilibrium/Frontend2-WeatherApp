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

        // var result = await fetch('api.openweathermap.org/data/2.5/forecast?q=Stockholm,SE&appid=b48000371c551d3dcb2d904c4befd61b&units=metric');
        // var json = await result;
        // this.setState({data:json});
    }

    // async fetchData() {
    //     try {
    //         let url = "https://api.darksky.net/forecast/9c804de0a24edde929c0f81160cdf4ff/59,18?units=ca";
    //         // let promise = await fetch(url).then((res) => res.json());
    //         let promise = await fetch(url);
    //         let json = JSON.parse(promise);
    //         console.log(promise);
    //         this.setState({data: promise})
    //     } catch {
    //         console.log("Couldn't fetch data");
    //     }
        
    // }

    render() {
        return (
            <div>
                <ShowWeather data = {this.state.data} />
            </div>
        )
    }
}
