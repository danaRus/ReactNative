import {
    AppRegistry,
    TextInput,
    Text,
    View,
    StyleSheet,
    dismissKeyboard,
    TouchableNativeFeedback,
	TouchableOpacity
} from "react-native";

import React, {Component} from "react";
import * as firebase from "firebase";
import Button from "apsl-react-native-button";
import DismissKeyboard from "dismissKeyboard";
import {Madoka} from "react-native-textinput-effects";

class Login extends Component {
	
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            response: ""
        };

        this.signup = this.signup.bind(this);
        this.login = this.login.bind(this);
    }
	

    async signup() {

        DismissKeyboard();

        try {
            await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);

            this.setState({
                response: "The account has been created"
            });

            setTimeout(() => {
                this.props.navigator.push({
					index: 0
				})
            }, 1500);

        } catch (error) {
            this.setState({
                response: error.toString()
            })
        }

    }

    async login() {

        DismissKeyboard();

        try {
            await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);

            this.setState({
                response: "You have been logged in"
            });

            setTimeout(() => {
                this.props.navigator.push({
                    index: 0
                })
            }, 1500);

        } catch (error) {
            this.setState({
                response: error.toString()
            })
        }

    }

    render() {

        return (
            <TouchableNativeFeedback onPress={() => {DismissKeyboard()}}>
                <View>
                    <View style={styles.formGroup}>
                        <Text style={styles.title}>Lab Cars</Text>
						
						<Madoka
							label={"Email Address"}
							borderColor={'teal'}
							labelStyle={{ color: 'teal' }}
							inputStyle={{ color: 'black' }}
							onChangeText={(email) => this.setState({email})}
							keyboardType="email-address"
                            autoCapitalize="none"
						/>
					
						<Madoka
							label={"Password"}
							borderColor={'teal'}
							labelStyle={{ color: 'teal' }}
							inputStyle={{ color: 'black' }}
							onChangeText={(password) => this.setState({password})}
							secureTextEntry={true}
							autoCapitalize="none"
						/>

                        <View style={styles.submit}>
							<Button onPress={this.signup} style={styles.buttons} textStyle={{fontSize: 18}}>
                                Sign up
                            </Button>
                            <Button onPress={this.login} style={styles.buttons} textStyle={{fontSize: 18}}>
                                Login
                            </Button>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.response}>{this.state.response}</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        );
    }
}

const styles = StyleSheet.create({

    formGroup: {
        padding: 50
    },

    title: {
        paddingBottom: 16,
        textAlign: "center",
        color: "#000",
        fontSize: 35,
        fontWeight: "bold",
        opacity: 0.8,
    },

    submit: {
        paddingTop: 30
    },

    response: {
        textAlign: "center",
        paddingTop: 0,
        padding: 50
    },
	
	buttons: {
        backgroundColor: "whitesmoke",
		borderColor: "teal"
    }
	
});

export default Login;