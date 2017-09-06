import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


export class FieldTripTile extends React.Component {
    onClick() {
        window.location.href = '/field_trips/' + this.props.fieldTrip.id
    }

    render() {
        return (
            <div className="card m-2 pointer" style={{width: '20rem'}} onClick={this.onClick.bind(this)}>
              <img className="card-img-top img-fluid" src="https://a0.muscache.com/im/pictures/54391822-fac5-47f3-a1e6-0b8dc0290729.jpg?aki_policy=poster" alt="Card image cap" />
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
        return (
        <div className="profile-tile">
          <div className="mw-100 field-trip-hero-img">
              <img src="http://via.placeholder.com/360x460" alt="Card image cap" />
          </div>
          <div className="mt-3">
            <div className="d-flex justify-content-between">
                <p className=""><b>$60</b> per child</p>
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
        return (
            <section className="field-trip-section">
                <div className="d-flex justify-content-between">
                    <div className="light">
                        <p>Lifestyle Experience</p>
                        <p>
                            <i className="fa fa-clock-o"></i><span className="ml-3">3 hours total</span>
                        </p>
                    </div>
                    <div>
                      <img className="rounded-circle" src="http://via.placeholder.com/75x75" alt="Card image cap" />
                    </div>
                </div>
            </section>
        )
    }
}

export class FieldTripShow extends React.Component {
    render() {
        return (
            <div className="field-trip-show">
                <div className="row d-flex flex-wrap-reverse">
                    <div className="col-md-8">
                        <div className="ml-3 mr-3">
                            <h1 className="mb-3 pb-3">
                                Cat dog hate mouse eat string barf pillow
                            </h1>
                            <FieldTripSummary
                            />
                            <FieldTripSection
                                label="About your host, Nick"
                                text="I run an online figurine and anime, manga, video games merchandise store and spend hours every day looking for hidden gems. I know this area like the back of my hand and look forward to taking you figurine-hunting in the streets of Akihabara."
                            />
                            <FieldTripSection
                                label="What we'll do"
                                text="After a quick introduction to the subculture of figurines, we'll set out to scour the area in search of the items on your wish list. I'm both a lifelong local and a passionate fan, so I know which of the hundreds of shops will have any particular item. If you're obsessed with anime, manga, or video games, the Akihabara neighborhood will have what you're looking for."
                            />
                            <FieldTripSection
                                label="Notes"
                                text="To outsiders, Akihabara can be overwhelming. Better to tackle it with a professional figurine buyer!"
                            />
                            <FieldTripSection
                                label="Where we'll be"
                                text="We'll be in a candy-colored maze of stores in the Akihabara neighborhood. Hardcore fans, called otaku, consider this area to be a sacred place. To outsiders, it can be overwhelming. That's why it's a good idea to tackle Akihabara with a professional figurine buyer."
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <FieldTripProfileTile />
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
})()
