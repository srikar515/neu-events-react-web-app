import React, { Component } from 'react'
import './Maps.scss'
import { FaMapMarkerAlt } from 'react-icons/fa';
export class Maps extends Component {
    constructor() {
        super(); 
        this.state = { 
            showMap: false
        }
    }
  //Toggle show map upon click of a button.
    _showMap = () => {
    if(this.state.showMap === true) {
        this.setState({
        showMap: false
        })
    }
    else {
        this.setState({
        showMap: true
        })
    }
    }
    //Html Represntation of the Map functionality.
    render(){
    return (
        <div>
            <button className='viewMapBtn' onClick={this._showMap.bind(null)}><FaMapMarkerAlt/>View Map</button>
            <div>
            { this.state.showMap && (
                    <iframe title="map" width="979"
                     height="500" id="gmap_canvas" src={this.props.eventLocation}></iframe>
            )}   
            </div>
        </div>
        )
        }
    }
export default Maps
