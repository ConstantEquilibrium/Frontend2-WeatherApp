import React, { Component } from 'react'
import Hamburger from '../img/icon_hamburger_1x.png';

const Navbar = () =>  {
    const navStyle = {
        'display': 'flex',
        'flex-direction': 'row',
        'justify-content': 'space-between',
        'width': '100%'
    }

    const navChildStyle = {
        'display': 'flex',
        'flex-direction': 'row',
        'align-items': 'flex-right'
    }

    const navChildElementStyle = {
        'padding': '0 1rem'
    }

    const imgStyle = {
        'width': '2rem'

    }

    return (
      <div style={navStyle} className="nav">
        <div style={navChildStyle} className="nav-left">
            <img style={imgStyle} src={Hamburger} />
        </div>
        <div style={navChildStyle} className="nav-right">
            <p style={navChildElementStyle}>Share</p>
            <p style={navChildElementStyle}>Like</p>
            <p style={navChildElementStyle}>Search</p>
        </div>
      </div>
    )
}

export default Navbar;