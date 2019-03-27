import React, { Component } from 'react'
import Icon_StarSolid from '../../img/icon_star_solid_1x.png';
import Icon_StarRegular from '../../img/icon_star_regular_1x.png';

export default class SidebarList extends Component {
    constructor(props) {
      super(props)
    }
    
    render() {
        //#region 
        let SidebarItemContainer = {
            'display': 'flex',
            'justifyContent': 'space-between',
            'alignItems': 'center',
            'background': 'rgba(255,255,255,0.1',
            'margin': '1rem 0',
            'verticaAlign': 'middle',
            'minWidth': '200px'
        }

        const SidebarItemLeft = {
            cursor: 'pointer',
            'padding': '1rem 1.8rem',
            flexGrow: '2'
        }

        const SidebarItemRight = {
            cursor: 'pointer',
            'padding': '1rem 1.8rem',
        }

        const SidebarItemContent = {
            'display': 'inline-block',
            'verticalAlign': 'middle'
        }

        let favoriteBtnStyle = {
            'marginLeft': '1rem'
        }

        let inline = {
            display: 'inline-block'
        }
        //#endregion

    const CityList = this.props.cities.map((city) => {
        let favoriteBtn;
        if(city.favorite === true) {
            favoriteBtn = Icon_StarSolid
        } else {
            favoriteBtn = Icon_StarRegular
        }

        return(
            <div style={SidebarItemContainer} key={city.id}>
                <div onClick={this.props.handleOnClick} style={SidebarItemLeft}>
                    <h3 name="city" style={SidebarItemContent}>{city.name}</h3>
                </div>
                <div style={SidebarItemRight}>
                    <img onClick={() => this.props.handleFavorite(city.id)} style={SidebarItemContent} style={favoriteBtnStyle} src={favoriteBtn} alt="img" />
                </div>
            </div>
        )
    })

    return (
      <div>
        {CityList}
      </div>
    )
  }
}