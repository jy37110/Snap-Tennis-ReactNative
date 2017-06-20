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
    constructor(props){
        super(props);
        this.state = {
            mainMarker:{
                coordinates:{
                    latitude:-36.7271676,
                    longitude:174.6970001
                },
                title:'Albany Domain',
            }
        };
        navigator.geolocation.getCurrentPosition(this.success, this.error, this.options);
    }
    static navigationOptions = {
        title: 'Find a Tennis Court',
    };

    options = {
        enableHighAccuracy: true,
        timeout: 5000,
    };

    success = (pos) => {
        let crd = pos.coords;
        this.setState({
            mainMarker:{
                coordinates:{
                    latitude:crd.latitude,
                    longitude:crd.longitude
                },
                title:'I am here. Latitude: ' + crd.latitude + ' Longitude: ' + crd.longitude
            }
        });
        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
    };

    error = (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    render() {
        //navigator.geolocation.getCurrentPosition(this.success, this.error, this.options);
        return (
            <View style={this.styles.MapContainer}>
                <MapView
                    style={this.styles.Map}
                    initialRegion={{
                        latitude: this.state.mainMarker.coordinates.latitude,
                        longitude: this.state.mainMarker.coordinates.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <View style={this.styles.MarkerWrapper}>
                        <MapView.Marker
                            style={this.styles.Marker}
                            coordinate={this.state.mainMarker.coordinates}
                            title={this.state.mainMarker.title}
                            image={require('../image/single.png')}
                        />
                    </View>

                </MapView>
            </View>
            )
    }
    styles = StyleSheet.create({
        Map:{
            ...StyleSheet.absoluteFillObject,
            flex: 1,
        },
        MapContainer:{
            ...StyleSheet.absoluteFillObject,
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
        Marker:{
            height: 20,
            width: 20,
        },
        MarkerWrapper:{
            height:50,
            width: 50,
        }
    });

}