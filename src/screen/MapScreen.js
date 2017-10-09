import React, { Component } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import DynamoDb from '../utility/DynamoDb';
let MapView = require('react-native-maps');

export default class MapScreen extends Component {
    constructor(props){
        super(props);
        this.getCurrentUserLocationSuccess = this.getCurrentUserLocationSuccess.bind(this);
        navigator.geolocation.getCurrentPosition(this.getLatestUserLocationSuccess, this.getLatestUserLocationError, this.getLatestUserLocationOptions);
        this.id = navigator.geolocation.watchPosition(this.getCurrentUserLocationSuccess, this.getCurrentUserLocationError, this.getCurrentUserLocationOptions);

        let dbInstance = new DynamoDb();
        this.dbContext = dbInstance.getDbContext();
        this.scan = [];
        this.SEARCHING_RANGE = 0.15;
        this.state = {
            userLocation:{
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0.15,
                longitudeDelta: 0.15,
            },
            camera:{
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0.15,
                longitudeDelta: 0.15,
            },
            // markers:[],
            markers:[
                {title:"", suburb:"", latlng:{latitude:0, longitude:0,}, numberOfCourts:"", access:"", averageRating:"", condition:"", costPerHour:"", designation:"", region:"", address:""},
                {title:"", suburb:"", latlng:{latitude:0, longitude:0,}, numberOfCourts:"", access:"", averageRating:"", condition:"", costPerHour:"", designation:"", region:"", address:""},
                {title:"", suburb:"", latlng:{latitude:0, longitude:0,}, numberOfCourts:"", access:"", averageRating:"", condition:"", costPerHour:"", designation:"", region:"", address:""},
                {title:"", suburb:"", latlng:{latitude:0, longitude:0,}, numberOfCourts:"", access:"", averageRating:"", condition:"", costPerHour:"", designation:"", region:"", address:""},
                {title:"", suburb:"", latlng:{latitude:0, longitude:0,}, numberOfCourts:"", access:"", averageRating:"", condition:"", costPerHour:"", designation:"", region:"", address:""},
                {title:"", suburb:"", latlng:{latitude:0, longitude:0,}, numberOfCourts:"", access:"", averageRating:"", condition:"", costPerHour:"", designation:"", region:"", address:""},
                {title:"", suburb:"", latlng:{latitude:0, longitude:0,}, numberOfCourts:"", access:"", averageRating:"", condition:"", costPerHour:"", designation:"", region:"", address:""},
                {title:"", suburb:"", latlng:{latitude:0, longitude:0,}, numberOfCourts:"", access:"", averageRating:"", condition:"", costPerHour:"", designation:"", region:"", address:""},
                {title:"", suburb:"", latlng:{latitude:0, longitude:0,}, numberOfCourts:"", access:"", averageRating:"", condition:"", costPerHour:"", designation:"", region:"", address:""},
                {title:"", suburb:"", latlng:{latitude:0, longitude:0,}, numberOfCourts:"", access:"", averageRating:"", condition:"", costPerHour:"", designation:"", region:"", address:""},
                {title:"", suburb:"", latlng:{latitude:0, longitude:0,}, numberOfCourts:"", access:"", averageRating:"", condition:"", costPerHour:"", designation:"", region:"", address:""},
                {title:"", suburb:"", latlng:{latitude:0, longitude:0,}, numberOfCourts:"", access:"", averageRating:"", condition:"", costPerHour:"", designation:"", region:"", address:""},
                {title:"", suburb:"", latlng:{latitude:0, longitude:0,}, numberOfCourts:"", access:"", averageRating:"", condition:"", costPerHour:"", designation:"", region:"", address:""},
                {title:"", suburb:"", latlng:{latitude:0, longitude:0,}, numberOfCourts:"", access:"", averageRating:"", condition:"", costPerHour:"", designation:"", region:"", address:""},
                {title:"", suburb:"", latlng:{latitude:0, longitude:0,}, numberOfCourts:"", access:"", averageRating:"", condition:"", costPerHour:"", designation:"", region:"", address:""},
                {title:"", suburb:"", latlng:{latitude:0, longitude:0,}, numberOfCourts:"", access:"", averageRating:"", condition:"", costPerHour:"", designation:"", region:"", address:""},
                {title:"", suburb:"", latlng:{latitude:0, longitude:0,}, numberOfCourts:"", access:"", averageRating:"", condition:"", costPerHour:"", designation:"", region:"", address:""},
                {title:"", suburb:"", latlng:{latitude:0, longitude:0,}, numberOfCourts:"", access:"", averageRating:"", condition:"", costPerHour:"", designation:"", region:"", address:""},
                {title:"", suburb:"", latlng:{latitude:0, longitude:0,}, numberOfCourts:"", access:"", averageRating:"", condition:"", costPerHour:"", designation:"", region:"", address:""},
                {title:"", suburb:"", latlng:{latitude:0, longitude:0,}, numberOfCourts:"", access:"", averageRating:"", condition:"", costPerHour:"", designation:"", region:"", address:""},
                ]
        };
    }

