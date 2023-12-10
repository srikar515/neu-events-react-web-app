import { LoginActionTypes } from "../Actions/LoginAction"
const getInitialState = () => {
  //Initial State of all the details upon Login
    return {
      isUserLoggedIn: false, 
      currentUserDetails : null,
      loginErrorMessage : null,
      isUserSignedUp: false,
      signedUpUserDetails : null,
      isUserCorrectDetails : false,
      forgotPasswordUserDetails : null,
      isUserPasswordUpdated : false,
      isUserUpdated : false,
    };
  }

  //Reducer function for signup,login,verify anf Update User functionality.
const LoginReducer = (state = getInitialState(), action) => {
    const type = action.type;
    switch(type){
      case LoginActionTypes.SIGNUP_USER :
        return { ...state, isUserSignedUp: action.payload.isSignedUp,currentUserDetails: action.payload.user ? action.payload.user : null, signedUpUserDetails: action.payload.message}
      case LoginActionTypes.VERIFY_USER :
        return { ...state, isUserCorrectDetails: action.payload.isUserCorrectDetails, forgotPasswordUserDetails: action.payload.message} 
      case LoginActionTypes.LOGIN_USER :
        return { ...state, isUserLoggedIn: action.payload.authenticated, currentUserDetails: action.payload.user ? action.payload.user : null, loginErrorMessage: !action.payload.authenticated ? action.payload.message : null}
      case LoginActionTypes.UPDATE_USER :
        return { ...state, isUserUpdated: action.payload.userUpdated, currentUserDetails: action.payload.user}
      default:
        return state;
    }
}
export default LoginReducer;