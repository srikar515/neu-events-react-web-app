import { configureStore } from '@reduxjs/toolkit';
import LoginReducer from './Reducers/LoginReducer';
import EventsReducer from './Reducers/EventsReducer';
import BlogsReducer from './Reducers/BlogsReducer';
import MyEventsReducer from './Reducers/MyEventsReducer';
import MyInterestedEventsReducer from './Reducers/InterestedEventsReducer'
   
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


const store = configureStore({
    reducer: {
      Login: LoginReducer,
      eventlist : EventsReducer,
      blogs : BlogsReducer,
      myEventlist : MyEventsReducer,
      interestedEventlist : MyInterestedEventsReducer
    }
  },applyMiddleware(thunk))
  
  export default store;