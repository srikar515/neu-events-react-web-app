import React, { Component } from 'react'
import {FacebookShareButton,LinkedinShareButton,TwitterShareButton} from "react-share";
import {LinkedinIcon,FacebookIcon,TwitterIcon} from "react-share";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import './Share.scss'
//     constructor() {
//         super(); 
//         this.state = { showShareButtons: false }
//     }
//     _showShareButtons = () => {
//     if(this.state.showShareButtons === true) {
//         this.setState({
//             showShareButtons: false
//         })
//     }
//     else {
//         this.setState({
//         showShareButtons: true
//         })
//     }
//     }
// onClick={this._showShareButtons.bind(null)}

const Share = () => {
    const eventlist = useSelector((state) => state.eventlist)
    const events = eventlist.eventlist
    const { id } = useParams();
    //Finds the event id.
    const event = events.find(obj => {
      return obj.eventId === id;
    });

    //HTML representation of sharing the events via facebook, Linkedin and Twitter.
    return (
        
        <div>
            <div>  
            <FacebookShareButton url= {event.eventImage}
            quote={event.eventName}
            hashtag='#NUEventsHappening'>
                <FacebookIcon size={32} round={true}></FacebookIcon>
            </FacebookShareButton>
            <LinkedinShareButton url={event.eventImage}
            quote={event.eventName}
            title={event.eventName}
            summary={event.eventDescription}
            hashtag="#NUEventsHappening">
                <LinkedinIcon size={32} round={true}></LinkedinIcon>
            </LinkedinShareButton >
            <TwitterShareButton url={event.eventImage}
            quote={event.eventName}
            hashtag="#NUEventsHappening">
                <TwitterIcon size={32} round={true}></TwitterIcon>
            </TwitterShareButton>
            
            </div>
        </div>
    )
}

export default Share
