import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Switch,
    ScrollView,
} from 'react-native';
import DynamoDb from '../utility/DynamoDb';
import HomeScreen from "./HomeScreen";
import LeagueRegisterService from '../utility/LeagueRegisterService';
import ProfileService from '../utility/ProfileService';
import VenueService from '../utility/VenueService';

export default class RegisterLeague extends Component {
    constructor(props){
        super(props);
        this.userId = HomeScreen.userId;
        this.getLeaguesFromDynamo = this.getLeaguesFromDynamo.bind(this);
        this.dbInstance = new DynamoDb();
        this.dbContext = this.dbInstance.getDbContext();
        this.scanOngoingLeagues = [];
        this.scanCopleteLeagues = [];
        this.registrationInfo = [];
        this.state = {
            ongoingLeague: [],
            completeLeague: [],
            switchValue: "No",
            registrationTable: [],
        };
        this.getLeaguesFromDynamo();
    }

    static navigationOptions = {
        title: 'Play Local League',
    };

    getLeaguesFromDynamo(){
        let params = {
            TableName:"NZSinglesLeagueRound",
            ProjectionExpression:"league_id, city, capabilities, end_date, player_reg_uuids, players, start_date, #st, suburbs",
            FilterExpression: 'contains(players,:userId)',
            ExpressionAttributeNames:{
                "#st": "status"
            },
            ExpressionAttributeValues: {
                ":userId":this.userId,
            }
        };
        let onScan = (err, data) => {
            if (err) {
                alert("err:" + err)
            } else {
                let tempEndDate;
                let today = new Date();
                data.Items.forEach((eachLeague) => {
                    let venues = [];
                    Object.values(eachLeague.suburbs).forEach((venue) =>{
                        venue.values.forEach((i) =>{
                            venues.push(i)
                        })
                    });
                    let  temp = {
                        id: eachLeague.league_id,
                        city: eachLeague.city,
                        endDate: eachLeague.end_date,
                        players: eachLeague.players,
                        startDate: eachLeague.start_date,
                        suburbs: Object.keys(eachLeague.suburbs),
                        venueList: venues,
                    };
                    tempEndDate = new Date(temp.endDate.substr(0,10));
                    if(tempEndDate < today) this.scanCopleteLeagues.push(temp);
                    else this.scanOngoingLeagues.push(temp);
                });

                this.setState(
                    {
                        ongoingLeague:this.scanOngoingLeagues,
                        completeLeague:this.scanCopleteLeagues,
                    }
                );
            }
        };
        this.dbContext.scan(params, onScan);
    }

    handleSwitch = (value) => {
        if (value){
            let leagueRegisterService = new LeagueRegisterService();
            let profileService = new ProfileService();
            let userProfile = {};
            profileService.getUserProfile(this.userId, (err, data) => {
                if (err) alert("err: " + err);
                else {
                    let userPreferedVenueList = [];
                    let userPreferedSuburbList = [];
                    if (data.Item === undefined){
                        alert("no profile found")
                    } else {
                        let venueService = new VenueService();
                        userProfile = data.Item;
                        if(userProfile.playing_preferences.PP3a !== undefined) userPreferedVenueList.push(userProfile.playing_preferences.PP3a);
                        if(userProfile.playing_preferences.PP3b !== undefined) userPreferedVenueList.push(userProfile.playing_preferences.PP3b);
                        if(userProfile.playing_preferences.PP3c !== undefined) userPreferedVenueList.push(userProfile.playing_preferences.PP3c);
                        if(userProfile.playing_preferences.PP3d !== undefined) userPreferedVenueList.push(userProfile.playing_preferences.PP3d);
                        if(userProfile.playing_preferences.PP3e !== undefined) userPreferedVenueList.push(userProfile.playing_preferences.PP3e);

                        for (let i = 0; i < userPreferedVenueList.length; i++){
                            venueService.getSuburbByVenueName(userPreferedVenueList[i],(err,suburb) => {
                                if (err) alert("err:" + err);
                                else {
                                    if (!userPreferedSuburbList.includes(suburb.Items[0].suburb)){
                                        userPreferedSuburbList.push(suburb.Items[0].suburb);
                                        leagueRegisterService.getCurrentRegistrationInfo(suburb.Items[0].suburb, userProfile.capability,(err, registerInfo) => {
                                            if (err) alert("err: " + err);
                                            else {
                                                let interested = 0;
                                                let confirmed = 0;
                                                for (let i = 0; i < registerInfo.Items.length; i++){
                                                    if (registerInfo.Items[i].confirmed === "Y") confirmed++;
                                                    else interested++;
                                                }
                                                this.registrationInfo.push({suburb:suburb.Items[0].suburb, interested:interested, confirmed:confirmed});
                                                this.setState({registrationTable:this.registrationInfo});
                                            }
                                        })
                                    }
                                }
                            });
                        }
                    }
                }
            });


        } else {
            this.registrationInfo = [];
            this.setState({registrationTable:[]})
        }
    };

