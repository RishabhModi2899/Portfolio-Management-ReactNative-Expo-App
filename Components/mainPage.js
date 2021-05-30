import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import BackgroundImange from "../assets/best-img-1.jpg";
import AppButton from './CustomButton';

const mainPage = ({ navigation }) => {
    
    return(
        <View style = {styles.mainContainer}>
            {/* Initial page for the app */}
            <ImageBackground resizeMode = "cover" source = { BackgroundImange } style={styles.imageStyle}>
                <Text style={styles.welcomeStyle}> 
                    WELCOME
                </Text>
                <View style={styles.mainButtonsContainer}>
                    <View style={{marginTop : "1.5%" , marginBottom : "1.5%"}} >
                        <AppButton onPress = { () => navigation.navigate("Sign Up") } backgroundColor = "#555555" title = "SIGN UP" Color = "white" /> 
                    </View>
                    <View style={{marginTop : "1.5%" , marginBottom : "1.5%"}} >
                        <AppButton onPress = { () => navigation.navigate("Log In") } backgroundColor = "#555555" title = "LOGIN" Color = "white" />
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer : {
        flex : 1,
        borderWidth : 10,
        justifyContent : "center",
        alignContent : "center",
        flexDirection : 'column'
    },
    welcomeStyle : {
        color : "#868686",
        fontWeight : "bold",
        fontSize : 35,
        marginTop : "10%",
        marginBottom : "10%" 
    },
    imageStyle : {
        width : "100%",
        height : "100%",
        flex : 1,
        justifyContent : "space-between",
        alignItems : "center"
    },
    mainButtonsContainer : {
        width : "100%",
        padding : "3%",
        margin : "3%"
    }
});

export default mainPage;