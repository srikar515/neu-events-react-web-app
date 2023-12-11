
import { Link, Outlet, useNavigate } from "react-router-dom";
import './SideNav.scss'
import AppLogo from "../../Assets/Images/NU\ Logo.png"
import { Button, IconButton, Typography } from "@mui/material";
import { logout } from "../../Store/Actions/LoginAction";
import { connect } from "react-redux";
import Notifications from "@mui/icons-material/Notifications";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useState } from "react";

import { FaUserEdit, FaRegCalendarCheck, FaBloggerB} from "react-icons/fa"
import { MdExplore } from "react-icons/md"
import { BsFillStarFill } from "react-icons/bs"
import { SiBloglovin } from "react-icons/si"

const SideNav = (props) => {
  const navigate = useNavigate();
  const [openNotif, setOpenNotif] = useState(false);

  const signoutClick =async()=>{
    let res = await props.logout();
    if(res){
      navigate("/home");
    }
  }

  //HTML Representation of Side Bar Navigation.
  return (
    <div className="main-layout-container"> 
      <div className="layout-container">
          <div className="side-wrapper">
            <div className="side-wrapper-child">
              <div className="logo-image-container">
                <img src="images/NULogo.png"></img>
              </div>
                <nav className="side-nav">
                   {/*Side Navigation Bar is displayed */}
                    <Typography paddingRight={2} color='secondary.light'><FaUserEdit className="myprofile-icon" size="3.0vmin"/><Link to="/profile">Profile</Link></Typography>
                    <Typography paddingRight={2} color='secondary.light'><MdExplore className="explore-icon" size="3.0vmin"/><Link to="/">Explore</Link></Typography>
                    <Typography paddingRight={2} color='secondary.light'><BsFillStarFill className="myevents-icon" size="3.0vmin"/><Link to="/myevents">My Events</Link></Typography>
                    {/* <Typography paddingRight={2} color='secondary.light'><RiBookmark3Fill className="myevents-icon" size="3.0vmin"/><Link to="/interestedevents">Interested Events</Link></Typography> */}
                    <Typography paddingRight={2} color='secondary.light'><FaRegCalendarCheck className="calendar-icon" size="3.0vmin"/><Link to="/calendar">Calendar</Link></Typography>
                    <Typography paddingRight={2} color='secondary.light'><SiBloglovin className="blogs-icon" size="3.0vmin"/><Link to="/blogs">Blogs</Link></Typography>
                    
                    <IconButton size={"large"} 
                    // children ={<Notifications className="notifications-btn"/>} 
                    // onClick={onClickOfNotififcation}
                    />
                    {/* <Typography paddingRight={2} color='secondary.light'><Button  
                    // onClick={signoutClick}
                    variant="outlined" size="small" className="signout-btn">Sign Out</Button></Typography> */}
                </nav>
              </div>
            </div>
          {/* <NotificationDialog open={openNotif} handleClose={handleNotificationClose} content={<EventNotificationContent/>}/> */}
          <div className="header-content-wrapper">
            <div className="header-wrapper">
              <div className="header-wrapper-child">
                <h1>NU Events</h1>
                <div className="header-buttons">
                <button className="bookmark"><Link to="/interestedevents"><BookmarkIcon/></Link></button>
                  <button className="logout"
                    onClick={signoutClick} 
                  >Logout</button>
                </div>
              </div>
            </div>
            
            <Outlet/>
          </div>
      </div>
    </div> 
  )
  
}

const mapDispatchToProps = (dispatch) => {
  return {
      logout : () => dispatch(logout()),
  }
}

export default connect(null, mapDispatchToProps)(SideNav);
