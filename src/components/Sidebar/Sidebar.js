import React, { Component } from 'react'
import SidebarCities from './SidebarCities';
import SidebarList from './SidebarList';

export default class Sidebar extends Component {
  constructor(props) {
    super(props)
  
    // this.state = { cities:[ {id: 1, name: "Stockholm", favorite: true}, {id:2, name: "New York", favorite: false}, {id:3, name: "Dubai", favorite: false} ]}
  }
  

  render() {
    return (
      <div className="InnerContainer">
        {/* <SidebarCities handleOnClick={this.props.handleOnClick}  cities={this.state.cities} /> */}
        <SidebarList handleFavorite={this.props.handleFavorite} handleOnClick={this.props.handleOnClick}  cities={this.props.cities} />
      </div>
    )
  }
}
