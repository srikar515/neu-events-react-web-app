import { HTTP } from "../../HTTP"
import {showLoaderAction, hideLoaderAction} from './LoaderAction.js';
export const EventsActionTypes = {
    ADD_EVENT : '[EventItem] Add Event item',
    UPDATE_EVENT : '[EventItem] Update Event item',
    SET_EVENTS_DATA: "SET_EVENTS_DATA",
    SET_SAVED_EVENTS: "SET_SAVED_EVENTS",
    DELETE_EVENT : '[EventItem] Delete Event item'
}
//Action method to Get Events to the api using Fetch
export const getEvents = (url) => {
    return dispatch => {
        return fetch(url, { method: 'GET'}).then(res => {
            return res.json();
        }).then(res => {
            dispatch({type : 'GET_DATA',
                    eventlist : res })
        }).catch(err => {
            console.log('API failed')
        })
    }
}

//Action Method to add New Event
export const addEventAction = (url, payload) => {
    return dispatch => {
        return fetch(url,{
            method: 'POST',
            headers: {
                        'Content-Type': 'application/json',
                      },
            body: JSON.stringify(payload),
        }).then(res => {
            return res.json();
        }).then(res => {
            dispatch({type : EventsActionTypes.ADD_EVENT,
                to_be_added_payload : res })
        }).catch(err => {
            console.log('API failed')
        })
    }
}

//Action Method to delete an event.
export const deleteEventAction = (url, deleted_payload) => {
    return dispatch => {
        return fetch(url, {method: 'DELETE'}).then(() => {
            dispatch({type : EventsActionTypes.DELETE_TODO,
                deleted_payload})
        }).catch(err => {
            console.log('API failed')
        })
    }
}

export default getEvents


export const setEventsData = (payload) => {
    return {
        type: EventsActionTypes.SET_EVENTS_DATA,
        payload
    }
}
export const getEventBriteEvents = (inputText = "Badminton") => {
    return async (dispatch, getState) => { 
        try {
            dispatch(showLoaderAction())
            const url = `http://localhost:9002/eventsData?eventName=${inputText}`
            const response = await HTTP.get(url);
            dispatch(setEventsData(response.data))
        } catch(ex) {
            console.log(ex, "error")
        } finally {
            dispatch(hideLoaderAction())
        }
    }
}