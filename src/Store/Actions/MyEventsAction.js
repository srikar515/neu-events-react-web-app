import { HTTP } from "../../HTTP"
import {showLoaderAction, hideLoaderAction} from './LoaderAction.js';
export const MyEventsActionTypes = {
    GET_MYEVENT : '[EventItem] Get MyEvent item'
}
// export const getEventByIdAction = (payload) => {
//     return {
//         type: MyEventsActionTypes.GET_MYEVENT,
//         payload
//     }
// }

//Method to get the Event Id's 
const getEventByIdAction = (payload) => {
    
    return{
        type: MyEventsActionTypes.GET_MYEVENT, 
        payload : payload
    }
}

//Method to get the Event Details by Id.
export const getEventById = (url) => {

    return async(dispatch) => {
        try{
            const response = await HTTP.get(url)
            dispatch(getEventByIdAction(response.data));
        }catch(error){
            console.log('error in handle user forgot password Action :'+error)
        }
    }
    // return dispatch => {
    //     return fetch(url, {method: 'GET'}).then(res => {
    //         return res.json();
    //     }).catch(err => {
    //         console.log('API failed')
    //     })
        // try{
        //     const response = await HTTP.get(url)
        //     dispatch(getEventByIdAction(response.data))
        // }catch(error){
        //     console.log('error in getEventById Action :'+error)
        // }
    }


export default getEventById
