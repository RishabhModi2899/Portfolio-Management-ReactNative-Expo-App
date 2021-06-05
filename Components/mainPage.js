import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import BackgroundImange from "../assets/best-img-1.jpg";
import AppButton from './CustomComponents/CustomButton';

const mainPage = ({ navigation }) => {
    
    return(
        <View style={styles.mainContainer}>
            <View style={styles.sencondaryContainer}>
                <ImageBackground source={BackgroundImange} style={styles.imageStyles}>
                    <View style={styles.headingContainer}>
                        <Text style={styles.headingFont}>
                            Welcome
                        </Text>
                    </View>
                    <View style={styles.buttonContainerStyles}>
                        <View style={styles.button1}>
                            <AppButton title="Sign Up" backgroundColor="#616161" onPress={() => {navigation.navigate("Sign Up")}} />
                        </View>
                        <View style={styles.button2}>
                            <AppButton title="Log In" backgroundColor="#616161" onPress={() => {navigation.navigate("Log In")}} />
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#2a2a2a"
    },
    sencondaryContainer: {
        marginLeft: "15%",
        marginRight: "15%",
        flex: 1,
        
    },
    imageStyles: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "space-around"
    },
    headingContainer: {
        marginTop: "10%",
        marginBottom: "10%",
        marginLeft: "20%",
        marginRight: "20%"
    },
    headingFont: {
        color: "white",
        fontSize: 35,
        fontWeight: "bold",
        textAlign : "center"   
    },
    buttonContainerStyles: {
        justifyContent: "flex-end",
        marginTop: "10%",
        marginBottom: "1%",
        marginLeft: "20%",
        marginRight: "20%"
    },
    button1: {
        marginLeft: "20%",
        marginRight: "20%",
        marginTop: "5%",
        marginBottom: "2.5%",
    },
    button2: {
        marginTop: "2.5%",
        marginBottom: "5%",
        marginLeft: "20%",
        marginRight: "20%"
    }
})

export default mainPage;