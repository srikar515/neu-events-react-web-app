import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateEventAction } from '../../Store/Actions/EventsAction';
import './EditEventPage.scss';
const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:9002";


const EditEventPage = () => {
    const { eventId } = useParams();
    const [eventData, setEventData] = useState({
                                                   // Define initial state structure with relevant fields
                                                   eventName: '',
                                                   eventDate: '',
                                                   eventTime: ''
                                               });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch event data based on eventId
        fetch(`${API_BASE}/eventsData/${eventId}`)
            .then(res => res.json())
            .then(data => {
                // Update the state with fetched event data
                setEventData({
                                 eventName: data.eventName, // Assuming this is the structure of your data
                                 eventDate: data.eventDate,
                                 eventTime: data.eventTime
                             });
            })
            .catch(err => console.error(err));
    }, [eventId]);

    const handleChange = (e) => {
        setEventData({ ...eventData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = `${API_BASE}/eventsData/${eventId}`;
        dispatch(updateEventAction(url, eventData));
        navigate('/organizer'); // Navigate back to the organizer page
    };

    return (
        <div className="edit-event-container">
            <h2>Edit Event</h2>
            <form onSubmit={handleSubmit} className="edit-event-form">
                <label>
                    Event Name:
                    <input type="text" name="eventName" value={eventData.eventName} onChange={handleChange} />
                </label>
                <label>
                    Event Date (YYYY-MM-DD):
                    <input type="text" name="eventDate" value={eventData.eventDate} onChange={handleChange} />
                </label>
                <label>
                    Event Time (HH:MM):
                    <input type="text" name="eventTime" value={eventData.eventTime} onChange={handleChange} />
                </label>
                <button type="submit">Update Event</button>
            </form>
        </div>
    );
};

export default EditEventPage;
