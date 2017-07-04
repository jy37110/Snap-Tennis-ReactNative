import React, { Component } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

let MapView = require('react-native-maps');

export default class mapMarker extends React.Component {

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <MapView.Marker
                key={this.props.markers[0].name + this.props.markers[0].suburb}
                coordinate={this.props.markers[0].location}
                title={this.props.markers[0].name}
                description={this.props.markers[0].cost_per_hour}
                pinColor="red"
            />
        )
    }

    styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: '#F5FCFF',
        },
        Buttons:{
            margin: '20',
        },
        item: {
            padding: 10,
            fontSize: 18,
            height: 44,
        },
    });
}