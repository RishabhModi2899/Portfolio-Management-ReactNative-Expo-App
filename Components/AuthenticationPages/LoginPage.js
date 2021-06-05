import React , { Component } from 'react';
import { TextInput, View, StyleSheet, Text, TouchableOpacity, Alert, BackHandler } from 'react-native';
import AppButton from '../CustomComponents/CustomButton';
import firebase from 'firebase';
import LoadingScreen from "../loadingScreen/loadingScreen";

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      isLoading: false
    };
  }

  onLogin = () => {

    console.log("Pressed Login Button");
    this.setState({ isLoading: true })
    const { email, password } = this.state;
    
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {

        var user = firebase.auth().currentUser;
        
        if (user.emailVerified != false){
          
          this.setState({ isLoading: false })
          this.props.navigation.navigate("Portfolio")
          
        }else{

          this.setState({ isLoading: false })
          Alert.alert("Email Verification" , "An e-mail has been sent to your e-mail Address" , [{
            text: "Ok",
            onPress: () => {
              user.sendEmailVerification();
              this.setState({ email: "" , password: "" })
            }

          }])
        
        }

      })
      .catch((error) => {
        this.setState({ isLoading: false })
        Alert.alert(" Error ", error.message , [
          {
            text: " Ok ",
            onPress: () => {
              this.setState({
                email: "",
                password: ""
              });
            }
          }
        ])
      })
  } 
 
  UNSAFE_componentWillMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackClick);
  }

  UNSAFE_componenetWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackClick);
  }

  onBackClick = () => {
    this.props.navigation.navigate("mainPage");
    return true;
  };

  render() {

    const { isLoading } = this.state;

    return (
      <View style={styles.mainContainerLoginPage}>
        { isLoading ? 
        (<LoadingScreen />) : 
        (
          <View style={styles.insideContainer}>
          <View style={styles.secondaryContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.textStyles}> Email </Text>
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                textContentType="emailAddress"
                onChangeText={(email) => this.setState({ email })}
                style={styles.TextInputFontStyles}
                value={this.state.email}
              />
            </View>
          </View>

          <View style={styles.secondaryContainer}>
            <View style={styles.textContainer1}>
              <Text style={styles.textStyles}>Password</Text>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("Forgot Password");
                }}
              >
                <Text style={styles.textStyles1}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                textContentType="password"
                onChangeText={(password) => this.setState({ password })}
                style={styles.TextInputFontStyles}
                secureTextEntry={true}
                value={this.state.password}
              />
            </View>
          </View>

          <View style={styles.AppButtonContainerStyles}>
            <AppButton
              onPress={() => this.onLogin()}
              title="Login"
              backgroundColor="#00D100"
            />
          </View>

          <View style={styles.lastContainer}>
            <Text style={styles.textStylesForLastContainer}>New here?</Text>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Sign Up");
              }}
            >
              <Text style={styles.textStylesForLastContainer1}>
                Create an account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        )}  
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainerLoginPage: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#2a2a2a",
  },
  headerContainer: {
    flex: 0.2,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: "10%",
  },
  headerStyles: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  insideContainer: {
    flex: 1,
    marginTop: "5%",
    marginBottom: "25%",
    justifyContent: "center",
  },
  secondaryContainer: {
    padding: "5%",
  },
  textContainer: {
    justifyContent: "flex-end",
  },
  textContainer1: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textStyles: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    alignSelf: "flex-start",
  },
  textStyles1: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0066FF",
  },
  textInputContainer: {
    padding: "5%",
    backgroundColor: "#303030",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
    borderRadius: 25,
  },
  TextInputFontStyles: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    alignSelf: "stretch",
    textAlign: "center"
  },
  AppButtonContainerStyles: {
    padding: "5%",
  },
  lastContainer: {
    padding: "5%",
    borderRadius: 25,
    marginTop: "2.5%",
    marginLeft: "5%",
    marginRight: "5%",
    borderWidth: 1,
    borderColor: "white",
    flexDirection: "row",
    justifyContent: "center",
  },
  textStylesForLastContainer: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  textStylesForLastContainer1: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0066FF",
  },
});

export default LoginPage;