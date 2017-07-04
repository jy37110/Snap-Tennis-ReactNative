import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import {
    StackNavigator,
} from 'react-navigation';
import HomeScreen from "./src/screen/HomeScreen";
import MapScreen from "./src/screen/MapScreen";
import DynamoData from "./src/screen/DynamoData";

const App = StackNavigator({
    Home: { screen: HomeScreen },
    Map: { screen: MapScreen},
    Test: {screen: DynamoData},
});

export default class nativeWebStorm extends Component {
  render() {
    return (
        <App />
    );
  }
}

AppRegistry.registerComponent('nativeWebStorm', () => nativeWebStorm);
