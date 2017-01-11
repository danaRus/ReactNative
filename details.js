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
   TouchableOpacity,
   ToastAndroid,
   DatePickerAndroid
} from 'react-native';
import {Car} from './src/Car';
import { SimpleChart } from './chart.js'

import Database from "./firebase/database.js";

class CarDetail extends Component {
	constructor(props){
		super(props);
		this.state = {make : props.make, model : props.model, year : props.year, price: props.price, stock: props.stock};
	}
  
	editCar() {
		var editedCar = new Car(this.state.make, this.props.model, this.state.year, this.state.price, this.state.stock, this.props.uuid);
		Database.updateCar(editedCar);
		this.props.callback(editedCar);
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
				<TextInput 
					onChangeText={(make) => this.setState({make})}
					value={this.state.make} />
		 
				<Text>{this.props.model}</Text>
				
				<TouchableOpacity
					onPress={this.showPicker.bind(this, {
					  date: new Date(this.state.year, 1, 1),
					})}>
					<Text style={styles.text}>{this.state.year}</Text>
				</TouchableOpacity>
			
				<TextInput
					onChangeText={(price) => this.setState({price})}
					value={this.state.price}/>
				
				<TextInput
					onChangeText={(stock) => this.setState({stock})}
					value={this.state.stock}/>
		 
				<TouchableNativeFeedback
					onPress={() => this.editCar()}>
					<View style={styles.saveButton} >
						<Text style={styles.buttonText}>Save</Text>
					</View>
				</TouchableNativeFeedback>
				
				<SimpleChart />
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

export default CarDetail;