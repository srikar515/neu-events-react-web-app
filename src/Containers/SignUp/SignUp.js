import React from 'react';
import { RadioGroup, Radio,FormControlLabel,MenuItem,FormControl,InputLabel, TextField } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Select from '@mui/material/Select';
import securityQuestions from './SecurityQuestions';
import {signUpUser} from '../../Store/Actions/LoginAction';
import {connect} from 'react-redux';
import './SignUp.scss';
import { Navigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const mapStateToProps = (state) => ({
    isUserSignedUp: state.Login.isUserSignedUp,
    signedUpUserDetails: state.Login.signedUpUserDetails
})
const mapDispatchToProps = (dispatch) => {
    return {
        signUpUser : (user) => dispatch(signUpUser(user))
    }
}
class SignUpComponent extends React.Component{
    constructor(props){
        super(props); 
        this.state = {
            uuid : '',
            email : '',
            firstName : '',
            lastName : '',
            dateOfBirth : '',
            gender : '',
            password : '',
            securityQuestion : '',
            securityAnswer : ''
        }
    }
    notify() {
         //Notifies the user upon successful Signup
        toast.success('SignUp Successful', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        }); 
    }
    handleChange(e){
        if(e !== null && e.target.name !== null && e.target.value !== null){
                this.setState({
                    [e.target.name]: e.target.value
                })
        }
    }
     //Validates the Username
    validateUsername(){
        if(this.state.uuid.trim().length === 0){
            this.setState({
                usernameError : "User Name is required"
            })
            return false;
        }else{
            this.setState({
                usernameError : ""
            })
            return true;
        }
    }
    //Validates Email.
    validateEmail(){
        if(this.state.email.trim().length === 0){
            this.setState({
                emailError : "Email is required"
            })
                return false;
        }
        else if (!/\S+@\S+\.\S+/.test(this.state.email)) {
            this.setState({
                emailError : 'Email address is invalid'
            })
                return false;
         }else{
            this.setState({
                emailError : ""
            })
                return true;
        }
    }
    //Validates Firstname.
    validateFirstname(){
        if(this.state.firstName.trim().length === 0){
            this.setState({
                firstnameError : "First Name is required"
            })
                return false;    
        }else{
            this.setState({
                firstnameError : ""
            })
                return true;
        }
    }
    //Validates Last name.
    validateLastname(){
        if(this.state.lastName.trim().length === 0){
            this.setState({
                lastnameError : "Last Name is required"
            })
                return false;
        }else{
            this.setState({
                lastnameError : ""
            })
                return true;
        }
    }
    //Validates DOB.
    validateDob(){
        if(!this.state.dateOfBirth){
            this.setState({
                dobError : "Date Of Birth is required"
            })
            return false;
        }else{
            this.setState({
                dobError : ""
            })
            return true;
        }
    }
    //Validates Gender.
    validateGender(){
        if(this.state.gender.trim().length === 0){
            this.setState({
                genderError : "Gender is required"
            })
                return false;
        }else{
            this.setState({
                genderError : ""
            })
                return true;
        }
    }
    //Validates Password.
    validatePassword(){
        if(this.state.password.trim().length === 0){
            this.setState({
                passwordError : "Password is required"
            })
            return false;
        }else if(this.state.password.length < 6){
            this.setState({
                passwordError : "Password needs to be 6 characters or more"
            })
                return false;
        }else{
            this.setState({
                passwordError : ""
            })
                return true;
        }
    }
    //Validates Security Question.
    validateSecurityQuestion(){
        if(this.state.securityQuestion.trim().length === 0){
            this.setState({
                securityQuestionError : "Security question is required"
            })
            return false;
        }else{
            this.setState({
                securityQuestionError : ""
            })
            return true;
        }
    }
    //Validates Security Answers.
    validateAnswer(){
        if(this.state.securityAnswer.trim().length === 0){
            this.setState({
                answerError : "Security answer is required"
            })
            return false;
        }else{
            this.setState({
                answerError : ""
            })
            return true;
        }
    }
    async handleSubmit(e){
        e.preventDefault();
        let validUsername = this.validateUsername();
        let validEmail = this.validateEmail();
        let validFirstname = this.validateFirstname();
        let validLastname = this.validateLastname();
        let validDob = this.validateDob();
        let validGender = this.validateGender();
        let validPassword = this.validatePassword();
        let validSecurityQuestion = this.validateSecurityQuestion();
        let validAnswer = this.validateAnswer();
        if(validUsername && validEmail && validFirstname && validLastname && validDob &&
            validGender && validPassword && validSecurityQuestion && validAnswer){
                this.props.signUpUser({
                    uuid : this.state.uuid,
                    email : this.state.email,
                    firstName : this.state.firstName,
                    lastName : this.state.lastName,
                    dateOfBirth : this.state.dateOfBirth,
                    gender : this.state.gender,
                    password : this.state.password,
                    securityQuestion : this.state.securityQuestion,
                    securityAnswer : this.state.securityAnswer
                });
            }
    }
    render(){
        //Navigates to Login Page upon Signup
        let signUpError = '';
        if (this.props.isUserSignedUp) {
            {this.notify()}
            return (<Navigate replace to="/">
                </Navigate>)
        } else if (this.props.signedUpUserDetails === 'username already exists') {
            signUpError = "Sorry,couldn't signUp, username already existing"
        }
        //VHTML Represntation of Sign up Page.
        return(
            <div className="signUp-outer-container">
                    <div className='left-container'>
                        <div className="left-inner">
                            <div className='logo-container'>
                            </div>
                        </div>
                    </div>
                    <div className="right-container">
                        <div className='right-inner'>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <h1>SignUp</h1>
                            <div className = "userName_email_Container">
                                <div className = "userName_Container">
                                    <input type="text" name="uuid" className="form-input" placeholder="Username"  onChange={this.handleChange.bind(this)}/>
                                    {this.state.usernameError && <p>{this.state.usernameError}</p>}
                                </div>
                                <div className = "email_Container">
                                    <input type="email" name="email" className="form-input" placeholder="Email" onChange={this.handleChange.bind(this)}/>
                                    {this.state.emailError && <p>{this.state.emailError}</p>}
                                </div>
                            </div>
                            <div className = "frst_lst_names_container">
                                <div className = "frst_name_container">
                                    <input type="text" name="firstName" className="form-input" placeholder="First Name" onChange={this.handleChange.bind(this)}/>
                                    {this.state.firstnameError && <p>{this.state.firstnameError}</p>}
                                </div>
                                <div className = "lst_name_container">
                                    <input type="text" name="lastName" className="form-input" placeholder="Last Name" onChange={this.handleChange.bind(this)}/>
                                    {this.state.lastnameError && <p>{this.state.lastnameError}</p>}
                                </div>
                            </div>
                            <div className="dob_gender_container">
                                <div className="dob_container">
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            name='dob'
                                            value = {this.state.dateOfBirth}
                                            onChange={(newValue)=>{
                                               this.setState({
                                                   dateOfBirth : newValue
                                               })
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                    {this.state.dobError && <p>{this.state.dobError}</p>}
                                </div>
                                <div className="radioButtonsContainer">
                                    <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                                        <FormControlLabel value="Female" control={<Radio name="gender"  onChange={this.handleChange.bind(this)} size="small"/>} label="Female" />
                                        <FormControlLabel value="Male" control={<Radio name="gender"  onChange={this.handleChange.bind(this)} size="small"/>} label="Male" />
                                    </RadioGroup>
                                    {this.state.genderError && <p>{this.state.genderError}</p>}
                                </div>
                            </div>
                            <div className = "passwordContainer">
                                <div className="passcode">
                                    <input type="password" name="password" className="form-input" placeholder="Password" value={this.state.password} onChange={this.handleChange.bind(this)}/>
                                    {this.state.passwordError && <p>{this.state.passwordError}</p>}
                                </div>  
                            </div>
                            <div className = "questionAnswerContainer">
                                <div className="questionContainer">
                                    <label>In case you forget your password</label>
                                    <FormControl sx={{ m: 1, minWidth: 575, minHeight: 25 }}>
                                        <InputLabel id="demo-simple-select-helper-label">Choose a security question</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Choose a security question"
                                            name="securityQuestion"
                                            value={this.state.securityQuestion}
                                            onChange={this.handleChange.bind(this)}>
                                            {securityQuestions.map(function(question, index){
                                                return <MenuItem key = {index} value={question}>{question}</MenuItem>
                                            })}
                                        </Select>
                                    </FormControl>
                                    {this.state.securityQuestionError && <p>{this.state.securityQuestionError}</p>}
                                </div>
                                <div className = "answerContainer">
                                    <input type="text" name="securityAnswer" className="form-input" placeholder="Please choose the answer to your question" value={this.state.answer} onChange={this.handleChange.bind(this)}/>
                                    {this.state.answerError && <p>{this.state.answerError}</p>}
                                </div> 
                            </div>
                            <div className="SignUp-Container">
                                <div className="button-container">
                                    <button type="submit">Join the club</button>
                                    {signUpError && <p>{signUpError}</p>}
                                    <p>Already have an account? Login &nbsp;<a href="http://localhost:3000/login">here</a></p>
                                </div>
                            </div> 
                        </form>
                        </div>
                    </div>
                </div>
        )
    }
    }
const SignUp = connect(mapStateToProps, mapDispatchToProps)(SignUpComponent);
export default SignUp;