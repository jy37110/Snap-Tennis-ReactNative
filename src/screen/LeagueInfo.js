import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
} from 'react-native';

export default class LeagueInfo extends Component {
    constructor(props){
        super(props);
        this.userId = "62c88ffd-019b-4bbb-8d17-69427c669ae5";
        this.params = this.props.navigation.state;
        this.state = {
            switchValue: "No",
        }
    }

    static navigationOptions = {
        title: 'My Leagues',
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
                            {this.params.params.startDate.substr(0,10)}
                        </Text>
                        <Text style={this.styles.headerText}>
                            {this.params.params.endDate.substr(0,10)}
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
                        {this.params.params.suburbs.map((item, i) => {
                            return(
                                <Text key={i}
                                      style={this.styles.eachLineOfContent}
                                      onPress={()=>{alert("My name is: " + item)}}
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
                        {this.params.params.players.map((item, i) => {
                            return(
                                <Text key={i}
                                      style={this.styles.eachLineOfContent}
                                      onPress={()=>{alert("My name is: " + item)}}
                                >{item}</Text>
                            )
                        })}

                    </View>
                </View>

                <View style={this.styles.eachTitleContainer}>
                    <View style={this.styles.eachTitle}>
                        <Image
                            style={this.styles.icon}
                            source={require('../image/calender.png')}
                        />
                        <Text style={this.styles.bodyTitleText}
                              onPress={()=>{navigate("CalendarPage",this.params)}}
                        >Schedule Match</Text>
                    </View>
                </View>

                <View style={this.styles.eachTitleContainer}>
                    <View style={this.styles.eachTitle}>
                        <Image
                            style={this.styles.icon}
                            source={require('../image/league.png')}
                        />
                        <Text style={this.styles.bodyTitleText}
                              onPress={()=>{alert("Go to the match results")}}
                        >Match Results</Text>
                    </View>
                </View>





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