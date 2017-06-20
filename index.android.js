/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
    StackNavigator,
} from 'react-navigation';
import HomeScreen from "./src/screen/HomeScreen";
import MapScreen from "./src/screen/MapScreen";


const App = StackNavigator({
    Home: { screen: HomeScreen },
    Map: { screen: MapScreen},

});

export default class nativeWebStorm extends Component {
  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('nativeWebStorm', () => nativeWebStorm);
