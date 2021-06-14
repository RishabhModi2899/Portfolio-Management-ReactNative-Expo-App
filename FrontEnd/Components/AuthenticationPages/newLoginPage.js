import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';

import { TextField , Snackbar , IconButton } from '@material-ui/core';

import firebase from "firebase"

import AppButton from '../CustomComponents/CustomButton';
import LoadingScreen from '../loadingScreen/loadingScreen';

class NewLoginPage extends Component {

    constructor(props) {
    
        super(props);

        this.state = { 

            email : "" ,

            password : "",

            isLoading : "",

            snackbarOpen : false,

            SnackbarMessage : ""

        };

        this.onLogin = this.onLogin.bind(this);
    
    }

    //Snackbar close
    snackbarClose = () => {

        this.setState({

            snackbarOpen : false

        })

    }

    // Handler Functions
    handleEmail = (e) => {

        this.setState({

            email : e.target.value
        
        })

    }

    handlePassword = (e) => {

        this.setState({

            password : e.target.value

        })

    }

    onLogin() {

        this.setState({ isLoading: true })

        const { email, password } = this.state;

        firebase.auth().signInWithEmailAndPassword(email, password)
        
        .then(() => {

            var user = firebase.auth().currentUser;

            if(user.emailVerified != false){

                this.setState({ 
    
                    isLoading : false
    
                })
    
                this.props.navigation.navigate("Portfolio")
                
            }else{

                this.setState({ 

                    isLoading : false , 

                    snackbarOpen : true , 

                    SnackbarMessage : "Please verify your email" ,

                    password : ""
                
                })

            }

        })

        .catch((error) => {

            this.setState({ 

                snackbarOpen : true ,

                SnackbarMessage : error.message ,

                password : ""

            })

        })

    }

    render() {

        const mainContainer = {
           
            display: "flex",
            flex: 1,
            backgroundColor: "#2a2a2a",
            margin: "0%",
            padding: "0%",
            justifyContent: "space-between"

        }
        const secondaryContainer = {

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

            marginTop: "10%",
            marginBottom: "10%"

        }
        const textFieldContainer = {

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

        const { isLoading } = this.state;

        return (

            <div style = { mainContainer }>

                { isLoading ? (<LoadingScreen />) : (

                    <div style = { secondaryContainer }>

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

                        <div style = { headerContainer }>

                            <h1 style = { headerFontStyles }> Log In </h1>

                        </div>

                        <div style = { formContainer }>

                            <form autoComplete = "off">

                                <div style = { textFieldContainer }>

                                    <TextField
                                        required
                                        fullWidth
                                        variant = "filled"
                                        label = "Email" 
                                        placeholder = "Enter your email"
                                        color = "primary"
                                        value = { this.state.email }
                                        onChange = { this.handleEmail }
                                    />

                                </div>
                                
                                <div style = { textFieldContainer }>

                                    <TextField
                                        required
                                        fullWidth
                                        variant = "filled"
                                        type = "password"
                                        placeholder = "Enter your password"
                                        label = "Password" 
                                        color = "primary"
                                        value = { this.state.password }
                                        onChange = { this.handlePassword }
                                    />

                                </div>

                            </form>

                            <div style = { buttonContainer }>

                                <AppButton title = "LOGIN" backgroundColor = "#143D59" onPress = { this.onLogin }/>

                            </div>

                            <div style = { linkContainer }>

                                <h3>
                                            
                                    Don't have an Account?
                                        
                                </h3>

                                <TouchableOpacity onPress = {() => { this.props.navigation.navigate("Sign Up") }}>

                                    <h3 style = { linkTextStyles }>
                                                
                                        Sign Up here
                                            
                                    </h3>

                                </TouchableOpacity>

                            </div>

                        </div>

                    </div>

                    )  
                }

            </div>        
        );
    }
}

export default NewLoginPage;