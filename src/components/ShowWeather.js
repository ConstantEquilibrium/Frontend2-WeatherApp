import React, { Component } from 'react'
import ShowWeatherMain from './ShowWeather/ShowWeatherMain';
import UpcomingWeather from './ShowWeather/UpcomingWeather';

export default class ShowWeather extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return( 
            <div >
                <ShowWeatherMain currentWeather={this.props.currentWeather} />
                {/* <UpcomingWeather forecast={this.props.forecast} /> */}
            </div>
        )
    }
}