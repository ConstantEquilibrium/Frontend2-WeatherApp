import React from 'react'

const ShowWeatherMain = ({weatherdata}) => {
    this.state = {
        currentLocation: [],
        currentTemp: [],
        coldestTemp: [],
        description: []
    }

    let data = weatherdata.map((date) => {
        return(
            {currentLocation: "Stockholm"}, {currentTemp: date.main.temp}, {coldestTemp: date.main.temp_min}, {description: date.weather.main}
        )
    })

    return (
        <div>
            <h3>$Stockholm, Sweden</h3>
            <h1>{data.currentTemp[0]}</h1>
        </div>
    )
}

export default ShowWeatherMain;