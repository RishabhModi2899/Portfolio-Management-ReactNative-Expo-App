import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, Button, TextInput, Text, BackHandler, Modal } from 'react-native';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import MenuIcon from '@material-ui/icons/Menu';

class Portfolio extends Component {
    constructor(props) {
        super(props);
        this.state = { stockName: "", quantity: "", buyValue: "", sellValue: ""};
    }

    onBackClick = () => {
      this.props.navigation.navigate("mainPage")
      return true;
    }

    UNSAFE_componentWillMount() {
      BackHandler.addEventListener("hardwareBackPress", this.onBackClick);
    }

    UNSAFE_componenetWillUnmount() {
      BackHandler.removeEventListener("hardwareBackPress", this.onBackClick);
    }

    render() {
        return (
          <View style={styles.mainContainer}>
            
            <View style={styles.headerComponentContainerStyles}> 

              <View style={styles.ButtonContainerStyles}>
                <Fab color="primary" aria-label="menu">
                  <MenuIcon />
                </Fab>
              </View>
              <Text style={styles.headerComponentFontStyles}>
                Holdings
              </Text>
              <View style={styles.ButtonContainerStyles}>
                <Fab color="primary" aria-label="add">
                  <AddIcon />
                </Fab>
              </View>
              
            </View>

            {/* <ScrollView style={styles.ScrollViewContainerStyles}>

            </ScrollView> */}

          </View>
          
        );
    }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#1B1212",
    justifyContent: "space-around"
  },
  headerComponentContainerStyles: {
    flex: 0.1,
    flexDirection: 'row',
    backgroundColor: "#28282B",
    justifyContent: "space-around",
    alignItems: 'center'
  },
  headerComponentFontStyles: {
    color: 'white',
    padding: "1%",
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold'
  },
  ButtonContainerStyles: {
    borderColor: 'white',
    borderWidth: 1,
    alignSelf: 'center'
  },
  ScrollViewContainerStyles: {
    flex: 0.7,
    borderColor: 'white',
    borderWidth: 1,
    margin: "2.5%"
  }
});

export default Portfolio;