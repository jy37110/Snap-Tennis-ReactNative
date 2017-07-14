import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    FlatList,
} from 'react-native';

export default class LeagueInfo extends Component {
    constructor(props){
        super(props);
    }

    static navigationOptions = {
        title: 'My Leagues',
    };

    render() {
        const { params } = this.props.navigation.state;
        return (
            <ScrollView style={this.styles.VenueDetailContainer}>
                <Text style={this.styles.title}>My leagues page</Text>
                <Text style={this.styles.text}>{params.id}</Text>
            </ScrollView>
        )
    }
    styles = StyleSheet.create({
        VenueDetailContainer:{
            flex:1,
            flexDirection:'column',
        },
        title:{
            textAlign: 'center',
            marginTop: 20,
            marginBottom: 10,
            fontSize: 18,
            fontWeight: 'bold',
            color: 'grey'
        },
        text:{
            marginTop: 10,
            fontSize: 13,
            color:'grey'
        },
    });
}