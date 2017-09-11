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
import { CaregiverProfile } from 'caregivers/components'

window.jQuery = jQuery
window.moment = moment

let store;
const loggerMiddleware = createLogger()

document.addEventListener('DOMContentLoaded', () => {
  const initialData = $('#initial-data').data().initialData
  store = createStore(
    (state) => { return state },
    initialData,
    applyMiddleware(
      loggerMiddleware,
    )
  )

  ReactDOM.render(
    <Provider store={store}>
    <div>
      <MainNav />
      <div className="container">
        <CaregiverProfile />
      </div>
    </div>
    </Provider>,
    $('.react-container')[0]
  )
})


