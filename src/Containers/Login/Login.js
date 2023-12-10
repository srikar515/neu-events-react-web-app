import React  from "react";
import './Login.scss';
import {loginUser} from '../../Store/Actions/LoginAction';
import {connect} from 'react-redux';
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const mapStateToProps = (state) => ({
        isUserLoggedIn : state.Login.isUserLoggedIn,
        currentUserDetails : state.Login.currentUserDetails,
        loginError: state.Login.loginErrorMessage
})
const mapDispatchToProps = (dispatch) => {
        return {
                userLogin : (user) => dispatch(loginUser(user))
        }
}
class LoginComponent extends React.Component{
                constructor(props){
                        super(props);
                        this.state = {
                                username : '',
                                password : '',
                                usernameError : '',
                                passwordError : ''
                        }
                }
                //Notifies the user upon successful login
            notify(){
                toast.success('Login Successful', {
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
                    if (e !== null && e.target.name !== null && e.target.value !== null) {
                                this.setState({
                                        [e.target.name] : e.target.value
                                })
                    }
                }
                //Validates the Username
                validateUsername(){
                        if(this.state.username.trim().length === 0){
                                this.setState({
                                        usernameError : 'username is required'
                                })
                                return false;
                        }else{
                                return true;
                        }
                }
                //Validates Password.
                validatePassword(){
                        if(this.state.password.trim().length === 0){
                                this.setState({
                                        passwordError : 'password is required'
                                })
                                return false;
                        }else{
                                return true;
                        }
                }
        //Verifies the username and password combination
             handleSubmit(e){
                        e.preventDefault();
                        let validUserName =   this.validateUsername();
                        let validPassword = this.validatePassword();
                        if(validUserName && validPassword){
                                 this.props.userLogin({username: this.state.username, password : this.state.password}); 
                        }  
                }
                //Upon Successful login Navigate to User/Admin Page Accordingly
            render(){
                        let loginError = '';
                        if(this.props.isUserLoggedIn && this.props.currentUserDetails.roles[0] ==="admin"){
                                //Notifies the user
                            {this.notify()}
                            return(
                                //navigate to admin url
                            <Navigate replace to="/admin">
                            </Navigate>
                            )
                        }
                        else if(this.props.isUserLoggedIn && this.props.currentUserDetails.roles[0] === "user"){
                                {this.notify()}
                                return(
                                        //Navigates to user url
                                <Navigate replace to="/">
                                </Navigate>
                                ) 
                        }
                        //If the username is not found then no user found else password is incorrect
                        else if (this.props.loginError === 'No user found'){
                                        loginError  = "Sorry,there is no user with this username and password"
                        } else if (this.props.loginError === 'Incorrect Password!'){
                                        loginError = "Sorry, password is incorrect!"
                        }
                        //HTML Representation of the Login Page
                        return(
                                <div className="login-outer-container">
                                        <div className='left-container'>
                                                <ToastContainer></ToastContainer>
                                            {/* <ToastContainer></ToastContainer> */}
                                                <div className="left-inner">
                                                        <div className='logo-container'>
                                                        </div>
                                                </div>
                                        </div>
                                        <div className="right-container">
                                                <div className='right-inner'>
                                                        <form onSubmit={this.handleSubmit.bind(this)}>
                                                                <h1>Login</h1>
                                                                <p>Don't have an account yet?&nbsp;<a href="http://localhost:3000/SignUp">Sign Up!</a></p>
                                                                <br/>
                                                                <div className="username-container">
                                                                        {/* <label><strong>Username</strong></label> */}
                                                                        <input type="text" name="username" className="form-input" placeholder="Username" onChange={this.handleChange.bind(this)}/>
                                                                        {this.state.usernameError && <p>{this.state.usernameError}</p>}
                                                                </div>
                                                                <div className="password-container">
                                                                        {/* <label><strong>Password</strong></label> */}
                                                                        <input type="password" name="password" className="form-input" placeholder="Password" onChange={this.handleChange.bind(this)}/>
                                                                        {this.state.passwordError && <p>{this.state.passwordError}</p>}
                                                                </div>
                                                                <div className="login-button-container">
                                                                        <p><a href="http://localhost:3000/forgot-password">Forgot Password?</a></p>
                                                                        <button type="submit">Login</button>
                                                                        {loginError && <p>{loginError}</p>}
                                                                </div>
                                                        </form>
                                                </div>
                                        </div>
                                </div>                          
                        )
                }
}
const Login = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
export default Login;