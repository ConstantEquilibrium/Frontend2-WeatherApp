import React from 'react'
import '../../css/weather-icons.min.css';
import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/sv'
// import UpcomingWeather from './UpcomingWeather';

// export default class ShowWeatherMain extends Component {
const ShowWeatherMain = ({currentWeather, handleAddFavorite}) => {
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
        'fontSize': '1.3rem',
        'marginLeft':'0.5rem'
    }

    let iconString = "wi wi-owm-" + currentWeather.icon;
    
    return (
        // <div style={weatherMainStyle}>
        <div style={{marginBottom: '2rem', textAlign: 'right'}}>
            <h3 style={{marginBottom: '1rem', display: 'inline-block'}}>{currentWeather.name}</h3>
            <h5 onClick = {() => { handleAddFavorite(currentWeather.name) }} style={{display: 'inline-block', marginLeft: '0.5rem', cursor: 'pointer'}}>Favorite</h5>
            <div>
                <h1 style={inlineBlock}>{currentWeather.temp} °C</h1>
                <i style={weatherIcon} className={iconString}></i>
            </div>
            <p style={tempSpanStyle}><span>{currentWeather.temp_max} °C</span><span style={divider}>|</span><span>{currentWeather.temp_min} °C</span></p>
            <div style={inlineBlock}>
                <i className="wi wi-sunrise"></i> <Moment unix tz="Europe/Stockholm" format="LT">{currentWeather.sunrise}</Moment>
            </div>
            <div style={inlineBlock}>
                <i className="wi wi-sunset"></i> <Moment unix tz="Europe/Stockholm" format="LT">{currentWeather.sunset}</Moment>
            </div>
        {/* </div> */}
        </div>
    )
}

export default ShowWeatherMain