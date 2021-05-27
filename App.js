import React, { Component } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import mainPage from './Components/mainPage';
import SignUpPage from './Components/SignUpPage';
import LoginPage from './Components/LoginPage';
import ForgotPass from './Components/ForgotPass';

import firebase from 'firebase';

// Firebase initialization
const app = ({
  apiKey: "AIzaSyATrtthAdMRMduWeRhuQhtjJaofhpTalc8",
  authDomain: "pm-app-83493.firebaseapp.com",
  projectId: "pm-app-83493",
  storageBucket: "pm-app-83493.appspot.com",
  messagingSenderId: "987924708385",
  appId: "1:987924708385:web:d73b81f6e45d45950eb760"
})

if (firebase.apps.length === 0){
    firebase.initializeApp(app)
}

const Stack = createStackNavigator();
class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      loaded : false,
      loggedIn : false
    }
  }
  
  render(){  
    return (
      <NavigationContainer>
        <Stack.Navigator initialRoute="mainPage">
          <Stack.Screen
            name="mainPage"
            component={mainPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Sign Up"
            component={SignUpPage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Log In"
            component={LoginPage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Forgot Password"
            component={ForgotPass}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );  
  }
}


export default App;