    renderRegisterInfoTable = () => {
        let totalInterested = 0;
        let totalConfirmed = 0;
        if (this.state.switchValue === "Yes") {
            return(
                <View style={this.styles.tableContainer}>
                    <View style={this.styles.tableHeadContainer}>
                        <View style={this.styles.suburbView}>
                            <Text style={this.styles.tableHeadText}>Suburb</Text>
                        </View>
                        <View style={this.styles.interestedView}>
                            <Text style={this.styles.tableHeadText}>Interested</Text>
                        </View>
                        <View style={this.styles.confirmedView}>
                            <Text style={this.styles.tableHeadText}>Confirmed</Text>
                        </View>
                    </View>

                    {this.registrationInfo.map((item) => {
                        totalInterested += Number(item.interested);
                        totalConfirmed += Number(item.confirmed);
                        return(
                            <View style={this.styles.tableHeadContainer} key={item.suburb}>
                                <Text style={this.styles.tableBodyTextBlack}>{item.suburb}</Text>
                                <Text style={this.styles.tableBodyTextRed}>{item.interested}</Text>
                                <Text style={this.styles.tableBodyTextBlue}>{item.confirmed}</Text>
                            </View>
                        )
                    })}

                    <View style={this.styles.tableHeadContainer}>
                        <Text style={this.styles.tableFootTextBlack}>Total</Text>
                        <Text style={this.styles.tableFootTextRed}>{totalInterested.toString()}</Text>
                        <Text style={this.styles.tableFootTextBlue}>{totalConfirmed.toString()}</Text>
                    </View>
                </View>
            )
        }
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <ScrollView style={this.styles.RegisterLeagueContainer}>
                <View style={{flex: 1, flexDirection:'row'}}>
                    <Text style={this.styles.title}>Register for Local League</Text>
                    <Switch
                        style={this.styles.switchBar}
                        onValueChange={(value) => {
                            this.setState({switchValue: value ? "Yes" : "No"});
                            this.handleSwitch(value);
                        }}
                        value = {this.state.switchValue === "Yes"}
                    />
                    <Text style={{fontSize: 13, color: 'grey', marginLeft: 10, marginTop: 5}}>
                        {this.state.switchValue}
                    </Text>
                </View>

                {this.renderRegisterInfoTable()}

                <View style={this.styles.ongoingLeagueContainer}>
                    <Text style={this.styles.subTitle}>
                        {this.state.ongoingLeague.length > 0 ? "Current ongoing leagues:" : "Currently no on going leagues"}
                    </Text>
                    {this.state.ongoingLeague.map((eachLeague, i) =>{
                        let leagueDescription = eachLeague.city + ", closes " + eachLeague.endDate.substr(0,10);
                        return(
                            <Text
                                style={this.styles.text}
                                key={i}
                                onPress={()=>{navigate("LeagueInfo",this.state.ongoingLeague[i])}}
                            >
                                {"(" + (i+1).toString() + ") " + leagueDescription}
                            </Text>
                            )
                    })}
                </View>

                <View style={this.styles.completeLeagueContainer}>
                    <Text style={this.styles.subTitle}>
                        {this.state.completeLeague.length > 0 ? "Your completed leagues:" : "Currently no completed leagues"}
                    </Text>
                    {this.state.completeLeague.map((eachLeague, i) =>{
                        let leagueDescription = eachLeague.city + ", closed " + eachLeague.endDate.substr(0,10);
                        return(
                            <Text
                                style={this.styles.text}
                                key={i}
                                onPress={()=>{navigate("LeagueInfo",this.state.completeLeague[i])}}
                            >
                                {"(" + (i+1).toString() + ") " + leagueDescription}
                            </Text>
                        )
                    })}
                </View>

                <View style={{height:20}}></View>

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
        tableContainer:{
            marginTop: 20,
        },
        tableHeadContainer:{
            flexDirection:'row',
        },
        interestedView:{
            borderRadius:15,
            borderWidth: 1,
            borderColor: "rgb(255,64,129)",
            flex:0.3,
            margin: 1,
            backgroundColor: "rgb(255,64,129)",
            padding: 2,
        },
        confirmedView:{
            backgroundColor: "rgb(33,150,243)",
            borderRadius:15,
            borderWidth: 1,
            borderColor: "rgb(33,150,243)",
            flex:0.3,
            margin: 1,
            padding: 2,
        },
        suburbView:{
            backgroundColor: "rgb(60,60,60)",
            borderRadius:15,
            borderWidth: 1,
            borderColor: "rgb(60,60,60)",
            flex:0.3,
            margin: 1,
            padding: 2,
        },
        tableHeadText:{
            color:"white",
            textAlign:"center",
        },
        tableBodyTextBlack:{
            backgroundColor: 'white',
            color: 'black',
            margin: 1,
            flex:0.3,
            textAlign:'center',
        },
        tableBodyTextRed:{
            backgroundColor: 'white',
            color: 'rgb(255,64,129)',
            margin: 1,
            flex:0.3,
            textAlign:'center',
        },
        tableBodyTextBlue:{
            backgroundColor: 'white',
            color: 'rgb(33,150,243)',
            margin: 1,
            flex:0.3,
            textAlign:'center',
        },
        tableFootTextBlack:{
            backgroundColor: 'white',
            color: 'black',
            margin: 1,
            flex:0.3,
            textAlign:'center',
        },
        tableFootTextRed:{
            backgroundColor: 'white',
            color: 'rgb(255,64,129)',
            margin: 1,
            flex:0.3,
            textAlign:'center',
        },
        tableFootTextBlue:{
            backgroundColor: 'white',
            color: 'rgb(33,150,243)',
            margin: 1,
            flex:0.3,
            textAlign:'center',
        },
    });
}