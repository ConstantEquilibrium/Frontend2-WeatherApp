import React, { Component } from 'react'

export default class Forecast extends Component {
    constructor(props) {
      super(props)
    }

    
    render() {
        let forecast = this.props.forecast.map(date => {
            return(
                <tr key={date.date_epoch}>
                    <td style={{textAlign: 'left'}}>{date.date}</td>
                    <td style={{textAlign: 'right'}}>{date.day.maxtemp_c} C</td>
                    <td style={{textAlign: 'right'}}>{date.day.mintemp_c} C</td>
                </tr>
            )
        })

        return (
            <div>
                <table style={{width:'100%'}}>
                    <thead>
                        <tr>
                            <th style={{textAlign: 'left'}}>Datum</th>
                            <th style={{textAlign: 'right'}}>Max</th>
                            <th style={{textAlign: 'right'}}>Min</th>
                        </tr>
                    </thead>
                    <tbody>
                        {forecast}
                    </tbody>
                </table>
            </div>
        )
    }
}
