import React, { Component } from 'react'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Maps from '../Maps/Maps.js'
import Share from '../Share/Share.js'
import axios from 'axios';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'
import './EventInfo.scss'
const EventInfo = () => {
  const eventlist = useSelector((state) => state.eventlist)
  const events = eventlist.eventlist
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find(obj => {
    return obj.eventId === id;
  });

  //HTML Representation of the Event Info Page alond with the evnt name, description, time and location.
  return (
    
    <div className='event-info-outer'>
      <div className='event-info-inner'>
        <div className='view-header'>
        <div><button className='backBtn' onClick={() => navigate("/")}>Go back</button></div>
        {/*Share Functionality to share the events via Social Media Apps */}
        <div className='share-container'><Share/></div>
        </div>
        <div className="event-wrap">
          <img src={event.eventImage} alt="eventImage" className='event-image' />
          <div className='event-info'>
            <h2>{event.eventName}</h2>
            <p>It's Happenning !!! Get Ready to attend {event.eventName} event on {event.eventDate} at {event.eventTime}</p>
          </div>
        </div>
        <p className='event-description'>{event.eventDescription}</p>
        {/*Maps Functionality to navigate to the event location*/}
        <Maps eventLocation = {event.eventLocation}/>
      </div>
    </div>
  );
};
export default EventInfo;