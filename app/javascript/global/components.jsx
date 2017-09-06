import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'


export class MainNav extends React.Component {
    render() {
        return (
            <nav className="navbar ft-navbar">
              <div className="navbar-brand">
                <a className="navbar-brand" href="/">FieldTrips</a>
              </div>
            </nav>
        )
    }
}
