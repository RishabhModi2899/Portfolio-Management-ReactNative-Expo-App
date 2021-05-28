import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Text, Alert } from 'react-native';
import AppButton from './CustomButton';
import firebase from 'firebase';
import LoadingScreen from '../Components/loadingScreen/loadingScreen';

class SignUpPage extends Component {

    constructor(props) {
        super(props)
        
        this.state = { isLoadingScreen: false, password: "", confirmPassword: "", email: "" };
    }
    
    onSignUp = async() => {
        console.log('Pressed')
        const { email , password , confirmPassword } = this.state;
        if (confirmPassword !== password) 
        {
            Alert.alert(" Error " , " The passwords you entered did not match " , [
                    { 
                        text:"Ok",
                        onPress: () => 
                        {     
                            this.setState({
                              password: "",
                              confirmPassword: ""
                            });
                        }
                    }
                ] 
            )
        }
        else{
            try{
                this.setState({ isLoadingScreen: true });
                firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((result) => {  
                  this.props.navigation.navigate("Log In")
                })
                .catch(error => {
                    
                    switch(error.code){

                        case 'auth/email-already-in-use':
                            Alert.alert("Error" , "Email is already in use" , [
                                { 
                                    text: "Ok",
                                    onPress: () => {
                                        this.setState({ email: "" , password: "" , confirmPassword: "" });    
                                    } 
                                }
                            ])
                            break;
                        case 'auth/invalid-email':
                            Alert.alert("Error" , "Email is incorrect" , [
                                {
                                    text: "Ok",
                                    onPress: () => {
                                        this.setState({ email: "" });
                                    } 
                                }
                            ])
                            break;
                        case 'auth/invalid-password':
                            Alert.alert("Error" , "Password must be a string of atleast 6 characters" , [
                                {
                                    text: "Ok",
                                    onPress: () => {
                                        this.setState({ email: "" });
                                    } 
                                }
                            ])
                            break;
                    }
                  this.setState({ isLoadingScreen: false });
                })
                

            }

            catch(err){
                Alert.alert(err);
                this.setState({ isLoadingScreen: false });
            }
        }
    }

    render(){
        
      const {isLoadingScreen} = this.state;
        
      return (
          <View style={styles.mainSignUpContainer}>
            { isLoadingScreen ? (
              <LoadingScreen />) :  (
              <View style={styles.Container}>
                <View
                  style={{
                    marginTop: "5%",
                    marginBottom: "5%",
                    alignSelf: "center",
                  }}
                >
                  <Text style={styles.textHeading1}>* - mandatory</Text>
                </View>

                <View style={styles.componentStyles}>
                  <Text style={styles.textStyles}>Email Address *</Text>
                  <View style={styles.textInputContainer}>
                    <TextInput
                      textContentType="emailAddress"
                      style={styles.textInputFontStyles}
                      onChangeText={(email) => this.setState({ email })}
                      value={this.state.email}
                    />
                  </View>
                </View>

                <View style={styles.componentStyles}>
                  <Text style={styles.textStyles}>Password *</Text>
                  <View style={styles.textInputContainer}>
                    <TextInput
                      textContentType="password"
                      style={styles.textInputFontStyles}
                      secureTextEntry={true}
                      onChangeText={(password) => this.setState({ password })}
                      value={this.state.password}
                    />
                  </View>
                </View>

                <View style={styles.componentStyles}>
                  <Text style={styles.textStyles}>Confirm Password *</Text>
                  <View style={styles.textInputContainer}>
                    <TextInput
                      textContentType="password"
                      style={styles.textInputFontStyles}
                      secureTextEntry={true}
                      onChangeText={(confirmPassword) =>
                        this.setState({ confirmPassword })
                      }
                      value={this.state.confirmPassword}
                    />
                  </View>
                </View>

                <View style={styles.appContainer}>
                  <AppButton
                    onPress={() => this.onSignUp()}
                    title="Create account"
                    backgroundColor="#00D100"
                  />
                </View>
              </View>
              )}
            </View>
        );
      }
    }

export default SignUpPage;

const styles = StyleSheet.create({
    mainSignUpContainer : {
        justifyContent : "space-around",
        flex : 1,
        backgroundColor : "#2a2a2a"
    },  
    textHeading1 : {
        justifyContent : 'flex-end',
        fontSize : 20,
        color : 'red'
    },
    Container : {
        flex : 1,
        justifyContent : 'center',
        marginBottom : '6%'
    },
    componentStyles : {
        margin : '5%'
    },
    textStyles : {
        color : 'white',
        fontSize : 20
    },
    textInputContainer : {
        margin : '1%',
        padding : "3%",
        borderRadius : 25,
        borderColor : 'white',
        borderWidth : 1,
        alignItems : 'center',
    },
    textInputFontStyles : {
        alignItems : "stretch",
        alignSelf : "stretch",
        fontSize : 20,
        color : 'white',
        textAlign : "center",
        fontWeight : 'bold'
    },
    appContainer : {
        padding : '5%'
    }
});

