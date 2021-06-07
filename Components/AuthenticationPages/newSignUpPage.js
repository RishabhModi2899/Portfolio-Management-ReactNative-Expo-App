import React, { Component } from 'react'
import { TouchableOpacity } from "react-native"

import { TextField, Snackbar, IconButton } from "@material-ui/core";

import AppButton from '../CustomComponents/CustomButton';
import LoadingScreen from '../loadingScreen/loadingScreen';

import firebase from "firebase";

class NewSignUpPage extends Component {
    constructor(props) {
        
        super(props);

        this.state = { 
            isLoading: false,
            redirect: false,

            firstName: "", 
            lastName: "", 
            email: "", 
            password: "", 
            confirmPassword: "",
            
            snackbarOpen: false,
            SnackbarMessage: "" ,

            fnEmptyChk: false,
            lnEmptyChk: false,
            emailEmptyChk: false,
            passwordEmptyChk: false,
            confirmPasswordEmptyChk: false
        };

        this.onSignUp = this.onSignUp.bind(this);
    }

    // Input Handler functions
    handleFirstName = (e) => {
        this.setState({
            firstName: e.target.value
        })
    }

    handleLastName = (e) => {
        this.setState({
            lastName: e.target.value
        })
    }

    handleEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    handlePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    handleConfirmPassword = (e) => {
        this.setState({
            confirmPassword: e.target.value
        })        
    }

    // To check for empty fields in the form
    fnCheck = () => {
        
        if( this.state.firstName.length === null){
            
            this.setState({ fnEmptyChk : true })
        
        }

    }

    lnCheck = () => {

        if( this.state.lastName.length === null ){
        
            this.setState({ lnEmptyChk : true })

        }

    }

    emailCheck = () => {

        if( this.state.email.length === null ){
            
            this.setState({ emailEmptyChk : true })

        }

    }

    passwordCheck = () => {

        if( this.state.password.length === null){
            
            this.setState({ passwordEmptyChk : true })

        }
    
    }

    confirmPasswordCheck = () => {

        if( this.state.confirmPassword.length === null){
            
            this.setState({ confirmPasswordEmptyChk : true })
        
        }

    }

    // Function to handle On Create Account Button Press
    onSignUp() {

        // event.preventDefault();
        
        const { email , password , confirmPassword } = this.state;
        
        // this.fnCheck();

        // this.lnCheck();

        // this.emailCheck();

        // this.passwordCheck();

        // this.confirmPasswordCheck();

        if (confirmPassword !== password) 
        {

            this.setState({ 

                snackbarOpen : true, 
                
                SnackbarMessage : "The passwords entered are incorrect", 
                
                password : "", 
                
                confirmPassword : "" 
            
            })
            
        }
        else{
            try{

                this.setState({ isLoading: true })

                firebase.auth().createUserWithEmailAndPassword(email, password)
                
                    .then(() => {
                    
                        this.setState({ 
                            
                            snackbarOpen : true, 
                            
                            SnackbarMessage : "Success! Your account has been created", 
                            
                            isLoading : false,

                            firstName : "",

                            lastName : "",

                            email : "",

                            password : "",

                            confirmPassword : "",

                            redirect : "true"

                        })

                    })
                    .catch(error => {
                        
                        switch(error.code){

                            case 'auth/email-already-in-use':

                                this.setState({ 
                                    snackbarOpen : true, 
                                    
                                    SnackbarMessage : "Email is already in use", 
                                    
                                    email : "",

                                    password : "",

                                    confirmPassword : ""
                                })
                                
                                break;

                            case 'auth/invalid-email':

                                this.setState({ 
                                    snackbarOpen : true, 
                                    
                                    SnackbarMessage : "Email entered is invalid", 
                                    
                                    email : "",

                                    password : "",

                                    confirmPassword : ""
                                })
                                
                                break;

                            case 'auth/invalid-password':

                                this.setState({ 
                                    snackbarOpen : true, 
                                    
                                    SnackbarMessage : "Password entered should be atleast 6 characters", 

                                    password : "",

                                    confirmPassword : ""
                                })
                                
                                break;
                        }
                        this.setState({ isLoading : false })
                    })
            }
            catch(err){
                 
                this.setState({ isLoading : false, snackbarOpen : true , SnackbarMessage : err.message })

            }
        }
    } 

    // Function to close snackBar
    snackbarClose = () => {

        if( this.state.redirect ){
            
            var user = firebase.auth().currentUser

            user.sendEmailVerification()

            this.props.navigation.navigate("Log In")

        }

        this.setState({

            snackbarOpen : false
        
        })

    }

