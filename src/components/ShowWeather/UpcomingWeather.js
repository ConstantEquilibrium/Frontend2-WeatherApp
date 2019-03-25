import React, { Component } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';

export default class UpcomingWeather extends Component {
    constructor(props) {
        super(props)
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
                    <span>{date.main.temp}</span>
                </div>
            )
        })

        return (
            // <div style={{'overflow': 'scroll', 'white-space': 'nowrap', 'overflow-y': 'hidden' }}>
                
            // </div>
            <PerfectScrollbar style={{'overflow':'hidden', 'whiteSpace': 'nowrap', 'height': '60px'}}>
                {weatherList}
            </PerfectScrollbar>
        )
    }
}
