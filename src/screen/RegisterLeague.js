import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Switch,
    ScrollView,
} from 'react-native';
import DynamoDb from '../utility/DynamoDb';

export default class RegisterLeague extends Component {
    constructor(props){
        super(props);
        this.userId = "62c88ffd-019b-4bbb-8d17-69427c669ae5";
        this.getLeaguesFromDynamo = this.getLeaguesFromDynamo.bind(this);
        this.dbInstance = new DynamoDb();
        this.dbContext = this.dbInstance.getDbContext();
        this.scanOngoingLeagues = [];
        this.scanCopleteLeagues = [];
        this.state = {
            ongoingLeague:[],
            completeLeague:[],
            switchValue: "No",
        };
        this.getLeaguesFromDynamo();
    }

    getLeaguesFromDynamo(){
        let params = {
            TableName:"NZSinglesLeagueRound",
            ProjectionExpression:"league_id, city, capabilities, end_date, player_reg_uuids, players, start_date, #st, suburbs",
            // FilterExpression: 'players = :userId',
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

    static navigationOptions = {
        title: 'Play Local League',
    };

    render() {
        const { navigate } = this.props.navigation;
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

                    <View style={this.styles.tableHeadContainer}>
                        <Text style={this.styles.tableBodyTextBlack}>Albany</Text>
                        <Text style={this.styles.tableBodyTextRed}>3</Text>
                        <Text style={this.styles.tableBodyTextBlue}>0</Text>
                    </View>
                    <View style={this.styles.tableHeadContainer}>
                        <Text style={this.styles.tableBodyTextBlack}>Narrow Neck</Text>
                        <Text style={this.styles.tableBodyTextRed}>1</Text>
                        <Text style={this.styles.tableBodyTextBlue}>0</Text>
                    </View>
                    <View style={this.styles.tableHeadContainer}>
                        <Text style={this.styles.tableFootTextBlack}>Total</Text>
                        <Text style={this.styles.tableFootTextRed}>4</Text>
                        <Text style={this.styles.tableFootTextBlue}>0</Text>
                    </View>

                </View>

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
                            >
                                {"(" + (i+1).toString() + ") " + leagueDescription}
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
        tableContainer:{
            marginTop: 20,
        },
        tableHeadContainer:{
            flexDirection:'row',
        },
        interestedView:{
            borderRadius:15,
            borderWidth: 1,
            borderColor: "red",
            flex:0.3,
            margin: 1,
            backgroundColor: "red",
            padding: 2,
        },
        confirmedView:{
            backgroundColor: "blue",
            borderRadius:15,
            borderWidth: 1,
            borderColor: "blue",
            flex:0.3,
            margin: 1,
            padding: 2,
        },
        suburbView:{
            backgroundColor: "black",
            borderRadius:15,
            borderWidth: 1,
            borderColor: "black",
            flex:0.3,
            margin: 1,
            padding: 2,
        },
        tableHeadText:{
            color:"white",
            textAlign:"center",
        },
        tableBodyTextBlack:{
            backgroundColor: 'rgb(180,180,180)',
            color: 'black',
            margin: 1,
            flex:0.3,
            textAlign:'center',
        },
        tableBodyTextRed:{
            backgroundColor: 'rgb(180,180,180)',
            color: 'red',
            margin: 1,
            flex:0.3,
            textAlign:'center',
        },
        tableBodyTextBlue:{
            backgroundColor: 'rgb(180,180,180)',
            color: 'blue',
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
            color: 'red',
            margin: 1,
            flex:0.3,
            textAlign:'center',
        },
        tableFootTextBlue:{
            backgroundColor: 'white',
            color: 'blue',
            margin: 1,
            flex:0.3,
            textAlign:'center',
        },
    });
}