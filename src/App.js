import './App.scss';
import { connect } from 'react-redux';
import mainTheme from './Theme.js';
import {ThemeProvider} from '@mui/material/styles';
import RoutesComponent from './Containers/RouteComponent.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { setUserToStoreOnRefresh } from './Store/Actions/LoginAction';
//toast.configure();

//Mapping dispatch to Props
const mapDisptchToProps = (dispatch) => {
  return {
    setUserToStoreOnRefresh : (reduxUser) => dispatch(setUserToStoreOnRefresh(reduxUser)),
  }
} 

//Mapping Store to Props
const mapStateToProps = (state) => {
  return {
    currentUserDetails : state.Login.currentUserDetails,
  }
}
//Gets the Logged In User details and gets the status.
const App = (props) => {
  const [userSet, setUserSet] = useState(false);
  useEffect(() => {
    async function getUserStats(){
      await props.setUserToStoreOnRefresh(props.currentUserDetails);
      setUserSet(true);
    }
    getUserStats();
  }, [])

  //HTML Representation of the Application.
  return (
    <div className='App'>
      <ThemeProvider theme={mainTheme}>
        <RoutesComponent/>
      </ThemeProvider>
    </div>
  )
}
// export default App;
export default connect(mapStateToProps, mapDisptchToProps)(App);