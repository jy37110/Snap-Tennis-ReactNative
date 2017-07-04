import React, { Component } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
let MapView = require('react-native-maps');
let AWS = require('aws-sdk/dist/aws-sdk-react-native');


export default class MapScreen extends Component {
    constructor(props){
        super(props);
        navigator.geolocation.getCurrentPosition(this.getUserLocationSuccess, this.getUserLocationError, this.getUserLocationOptions);
        AWS.config.update({
            region: "ap-southeast-2",
            accessKeyId: "AKIAJIRM3S2OV5EJHKLA",
            secretAccessKey: "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"
        });
        this.docClient = new AWS.DynamoDB.DocumentClient();
        this.scan = [];
        this.SEARCHING_RANGE = 0.1;
        this.state = {
            userLocation:{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.15,
                longitudeDelta: 0.15,
            },
            camera:{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.15,
                longitudeDelta: 0.15,
            },
            // markers:[],
            markers:[
                {title:"name1", suburb:"northcode1", latlng:{latitude:-10, longitude:10,}, description:"0"},
                {title:"name1", suburb:"northcode1", latlng:{latitude:-10, longitude:10,}, description:"0"},
                {title:"name1", suburb:"northcode1", latlng:{latitude:-10, longitude:10,}, description:"0"},
                {title:"name1", suburb:"northcode1", latlng:{latitude:-10, longitude:10,}, description:"0"},
                {title:"name1", suburb:"northcode1", latlng:{latitude:-10, longitude:10,}, description:"0"},
                {title:"name1", suburb:"northcode1", latlng:{latitude:-10, longitude:10,}, description:"0"},
                {title:"name1", suburb:"northcode1", latlng:{latitude:-10, longitude:10,}, description:"0"},
                {title:"name1", suburb:"northcode1", latlng:{latitude:-10, longitude:10,}, description:"0"},
                {title:"name1", suburb:"northcode1", latlng:{latitude:-10, longitude:10,}, description:"0"},
                {title:"name1", suburb:"northcode1", latlng:{latitude:-10, longitude:10,}, description:"0"},
                {title:"name1", suburb:"northcode1", latlng:{latitude:-10, longitude:10,}, description:"0"},
                {title:"name1", suburb:"northcode1", latlng:{latitude:-10, longitude:10,}, description:"0"},
                {title:"name1", suburb:"northcode1", latlng:{latitude:-10, longitude:10,}, description:"0"},
                {title:"name1", suburb:"northcode1", latlng:{latitude:-10, longitude:10,}, description:"0"},
                {title:"name1", suburb:"northcode1", latlng:{latitude:-10, longitude:10,}, description:"0"},
                {title:"name1", suburb:"northcode1", latlng:{latitude:-10, longitude:10,}, description:"0"},
                {title:"name1", suburb:"northcode1", latlng:{latitude:-10, longitude:10,}, description:"0"},
                {title:"name1", suburb:"northcode1", latlng:{latitude:-10, longitude:10,}, description:"0"},
                {title:"name1", suburb:"northcode1", latlng:{latitude:-10, longitude:10,}, description:"0"},
                {title:"name1", suburb:"northcode1", latlng:{latitude:-10, longitude:10,}, description:"0"},
                {title:"name1", suburb:"northcode1", latlng:{latitude:-10, longitude:10,}, description:"0"},
                {title:"name1", suburb:"northcode1", latlng:{latitude:-10, longitude:10,}, description:"0"},
                {title:"name1", suburb:"northcode1", latlng:{latitude:-10, longitude:10,}, description:"0"},
                {title:"name1", suburb:"northcode1", latlng:{latitude:-10, longitude:10,}, description:"0"},
                {title:"name1", suburb:"northcode1", latlng:{latitude:-10, longitude:10,}, description:"0"},
            ],
        };
    }

    static navigationOptions = {
        title: 'Find a Tennis Court',
    };

    getUserLocationOptions = {
        enableHighAccuracy: true,
        timeout: 5000,
    };

    onRegionChange = (region) =>{
      this.setState({camera:region})
    };

    getUserLocationSuccess = (pos) => {
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
            title:'Latitude: ' + crd.latitude + ' Longitude: ' + crd.longitude,
        });
        this.scanNearbyVenue();
        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
    };

    getUserLocationError = (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    };
    
    scanNearbyVenue(){
        let params = {
            TableName:"NZVenues",
            ProjectionExpression:"#N, cost_per_hour, latitude, longitude, suburb",
            FilterExpression: "latitude between :la1 and :la2 and longitude between :lo1 and :lo2",
            ExpressionAttributeNames:{
                "#N": "name"
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
                        title:value.name,
                        suburb:value.suburb,
                        latlng:{
                            latitude:Number(value.latitude),
                            longitude:Number(value.longitude),
                        },
                        description:value.cost_per_hour.toString()
                    };
                    this.scan.push(temp);
                });
                this.setState({markers:this.scan})
            }
        };
        this.docClient.scan(params, onScan);
    }

    // componentWillReceiveProps(nextProps) {
    //     this.setState({
    //         markers: nextProps.markers
    //     })
    // }

    render() {
        let markers = this.state.markers||[];
        return (
            <View style={this.styles.MapContainer}>
                <MapView
                    style={this.styles.Map}
                    region={this.state.camera}
                    onRegionChange={this.onRegionChange}
                >
                    <View style={this.styles.MarkerWrapper}>
                        <MapView.Marker
                            coordinate={this.state.userLocation}
                            title="Me"
                            description={this.state.userLocation.latitude + ", " + this.state.userLocation.longitude}
                            pinColor="#00BFFF"
                        />
                        {markers.map((marker,i) =>(
                            <MapView.Marker
                                key={i}
                                coordinate={marker.latlng}
                                title={marker.title}
                                description={"Cost per hour: " + marker.description}
                                pinColor="red"
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
        Marker:{

        },
        MarkerWrapper:{
            height:50,
            width: 50,
        }
    });

}