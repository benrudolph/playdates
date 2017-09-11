import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


export class CaregiverProfile extends React.Component {
    render() {
        return (
            <div className="content">
                <h1>{this.props.caregiver.name}</h1>
            </div>
        )
    }
}

class CaregiverTile extends React.Component {
    onClick() {
        Analytics.track(
            Analytics.Category.CAREGIVER,
            Analytics.Action.SHOW,
            this.props.caregiver.name,
        )

        window.location.href = '/field_trips/' + this.props.caregiver.id
    }

    render() {
        const giver = this.props.caregiver
        const facts = giver.facts.map((fact, i) => {
            return (
                <div className="fact" key={i}>
                    <i className={"fa fa-" + fact.icon}></i><span className="ml-3">{fact.name}</span>
                </div>
            )
        })
        return (
            <div className="card m-2 pointer" style={{width: '20rem'}} onClick={this.onClick.bind(this)}>
              <div className="card-block text-center caregiver-tile-img pt-3 pb-3">
                  <img width="100" src={giver.profile_image_url} className="rounded-circle img-thumbnail" />
              </div>
              <div className="card-block">
                <div className="text-center">
                    <h3 className="card-text">{giver.name}</h3>
                    <p>{giver.location}</p>
                </div>
              </div>
            </div>
        )
    }
}

export class Caregivers extends React.Component {
    render() {
        const caregiverEls = this.props.caregivers.map((c, i) => {
            return (
                <CaregiverTile key={i} caregiver={c} />
            )
        })
        return (
            <div className="d-flex">
                {caregiverEls}
            </div>
        )
    }
}


(function() {
    const mapStateToProps = state => {
        return {
            caregivers: state.caregivers,
        }
    }

    const mapDispatchToProps = dispatch => {
        return {}
    }

    Caregivers = connect(mapStateToProps, mapDispatchToProps)(Caregivers)
})();

(function() {
    const mapStateToProps = state => {
        return {
            caregiver: state.caregiver,
        }
    }

    CaregiverProfile = connect(mapStateToProps)(CaregiverProfile)
})();
