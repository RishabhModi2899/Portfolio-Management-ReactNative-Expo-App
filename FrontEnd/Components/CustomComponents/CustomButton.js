import React from 'react';
import { TouchableOpacity , Text , StyleSheet } from 'react-native';

TouchableOpacity.defaultProps = { activeOpacity: 0.8 };

function AppButton({title , onPress , backgroundColor}){
    return(
        <TouchableOpacity onPress={onPress} style={[ styles.AppButtonContainerStyles , backgroundColor && { backgroundColor }]}>
            <Text style={styles.AppButtonTextStyles}> 
                { title }
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    AppButtonContainerStyles : { 
        justifyContent : "center",
        borderRadius : 25,
        borderColor : 'black',
        borderWidth : 1
    },
    AppButtonTextStyles : {
        textAlign : "center",
        color : "white",
        fontSize : 20,
        fontWeight : "bold",
        padding : "5%",
        textTransform : "uppercase"
    }
});

export default AppButton;