import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Switch,
    ScrollView,
} from 'react-native';

export default class RegisterLeague extends Component {
    constructor(props){
        super(props);
        this.state = {
            userId:"62c88ffd-019b-4bbb-8d17-69427c669ae5",
            ongoingLeague:[
                {id:'efaa0eb1-362c-4e3b-a514-16be15599be0', description:"Auckland, closes 30 Sun Jul 00"},
                {id:'d4e503e8-e686-4146-8a2c-eb141333a22c', description:"Auckland, closes 05 Sat Aug 00"}
            ],
            completeLeague:[
                {id:'7c22869c-f29a-4453-b1ab-c8650623c8a7', description:"Auckland, closed 30 Thu Mar 00"}
            ],
            switchValue: "No",
        }
    }

    static navigationOptions = {
        title: 'Play Local League',
    };

    render() {
        return (
            <ScrollView style={this.styles.RegisterLeagueContainer}>
                <View style={{flex: 1, flexDirection:'row'}}>
                    <Text style={this.styles.title}>Register for Local League</Text>
                    <Switch
                        style={this.styles.switchBar}
                        onValueChange={(value) => this.setState({switchValue: value ? "Yes" : "No"})}
                        value = {this.state.switchValue === "Yes"}
                    />
                    <Text style={{fontSize: 13, color: 'grey', marginLeft: 10, marginTop: 5}}>
                        {this.state.switchValue}
                    </Text>
                </View>
                <View style={this.styles.ongoingLeagueContainer}>
                    <Text style={this.styles.subTitle}>
                        {this.state.ongoingLeague.length > 0 ? "Current ongoing leagues:" : "Currently no on going leagues"}
                    </Text>
                    {this.state.ongoingLeague.map((eachLeague, i) =>{
                        return(
                            <Text
                                style={this.styles.text}
                                key={i}
                            >
                                {"(" + (i+1).toString() + ") " + eachLeague.description}
                            </Text>
                            )
                    })}
                </View>
                <View style={this.styles.completeLeagueContainer}>
                    <Text style={this.styles.subTitle}>
                        {this.state.completeLeague.length > 0 ? "Your completed leagues:" : "Currently no completed leagues"}
                    </Text>
                    {this.state.completeLeague.map((eachLeague, i) =>{
                        return(
                            <Text
                                style={this.styles.text}
                                key={i}
                            >
                                {"(" + (i+1).toString() + ") " + eachLeague.description}
                            </Text>
                        )
                    })}
                </View>

            </ScrollView>
        )
    }
    styles = StyleSheet.create({
        RegisterLeagueContainer:{
            flex:1,
            flexDirection:'column',
            padding:20,
        },
        switchBar:{
            marginLeft: 20
        },
        title:{
            marginTop: 4,
            fontSize: 15,
            fontWeight: 'bold',
            color: 'black'
        },
        subTitle:{
            marginTop: 4,
            fontSize: 13,
            color: 'black'
        },
        text:{
            marginTop: 10,
            fontSize: 13,
            color:'grey'
        },
        ongoingLeagueContainer:{
            marginTop: 20,
        },
        completeLeagueContainer:{
            marginTop: 20,
        },
    });
}