import React, {Component} from 'react';
import {
   TouchableHighlight, 
   Image, 
   AppRegistry,
   StyleSheet, 
   Text, 
   View,
   TextInput,
   TouchableNativeFeedback,
   ToastAndroid,
   TouchableOpacity,
   DatePickerAndroid
} from 'react-native';

import Database from "./firebase/database.js";
var uuid = require('react-native-uuid');

class NewCar extends Component {
	constructor(props){
		super(props);
		this.state = {make : '', model : '', year: 'Year', price:'', stock:''};
	}
	
	saveCar() {
		var uuidVar = uuid.v4();
		var newCar = {make: this.state.make, model: this.state.model, year: this.state.year, price: this.state.price, stock: this.state.stock, uuid: uuidVar};
		Database.addCar(newCar);
		this.props.callback(newCar);
		this.props.navigator.pop();
	};
	
	showPicker = async (options) => {
		try {
		  const {action, year} = await DatePickerAndroid.open(options);
		  if (action === DatePickerAndroid.dismissedAction) {
			
		  } else {
			var date = new Date(year, 1, 1);
			this.setState({
				year: year,
			});
		  }
		  
		} catch ({code, message}) {
			ToastAndroid.show('Error: ' + message, ToastAndroid.SHORT);
		}
	};
  
	render() {
		return (
			<View style={styles.container}>
				<TextInput placeholder='Make' onChangeText={(make) => this.setState({make})} value={this.state.make} />
				<TextInput placeholder='Model' onChangeText={(model) => this.setState({model})} value={this.state.model} />
				<TouchableOpacity
					onPress={this.showPicker.bind(this, {
					  date: new Date(),
					})}>
					<Text style={styles.text}>{this.state.year}</Text>
				</TouchableOpacity>
				<TextInput placeholder='Price' onChangeText={(price) => this.setState({price})} value={this.state.price} />
				<TextInput placeholder='Stock' onChangeText={(stock) => this.setState({stock})} value={this.state.stock} />
		 
				<TouchableNativeFeedback
					onPress={() => this.saveCar()}>
					<View style={styles.saveButton} >
						<Text style={styles.buttonText}>Save</Text>
					</View>
				</TouchableNativeFeedback>
			</View>
		);
	}
}

var styles = StyleSheet.create({
	container:{
		flex:1,
		padding: 10,
		paddingTop:70,
	},
	saveButton: {
		backgroundColor: 'teal',
		width: 100,
		height: 50
	},
	buttonText: {
		color: 'white',
		textAlign: 'center',
	}
});
  
export default NewCar;