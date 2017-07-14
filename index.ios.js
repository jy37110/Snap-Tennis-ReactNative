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
import VenueDetail from './src/screen/VenueDetail';
import CalendarScreen from './src/screen/CalendarScreen';
import RegisterLeague from './src/screen/RegisterLeague';


const App = StackNavigator({
    Home: {screen: HomeScreen},
    Map: {screen: MapScreen},
    VenueDetail: {screen: VenueDetail},
    Test: {screen: CalendarScreen},
    RegisterLeague: {screen: RegisterLeague},
});

export default class nativeWebStorm extends Component {
  render() {
    return (
        <App />
    );
  }
}

AppRegistry.registerComponent('nativeWebStorm', () => nativeWebStorm);
