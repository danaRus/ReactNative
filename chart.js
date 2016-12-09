import React, { Component } from 'react'; 
import { 
	StyleSheet,
	View,
	Text,
	TouchableOpacity
} from 'react-native';
import Chart from 'react-native-chart';
import { Dimensions } from 'react-native';
import {readAllCars} from './src/Storage';

var {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        height: height/4,
        width: width,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    chart: {
        width: width-50,
        height: height/4-50,
    },
});

var readData = [];

export class SimpleChart extends Component {
	
	constructor(props) {
		super(props);
		this.callbackGetOne = this.callbackGetOne.bind(this);
	}
	
	componentDidMount() {
		this.getData();
	}
	
	getData() {
		readData = [];
		readAllCars(this.callbackGetOne);
	}
	
	callbackGetOne(args) {
		value = [args.model, args.price];
		readData.push(value);
	}
	
    render() {
		const data = readData.slice();
        return (
			<View style={styles.container}>
				<Chart
					style={styles.chart}
					data={data}
					type="bar"
					showDataPoint={true}
					showGrid={false}
					color={'teal'}
				 />
			</View>
        );
    }
}