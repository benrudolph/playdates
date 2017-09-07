import jQuery from 'jquery'

import Tether from 'tether/dist/js/tether'
import moment from 'moment/moment'
import _ from 'underscore/underscore'

import 'bootstrap/dist/js/bootstrap'
import 'daemonite-material/js/material'

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { Provider } from 'react-redux'

import { MainNav } from 'global/components'
import SmilingMonkey from '../../../assets/images/smiling_monkey.png'

window.jQuery = jQuery
window.moment = moment

let store;
const loggerMiddleware = createLogger()

document.addEventListener('DOMContentLoaded', () => {
  let initialData = $('#initial-data').data().initialData
  store = createStore(
    () => {},
    initialData,
    applyMiddleware(
      loggerMiddleware,
    )
  )

  ReactDOM.render(
    <Provider store={store}>
    <div>
      <MainNav />
      <div className="container text-center">
            <h1 className="display-2 m-3 p-3">Reservation Success!</h1>
            <div>
              <img height="450" src={SmilingMonkey} />
            </div>
            <a href="/" className="btn btn-primary mt-3">Home</a>
      </div>
    </div>
    </Provider>,
    $('.react-container')[0]
  )
})