    static navigationOptions = {
        title: 'Find a Tennis Court',
    };

    onRegionChange = (region) =>{
        this.setState({camera:region})
    };

    getCurrentUserLocationSuccess(pos) {
        let crd = pos.coords;
        console.log('Congratulations, you reached the target');
        navigator.geolocation.clearWatch(this.id);
        this.setState({
            userLocation:{
                latitude: crd.latitude,
                longitude: crd.longitude,
                latitudeDelta: 0.15,
                longitudeDelta: 0.15,
            },
            camera:{
                latitude: crd.latitude,
                longitude: crd.longitude,
                latitudeDelta: 0.2,
                longitudeDelta: 0.2,
            },
        });
        this.scanNearbyVenue();

    }
    getCurrentUserLocationError(err) {
        console.warn('ERROR(' + err.code + '): ' + err.message);
    }
    getCurrentUserLocationOptions = {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0,
    };

    getLatestUserLocationOptions = {
        enableHighAccuracy: true,
        timeout: 5000,
    };

    getLatestUserLocationSuccess = (pos) => {
        let crd = pos.coords;
        this.setState({
            userLocation:{
                latitude: crd.latitude,
                longitude: crd.longitude,
                latitudeDelta: 0.15,
                longitudeDelta: 0.15,
            },
            camera:{
                latitude: crd.latitude,
                longitude: crd.longitude,
                latitudeDelta: 0.2,
                longitudeDelta: 0.2,
            },
        });
        this.scanNearbyVenue();
        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
    };

    getLatestUserLocationError = (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    scanNearbyVenue(){
        let params = {
            TableName:"NZVenues",
            ProjectionExpression:"#N, cost_per_hour, latitude, longitude, suburb, access, " +
            "average_rating, condition_description, designation, full_address, num_courts, #Reg",
            FilterExpression: "latitude between :la1 and :la2 and longitude between :lo1 and :lo2",
            ExpressionAttributeNames:{
                "#N": "name",
                "#Reg": "region"
            },
            ExpressionAttributeValues: {
                ":la1":(this.state.userLocation.latitude + this.SEARCHING_RANGE).toString(),
                ":la2":(this.state.userLocation.latitude - this.SEARCHING_RANGE).toString(),
                ":lo1":(this.state.userLocation.longitude - this.SEARCHING_RANGE).toString(),
                ":lo2":(this.state.userLocation.longitude + this.SEARCHING_RANGE).toString(),
            }
        };
        let onScan = (err, data) => {
            if (err) {
                this.scan = "Something wrong" + err;
            } else {
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
                    this.scan.push(temp);
                });
                this.setState({markers:this.scan})
            }
        };
        this.dbContext.scan(params, onScan);
    }

    // componentWillReceiveProps(nextProps) {
    //     this.setState({
    //         markers: nextProps.markers
    //     })
    // }

    render() {
        const { navigate } = this.props.navigation;
        let markers = this.state.markers||[];
        let userLocation = this.state.userLocation || {latitude:0, longitude:0};
        return (
            <View style={this.styles.MapContainer}>
                <MapView
                    style={this.styles.Map}
                    region={this.state.camera}
                    onRegionChange={this.onRegionChange}
                >
                    <View style={this.styles.MarkerWrapper}>
                        <MapView.Marker
                            coordinate={userLocation}
                            title="Me"
                            description={userLocation.latitude + ", " + userLocation.longitude}
                            pinColor="#00BFFF"
                        />
                        {markers.map((marker,i) =>(
                            <MapView.Marker
                                key={i}
                                coordinate={marker.latlng}
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
                            >
                            </MapView.Marker>
                        ))}
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