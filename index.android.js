import React, {Component} from 'react';
import {
   Navigator, 
   StatusBar, 
   TouchableHighlight,
   AppRegistry, 
   StyleSheet, 
   Text, 
   View
} from 'react-native';

import CarList from './list.js';
import CarDetail from './details.js';
import NewCar from './newcar.js';

const routes = [
  {
	title: 'Car List',
    index: 0
  }, {
    title: 'Car Detail',
    index: 1
  }, {
	title: 'New Car',
	index: 2
  }
]

class App extends Component {
	render() {
		return (
		<View style={styles.container}>
        
			<Navigator
				initialRoute={routes[0]}
				initialRouteStack={routes}
				renderScene={
					(route, navigator) => {
						switch (route.index) {
							case 0: return (<CarList navigator={navigator} route={routes[route.index]} {...route.passProps}></CarList>);
							case 1: return (<CarDetail navigator={navigator} route={routes[route.index]} {...route.passProps}></CarDetail>);
							case 2: return (<NewCar navigator={navigator} route={routes[route.index]} {...route.passProps}></NewCar>);
						}
					}
				}
				configureScene={
					(route, routeStack) =>
						Navigator.SceneConfigs.FloatFromBottom
				}
				navigationBar={
					<Navigator.NavigationBar
						routeMapper={{
							LeftButton: (route, navigator, index, navState) => {
								if (route.index == 0){
									return null;
								}
								return (
									<TouchableHighlight onPress={()=>navigator.pop()}>
										<Text style={styles.navigationBarText}>Back</Text>
									</TouchableHighlight>
								)
							},
							RightButton: (route, navigator, index, navState) => { return null; },
							Title: (route, navigator, index, navState) =>
								{ return (<Text style={[styles.navigationBarText, styles.titleText]}>{routes[route.index].title}</Text>);},
						}}
				style={styles.navigationBar}
					/>
				}
			/>
		</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	navigationBar:{
		backgroundColor: 'teal',
	},
	navigationBarText:{
		color: 'white',
		padding: 10,
		fontSize: 15
	},
	titleText:{
		fontSize: 20,
		paddingTop:5
	}
});

AppRegistry.registerComponent('LabCars', () => App);