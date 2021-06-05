import React, { Component } from 'react'
import { TouchableOpacity } from "react-native"

import { TextField, Grid, Paper, Snackbar, IconButton } from "@material-ui/core";

import AppButton from '../CustomComponents/CustomButton';
import LoadingScreen from '../loadingScreen/loadingScreen';

import firebase from "firebase";

class NewSignUpPage extends Component {
    constructor(props) {
        
        super(props);

        this.state = { 
            isLoading: false,

            firstName: "", 
            lastName: "", 
            email: "", 
            password: "", 
            confirmPassword: "",
            
            snackbarOpen: false,
            SnackbarMessage: "" 
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

    // Function to handle On Create Account Button Press
    onSignUp(event) {
        console.log('Pressed')

        event.preventDefault();
        
        const { email , password , confirmPassword } = this.state;
        
        if (confirmPassword !== password) 
        {

            this.setState({ snackbarOpen : true, SnackbarMessage : "The passwords entered are incorrect", password : "", confirmPassword : "" })
            
        }
        else{
            try{

                this.setState({ isLoading: true })

                firebase.auth().createUserWithEmailAndPassword(email, password)
                
                    .then(() => {
                    
                        this.setState({ snackbarOpen : true, SnackbarMessage : "Success!" , isLoading : false })
                    
                        this.props.navigation.navigate("Log In")

                        var user = firebase.auth().currentUser;

                        user.sendEmailVerification()

                        this.setState({ snackbarOpen : true, SnackbarMessage : "Please Verify your E-mail" })
                    
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
    snackbarClose = (event) => {
        this.setState({
            snackbarOpen : false
        })
    }

    render() {

        const mainGridStyles = {
            backgroundColor: "white",
            width: "100%",
            height: "100%"
        }
        const paperStyle = {
            backgroundColor: "#DCDCDC",
            marginLeft: "15%",
            marginRight: "15%",
            marginBottom: "0%",
            marginTop: "0%",
            padding: "2%"
        }
        const textFieldContainerStyles = {
            margin: "3.5%"
        }
        const headerStyle = { 
            paddingLeft: "35%",
            paddingRight: "35%",
            paddingTop: "2.5%",
            paddingBottom: "2.5%"
        }
        const buttonContainerStyle = {
            paddingLeft: "35%",
            paddingRight: "35%",
            paddingTop: "2.5%",
            paddingBottom: "2.5%"
        }
        const linkStyles = {
            color: "blue",
            float: "right",
        }
        const normalText = {
            float: "left",
        }
        const Container = {
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }

        const {isLoading} = this.state;

            return (
                <Grid style={mainGridStyles}>

                    { isLoading ? (<LoadingScreen />) : (  

                        <div>
                            <Paper elevation={20} style={paperStyle}>

                            <Snackbar 
                                anchorOrigin = {{vertical:"center" , horizontal:"center"}}
                                open = {this.state.snackbarOpen}
                                autoHideDuration = {false}
                                onClose = {this.snackbarClose}
                                message = {this.state.SnackbarMessage}
                                action = {[
                                    <IconButton 
                                        key = "close"
                                        aria-label = "Close"
                                        color = "inherit"
                                        onClick = { this.snackbarClose }>
                                            x
                                    </IconButton>
                                    ]}
                            />

                            <Grid align="center">
                            
                                <h2 style={headerStyle}>
                                    Sign Up
                                </h2>
                            
                            </Grid>

                            <form autoComplete="off">
                                <div style={textFieldContainerStyles}>
                                    <TextField 
                                        required ={true}
                                        fullWidth
                                        variant="outlined"
                                        label="First Name"
                                        color="primary"
                                        value={this.state.firstName}
                                        onChange={this.handleFirstName}
                                    />  
                                </div>
                                <div style={textFieldContainerStyles}>
                                    <TextField
                                        required 
                                        fullWidth
                                        variant="outlined"
                                        label="Last Name"
                                        color= "primary"
                                        value={this.state.lastName}
                                        onChange={this.handleLastName}
                                    />
                                </div>
                                <div style={textFieldContainerStyles}>
                                    <TextField
                                        required 
                                        fullWidth
                                        variant="outlined"
                                        label="Email Address"
                                        color= "primary"
                                        value={this.state.email}
                                        onChange={this.handleEmail}
                                    />
                                </div>
                                <div style={textFieldContainerStyles}>    
                                    <TextField 
                                        required 
                                        fullWidth
                                        variant="outlined"
                                        type="password"
                                        label="Password"
                                        color= "primary"
                                        value={this.state.password}
                                        onChange={this.handlePassword}
                                    />
                                </div>
                                <div style={textFieldContainerStyles}>    
                                    <TextField 
                                        required 
                                        fullWidth
                                        variant="outlined"
                                        type="password"
                                        label="Confirm Password"
                                        color= "primary"
                                        value={this.state.confirmPassword}
                                        onChange={this.handleConfirmPassword}
                                    />
                                </div>
                            </form>

                            <div style={buttonContainerStyle}>
                            
                                <AppButton title="Create Account" backgroundColor="#00D100" onPress={this.onSignUp}/>
                                
                            </div>

                            <div style={Container}>

                                <h3 style={normalText}>
                                    Already have an Account?
                                </h3>
                                <TouchableOpacity onPress={() => { this.props.navigation.navigate("Log In"); } }>
                                    <h3 style={linkStyles}>
                                        Login
                                    </h3>
                                </TouchableOpacity>

                        </div>

                        </Paper>
                    </div>
                        
                        )
                    }
                </Grid>
         
            )
    }
}   

export default NewSignUpPage;