import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import {
    StackNavigator,
} from 'react-navigation';
import HomeScreen from "./src/screen/HomeScreen";
import MapScreen from "./src/screen/MapScreen";
import VenueDetail from './src/screen/VenueDetail';
import CalendarScreen from './src/screen/CalendarScreen';
import RegisterLeague from './src/screen/RegisterLeague';
import LeagueInfo from './src/screen/LeagueInfo';



const App = StackNavigator({
    Home: {screen: HomeScreen},
    Map: {screen: MapScreen},
    VenueDetail: {screen: VenueDetail},
    Test: {screen: CalendarScreen},
    RegisterLeague: {screen: RegisterLeague},
    LeagueInfo: {screen: LeagueInfo},

});

export default class nativeWebStorm extends Component {
  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('nativeWebStorm', () => nativeWebStorm);
