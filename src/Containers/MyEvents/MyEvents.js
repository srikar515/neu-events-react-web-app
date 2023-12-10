import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {updateUserEventUnregisterDetails} from "./../../Store/Actions/LoginAction"
import { ToastContainer, toast } from 'react-toastify';
import {  AiOutlineClockCircle } from 'react-icons/ai';
import { BsCalendar2Date, BsFillBookmarkFill } from 'react-icons/bs';
import './MyEvents.scss'
import { Link } from "react-router-dom";

//Maps and dispatch to props
const mapStoreToProps = (state) => ( state.myEventlist ) 
const mapDispatchToProps = dispatch => bindActionCreators({
    unregister: (url, eventid, callingComponent) => dispatch(updateUserEventUnregisterDetails(url, eventid, callingComponent))
  },dispatch);

export class MyEventsComponent extends Component {
    constructor(props) {
        super(props)
        let loggedInUserDetails = JSON.parse(sessionStorage.getItem("user"));
        //Updates the state with the intrested events for the logged in users.
        this.state = {
            myEvents : [],
            eventsRegistered: loggedInUserDetails["eventsRegistered"],
            username: loggedInUserDetails["uuid"]
        }
        this.callApi = this.callApi.bind(this);
        //this.callUnregister = this.callUnregister.bind(this);
    }
    //Calls the API after rendering
    componentDidMount(){
        this.callApi();
    }

    //Updates the current state.
    componentDidUpdate(prevProps, prevState){
        if(prevState.myEvents.length !== this.state.myEvents.length) {

        }
    }
    async callUnregister(eventId) {
      let uuid = this.state.username
      let payload = {
        'eventId' : eventId
      }
      this.props.unregister(uuid, payload, "MyEventsComponent")
      // let loggedInUserDetails = JSON.parse(sessionStorage.getItem("user"));
      // this.setState({
      //   eventsRegistered: loggedInUserDetails["eventsRegistered"]
      // })
    }
    callApi = async () => {
        let i=0;
        let eventlist=[]
        console.log("Call Api")
        for(i;i< this.state.eventsRegistered.length;i++){
            const response = await fetch(`http://localhost:9002/eventsData/${this.state.eventsRegistered[i]}`)
            const json = await response.json()
            eventlist.push(json[0])
          }
        this.setState( {
            myEvents : eventlist
        })
       }
        //HTML Representation of the Intrested events.
    render() {
      console.log(this.state.myEvents)
        return(
            <div className="events">
              <ToastContainer></ToastContainer>
        {this.state.myEvents.map((event, index) => {
          return (
            <div key={index}>
              <div className='eventDetails'>
                <div className='details' >
                  {/* <img src={event.eventImage} alt="event" width="480" height="300" className='row__poster'/> */}
                  <img src={event.eventImage} alt="event" width="295" height="200" className='row__poster' />
                  <p className="event-name">{event.eventName}</p>
                  <div className="event-date-time">
                    <p className="event-date"><BsCalendar2Date/>&#160;  {event.eventDate}</p>
                    <p className="event-time"><AiOutlineClockCircle/> {event.eventTime}</p>
                  </div>
                  <div className='buttons' >
                    <Link to={`/events/${event.eventId}`}>
                      <button className="viewBtn">View</button>
                    </Link>
              <button onClick={() => this.callUnregister(event.eventId)} className = "unregisterBtn">Unregister</button>
              </div>
            </div>
        </div>
            </div>
          );
        })}
      </div>
        )
    }
}
const MyEvents = connect(mapStoreToProps, mapDispatchToProps)(MyEventsComponent)
export default MyEvents