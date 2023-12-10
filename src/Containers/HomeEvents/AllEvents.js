import './AllEvents.scss'
//import EventItem from './EventItem/EventItem.js'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import getEvents from '../../Store/Actions/EventsAction.js'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { BsCalendar2Date, BsFillBookmarkFill } from 'react-icons/bs';
import { Link } from "react-router-dom";


const mapStoreToProps = (state) => ( state.eventlist ) 

const mapDispatchToProps = dispatch => bindActionCreators({
  getEvents
},dispatch);



class AllEventsListComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      images:  null
    }
    this.callApi = this.callApi.bind(this);

  }
  
  componentDidMount() {
    this.callApi();
  }
  
  //api call 
  callApi = () => {    
    this.props.getEvents('http://localhost:9002/eventsData')
  };

  callInterested = (eventId) =>{
    
  }

  callRegister = (eventId)=>{

  }


  
  render() {
    const eventlist = this.props.eventlist
    console.log(JSON.stringify(eventlist));
    // const items = eventlist.map((event,i) => <EventItem 
    // key={i}
    // eventitem={event} 
    // index={i}>
    // </EventItem>)
    
    return ( 
        <div className="events">
        {eventlist.map((event, index) => {
          return (
            <div key={index}>
              <div className='eventDetails'>
                <div className='details' >
                  {/* <img src={event.eventImage} alt="event" width="480" height="300" className='row__poster'/> */}
                  <div className="bookmark-image-container">
                    <button onClick={() => this.callInterested(event.eventId)} className="interestedBtn">

                    </button>
                    <img src={event.eventImage} alt="event" width="295" height="200" className='row__poster' />
                  </div>
                  <p className="event-name">{event.eventName}</p>
                  <div className="event-date-time">
                    <p className="event-date"> <BsCalendar2Date />&#160; {event.eventDate} </p>
                    <p className="event-time"> <AiOutlineClockCircle /> {event.eventTime} </p>
                  </div>
                  <div className='buttons' >
                    <Link to={`/events/${event.eventId}`}>
                      <button className="viewBtn">View</button>
                    </Link>
                    {/* <button  className = "viewBtn">View</button> */}
                    <button onClick={() => this.callRegister(event.eventId)} className="registerBtn">Register</button>
                    {/* <button onClick={() => callInterested(event.eventId)} className = "interestedBtn"><BsFillBookmarkCheckFill/></button> */}
                  </div>
                </div>
              </div>
            </div>
          );
        }

        )}

      </div>
       
         
    )
  }
}

const ExploreAllEvents = connect(mapStoreToProps, mapDispatchToProps)(AllEventsListComponent)

export default ExploreAllEvents