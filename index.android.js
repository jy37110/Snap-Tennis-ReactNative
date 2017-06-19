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
import DynamoData from "./src/screen/DynamoData";
import LambdaData from "./src/screen/LambdaData";
import MapScreen from "./src/screen/MapScreen";


const App = StackNavigator({
    Home: { screen: HomeScreen },
    DynamoData: { screen: DynamoData },
    LambdaData: { screen: LambdaData },
    // Map: { screen: MapScreen},
});

export default class nativeWebStorm extends Component {
  render() {
    return (
      //
      // <View style={styles.container}>
      //   <Text>
      //     hello
      //   </Text>
      //
      // </View>

      <App />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('nativeWebStorm', () => nativeWebStorm);
