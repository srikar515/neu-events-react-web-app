import { HTTP } from './../../HTTP';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const LoginActionTypes = {
    LOGIN_USER : "[User] logged in user",
    SIGNUP_USER : "[User] signup a user",
    FORGOTPASSWORD_USER : "[User] forgot password",
    VERIFY_USER : "[User] verify user with uuid, security question and answer",
    UPDATE_USER : "[User] update user details"
};

//Notify is to display a message after any action is performed by the user.
const notify = () => {
    //Message for Profile Updation.
    toast.success('Profile Updated Successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}
const notifyRegistration = (message) => {
    //Message for Succesfull registration of a event
    toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

const notifyForgotPassword = () => {
    toast.success("Password updated succesfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

//Action Method for SignUp of User
const SignUpAction = (payload) => {
    return{
        type: LoginActionTypes.SIGNUP_USER, 
        payload : payload
    }
}

//Action Method to verify if the user entered details are correct or not.
const verifyUserAction = (payload) => {
    return{
        type: LoginActionTypes.VERIFY_USER, 
        payload : payload
    }
}

//Action Method to verify is user is present or not.
const loginAction = (payload) => {
    return {
        type: LoginActionTypes.LOGIN_USER,
        payload: payload
    }
}

//Updates the User Details and Notifies the user.
const updateUserDetailsAction = (payload, callingComponent) => {
    if(callingComponent === 'UserProfile'){
        notify();
    }
    else if(callingComponent === 'App') {
        notifyRegistration(payload.message);
        //window.location.reload(false);
    }
    else if(callingComponent === 'MyEventsComponent') {
        notifyRegistration(payload.message);
        window.location.reload(false);
    }
    else if(callingComponent === 'InterestedEventsComponent') {
        notifyRegistration(payload.message);
        window.location.reload(false);
    }
    return {
        type: LoginActionTypes.UPDATE_USER,
        payload: payload
    }
}

//Method for Signup of a New User.
export const signUpUser = (payload) => {
    return async(dispatch) => {
        try{
            const url = 'http://localhost:9002/users';
            const response = await HTTP.post(url,payload)
            if (response.status === 200) {
                sessionStorage.setItem("user", JSON.stringify(response.data.user));
            }
            dispatch(SignUpAction(response.data));
        }catch(error){
            console.log('error in signUpUser Action :'+error)
        } 
    }
}

//Handles the User Verification by checking the username, password and the security questions.
export const handleUserVerification = (payload) => {
    return async(dispatch) => {
        let username = payload.username;
        const body = {username: username, password : payload.password}
        try{
            const url = 'http://localhost:9002/users/verify-security/'+username+'?securityQuestion='+payload.securityQuestion+'&&securityAnswer='+payload.securityAnswer;
            const response = await HTTP.get(url,body)
            dispatch(verifyUserAction(response.data));
        }catch(error){
            console.log('error in handle user forgot password Action :'+error)
        }
    }
}

//Method for Login of a User.
export const loginUser = (payload) => {
    return async (dispatch) => {
        let username = payload.username;
        try {
            const url = 'http://localhost:9002/users/login/' + username;
            const response = await HTTP.post(url, payload)
            //If the user logins successfully then a success response is returned.
            if (response.status === 200) {
                sessionStorage.setItem("isUserAuthenticated", response.data.authenticated )
                sessionStorage.setItem("user", JSON.stringify(response.data.user));
            }
            dispatch(loginAction(response.data));
        }
        catch (error) {
            console.log("error in loginUser action :" + error);
        }
    }
}

//Method for Updating the user details using HTTP Put method and return Status 200 upon Success.
export const updateUserDetails = (payload, callingComponent) => {
    return async (dispatch) => {
        let username = payload.uuid;
        try {
            const url = 'http://localhost:9002/users/' + username;
            const response = await HTTP.put(url, payload)
            if(response.status===200){
                sessionStorage.setItem("user",JSON.stringify(response.data.user));
            }
          dispatch(updateUserDetailsAction(response.data, callingComponent));
        }
        catch (error) {
            console.log("error in updateUserDetails action :" + error);
        }
    }
}

//Method for Updating the Event details using HTTP Put method and return Status 200 upon Success.
export const updateUserEventDetails = (uuid, payload, callingComponent) => {
    return async (dispatch) => {
        try {
            const url = 'http://localhost:9002/users/save-event/' + uuid;
            const response = await HTTP.put(url, payload)
            if(response.status===200){
                sessionStorage.setItem("user",JSON.stringify(response.data.user));
            }
          dispatch(updateUserDetailsAction(response.data, callingComponent));
        }
        catch (error) {
            console.log("error in updateUserDetails action :" + error);
        }
    }
}

//Method for Updating the Interested Event details using HTTP Put method and return Status 200 upon Success.
export const updateUserInterestedEventDetails = (uuid, payload, callingComponent) => {
    return async (dispatch) => {
        try {
            const url = 'http://localhost:9002/users/interested-event/' + uuid;
            const response = await HTTP.put(url, payload)
            if(response.status===200){
                sessionStorage.setItem("user",JSON.stringify(response.data.user));
            }
          dispatch(updateUserDetailsAction(response.data, callingComponent));
        }
        catch (error) {
            console.log("error in updateUserDetails action :" + error);
        }
    }
}

//Method for Updating the Unregistered Event details using HTTP Put method and return Status 200 upon Success.
export const updateUserEventUnregisterDetails = (uuid, payload, callingComponent) => {
    return async (dispatch) => {
        try {
            const url = 'http://localhost:9002/users/unregister-event/' + uuid;
            const response = await HTTP.put(url, payload)
            if(response.status===200){
                sessionStorage.setItem("user",JSON.stringify(response.data.user));
            }
          dispatch(updateUserDetailsAction(response.data, callingComponent));
        }
        catch (error) {
            console.log("error in updateUserDetails action :" + error);
        }
    }
}

//Method for Updating the Unbookmarked Event details using HTTP Put method and return Status 200 upon Success.
export const updateUserEventUnbookmarkDetails = (uuid, payload, callingComponent) => {
    return async (dispatch) => {
        try {
            const url = 'http://localhost:9002/users/unbookmark-event/' + uuid;
            const response = await HTTP.put(url, payload)
            if(response.status===200){
                sessionStorage.setItem("user",JSON.stringify(response.data.user));
            }
          dispatch(updateUserDetailsAction(response.data, callingComponent));
        }
        catch (error) {
            console.log("error in updateUserDetails action :" + error);
        }
    }
}

//Method for Logout of an User.
export const logout = () => {
    return async (dispatch, getState) => {
        try {
            sessionStorage.removeItem("user");
            dispatch(loginAction({authenticated: false, user: null}));
            return true;
        }
        catch (error) {
            console.log("error in loginUser action :" + error);
            return false;
        }
    }
}

//Retains the Same information upon refresh of a page.
export const setUserToStoreOnRefresh = (reduxUser) => {
    return async (dispatch, getState) => {
        try {
            if(sessionStorage.getItem("user")&&reduxUser===null){
                const user = JSON.parse(sessionStorage.getItem("user"));
                dispatch(loginAction({authenticated: true, user: user}))
              }
        }
        catch (error) {
            console.log("error in loginUser action :" + error);
            return false;
        }
    }
}