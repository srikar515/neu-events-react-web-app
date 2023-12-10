import AppState from '../State';
import {MyEventsActionTypes} from '../Actions/InterestedEventsAction'

const getInitialState = () => {
    return {
        interestedEventlist: []
    };
  }

const MyInterestedEventsReducer = (state=getInitialState(), action) => {
    const type = action.type
    let temp=[];
    let newMyInterestedEventList = []
    switch(type){
        //Case to get the list of all Interested events
        case MyEventsActionTypes.GET_INTERESTEDEVENT:
            temp = [...state.interestedEventlist]
            let eventItem = action.payload;
            temp.push(eventItem);
            break;
        default:
            newMyInterestedEventList = [...state.interestedEventlist];
            break;
    }
    //Stores the Interested events into an array.
    temp.forEach(function (item) {
        newMyInterestedEventList.push(item);
      });
    return Object.assign({}, state, { interestedEventlist : newMyInterestedEventList });
}

export default MyInterestedEventsReducer