    render() {

        const MainContainer = {
            
            display: "flex",
            flex: 1,
            backgroundColor: "#2a2a2a",
            margin: "0%",
            padding: "0%",
            justifyContent: "space-between"

        }
        const SecContainer = {

            flex: 1,
            backgroundColor: "#F4B41A",
            marginLeft: "15%",
            marginRight: "15%",
            marginTop: "0%",
            marginBottom: "0%"

        }
        const headerContainer = {

            backgroundColor: "#143D59",
            border: '3px solid black'

        }
        const headerFontStyles = {

            textAlign: "center",
            padding: "1%",
            color: "white"

        }
        const formContainer = {

            margin: "2%"

        }
        const textFieldContainerStyles = {
            
            margin: "4%"
        
        }
        const buttonContainer = {

            marginTop: "5%",
            marginBottom: "0%",
            marginLeft: "30%",
            marginRight: "30%"

        }
        const linkContainer = {

            display: "flex",
            marginTop: "0.5%",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"

        }
        const linkTextStyles = {

            color: "blue"

        }

        const {isLoading} = this.state;

            return (
                <div style={MainContainer}>

                    { isLoading ? (<LoadingScreen />) : (  
                        
                        <div style={SecContainer}>   

                            <Snackbar 
                                anchorOrigin = {{ vertical:"top" , horizontal:"center" }}
                                open = { this.state.snackbarOpen }
                                onClose = { this.snackbarClose }
                                message = {this.state.SnackbarMessage}
                                action = {[

                                    <IconButton 
                                        key = "close" 
                                        color = "inherit" 
                                        arial-label = "Close" 
                                        onClick = { this.snackbarClose }>
                                        X
                                    </IconButton>
                                    
                                ]}
                            />

                            <div style={headerContainer}>

                                <h1 style={headerFontStyles}>
                                    
                                    Sign Up
                                
                                </h1>

                            </div>

                            <div style={formContainer}>

                                <form autoComplete="off">

                                    <div style={textFieldContainerStyles}>
                                        <TextField 
                                            error={this.state.fnEmptyChk}
                                            required
                                            fullWidth
                                            variant="filled"
                                            label="First Name"
                                            color="primary"
                                            placeholder = "Enter your First Name"
                                            value={this.state.firstName}
                                            onChange={this.handleFirstName}
                                        />  
                                    </div>

                                    <div style={textFieldContainerStyles}>
                                        <TextField
                                            error={this.state.lnEmptyChk}
                                            required 
                                            fullWidth
                                            variant="filled"
                                            label="Last Name"
                                            color= "primary"
                                            placeholder = "Enter your Last Name"
                                            value={this.state.lastName}
                                            onChange={this.handleLastName}
                                        />
                                    </div>

                                    <div style={textFieldContainerStyles}>
                                        <TextField
                                            error={this.state.emailEmptyChk}
                                            required 
                                            fullWidth
                                            variant="filled"
                                            label="Email Address"
                                            color= "primary"
                                            placeholder = "Enter your Email"
                                            value={this.state.email}
                                            onChange={this.handleEmail}
                                        />
                                    </div>

                                    <div style={textFieldContainerStyles}>    
                                        <TextField 
                                            error={this.state.passwordEmptyChk}
                                            required 
                                            fullWidth
                                            variant="filled"
                                            type="password"
                                            label="Password"
                                            color= "primary"
                                            placeholder = "Enter your Password"
                                            value={this.state.password}
                                            onChange={this.handlePassword}
                                        />
                                    </div>

                                    <div style={textFieldContainerStyles}>    
                                        <TextField 
                                            error={this.state.confirmPasswordEmptyChk}
                                            required 
                                            fullWidth
                                            variant="filled"
                                            type="password"
                                            label="Confirm Password"
                                            placeholder = "Enter the password"
                                            color= "primary"
                                            value={this.state.confirmPassword}
                                            onChange={this.handleConfirmPassword}
                                        />
                                    </div>

                                </form>

                                <div style={buttonContainer}>

                                    <AppButton title="CREATE ACCOUNT" backgroundColor="#143D59" onPress={this.onSignUp}/>

                                </div>

                                <div style={linkContainer}>

                                    <h3>
                                        
                                        Already have an Account?
                                    
                                    </h3>

                                    <TouchableOpacity onPress={() => { this.props.navigation.navigate("Log In"); } }>
                                        
                                        <h3 style={linkTextStyles}>
                                            
                                            Login
                                        
                                        </h3>

                                    </TouchableOpacity>

                                </div>
                            
                            </div>

                        </div>        
                        
                        )
                    }
                
                </div>
         
            )
    }
}   

export default NewSignUpPage;