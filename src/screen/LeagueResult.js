import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
} from 'react-native';

export default class LeagueResult extends Component{
    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
    }

    static navigationOptions = {
        title: "League Ranking",
    };

    render(){
        return (
            <ScrollView style={this.styles.calendarContainer}>
                <Text style={this.styles.text}>
                    League Ranking:
                </Text>
                <Text style={this.styles.text}>
                    LeagueId: {this.params.leagueId}
                </Text>
            </ScrollView>
        )
    }
    styles = StyleSheet.create({
        calendarContainer:{
            padding:10,
        },
        text:{

        },

    });
}