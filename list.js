/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
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
  Linking
} from 'react-native';

var CARS_DATA = [
  {make: 'Make1', model: 'Model1', year: '2001'},
  {make: 'Make2', model: 'Model2', year: '2002'},
  {make: 'Make3', model: 'Model3', year: '2003'},
  {make: 'Make4', model: 'Model4', year: '2004'},
  {make: 'Make5', model: 'Model5', year: '2005'},
  {make: 'Make6', model: 'Model6', year: '2006'},
  {make: 'Make7', model: 'Model7', year: '2007'},
  {make: 'Make8', model: 'Model8', year: '2008'},
  {make: 'Make9', model: 'Model9', year: '2009'},
  {make: 'Make10', model: 'Model10', year: '2010'},
 ];

class CarList extends Component {
	constructor(props) {
		super(props);
		this.callbackFunctionNew = this.callbackFunctionNew	.bind(this);
		this.callbackFunction = this.callbackFunction.bind(this);
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
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(CARS_DATA),
			loaded: true,
        });
	}
	callbackFunction(args, index) {
		var newData = CARS_DATA.slice();
		newData[index] = args;
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(newData),
        });
		CARS_DATA = newData.slice();
		ToastAndroid.show('The car has been modified', ToastAndroid.SHORT);
	};
	
	callbackFunctionNew(args) {
		CARS_DATA.push(args);
		
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(CARS_DATA),
        });
		
		ToastAndroid.show('A new car has been inserted', ToastAndroid.SHORT);
	
		var body = 'The car : Car{make =' + args['make'] + ', model=' + args['model'] + ', year=' + args['year'];
		var firstMailURL = 'mailto:anad_95@yahoo.com?subject=Car Insertion&body='.concat(body);
		var finalBoby = '} has been inserted.'
		var mailURL = firstMailURL.concat(finalBoby);
		Linking.openURL(mailURL).catch(err => console.error('An error occurred', err));
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
					<TouchableOpacity onPress={()=> this.props.navigator.push({index: 1,
						passProps:{
							make: data.make, 
							model: data.model,
							year: data.year,
							position: CARS_DATA.indexOf(data),
							callback: this.callbackFunction,
						},
						}
					)}>
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
