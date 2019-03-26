import React, { Component } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../../css/weather-icons.min.css';

export default class UpcomingWeather extends Component {
    render() {
        let BlockWeather = {
            'display': 'block'
        }
    
        let InlineWeather = {
            'display': 'inline-block',
            'textAlign': 'center',
            'padding': '0 0.5rem'
        }
        
        let weatherIcon = {
            'height': '100%',
            'fontSize': '1.3rem',
            'marginLeft':'0.5rem'
        }

        let weatherList = this.props.forecast.map((date) => {
            let iconString = "wi wi-owm-" + date.weather.id;
            let dateTime = new Date((date.dt * 1000)).getUTCHours();

            if(dateTime < 10) {
                dateTime = "0" + dateTime;
            }
            return(
                <div style={InlineWeather} key={date.dt}>
                    <span style={BlockWeather}>{dateTime}</span>
                    <span>{date.main.temp}</span>
                    <i style={weatherIcon} className={iconString}></i>
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
