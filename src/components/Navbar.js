import React, { Component } from 'react'

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

    return (
      <div style={navStyle} className="nav">
        <div style={navChildStyle} className="nav-left">
            <p style={navChildElementStyle}>Hamburger</p>
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