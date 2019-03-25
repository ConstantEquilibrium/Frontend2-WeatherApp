import React, { Component } from 'react'
import SidebarCities from './SidebarCities';

export default class Sidebar extends Component {
  constructor(props) {
    super(props)
  
    this.state = { cities:[ {id: 1, name: "Stockholm", favorite: true}, {id:2, name: "New York", favorite: false} ]}
  }
  

  render() {
    return (
      <div className="InnerContainer">
        <SidebarCities cities={this.state.cities} />
      </div>
    )
  }
}
