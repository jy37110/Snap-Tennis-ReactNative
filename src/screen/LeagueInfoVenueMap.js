import React, { Component } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import DynamoDb from '../utility/DynamoDb';
let MapView = require('react-native-maps');

export default class LeagueInfoVenueMap extends Component {
    constructor(props){
        super(props);
        this.getVenueLocation = this.getVenueLocation.bind(this);
        this.params = this.props.navigation.state;
        this.venueName = this.params.params.venueName;
        let dbInstance = new DynamoDb();
        this.dbContext = dbInstance.getDbContext();
        this.state = {
            venueLocation: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0.15,
                longitudeDelta: 0.15,
            },
            camera: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0.15,
                longitudeDelta: 0.15,
            },
            markers:[
                {title:"", suburb:"", latlng:{latitude:0, longitude:0}, numberOfCourts:"", access:"", averageRating:"", condition:"", costPerHour:"", designation:"", region:"", address:""}
                ]
        };
        this.getVenueLocation(this.venueName);
    }

    static navigationOptions = {
        title: 'Venue',
    };

    getVenueLocation(venueName){
        let params = {
            TableName:"NZVenues",
            ProjectionExpression:"#N, cost_per_hour, latitude, longitude, suburb, access, " +
            "average_rating, condition_description, designation, full_address, num_courts, #Reg",
            FilterExpression: "#N = (:venue)",
            ExpressionAttributeNames:{
                "#N": "name",
                "#Reg": "region"
            },
            ExpressionAttributeValues: {
                ":venue":venueName.toString(),
            }
        };
        let scanResult = [];
        let onScan = (err, data) => {
            if (err) {
                alert(err);
                scanResult = "Something wrong" + err;
            } else {
                if(data.Items.length > 0){
                    data.Items.forEach((value) => {
                        let  temp = {
                            name: value.name,
                            suburb: value.suburb,
                            latlng: {
                                latitude: Number(value.latitude),
                                longitude: Number(value.longitude)
                            },
                            costPerHour: value.cost_per_hour.toString(),
                            access: value.access,
                            averageRating: value.average_rating.toString(),
                            condition: value.condition_description,
                            designation: value.designation,
                            address: value.full_address,
                            numberOfCourts: value.num_courts.toString(),
                            region: value.region,
                        };
                        scanResult.push(temp);
                    });

                    this.setState({
                        markers:scanResult[0],
                        venueLocation:{
                            latitude: scanResult[0].latlng.latitude,
                            longitude: scanResult[0].latlng.longitude,
                            latitudeDelta: 0.15,
                            longitudeDelta: 0.15,
                        },
                        camera:{
                            latitude: scanResult[0].latlng.latitude,
                            longitude: scanResult[0].latlng.longitude,
                            latitudeDelta: 0.2,
                            longitudeDelta: 0.2,
                        },
                    })
                } else {
                    alert(this.venueName + " is not found")
                }
            }
        };
        this.dbContext.scan(params, onScan);
    }

    render() {
        const { navigate } = this.props.navigation;
        let marker = this.state.markers||[];
        return (
            <View style={this.styles.MapContainer}>
                <MapView
                    style={this.styles.Map}
                    region={this.state.camera}
                    onRegionChange={this.onRegionChange}
                >
                    <View style={this.styles.MarkerWrapper}>
                        <MapView.Marker
                            coordinate={this.state.venueLocation}
                            title={marker.name}
                            description={"Cost per hour: " + marker.costPerHour}
                            pinColor="red"
                            onCalloutPress={() => navigate('VenueDetail', {
                                latitude: marker.latlng.latitude,
                                longitude: marker.latlng.longitude,
                                name: marker.name,
                                numberOfCourts: marker.numberOfCourts,
                                access: marker.access,
                                averageRating: marker.averageRating,
                                condition: marker.condition,
                                costPerHour: marker.costPerHour,
                                designation: marker.designation,
                                suburb: marker.suburb,
                                region: marker.region,
                                address: marker.address,
                            })}
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
        MarkerWrapper:{
            height:50,
            width: 50,
        }
    });
}