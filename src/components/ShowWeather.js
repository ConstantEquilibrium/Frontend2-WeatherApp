import React, { Component } from 'react'
import ShowWeatherMain from './ShowWeather/ShowWeatherMain';

export default class ShowWeather extends Component {
    constructor(props) {
        super(props)
        this.state = { }
    }

    componentDidMount() {
        this.setState({currentWeather: this.props.data})
    }

    render() {
        let BlockWeather = {
            'display': 'block'
        }
    
        let InlineWeather = {
            'display': 'inline-block',
            'textAlign': 'center',
            'padding': '0 0.5rem'
        }

        let weatherList = this.props.forecast.map((date) => {
            let dateTime = new Date((date.dt * 1000)).getUTCHours();
            if(dateTime < 10) {
                dateTime = "0" + dateTime;
            }
            return(
                <div style={InlineWeather} key={date.dt}>
                    <span style={BlockWeather}>{dateTime}</span>
                    {date.main.temp}
                </div>
            )
        })

        return( 
            <div >
                <ShowWeatherMain currentWeather={this.props.currentWeather} />
                {/* {weatherList} */}
            </div>
        )
    }
}