import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Snap Tennis',
    };
    render() {

        const buttons = [{
                key: 1,
                title: 'Get data from dynamo',
                action: () => {navigate('DynamoData', { name: 'Jane' })},
            },
            {
                key: 2,
                title: 'Get data from lambda',
                action: () => {navigate('LambdaData')},
            },
            {
                key: 3,
                title: 'User Profile',
                action: () => {},
            },
            {
                key: 4,
                title: 'Your Local Leagues',
                action: () => {},
            },
            {
                key: 5,
                title: 'Find a Tennis Court',
                action: () => {navigate('Map')},
            },
            {
                key: 6,
                title: 'Updates',
                action: () => {},
            },
        ];

        const { navigate } = this.props.navigation;
        const renderedButtons = buttons.map(b => {
            return <Button key={b.key} title={b.title} onPress={b.action} style={this.styles.Buttons}/>;
        });
        return (
            <View style={this.styles.Container}>

                {renderedButtons}
                <Text style={this.styles.Text}>
                    Currently 1000 people have joined to this app! {'\n'}
                    100 people have joined in your Albany region!
                </Text>


            </View>

        );
    }
    styles = StyleSheet.create({
        Container: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: '#F5FCFF',
            //...StyleSheet.absoluteFillObject,
        },
        Buttons:{
            margin: 20,
        },
        Text:{
            fontSize: 14,
            justifyContent: 'flex-end',
            margin: 20,
        },
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