import React, { Component } from 'react'
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native'

class LoadingScreen extends Component { 
    constructor(props){
        super(props)
    }
    
    render() {
        return (
            <View style={ StyleSheet.mainContainer}>
                <ActivityIndicator size="large" color="green"/>
                <Text style={styles.loadingTextStyles}>
                    loading
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer : {
        flex:1,
        backgroundColor:"black",
        justifyContent:"center",
        alignItems:"center",
        alignContent:"center"
    },
    loadingTextStyles : {
        margin:'1%',
        fontSize:20,
        color:'white',
        fontWeight:"bold",
        textAlign:"center"
    }
})

export default LoadingScreen;