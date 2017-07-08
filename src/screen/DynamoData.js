import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput
} from 'react-native';

let AWS = require('aws-sdk/dist/aws-sdk-react-native');
AWS.config.update({
    region: "ap-southeast-2",
    accessKeyId: "AKIAJIRM3S2OV5EJHKLA",
    secretAccessKey: "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"
});

export default class DynamoData extends Component {
    constructor(props) {
        super(props);
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
                {title:"", suburb:"", latlng:{latitude:0, longitude:0,}, numberOfCourts:"", access:"", averageRating:"", condition:"", costPerHour:"", designation:"", region:"", address:""}]

        };
    }

    docClient = new AWS.DynamoDB.DocumentClient();

    readItem() {
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
                this.setState({userName:"Something wrong" + err});
            } else {
                this.setState({userName:"Right:" + JSON.stringify(data)});
                // this.setState({userName:data.Items});
                // alert(data.Items[0]);
            }
        };

        this.docClient.scan(params, onScan);

    }

    onPressGetUserName = () => {
        this.readItem();
    };

    static navigationOptions = {
        title: 'Dynamo',
    };

    render() {
        return (
            <View style={styles.container}>
              <Text style={styles.instructions}>
                Type user id to get user name
              </Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1, textAlign: 'center'}}

                    onChangeText={(text) => this.setState({userId:text})}
                    value={this.state.userId}
                />
              <Button
                  onPress={this.onPressGetUserName}
                  title="Get User Name"
                  color="#841584"
                  accessibilityLabel="Learn more about this purple button"
              />
                <Text style={styles.instructions} numberOfLines={50}>
                    {this.state.userName}
                </Text>
                <View>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },

    instructions: {
        fontSize: 18,
        textAlign: 'center',
        color: '#333333',
        margin: 10,
    },
});