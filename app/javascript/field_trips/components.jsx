import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import moment from 'moment/moment'

import MapStyles from 'global/map_styles'
import Constants from 'global/constants'

import MapIconPurple from '../../assets/images/purple_map_icon.png'

const PurpleIcon = {
    url: MapIconPurple,
    scaledSize: new google.maps.Size(35, 35),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(35 / 2, 35)
}

export class FieldTripTile extends React.Component {
    onClick() {
        window.location.href = '/field_trips/' + this.props.fieldTrip.id
    }

    render() {
        const reviewCount = this.props.fieldTrip.review_count
        const suffix = reviewCount === 1 ? ' review' : ' reviews'
        const styleImg = {
            backgroundImage: 'url(' + this.props.fieldTrip.trip_image_url + ')',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            height: '25rem',
        }
        return (
            <div className="card m-2 pointer" style={{width: '20rem'}} onClick={this.onClick.bind(this)}>
              <div style={styleImg} className="card-bk-img-top" ></div>
              <div className="card-block">
                <p className="card-text"><b>${this.props.fieldTrip.cost}</b> {this.props.fieldTrip.name}</p>
                <div className="d-flex align-items-center">
                    <div className="rating">
                        <i className="fa fa-star rating-star p-1"></i>
                        <i className="fa fa-star rating-star p-1"></i>
                        <i className="fa fa-star rating-star p-1"></i>
                        <i className="fa fa-star rating-star p-1"></i>
                        <i className="fa fa-star rating-star p-1"></i>
                    </div>
                    <span className="pt-1 pb-1 pl-3 pr-3">{reviewCount + suffix}</span>
                </div>
              </div>
            </div>
        )
    }
}

class FieldTripProfileTile extends React.Component {
    render() {
        const trip = this.props.fieldTrip
        const reviewCount = trip.review_count
        const suffix = reviewCount === 1 ? ' review' : ' reviews'
        return (
        <div className="profile-tile">
          <div className="mw-100 field-trip-hero-img">
              <img className="img-fluid" src={trip.trip_image_url} alt="Card image cap" />
          </div>
          <div className="mt-3">
            <div className="d-flex justify-content-between">
                <p className=""><b>${trip.cost}</b> per child</p>
                <button
                    className="btn btn-primary"
                    data-toggle="modal"
                    data-target={'#' + Constants.RESERVATION_MODAL}>See Dates</button>
            </div>
            <div className="d-flex align-items-center">
                <div className="rating">
                    <i className="fa fa-star rating-star p-1"></i>
                    <i className="fa fa-star rating-star p-1"></i>
                    <i className="fa fa-star rating-star p-1"></i>
                    <i className="fa fa-star rating-star p-1"></i>
                    <i className="fa fa-star rating-star p-1"></i>
                </div>
                <span className="pt-1 pb-1 pl-3 pr-3">{reviewCount + suffix}</span>
            </div>
          </div>
        </div>
        )
    }
}

export class FieldTrips extends React.Component {
    render() {
        const fieldTrips = this.props.fieldTrips.map((trip, i) => {
            return <FieldTripTile key={i} fieldTrip={trip}/>
        })
        return (
            <div className="fieldtrip-container m-3 p-3 flex-wrap d-flex">
            {fieldTrips}
            </div>
        )
    }
}

class FieldTripSection extends React.Component {
    render() {
        return (
            <section className="field-trip-section">
                <div className="row">
                    <div className="col-3 label">
                        {this.props.label}
                    </div>
                    <div className="col-9 text">
                        {this.props.text}
                    </div>
                </div>
            </section>
        )
    }
}

class FieldTripSummary extends React.Component {
    render() {
        const user = this.props.fieldTrip.user
        const trip = this.props.fieldTrip

        const facts = user.facts.map((fact, i) => {
            return (
                <div className="fact" key={i}>
                    <i className={"fa fa-" + fact.icon}></i><span className="ml-3">{fact.name}</span>
                </div>
            )
        })

        return (
            <section className="field-trip-section">
                <div className="d-flex justify-content-between">
                    <div className="light">
                        <p>{trip.trip_type}</p>
                        <div>
                            {facts}
                        </div>
                    </div>
                    <div>
                      <img width="75" className="rounded-circle" src={user.profile_image_url} alt="Profile Image" />
                    </div>
                </div>
            </section>
        )
    }
}

class FieldTripMap extends React.Component {

    renderGMap() {
        const $map = $('.gmap')
        const trip = this.props.fieldTrip

        const latlng = {lat: trip.lat, lng: trip.lng}
        const map = new google.maps.Map($map[0], {
            zoom: 12,
            center: latlng,
            mapTypeControlOptions: { mapTypeIds: [] },
            styles: MapStyles.RETRO
        });

        const marker = new google.maps.Marker({
            position: latlng,
            map: map,
            fieldTrip: trip,
            icon: PurpleIcon,
        })

        const infoWindow = new google.maps.InfoWindow({
            content: trip.name
        });

        marker.setIcon(PurpleIcon)
        infoWindow.open(map, marker)
    }

