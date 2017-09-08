import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import Logo from '../../assets/images/logo.png'


export class MainNav extends React.Component {
    render() {
        return (
            <nav className="navbar ft-navbar d-flex justify-content-between">
                <a className="navbar-brand" href="/">
                    <img src={Logo} width="50" height="50" alt="" />
                </a>
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="nav-link" href="#">About</a>
                  </li>
                  <li className="nav-item active">
                    <a className="nav-link" href="#">PlayDates</a>
                  </li>
                </ul>
            </nav>
        )
    }
}
