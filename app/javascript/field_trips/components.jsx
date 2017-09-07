import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import MapStyles from 'global/map_styles'

import MapIconPurple from '../../assets/images/purple_map_icon.png'

const PurpleIcon = {
    url: MapIconPurple,
    scaledSize: new google.maps.Size(35, 35),
    origin: new google.maps.Point(0,0),
    anchor: new google.maps.Point(0, 0)
}

export class FieldTripTile extends React.Component {
    onClick() {
        window.location.href = '/field_trips/' + this.props.fieldTrip.id
    }

    render() {
        return (
            <div className="card m-2 pointer" style={{width: '20rem'}} onClick={this.onClick.bind(this)}>
              <img className="card-img-top img-fluid" src={this.props.fieldTrip.trip_image_url} alt="Card image cap" />
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
                    <span className="pt-1 pb-1 pl-3 pr-3">67 reviews</span>
                </div>
              </div>
            </div>
        )
    }
}

class FieldTripProfileTile extends React.Component {
    render() {
        const trip = this.props.fieldTrip
        return (
        <div className="profile-tile">
          <div className="mw-100 field-trip-hero-img">
              <img className="img-fluid" src={trip.trip_image_url} alt="Card image cap" />
          </div>
          <div className="mt-3">
            <div className="d-flex justify-content-between">
                <p className=""><b>${trip.cost}</b> per child</p>
                <button className="btn btn-primary">See Dates</button>
            </div>
            <div className="d-flex align-items-center">
                <div className="rating">
                    <i className="fa fa-star rating-star p-1"></i>
                    <i className="fa fa-star rating-star p-1"></i>
                    <i className="fa fa-star rating-star p-1"></i>
                    <i className="fa fa-star rating-star p-1"></i>
                    <i className="fa fa-star rating-star p-1"></i>
                </div>
                <span className="pt-1 pb-1 pl-3 pr-3">67 reviews</span>
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
                      <img width="75" className="rounded-circle" src={user.profile_image_url} alt="Card image cap" />
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
        return (
            <div>
                <div className="d-flex">
                    <div>image</div>
                    <div>profile</div>
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
            <div className="field-trip-show">
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
                                <div>Reviews</div>
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
