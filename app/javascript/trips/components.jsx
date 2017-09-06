import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'


export class FieldTripTile extends React.Component {
    onClick() {
        window.location.href = '/field_trips/1'
    }

    render() {
        return (
            <div className="card m-2 pointer" style={{width: '20rem'}} onClick={this.onClick.bind(this)}>
              <img className="card-img-top" src="http://via.placeholder.com/270x400" alt="Card image cap" />
              <div className="card-block">
                <p className="card-text"><b>$60</b> Some quick example text to build on the card title and make up the bulk of the cards content.</p>
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
        const fieldTrips = [
            <FieldTripTile key="0"/>,
            <FieldTripTile key="1"/>,
            <FieldTripTile key="2"/>,
            <FieldTripTile key="3"/>,
            <FieldTripTile key="4"/>,
            <FieldTripTile key="5"/>,
        ]
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
            <section>
                <div className="row">
                    <div className="col-3">
                        {this.props.label}
                    </div>
                    <div className="col-9">
                        {this.props.text}
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
                <h1>
                    Cat dog hate mouse eat string barf pillow
                </h1>
                <section>
                    Hosted By Saburo
                </section>
                <FieldTripSection
                    label="About your host, Nick"
                    text="I run an online figurine and anime, manga, video games merchandise store and spend hours every day looking for hidden gems. I know this area like the back of my hand and look forward to taking you figurine-hunting in the streets of Akihabara."
                />
            </div>
        )
    }
}
