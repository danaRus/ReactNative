'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  ListView,
  TouchableOpacity,
  TouchableNativeFeedback,
  ToastAndroid,
  ScrollView,
  Linking,
  Alert
} from 'react-native';
import {readCar, saveCar, readAllCars, clearAllCars, updateCar, removeCar} from './src/Storage';
import {Car} from './src/Car';
import Database from "./firebase/database.js";

var CARS_DATA = [];

class CarList extends Component {
	constructor(props) {
		super(props);
		this.callbackFunctionNew = this.callbackFunctionNew	.bind(this);
		this.callbackFunction = this.callbackFunction.bind(this);
		
		this.callbackGetOne = this.callbackGetOne.bind(this);
		
		this.state = {
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2,
			}),
			loaded: false,
		};
	}
	
	componentDidMount() {
		this.fetchData();
	}
	
	fetchData() {
		if(Database.carsRef !== null) {
			// when an object is added, changed, or removed, you get the entire result set back as a DataSnapshot, from the Firebase SDK
			Database.carsRef.on('value', (snap) => {
				// get children as an array
				var cars = [];
				snap.forEach((child) => {
					cars.push(child.val());
				});
			
				CARS_DATA = cars.slice();
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(CARS_DATA),
				});
				Database.initializeCars(cars);
			});
		}
		
		this.setState({
			loaded: true,
        });
	}
	
	callbackFunction(args) {
		ToastAndroid.show('The car has been modified', ToastAndroid.SHORT);
	};	
	
	callbackFunctionNew(args) {		
		ToastAndroid.show('A new car has been inserted', ToastAndroid.SHORT);
	
		var body = 'The car : Car{make =' + args['make'] + ', model=' + args['model'] + ', year=' + args['year'] + ', price=' + args['price'];
		var firstMailURL = 'mailto:anad_95@yahoo.com?subject=Car Insertion&body='.concat(body);
		var finalBoby = '} has been inserted.'
		var mailURL = firstMailURL.concat(finalBoby);
		Linking.openURL(mailURL).catch(err => console.error('An error occurred', err));
	}
	
	callbackGetOne(args) {
		CARS_DATA.push(args);
		
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(CARS_DATA),
		});
	}
	
	deleteCar(uuid) {
		Database.deleteCar(uuid);
	}
	
	render() {
	if (!this.state.loaded) {
		return this.renderLoadingView();
    }
	
    return (
	<ScrollView>
		<View>
			<ListView 
				style={styles.listView}
				enableEmptySections={true}
				dataSource={this.state.dataSource}
        
				renderRow={(data) => 
					<TouchableOpacity 
					onPress={()=> this.props.navigator.push({index: 1,
						passProps:{
							make: data.make, 
							model: data.model,
							year: data.year,
							price: data.price,
							stock: data.stock,
							uuid: data.uuid,
							callback: this.callbackFunction,
						},
						},)
					}
					onLongPress={()=> Alert.alert(
										  'Delete',
										  'This car will be deleted.',
										  [
											{text: 'Cancel'},
											{text: 'Delete', onPress: () => this.deleteCar(data.uuid)},
										  ]
										)
					}
					>
						<View>
							<Text style={styles.make}>{data.make}</Text>
							<Text>{data.model}</Text>
						</View>
					</TouchableOpacity>
				}
				renderSeparator={(sectionID, rowID, adjacentRowHighlighted) =>
					<View key={rowID} style={{height:1, backgroundColor: 'lightgray'}}/>
				}
		
			/>
		</View>
		
		<View>
			<TouchableNativeFeedback onPress={()=> this.props.navigator.push({index: 2,
				passProps:{
					callback: this.callbackFunctionNew,
				}
			})}>
				<View style={styles.saveButton}>
					<Text style={styles.buttonText}>Add</Text>
				</View>
			</TouchableNativeFeedback>
		</View>
	</ScrollView>
    );
  }
  
	renderLoadingView() {
		return (
			<View style={styles.container}>
				<Text>
					Loading cars...
				</Text>
			</View>
		);
	}
 
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 20,
	},
	make: {
		fontSize: 20,
	},
	listView: {
		paddingTop: 60,
		backgroundColor: '#F5FCFF',
	},
	separator: {
		flex: 1,
		height: StyleSheet.hairlineWidth,
		backgroundColor: '#8E8E8E',
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

export default CarList;
