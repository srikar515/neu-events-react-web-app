import './ExploreEvents.scss'
//import EventItem from './EventItem/EventItem.js'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import getEvents from '../../Store/Actions/EventsAction.js'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import EventSearchBar from './EventSearchBar/EventsSearchBar.js'


const mapStoreToProps = (state) => ( state.eventlist ) 

const mapDispatchToProps = dispatch => bindActionCreators({
  getEvents
},dispatch);

class EventListComponent extends Component {
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
  
  render() {
    const eventlist = this.props.eventlist
    console.log(JSON.stringify(eventlist));
    // const items = eventlist.map((event,i) => <EventItem 
    // key={i}
    // eventitem={event} 
    // index={i}>
    // </EventItem>)
    
    return ( 
      <div className="event" >
        <EventSearchBar/>
        {/* <div className='event-container'>
            {items}
        </div> */}
      </div>

      // <div>
      //   <h2><center>Sports Events</center></h2>
      //    <ol className='ol'>        
      //       {items}
      //    </ol>
      //    <h2><center>Career Events</center></h2>
      //    <ol className='ol'>        
      //       {items}
      //    </ol> 
      // </div>       
         
    )
  }
}

const ExploreEvents = connect(mapStoreToProps, mapDispatchToProps)(EventListComponent)

export default ExploreEvents