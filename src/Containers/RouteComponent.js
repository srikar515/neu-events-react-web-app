import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from './Login/Login.js';
import SignUp from './SignUp/SignUp.js';
import ForgotPassword from './ForgotPassword/ForgotPassword.js';
import SideNav from '../components/SideNav/SideNav.js';
import ExploreEvents from './ExploreEvents/ExploreEvents.js';
import Blogs from './Blogs/Blogs.js'
import {ProtectedRoute} from './ProtectedRoute.js';
import UserProfile from './UserProfile/UserProfile.js';
import MyEvents from "./MyEvents/MyEvents.js";
import InterestedEvents from './MyEvents/InterestedEvents.js';
import Calendar from "./Calendar/Calendar.js";
import EventInfo from "./ExploreEvents/EventInfo/EventInfo.js";
import AdminPage from './AdminPage/AdminPage.js'
import HomeScreen from "./HomeScreen.js";
import EditEventPage from "./OrganizerPage/EditEventPage";
import OrganizerPage from './OrganizerPage/OrganizerPage';
const RoutesComponent = (props) => {
  // let loggedInUserDetails = JSON.parse(sessionStorage.getItem("user"));
  // let eventslist = loggedInUserDetails["eventsRegistered"]
  // let events = []
  // eventslist.forEach(event => {
  //   let input = {
  //     title: event.eventName,
  //     start: event.eventDate + "T" + event.eventTime
  //   }
  //   events.push(input)
  // });
  //Several Routes for navigating to different pages.
    return (
      <Router>
        <Routes>
          <Route element = {<SideNav/>}>
            <Route path="/profile" element = {<ProtectedRoute/>}>
              <Route path="/profile" element = {<UserProfile/> }/>
            </Route> 
            <Route path="/" element = {<ProtectedRoute/>}>
              <Route path="/" element = {<ExploreEvents/> }/>
            </Route>
            <Route path="/myevents" element = {<ProtectedRoute/>}>
              <Route path="/myevents" element = {<MyEvents/> }/>
            </Route>
            <Route path="/interestedevents" element = {<ProtectedRoute/>}>
              <Route path="/interestedevents" element = {<InterestedEvents/> }/>
            </Route>
            <Route path="/blogs" element = {<ProtectedRoute/>}>
              <Route path="/blogs" element = {<Blogs/> }/>
            </Route>
            <Route path="/events/:id" element = {<ProtectedRoute/>}>
              <Route path="/events/:id" element = {<EventInfo/> }/>
            </Route>
            <Route path="/calendar" element = {<ProtectedRoute/>}>
              <Route path="/calendar" element = {<Calendar/>}/>
            </Route>  
        </Route>
        <Route path="/admin" element = {<ProtectedRoute/>}>
          <Route path="/admin" element = {<AdminPage/> }/>
        </Route>
            <Route path="/edit-event/:eventId" element={<ProtectedRoute/>}>
                <Route path="/edit-event/:eventId" element={<EditEventPage />} />
            </Route>

            <Route path="/organizer" element={<ProtectedRoute />}>
                <Route path="/organizer" element={<OrganizerPage />} />
            </Route>

        <Route path="/login" element = {<Login/>} />
        <Route path="/signup" element = {<SignUp/>} />
        <Route path="/forgot-password" element = {<ForgotPassword/>} />
        <Route path="/home" element = {<HomeScreen/>}/>
        </Routes>
    </Router>
    )
  }
  export default RoutesComponent;