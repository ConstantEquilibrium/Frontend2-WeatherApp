import React from 'react'
import '../../css/weather-icons.min.css';

// export default class ShowWeatherMain extends Component {
const ShowWeatherMain = ({currentWeather}) => {
    let tempSpanStyle = {
        'opacity': '0.6'
    }

    let divider = {
        'padding': '0 0.8rem'
    }

    let inlineBlock = {
        'display': 'inline-block',
        'verticalAlign': 'middle',
        'padding': '0 0.3rem',
        'height': '100%',
    }

    let weatherIcon = {
        'height': '100%',
        'font-size': '1.3rem',
        'marginLeft':'0.5rem'
    }

    let weatherMainStyle = {
        'flex': '2',
        'margin': '0 5rem'
    }

    let newDate = new Date();
    let sunRiseTime = newDate.toUTCString(currentWeather.sunrise);

    let iconString = "wi wi-owm-" + currentWeather.icon;

    return (
        <div style={weatherMainStyle}>
            <h3>{currentWeather.name}</h3>
            <div>
                <h1 style={inlineBlock}>{currentWeather.temp} °C</h1>
                <i style={weatherIcon} className={iconString}></i>
            </div>
            <p style={tempSpanStyle}><span>{currentWeather.temp_max} °C</span><span style={divider}>|</span><span>{currentWeather.temp_min} °C</span></p>
            <div>
                <p><i className="wi-sunrise"></i> {sunRiseTime}</p>
            </div>
        </div>
    )
}

export default ShowWeatherMain