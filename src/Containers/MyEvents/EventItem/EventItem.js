import React, { Component } from 'react'
import EventDetails from '../EventDetails/EventDetails.js';
export class EventItem extends Component {
  render() {
    //HTML represntation of the event item.
    return (
      <div>
        <EventDetails eventItem = {this.props.eventItem}></EventDetails>
      </div>
    )
  }
}

export default EventItem
