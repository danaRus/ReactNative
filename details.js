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
   ToastAndroid
} from 'react-native';

class CarDetail extends Component {
	constructor(props){
		super(props);
		this.state = {make : props.make, model : props.model, year : props.year};
	}
  
	editCar() {
		var editedCar = {make: this.state.make, model: this.state.model, year: this.state.year}; 
		this.props.callback(editedCar, this.props.position);
		this.props.navigator.pop();
	};

	render() {
		return (
			<View style={styles.container}>
				<TextInput 
					onChangeText={(make) => this.setState({make})}
					value={this.state.make} />
		 
				<TextInput 
					onChangeText={(model) => this.setState({model})}
					value={this.state.model}/>
			
				<TextInput
					onChangeText={(year) => this.setState({year})}
					value={this.state.year}/>
		 
				<TouchableNativeFeedback
					onPress={() => this.editCar()}>
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

export default CarDetail;