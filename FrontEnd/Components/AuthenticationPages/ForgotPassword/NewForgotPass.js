import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'

import { TextField, Snackbar, IconButton } from "@material-ui/core"

import AppButton from "../../CustomComponents/CustomButton"
import LoadingScreen from "../../loadingScreen/loadingScreen"

import firebase from "firebase"

import "./forgotPass.css"

class NewForgotPass extends Component {

    constructor(props) {

        super(props);

        this.state = { 
            
            email : '',
            
            snackbarOpen : false,

            SnackbarMessage : '',
            
            isLoading : false,

            redirect : false

        };

    }

    snackbarClose = () => {

        const { snackbarOpen } = this.state;

        const { redirect } = this.state;

        if ( redirect === true ) {

            this.props.navigation.navigate("Log In")

        }
        
        this.setState({

            snackbarOpen : false

        })

    }

    handleEmail = (e) => {

        this.setState({  

            email : e.target.value

        })

    }

    resetPasswordEventHandler = () => {

        var auth = firebase.auth()

        if (this.state.email.length !== 0) {

            this.setState({

                isLoading : true

            })

            auth.sendPasswordResetEmail(this.state.email).then(() => {

                this.setState({ 

                    isLoading : false,

                    snackbarOpen : true,

                    email : '',

                    SnackbarMessage : 'Success! Check your email Address',

                    redirect : true

                })

            }) .catch((error) => {

                this.setState({

                    isLoading : false,

                    snackbarOpen : true,

                    email : '',

                    SnackbarMessage : error.message

                })

            })

        }

    }

    render() {

        const { isLoading } = this.state;

        return (
        
            <div className = "forgetPassMainContainer">

                { isLoading ? (<LoadingScreen />) : (

                    <div className = "subContainer">

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

                        <div className = "headingContainer">
                            
                            <h1> 
                                
                                Reset Password 
                                
                            </h1>
                        
                        </div>

                        <div className = "textfieldContainer">

                            <TextField 
                                required
                                fullWidth
                                variant = "filled"
                                label = "E-Mail"
                                value = { this.state.email }
                                placeholder = "Enter your verified E-Mail address"
                                onChange = { this.handleEmail } 
                            />

                        </div>

                        <div className = "buttonContainer">

                            <AppButton title='Send password reset email' backgroundColor = '#143D59' onPress = { this.resetPasswordEventHandler }/>

                        </div>

                        <div className = "linkContainer">

                            <h3>
                                        
                                Don't have an Account?
                                    
                            </h3>

                            <TouchableOpacity onPress = {() => { this.props.navigation.navigate("Sign Up") }}>

                                <h3 className = "linkTextStyles">
                                            
                                    Sign Up here
                                        
                                </h3>

                            </TouchableOpacity>

                        </div>

                        <div className = "linkContainer">

                            <h3>
                                        
                                Already have an Account?
                                    
                            </h3>

                            <TouchableOpacity onPress = {() => { this.props.navigation.navigate("Log In") }}>

                                <h3 className = "linkTextStyles">
                                            
                                    Log In here
                                        
                                </h3>

                            </TouchableOpacity>

                        </div>

                    </div>

                ) }

            </div>

        );

    }

}

export default NewForgotPass;