import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    FlatList,
    TextInput
} from 'react-native';

// let AWS = require('aws-sdk/dist/aws-sdk-react-native');
//
// AWS.config.update({
//     region: "ap-southeast-2",
//     accessKeyId: "AKIAIUYAFSVXA5O3JHFA",
//     secretAccessKey: "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",
//     serviceName: "execute-api"
// });

let apigClientFactory = require('aws-api-gateway-client').default;


let apigClient = apigClientFactory.newClient({
    accessKey: 'AKIAIUYAFSVXA5O3JHFA',
    secretKey: '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',
    region: 'ap-southeast-2', // OPTIONAL: The region where the API is deployed, by default this parameter is set to us-east-1
    invokeUrl:'https://5bumlvpr9a.execute-api.ap-southeast-2.amazonaws.com/prod/nodeAPI'
});

// let config = {invokeUrl:'https://5bumlvpr9a.execute-api.ap-southeast-2.amazonaws.com/prod/dynamoPublic'}
// let apigClient = apigClientFactory.newClient(config);

let params = {
    //TableName: "User"
    //This is where any header, path, or querystring request params go. The key is the parameter named as defined in the API
    //queryString: 'User',
};
// Template syntax follows url-template https://www.npmjs.com/package/url-template
let pathTemplate = '';
let method = 'POST';
let additionalParams = {
    //If there are any unmodeled query parameters or headers that need to be sent with the request you can add them here
    headers: {
        //param0: '',
        //param1: ''
    },
    queryParams: {
        TableName: 'User',
        //param1: ''
        //queryString: "User"
    }
};
let body = {
    //This is where you define the body of the request
};


export default class LambdaData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: []
        };
    }

    onPressGetUsers = () => {
        apigClient.invokeApi(params, pathTemplate, method, additionalParams, body)
            .then((result) => {
                //alert(JSON.stringify(result));
                //alert(result.data.Items[0].Name);
                let items = [];
                for(let i = 0; i < result.data.Items.length; i++){
                    items.push({
                        key: result.data.Items[i].Name,
                        id: result.data.Items[i].Id
                    });
                }
                this.setState({item:items});
            }).catch( function(result){
            alert(result);
        });
    };

    static navigationOptions = {
        title: 'Lambda',
    };
    render(){
        return(
            <View style={this.styles.container}>
                <Text>
                    Get all Users in Dynamo through lambda API
                </Text>
                <Button
                    onPress={this.onPressGetUsers}
                    title="Get Users"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />
                <FlatList
                    // data={[
                    //     {key: 'Devin'},
                    //     {key: 'Jackson'},
                    //     {key: 'James'},
                    //     {key: 'Joel'},
                    //     {key: 'John'},
                    //     {key: 'Jillian'},
                    //     {key: 'Jimmy'},
                    //     {key: 'Julie'},
                    // ]}
                    data = {this.state.item}
                    renderItem={({item}) => <Text style={this.styles.item}>ID: {item.id}    Name: {item.key}</Text>}
                />
                <Text>

                </Text>
            </View>
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