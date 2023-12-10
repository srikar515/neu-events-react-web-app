import React, { Component } from 'react'

export class EventDetails extends Component {
  render() {
    //HTML representation of the Event Details.
    return (
        <div className='eventDetails'>
              
        <div className='details'>
          {/* <img src={this.props.eventitem.eventImage} alt="event" width="480" height="300" className='row__poster'/> */}
          <img src={this.props.eventitem.eventImage} alt="event" width="295" height="200" className='row__poster'/>
          Name : {this.props.eventitem.eventName}<br></br>
          Event Date : {this.props.eventitem.eventDate}<br></br>
          Event Time : {this.props.eventitem.eventTime}<br></br>
          <div className='buttons'>
            <button className = "unsubscribeBtn">Unsubscribe</button>
          </div>
          </div><br></br>
    </div>
    )
  }
}

export default EventDetails
