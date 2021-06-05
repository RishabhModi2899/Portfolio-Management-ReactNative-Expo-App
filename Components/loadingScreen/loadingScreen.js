import React, { Component } from 'react'
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native'

class LoadingScreen extends Component { 
    constructor(props){
        super(props)
    }
    
    render() {
        
        const mainContainer = {
            display:"flex",
            height:"100%",
            width:"100%",
            flexDirection:"column",
            backgroundColor:"#2a2a2a",
            alignItems: "center",
            justifyContent: "center"
        }
        const loadingTextStyles = {
            margin:'1%',
            fontSize:20,
            color:'white',
            fontWeight:"bold",
            textAlign:"center"
        }

        return (
            <div style={mainContainer}>
                <ActivityIndicator size="large" color="green"/>
                <h4 style={loadingTextStyles}>
                    Loading
                </h4>
            </div>
        );
    }
}

export default LoadingScreen;