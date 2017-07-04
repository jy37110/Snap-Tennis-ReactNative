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
            userId: '1',
            userName:[]
        };
    }

    docClient = new AWS.DynamoDB.DocumentClient();

    readItem() {
        let params = {
            TableName:"NZVenues",
            ProjectionExpression:"#N, cost_per_hour, latitude, longitude",
            FilterExpression: "latitude between :la1 and :la2 and longitude between :lo1 and :lo2",
            ExpressionAttributeNames:{
                "#N": "name"
            },
            ExpressionAttributeValues: {
                ":la1":(-36.7814943 + 0.15).toString(),
                ":la2":(-36.7814943 - 0.15).toString(),
                ":lo1":(174.70117935 - 0.15).toString(),
                ":lo2":(174.70117935 + 0.15).toString(),
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