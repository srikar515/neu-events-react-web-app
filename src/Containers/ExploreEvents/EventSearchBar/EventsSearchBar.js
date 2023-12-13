import React, { useEffect, useState, useRef } from "react";
import './EventsSearchBar.scss'
import { Link } from "react-router-dom";
import { updateUserEventDetails, updateUserInterestedEventDetails, updateUserEventUnbookmarkDetails } from "../../../Store/Actions/LoginAction"
import axios from "axios";

import { useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { BsCalendar2Date, BsFillBookmarkFill } from 'react-icons/bs';
const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:9002";

// import { View, Image, Text, LayoutAnimation } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';

export default function App() {
  let [searchParam, setSearchParam] = useState("");
  let [data, setData] = useState([]);
  let [filteredData, setFilteredData] = useState([]);
  const dispatch = useDispatch();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const textFieldRef = useRef(null);

  //Gets the logged in user details
  let loggedInUserDetails = JSON.parse(sessionStorage.getItem("user"));
  const eventsInterested = loggedInUserDetails["eventsInterested"]
  //Stores the registered event id in the payload
  function callRegister(eventId) {
    let uuid = loggedInUserDetails["uuid"]
    let payload = {
      'eventId': eventId
    }
    dispatch(updateUserEventDetails(uuid, payload, "App"))
  }
  //Stores the intrested events id in the payload
  function callInterested(eventId) {
    let uuid = loggedInUserDetails["uuid"]
    let payload = {
      'eventId': eventId
    }
    if(isBookmarked && eventsInterested.includes(eventId)){
      dispatch(updateUserEventUnbookmarkDetails(uuid, payload, "App"))
      setIsBookmarked(isBookmarked)
    }
    else {
      dispatch(updateUserInterestedEventDetails(uuid, payload, "App"))
      setIsBookmarked(!isBookmarked)
    }
  }

  const fetchExternalEvents = async () => {
    const options = {
      method: 'GET',
      url: 'https://concerts-artists-events-tracker.p.rapidapi.com/artist',
      params: {
        name: 'Ed sheeran',
        page: '1'
      },
      headers: {
        'X-RapidAPI-Key': '0efcfc4a58msh5080e380b5ac700p132982jsn18acd0f5e691',
        'X-RapidAPI-Host': 'concerts-artists-events-tracker.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      return response.data; // Return the data received from the API
    } catch (error) {
      console.error(error);
      return []; // Return an empty array in case of error
    }
  };

  //Useefect to fetch the events dataupon rendering the page.
  useEffect(() => {
    fetch(`${API_BASE}/eventsData`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setFilteredData(data);
      })
      .catch((err) => console.log(err));
  }, [isBookmarked]);
  useEffect(() => {
    if (searchParam !== "") {
      fetchExternalEvents()
      .then((externalData) => {
        const filteredData = data.filter(
          (event) =>
            event.eventName.toLowerCase().includes(searchParam.toLowerCase()) ||
            event.eventDate.includes(searchParam) ||
            event.eventTime.toLowerCase().includes(searchParam.toLowerCase())
        );
        
        filteredData[0]['eventName']=externalData.data[0]['description'];
        const mergedData = [...filteredData];
        setFilteredData([...filteredData]);
        setData(mergedData);
        setFilteredData(mergedData);
      }).catch((err) => console.log(err));
    } else {
      setFilteredData([...data]);
    }
  }, [searchParam]);

  console.log(eventsInterested)

  //HTML Representation of the Search Bar Functionality.
  return (

    <div className="App">
      {/*Toast Container to notify the user of the action performed */}
      <ToastContainer></ToastContainer>

      <div className="search">
        <TextField
          className='search-bar'
          inputRef={textFieldRef}
          label="&#128269; Search Events"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setSearchParam(textFieldRef.current.value); // Update searchParam on Enter press
            }
          }}
          placeholder="search your event"
        >
        </TextField>
      </div>

      <div className="events">
        {filteredData.map((event, index) => {
          return (
            <div key={index}>
              <div className='eventDetails'>
                <div className='details' >
                  {/* <img src={event.eventImage} alt="event" width="480" height="300" className='row__poster'/> */}
                  <div className="bookmark-image-container">
                    <button onClick={() => callInterested(event.eventId)} className="interestedBtn">
                      <BsFillBookmarkFill className={eventsInterested.includes(event.eventId) ? "bookmark_icon_selected" : "bookmark_icon"} />
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
                    <button onClick={() => callRegister(event.eventId)} className="registerBtn">Register</button>
                    {/* <button onClick={() => callInterested(event.eventId)} className = "interestedBtn"><BsFillBookmarkCheckFill/></button> */}
                  </div>
                </div>
              </div>
            </div>
          );
        }

        )}

      </div>
    </div>

  );

}
