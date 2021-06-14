import React , { Component } from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";
import AppButton from "../CustomComponents/CustomButton";

class ForgetPassword extends Component {
    
    constructor(props){
        super(props)
    }
    
    render(){        
        return(
            <View style={styles.mainContainer}>
                <View style={styles.heading} >
                    <Text style={styles.headingFonts}> Reset Your Password </Text>
                </View>
                <View style={styles.subHeading}>
                    <View style={styles.subHeadingText}> 
                        <Text style={styles.subHeadingTextFonts}>
                            Enter your user account's verified email address and we will send you a password reset link. 
                        </Text>
                    </View>
                    <View style={styles.subHeadingTextInputContainer}>
                        <TextInput placeholder="Enter your email address" placeholderTextColor="white"/>
                    </View>
                </View>
                <View style = {styles.buttonContainer}>
                    <AppButton title='Send password reset email' backgroundColor = '#00D100'/>    
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer : {
        flex : 1,
        backgroundColor : "#2a2a2a",
        justifyContent : 'space-around'
    },
    heading : {
        alignItems : 'center'
    },
    headingFonts : {
        fontSize : 30,
        fontWeight : 'bold',
        color : 'white'
    },
    subHeading : {
        margin : '5%',
        justifyContent : 'center'
    },
    subHeadingText : {
        margin : '2%'
    },
    subHeadingTextFonts : {
        color : 'white',
        fontSize : 20,
        fontWeight : 'bold'
    },
    subHeadingTextInputContainer : {
        borderColor : 'white',
        backgroundColor : '#36454F',
        borderWidth : 1,
        padding : '5%',
        borderRadius : 5,
        margin : "1%",
        alignItems : 'center'
    },
    buttonContainer : {
        padding : '5%'
    }
})

export default ForgetPassword;