import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { updateNumberOfChildren } from 'reservations/actions'

export class ReservationForm extends React.Component {
    render() {
        const date = this.props.tripDate
        const trip = this.props.fieldTrip
        return (
            <div className="reservation-new content">
                <div className="row">
                    <div className="col-md-8 col-sm-12">
                        <div className="ml-3 mr-3">
                            <h1 className="mb-3 pb-3">
                                Ready to book your field trip?
                            </h1>
                            <p className="lead">
                                {trip.name}
                            </p>
                            <form method="POST" action={'/trip_dates/' + date.id + '/reservations'}>
                                <input type="hidden" name="authenticity_token" value={this.props.csrfToken} />
                                <div className="form-group">
                                    <label htmlFor="reservation_email">Email address</label>
                                    <input required name="reservation[email]" type="email" className="form-control" id="reservation_email" placeholder="Enter email" />
                                    <small className="form-text text-muted">We will never share your email with anyone else.</small>
                                </div>
                                <div className="form-group">
                                    <label required htmlFor="reservation_name">Name</label>
                                    <input name="reservation[name]" type="text" className="form-control" id="reservation_name" placeholder="Enter name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="reservation_number_of_children">Number of children</label>
                                    <input
                                        required
                                        onChange={this.props.onChangeNumberOfChildren}
                                        name="reservation[number_of_children]"
                                        min="1" max="4" type="number"
                                        className="form-control"
                                        id="reservation_number_of_children" placeholder="1" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="reservation_special_requests">Any special requests or needs?</label>
                                    <textarea name="reservation[special_requests]" className="form-control" id="reservation_special_requests" />
                                </div>
                                <button type="submit" className="btn btn-primary">Reserve!</button>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-4 hidden-md-down">
                        <FieldTripInfo fieldTrip={this.props.fieldTrip} tripDate={date} />
                    </div>
                </div>
            </div>
        )
    }
}

class FieldTripInfo extends React.Component {
    render() {
        const trip = this.props.fieldTrip
        const date = this.props.tripDate
        const numberOfChildren = this.props.numberOfChildren || 1
        const suffix = numberOfChildren === 1 ? ' child' : ' children'
        return (
            <div className="card" >
              <div className="card-block">
                <h4 className="card-title">{trip.name}</h4>
                <p className="card-text">{trip.what}</p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">{moment(date.trip_date).format('ddd, MMM D')}</li>
                <li className="list-group-item">
                    {'$' + trip.cost + ' x ' + numberOfChildren + suffix}
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="float-left"><b>Total</b></span>
                    <span className="float-right"><b>{'$' + trip.cost * numberOfChildren}</b></span>
                </li>
              </ul>
          </div>
        )
    }
}


(function() {
    const mapStateToProps = state => {
        return {
            fieldTrip: state.field_trip,
            tripDate: state.trip_date,
            csrfToken: state.csrfToken,
            numberOfChildren: state.numberOfChildren,
        }
    }

    const mapDispatchToProps = dispatch => {
        return {
            onChangeNumberOfChildren: (e) => {
                dispatch(updateNumberOfChildren(e.target.value))
            }
        }
    }

    ReservationForm = connect(mapStateToProps, mapDispatchToProps)(ReservationForm)
})();

(function() {
    const mapStateToProps = state => {
        return {
            numberOfChildren: state.numberOfChildren,
        }
    }

    FieldTripInfo = connect(mapStateToProps)(FieldTripInfo)
})();
