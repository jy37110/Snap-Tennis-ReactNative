import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput
} from 'react-native';
import dynamoDB from '../utility/dynamoDB';
import mapMarker from '../components/mapMarker'
let MapView = require('react-native-maps');
let AWS = require('aws-sdk/dist/aws-sdk-react-native');


export default class MapScreen extends React.Component {
    constructor(props){
        super(props);
        this.scanVenue = this.scanVenue.bind(this);
        this.scan = [];
        this.state = {
            myLocation:{
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
            title:"",
            searchingRange:{
                latitudeFrom:0,
                latitudeTo:0,
                longitudeFrom:0,
                longitudeTo:0,
            },
            testLocation:{
                latitude: -36.8154538,
                longitude: 174.7410773,
            },
            // markers:[{
            //     title:"name1",
            //     suburb:"northcode1",
            //     latlng:{
            //         latitude:-36.8154538,
            //         longitude:174.7410773,
            //     },
            //     description:"0"
            // },{
            //     title:"name2",
            //     suburb:"northcode2",
            //     latlng:{
            //         latitude:-36.78149,
            //         longitude:174.70118,
            //     },
            //     description:"0"
            // }],
            markers:[],
        };
        navigator.geolocation.getCurrentPosition(this.success, this.error, this.options);
        AWS.config.update({
            region: "ap-southeast-2",
            accessKeyId: "AKIAJIRM3S2OV5EJHKLA",
            secretAccessKey: "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"
        });
        this.docClient = new AWS.DynamoDB.DocumentClient();
    }
    SEARCHING_RANGE = 0.15;
    static navigationOptions = {
        title: 'Find a Tennis Court',
    };

    options = {
        enableHighAccuracy: true,
        timeout: 5000,
    };

    onRegionChange = (region) =>{
      this.setState({camera:region})
    };

    success = (pos) => {
        let crd = pos.coords;
        this.setState({
            myLocation:{
                latitude: crd.latitude,
                longitude: crd.longitude,
                latitudeDelta: 0.15,
                longitudeDelta: 0.15,
            },
            camera:{
                latitude: crd.latitude,
                longitude: crd.longitude,
                latitudeDelta: 0.15,
                longitudeDelta: 0.15,
            },
            title:'Latitude: ' + crd.latitude + ' Longitude: ' + crd.longitude,
            searchingRange:{
                latitudeFrom: crd.latitude - this.SEARCHING_RANGE,
                latitudeTo: crd.latitude + this.SEARCHING_RANGE,
                longitudeFrom: crd.longitude - this.SEARCHING_RANGE,
                longitudeTo: crd.longitude + this.SEARCHING_RANGE,
            }
        });
        this.scanVenue();
        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
    };

    error = (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    // test1 =() =>{
    //     // this.setState({scanResult:[{name:"name",suburb:"albany",latitude:"-36.8154538",longitude:"174.7410773",cost_per_hour:0}]});
    //     // alert(JSON.stringify(this.state.markers[3]));
    //     this.setState({
    //         markers:[{
    //             title:"name1",
    //             suburb:"northcode1",
    //             latlng:{
    //                 latitude:-36.8154538,
    //                 longitude:174.7410773,
    //             },
    //             description:"0"
    //         },{
    //             title:"name2",
    //             suburb:"northcode2",
    //             latlng:{
    //                 latitude:-36.8154538 + 0.02,
    //                 longitude:174.7410773 - 0.02,
    //             },
    //             description:"0"
    //         }]
    //     })
    //     // this.setState({
    //     //     scanResult:this.scan
    //     // })
    // };
    //
    // test2 = ()=> {
    //     this.setState({markers:[{
    //         title:"name1",
    //         suburb:"northcode1",
    //         latlng:{
    //             latitude:-36.8154538,
    //             longitude:174.7410773,
    //         },
    //         description:"0"
    //     }]})
    // };
    //
    // test3 = () => {
    //     this.setState({markers:this.scan})
    // };
    //
    // test4 = () => {
    //     this.setState({markers:[]})
    // };

    scanVenue(){
        let params = {
            TableName:"NZVenues",
            ProjectionExpression:"#N, cost_per_hour, latitude, longitude, suburb",
            FilterExpression: "latitude between :la1 and :la2 and longitude between :lo1 and :lo2",
            ExpressionAttributeNames:{
                "#N": "name"
            },
            ExpressionAttributeValues: {
                ":la1":(-36.7814943 + 0.1).toString(),
                ":la2":(-36.7814943 - 0.1).toString(),
                ":lo1":(174.70117935 - 0.1).toString(),
                ":lo2":(174.70117935 + 0.1).toString(),
            }
        };

        let scanResult = [];
        let markers = [];

        let onScan = (err, data) => {
            if (err) {
                scanResult = "Something wrong" + err;
            } else {
                //this.scan = data.Items;
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

                // this.setState({
                //     markers: this.state.markers.concat(markers)
                // })


                // this.setState({
                //     scanResult:[this.state.scanResult, this.scan]
                // });
            }

            // this.setState({
            //     scanResult:this.scan
            // });
        };
        this.docClient.scan(params, onScan);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            markers: nextProps.markers
        })
    }

    render() {
        let markers = this.state.markers||[];
        //navigator.geolocation.getCurrentPosition(this.success, this.error, this.options);
        return (
            <View style={this.styles.MapContainer}>
                <MapView
                    style={this.styles.Map}
                    region={this.state.camera}
                    onRegionChange={this.onRegionChange}
                >
                    <View style={this.styles.MarkerWrapper}>
                        <MapView.Marker
                            coordinate={this.state.myLocation}
                            title="My Position:"
                            description={this.state.myLocation.latitude + ", " + this.state.myLocation.longitude}
                            pinColor="#00BFFF"
                        />
                        {/*{this.renderMarker()}*/}



                        {/*<MapView.Marker*/}
                            {/*coordinate={this.state.scanResult[0].location}*/}
                            {/*title={this.state.scanResult[0].name}*/}
                            {/*description={this.state.scanResult[0].cost_per_hour}*/}
                            {/*pinColor="red"*/}
                        {/*/>*/}

                        {markers.map((marker,i) =>(
                            <MapView.Marker
                                key={i}
                                coordinate={marker.latlng}
                                title={marker.title}
                                description={marker.description}
                                pinColor="red"
                            >
                                {/*<MapView.Callout>*/}
                                    {/*<View>*/}
                                        {/*<Text>{marker.latlng.latitude + ", " + marker.latlng.longitude}</Text>*/}
                                    {/*</View>*/}
                                {/*</MapView.Callout>*/}
                            </MapView.Marker>

                        ))}
                    </View>

                </MapView>
                {/*<Text onPress={this.test1}>test1</Text>*/}
                {/*<Text onPress={this.test2}>test2</Text>*/}
                {/*<Text onPress={this.test3}>test3</Text>*/}
                {/*<Text onPress={this.test4}>test4</Text>*/}
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