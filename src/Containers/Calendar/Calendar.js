import React, { Component } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

export class Calendar extends Component {
  //Gets the Registered Events for the Loggedin Users.
    constructor(props) {
        super(props)
        let loggedInUserDetails = JSON.parse(sessionStorage.getItem("user"));
        this.state = {
            myEvents : [],
            eventsRegistered: loggedInUserDetails["eventsRegistered"],
        }
    }

    //Calls the APi with the Url by getting the url for the registered events
    componentDidMount(){
        this.callApi();   
    }
    callApi = async () => {
        let i=0;
        let eventlist=[]
        for(i;i< this.state.eventsRegistered.length;i++){
            const response = await fetch(`http://localhost:9002/eventsData/${this.state.eventsRegistered[i]}`)
            //Created a eventlist array and push the registered events
            const json = await response.json()
            eventlist.push(json[0])
          }
          //Sets the eventlist to the state
        this.setState( {
            myEvents : eventlist
        })
       }

      
  render() {
    //Gets the event name and date for all the registered events
    let events = []
    this.state.myEvents.forEach(event => {
        let input = {
        title: event.eventName,
        start: event.eventDate + "T" + event.eventTime.substring(0,5)
        }
        events.push(input)
    });
    //HTML Representation of the Full Calender
    return (
      <div>
        <FullCalendar
            plugins={[ dayGridPlugin ]}
            initialView="dayGridMonth"
            events={events}/>
      </div>
    )
  }
}

export default Calendar
