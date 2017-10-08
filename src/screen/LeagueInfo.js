import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
} from 'react-native';
import UserService from "../utility/UserService";
import HomeScreen from "./HomeScreen";

export default class LeagueInfo extends Component {
    constructor(props){
        super(props);
        this.userId = HomeScreen.userId;
        this.params = this.props.navigation.state.params;
        this.state = {
            switchValue: "No",
            playerNameList: [],
        };
        this.playerNameArr = [];
        this.playerList = [];
        let userServiceInstance = new UserService();
        this.params.players.map((playerId) => {
            userServiceInstance.getUserFullName(playerId,(id,name) => {
                this.playerNameArr.push(name);
                this.playerList.push({playerId:id,playerName:name});
                this.setState({
                    playerNameList:this.playerNameArr
                })
            })
        });
        let currentDate = new Date();
        let leagueEndDate = new Date(this.params.endDate.substr(0,10).replace(/-/g,"/") + " 23:59:59");
        this.isCompletedLeague = currentDate > leagueEndDate;
    }

    static navigationOptions = {
        title: 'My Leagues',
    };

    renderSchedule = () => {
        const { navigate } = this.props.navigation;
        if (!this.isCompletedLeague){
            return(
                <View style={this.styles.eachTitleContainer}>
                    <View style={this.styles.eachTitle}>
                        <Image
                            style={this.styles.icon}
                            source={require('../image/calender.png')}
                        />
                        <Text style={this.styles.bodyTitleText}
                              onPress={()=>{navigate("CalendarPage",{params:this.params,playerList:this.playerList})}}
                        >Schedule Match</Text>
                    </View>
                </View>
            )
        }
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <ScrollView style={this.styles.LeagueInfoContainer}>
                <View style={this.styles.headerContainer}>
                    <View style={this.styles.dateContainer}>
                        <Text style={this.styles.headerTitleText}>
                            Start Date
                        </Text>
                        <Text style={this.styles.headerTitleText}>
                            End Date
                        </Text>
                    </View>
                    <View style={this.styles.dateContainer}>
                        <Text style={this.styles.headerText}>
                            {this.params.startDate.substr(0,10)}
                        </Text>
                        <Text style={this.styles.headerText}>
                            {this.params.endDate.substr(0,10)}
                        </Text>
                    </View>
                </View>

                <View style={this.styles.eachTitleContainer}>
                    <View style={this.styles.eachTitle}>
                        <Image
                            style={this.styles.icon}
                            source={require('../image/map_court.png')}
                        />
                        <Text style={this.styles.bodyTitleText}>Venues List:</Text>
                    </View>
                    <View style={this.styles.eachContentContainer}>
                        {this.params.venueList.map((item, i) => {
                            return(
                                <Text key={i}
                                      style={this.styles.eachLineOfContent}
                                      onPress={()=>{navigate("LeagueInfoVenueMap",{venueName:item})}}
                                >{item}</Text>
                            )
                        })}

                    </View>
                </View>

                <View style={this.styles.eachTitleContainer}>
                    <View style={this.styles.eachTitle}>
                        <Image
                            style={this.styles.icon}
                            source={require('../image/profile.png')}
                        />
                        <Text style={this.styles.bodyTitleText}>League Players List:</Text>
                    </View>
                    <View style={this.styles.eachContentContainer}>
                        {this.state.playerNameList.map((item, i) => {
                            return(
                                <Text key={i}
                                      style={this.styles.eachLineOfContent}
                                      onPress={()=>{alert("My name is: " + item)}}
                                >{item}</Text>
                            )
                        })}
                    </View>
                </View>

                {this.renderSchedule()}

                <View style={this.styles.eachTitleContainer}>
                    <View style={this.styles.eachTitle}>
                        <Image
                            style={this.styles.icon}
                            source={require('../image/league.png')}
                        />
                        <Text style={this.styles.bodyTitleText}
                              onPress={()=>{navigate("LeagueResult",{leagueId:this.params.id,playerList:this.playerList})}}
                        >Match Results</Text>
                    </View>
                </View>

                <View style={{height:20}}></View>

            </ScrollView>
        )
    }
    styles = StyleSheet.create({
        LeagueInfoContainer:{
            flex:1,
            flexDirection:'column',
            paddingTop:10,
            paddingLeft:20,
            paddingRight:20,
        },
        headerContainer:{
        },
        dateContainer:{
            flex:1,
            flexDirection:'row',
            justifyContent:'center',
            marginTop: 5,
        },
        headerTitleText:{
            marginLeft:15,
            marginRight:15,
            fontSize: 13,
            color:'black'
        },
        headerText:{
            fontSize:13,
            color:'grey',
            marginLeft:13,
            marginRight:13,
        },
        eachTitleContainer:{
            marginTop:15,
        },
        eachTitle:{
            flex:1,
            flexDirection:'row'
        },
        icon:{
            width: 30,
            height: 30,
            resizeMode: 'contain',
        },
        bodyTitleText:{
            fontWeight:'bold',
            marginTop:6,
            marginLeft:10,
        },
        eachContentContainer:{
            flex:1,
            flexDirection:'column',
        },
        eachLineOfContent:{
            marginTop:10,
            marginLeft:41,
            color:"grey",
        }
    });
}