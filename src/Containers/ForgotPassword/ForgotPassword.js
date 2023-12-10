import React from 'react'
import './ForgotPassword.scss';
import { MenuItem,FormControl,InputLabel } from "@mui/material";
import Select from '@mui/material/Select';
import securityQuestions from './../SignUp/SecurityQuestions.js';
import { handleUserVerification, updateUserDetails } from './../../Store/Actions/LoginAction';
import {connect} from 'react-redux';
import { Navigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


//Maps Store to props.
const mapStateToProps = (state) => ({
    isCorrectDetails : state.Login.isUserCorrectDetails,
    forgotPasswordUserDetails: state.Login.forgotPasswordUserDetails,
    isUserPasswordUpdated: state.Login.isUserUpdated
})

//Maps Dispatch to props.
const mapDispatchToProps = (dispatch) => {
    return {
        handleUserVerification : (user) => dispatch(handleUserVerification(user)),
        handleUserForgotPassWord: (user) => dispatch(updateUserDetails(user, "ForgotPassword"))
    }
}

class ForgotPasswordComponent extends React.Component{

    constructor(props){
        super(props); 
        this.state = {
            username : '',
            securityQuestion : '',
            answer : '',
            password : '',
            password2 : ''
        }
    }
    //Notify the user upon updating the passowrd.
    notify() {
        toast.success('Password Updation Successful', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    /**
     * 
     * @param {*} e 
     * method to handle inputs given by the user
     */
    handleChange(e){
        if (e !== null && e.target.name !== null && e.target.value !== null) {
            this.setState({
                [e.target.name] : e.target.value
            })
        }
    }

    /**
     * 
     * @returns boolean value
     * mathod to check if the username entered is valid 
     */
    validateUsername(){
        if(this.state.username.trim().length === 0){
            this.setState({
                usernameError : "User Name is required!"
            })
            return false
        }else{
            this.setState({
                usernameError : ""
            })
            return true;
        }
    }

    /**
     * 
     * @returns boolean value
     * method to check if the password entered is valid 
     */
    validatePassword(){
        if(this.state.password.trim().length === 0){
            this.setState({
                passwordError : "Password is required!"
            })
            return false;
        }else if(this.state.password.length < 6){
            this.setState({
                passwordError : "Password needs to be 6 characters or more!"
            })
            return false;
        }else{
            this.setState({
                passwordError : ""
            })
            return true;
        }
    }

    /**
     * 
     * @returns boolean value
     * method to check if the confirm password is valid 
     */
    validatePassword2(){
        if(this.state.password.trim().length === 0){
            this.setState({
                password2Error : "Confirm Password required!"
            })
                return false
        }else if(this.state.password !== this.state.password2){
            this.setState({
                password2Error : "Password mismatch!"
            })
                return false;
        }else{
            this.setState({
                password2Error: ""
            })
            return true;
        }
    }

    validateSecurityQuestion(){
        if(this.state.securityQuestion.trim().length === 0){
            this.setState({
                securityQuestionError : "Security question is required!"
            })
                return false;
        }else{
            this.setState({
                securityQuestionError: ""
            })
            return true;
        }
    }

    /**
     * 
     * @returns boolean value
     * method to check if the entered answer is valid 
     */
    validateAnswer(){
        if(this.state.answer.trim().length === 0){
            this.setState({
                answerError : "Answer is required!"
            })
                return false
        }else{
            this.setState({
                answerError: ""
            })
            return true;
        }
    }

    /**
     * 
     * @param {*} e 
     * method to handle form submission
     */

    handleVerifyUser(e){
        e.preventDefault();
        let validUsername = this.validateUsername();
        let validSecurityQuestion = this.validateSecurityQuestion();
        let validAnswer = this.validateAnswer();
        if(validUsername && validSecurityQuestion && validAnswer){
            this.props.handleUserVerification({
                username: this.state.username, 
                securityQuestion : this.state.securityQuestion,
                securityAnswer : this.state.answer,
            });
        }
    }

    handleSubmit(e){
        
        e.preventDefault();
        let validUsername = this.validateUsername();
        let validSecurityQuestion = this.validateSecurityQuestion();
        let validAnswer = this.validateAnswer();
        let validPassword = this.validatePassword();
        let validPassword2 = this.validatePassword2();

        if(validUsername && validSecurityQuestion && validAnswer && validPassword && validPassword2){
            
            this.props.handleUserForgotPassWord({
                uuid: this.state.username,            
                password : this.state.password, 
            });
        }
}

render(){
    //Verifies the user details and provides the message accordingly.
    let userDetailsError = '';
    let isCorrectDetails = false;
    if (this.props.isCorrectDetails) {
        isCorrectDetails = this.props.isCorrectDetails;
    } else if (this.props.forgotPasswordUserDetails === 'Incorrect user details') {
        userDetailsError = "Sorry,you have entered the wrong details."
    }
    if (this.props.isUserPasswordUpdated) {
        { this.notify() }
        //Navigates to login Page upon successful login
        return <Navigate replace to="/login"></Navigate>
    }

//HTML Representation of Forgot Password and provides the question accordingly.
  return (
    <div className="forgotPassword-outer-container">
        <div className='left-container'>
            <div className="left-inner">
                <div className='logo-container'>
                </div>
            </div>
        </div>
        <div className="right-container">
            <div className='forgot-password-right-inner'>
            <form onSubmit={this.handleSubmit.bind(this)}>
                <h2><center>Forgot Password ?</center></h2>
                <div className="username-container">
                    {/* <label><strong>Username</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label> */}
                    <input type="text" name="username" className="form-input" placeholder="Enter your username" onChange={this.handleChange.bind(this)}/>
                    {this.state.usernameError && <p>{this.state.usernameError}</p>}
                </div>
                <div className = "fp-questionAnswerContainer">
                    <div className="forgot-password-questionContainer">
                            <FormControl sx={{ m: 1, minWidth: 570, minHeight: 25 }}>
                                <InputLabel id="demo-simple-select-helper-label">Choose a security question</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Choose a security question"
                                            name="securityQuestion"
                                            onChange={this.handleChange.bind(this)}>
                                            {securityQuestions.map(function(question, index){
                                                return <MenuItem key = {index} value={question}>{question}</MenuItem>
                                            })}
                                        </Select>
                                    </FormControl>
                                    {this.state.securityQuestionError && <p>{this.state.securityQuestionError}</p>}
                        </div>
                        <div className = "answerContainer">
                                    <input type="text" name="answer" className="form-input" placeholder="Please choose the answer to your question"  onChange={this.handleChange.bind(this)}/>
                                    {this.state.answerError && <p>{this.state.answerError}</p>}
                        </div> 
                </div>

                        {isCorrectDetails? 
                            <div>
                                <div className="fp-password-container">
                                    {/* <label><strong>New Password</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label> */}
                                    <input type="password" name="password" className="form-input" placeholder="New password" onChange={this.handleChange.bind(this)}/>
                                    {this.state.passwordError && <p>{this.state.passwordError}</p>}
                                </div>
                                <div className="fp-password-container2">
                                    {/* <label><strong>Confirm Password</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label> */}
                                    <input type="password" name="password2" className="form-input" placeholder="Confirm password"  onChange={this.handleChange.bind(this)}/>
                                    {this.state.password2Error && <p>{this.state.password2Error}</p>}
                                </div>
                                <div className="fp-button-container">
                                    <button type="submit">Update password</button>
                                </div>
                            </div> 
                            :<div>
                              <div className="fp-button-container">
                                <button onClick={this.handleVerifyUser.bind(this)}>Next</button>
                              </div>
                              {userDetailsError && <p>{userDetailsError}</p>}
                            </div>
                        }
                </form>
            </div>
        </div>
    </div>
  )
}
}


const ForgotPassword = connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordComponent);
export default ForgotPassword;