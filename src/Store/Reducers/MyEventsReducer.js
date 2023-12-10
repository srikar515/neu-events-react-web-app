import AppState from '../State';
import {MyEventsActionTypes} from '../Actions/MyEventsAction'

//Returns the Myevent ArrayList as an initial state.
const getInitialState = () => {
    return {
        myEventlist: []
    };
  }


const MyEventsReducer = (state=getInitialState(), action) => {
    const type = action.type
    let temp=[];
    let newMyEventList = []
    switch(type){
        //Reducer to get myevents under Myevents Page.
        case MyEventsActionTypes.GET_MYEVENT:
            temp = [...state.myEventlist]
            let eventItem = action.payload;
            temp.push(eventItem);
            break;
        default:
            newMyEventList = [...state.myEventlist];
            break;
    }
    //Moves the arraylits from temp to newMyEventList
    temp.forEach(function (item) {
        newMyEventList.push(item);
      });
    return Object.assign({}, state, { myEventlist : newMyEventList });
}

export default MyEventsReducer