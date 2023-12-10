import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {updateUserEventUnbookmarkDetails} from "./../../Store/Actions/LoginAction"
import  Delete from "@mui/icons-material/Delete"
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { ToastContainer, toast } from 'react-toastify';
import './MyEvents.scss'
import './InterestedEvents.scss'
import { Link } from "react-router-dom";

//Maps store to props
const mapStoreToProps = (state) => ( state.myEventlist ) 

//Maps dispatch to props

const mapDispatchToProps = dispatch => bindActionCreators({
    unbookmark: (url, eventid, callingComponent) => dispatch(updateUserEventUnbookmarkDetails(url, eventid, callingComponent))
  },dispatch);
export class InterestedEventsComponent extends Component {
    constructor(props) {
        super(props)
        let loggedInUserDetails = JSON.parse(sessionStorage.getItem("user"));
        //Updates the state with the intrested events for the logged in users.
        this.state = {
            interestedEvents : [],
            eventsInterested: loggedInUserDetails["eventsInterested"],
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
        if(prevState.interestedEvents.length !== this.state.interestedEvents.length) {
        }
    }
    async callDelete(eventId) {
      let uuid = this.state.username
      let payload = {
        'eventId' : eventId
      }
      this.props.unbookmark(uuid, payload, "InterestedEventsComponent")
      // let loggedInUserDetails = JSON.parse(sessionStorage.getItem("user"));
      // this.setState({
      //   eventsRegistered: loggedInUserDetails["eventsRegistered"]
      // })
    }
    callApi = async () => {
        let i=0;
        let interestedEventlist=[]
        console.log("Call Api")
        for(i;i< this.state.eventsInterested.length;i++){
            const response = await fetch(`http://localhost:9002/eventsData/${this.state.eventsInterested[i]}`)
            const json = await response.json()
            interestedEventlist.push(json[0])
          }
        this.setState( {
            interestedEvents : interestedEventlist
        })
       }
       //HTML Representation of the Intrested events.
    render() {
      console.log(this.state.myEvents)
        return(
            <div className="events_interested">
              <ToastContainer></ToastContainer>
        {this.state.interestedEvents.map((event, index) => {
          return (
            <div className="eventDetails_interested_outer" key={index}>
              <div className='eventDetails_interested'>
                <p>{event.eventName}</p>
                  <div className='buttons_interested' >
                    <Link to={`/events/${event.eventId}`}>
                      <button><RemoveRedEyeIcon/></button>
                    </Link>
                    <button onClick={() => this.callDelete(event.eventId)}><Delete/></button>
                  </div>
              </div>
            </div>
          );
        })}
      </div>
        )
    }
}
const InterestedEvents = connect(mapStoreToProps, mapDispatchToProps)(InterestedEventsComponent)
export default InterestedEvents