    componentDidMount() {
        this.renderGMap()
    }

    render() {
        return (
            <section className="field-trip-section">
                <div className="w-100 gmap"></div>
            </section>
        )
    }
}

class FieldTripReview extends React.Component {
    render() {
        const user = this.props.review.user
        console.log(user)
        return (
            <div>
                <div className="d-flex">
                    <div>
                      <img width="60" className="rounded-circle mr-3 mt-3 mb-3" src={user.profile_image_url} alt="Profile Image" />
                    </div>
                    <div className="mt-3">
                        <div>{user.name}</div>
                        <small>{moment(this.props.review.created_at).format('MMMM M, YYYY')}</small>
                    </div>
                </div>
                <p className="light">
                {this.props.review.body}
                </p>
            </div>
        )
    }
}

export class FieldTripShow extends React.Component {
    render() {
        const reviews = this.props.fieldTrip.reviews.slice(0, 3).map((review, i) => {
            return (
                <FieldTripReview key={i} review={review} />
            )
        })

        return (
            <div className="field-trip-show content">
                <div className="row d-flex flex-wrap-reverse">
                    <div className="col-md-8">
                        <div className="ml-3 mr-3">
                            <h1 className="mb-3 pb-3">
                                {this.props.fieldTrip.name}
                            </h1>
                            <FieldTripSummary
                                fieldTrip={this.props.fieldTrip}
                            />
                            <FieldTripSection
                                label={"About your host, " + this.props.fieldTrip.user.name}
                                text={this.props.fieldTrip.user.about}
                            />
                            <FieldTripSection
                                label="What we'll do"
                                text={this.props.fieldTrip.what}
                            />
                            <FieldTripSection
                                label="Notes"
                                text={this.props.fieldTrip.notes}
                            />
                            <FieldTripSection
                                label="Where we'll be"
                                text={this.props.fieldTrip.where}
                            />
                            <FieldTripMap fieldTrip={this.props.fieldTrip} />
                            <section className="field-trip-section">
                                <div className="mb-3">Reviews</div>
                                {reviews}
                            </section>
                            <FieldTripSection
                                label="Group Size"
                                text={'There are a maximum of ' + this.props.fieldTrip.max_people + ' spots for this field trip'}
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <FieldTripProfileTile fieldTrip={this.props.fieldTrip} />
                    </div>
                </div>
            </div>
        )
    }
}

class FieldTripReservation extends React.Component {
    timeSpan(momentDate, duration) {
        return (
            momentDate.format('hh:mm A') +
            ' − ' +
            momentDate.add(duration, 'hours').format('hh:mm A')
        )
    }

    render() {
        const trip = this.props.fieldTrip
        const date = this.props.date
        let momentDate = moment(date.trip_date)
        console.log(momentDate.format())
        return (
            <section className="d-flex justify-content-between field-trip-reservation">
                <div>
                    <h4 className="light">{momentDate.format('ddd, MMM D')}</h4>
                    <p>
                        <small>{this.timeSpan(momentDate, trip.duration) + ' · $' + trip.cost + ' per child'}</small>
                    </p>
                </div>
                <div>
                    <a href={'/trip_dates/' + date.id + '/reservations/new'} className="btn btn-primary">Choose Date</a>
                </div>
            </section>
        )
    }
}

export class FieldTripReservationModal extends React.Component {
    render() {
        const dates = this.props.fieldTrip.active_dates
        const tripDates = dates.map((date, i) => {
            return (
                <FieldTripReservation
                    key={i}
                    date={date}
                    fieldTrip={this.props.fieldTrip} />
            )
        })
        // Render the dates in a modal
        // Allows user to navigate to Booking page to confirm their attendance
        return (
            <div className="modal fade" id={Constants.RESERVATION_MODAL} tabIndex="-1">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h3 className="modal-title">When do you want to go?</h3>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    {tripDates}
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
        )
    }
}

(function() {
    const mapStateToProps = state => {
        return {
            fieldTrips: state.field_trips,
        }
    }

    const mapDispatchToProps = dispatch => {
        return {}
    }

    FieldTrips = connect(mapStateToProps, mapDispatchToProps)(FieldTrips)
})();

(function() {
    const mapStateToProps = state => {
        return {
            fieldTrip: state.field_trip,
        }
    }

    const mapDispatchToProps = dispatch => {
        return {}
    }

    FieldTripShow = connect(mapStateToProps, mapDispatchToProps)(FieldTripShow)
})();

(function() {
    const mapStateToProps = state => {
        return {
            fieldTrip: state.field_trip,
        }
    }

    const mapDispatchToProps = dispatch => {
        return {}
    }

    FieldTripReservationModal = connect(mapStateToProps, mapDispatchToProps)(FieldTripReservationModal)
})();
