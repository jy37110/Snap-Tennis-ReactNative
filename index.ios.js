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
import LeagueInfo from './src/screen/LeagueInfo';
import LeagueInfoVenueMap from './src/screen/LeagueInfoVenueMap';
import CreateSchedule from './src/screen/CreateSchedule';
import EditSchedule from './src/screen/EditSchedule';
import LeagueResult from './src/screen/LeagueResult';
import LeagueReview from './src/screen/LeagueReview';
import PlayerInfo from './src/screen/PlayerInfo';
import { MenuContext } from 'react-native-popup-menu';

const App = StackNavigator({
    Home: {screen: HomeScreen},
    Map: {screen: MapScreen},
    VenueDetail: {screen: VenueDetail},
    CalendarPage: {screen: CalendarScreen},
    RegisterLeague: {screen: RegisterLeague},
    LeagueInfo: {screen: LeagueInfo},
    LeagueInfoVenueMap: {screen: LeagueInfoVenueMap},
    CreateSchedule: {screen: CreateSchedule},
    EditSchedule:{screen: EditSchedule},
    LeagueResult:{screen: LeagueResult},
    LeagueReview:{screen: LeagueReview},
    PlayerInfo:{screen: PlayerInfo},
});

export default class nativeWebStorm extends Component {

  render() {
    return (
        <MenuContext>
            <App />
        </MenuContext>
    );
  }
}

AppRegistry.registerComponent('nativeWebStorm', () => nativeWebStorm);
