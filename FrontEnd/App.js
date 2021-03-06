import React, { Component } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import mainPage from "../FrontEnd/Components/mainPage" 
import NewSignUpPage from "../FrontEnd/Components/AuthenticationPages/newSignUpPage"
import NewLoginPage from "../FrontEnd/Components/AuthenticationPages/newLoginPage";
import NewForgotPass from "./Components/AuthenticationPages/ForgotPassword/NewForgotPass";
import Portfolio from '../FrontEnd/Components/AuthenticationPages/Portfolio/Portfolio'
import RealisedPL from '../FrontEnd/Components/AuthenticationPages/Portfolio/RealisedPL'

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
  }
  
  render(){  
    return (
      <NavigationContainer>
        <Stack.Navigator initialRoute="mainPage">
          <Stack.Screen
            name="mainPage"
            component={mainPage}
            options={{ 
              headerShown: false 
            }}
          />
          <Stack.Screen
            name="Sign Up"
            component={NewSignUpPage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Log In"
            component={NewLoginPage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Forgot Password"
            component={NewForgotPass}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
          name = "Portfolio"
          component={Portfolio}
          options={{
            headerShown: false,
          }}/>
          <Stack.Screen
          name = "RealisedPL"
          component = { RealisedPL }
          options = {{
            headerShown : false
          }}/>
        </Stack.Navigator>
      </NavigationContainer>
    );  
  }
}

export default App;


