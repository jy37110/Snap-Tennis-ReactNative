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
    accessKeyId: "AKIAIUYAFSVXA5O3JHFA",
    secretAccessKey: "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"
});

export default class DynamoData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '1',
            userName: ''
        };
    }

    docClient = new AWS.DynamoDB.DocumentClient();

    readItem() {
        let table = "User";
        let id = this.state.userId;

        let params = {
            TableName: table,
            Key:{
                "Id": id
            }
        };
        this.docClient.get(params, (err, data) => {
            if (err) {
                this.setState({userName:"Something was wrong"});
            } else {
                if (JSON.stringify(data) === "{}"){
                    this.setState({userName:"no user was found"});
                } else {
                    this.setState({userName:data.Item.Name});
                }
            }
        });
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
                <Text style={styles.instructions}>
                    {this.state.userName}
                </Text>
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