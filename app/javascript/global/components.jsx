import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import Logo from '../../assets/images/logo.png'

const Tabs = [
    {
        controller: 'field_trips',
        name: 'PlayDates',
        url: '/',
    },
    {
        controller: 'caregivers',
        name: 'Our Caregivers',
        url: '/caregivers',
    },
    {
        controller: 'about',
        name: 'About',
        url: '/',
    },
]

export class MainNav extends React.Component {
    render() {
        const links = Tabs.map((tab, i) => {
            let klass = 'nav-item'
            if (this.props.controller === tab.controller) {
                klass += ' active'
            }
            return (
                <li key={i} className={klass}>
                    <a className="nav-link" href={tab.url}>{tab.name}</a>
                </li>
            )
        })

        return (
            <nav className="navbar ft-navbar d-flex justify-content-between">
                <a className="navbar-brand" href="/">
                    <img src={Logo} width="50" height="50" alt="" />
                </a>
                <ul className="navbar-nav">
                    {links}
                </ul>
            </nav>
        )
    }
}


(function() {
    const mapStateToProps = state => {
        return {
            controller: state.controller,
        }
    }

    const mapDispatchToProps = dispatch => {
        return {}
    }
    MainNav = connect(mapStateToProps, mapDispatchToProps)(MainNav)

})()
