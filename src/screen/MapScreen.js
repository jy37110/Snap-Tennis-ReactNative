import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput
} from 'react-native';
let MapView = require('react-native-maps');

export default class MapScreen extends React.Component {
    static navigationOptions = {
        title: 'Map',
    };

    render() {
        return (
            <View style={this.styles.MapContainer}>
                <MapView
                    style={this.styles.Map}
                    initialRegion={{
                        latitude: -36.732770,
                        longitude: 174.701630,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                </MapView>
            </View>
            )
    }
    styles = StyleSheet.create({
        Map:{
            ...StyleSheet.absoluteFillObject,
        },
        MapContainer:{
            ...StyleSheet.absoluteFillObject,
            height: 400,
            width: 400,
            justifyContent: 'flex-end',
            alignItems: 'center',
        }
    });

}