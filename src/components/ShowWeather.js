import React from 'react'

const ShowWeather = ({data}) => {
    let weatherList = data.map((date) => {
        let dateTime = new Date((date.dt * 1000)).getHours();
        return(
            <div key={date.dt}>
                {dateTime}
                <br />
                {date.main.temp}
            </div>
        )
    })
    return (
        <div>
            {weatherList}
        </div>
    )
}

export default ShowWeather;