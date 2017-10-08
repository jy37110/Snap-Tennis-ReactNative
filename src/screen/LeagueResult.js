import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
} from 'react-native';
import RankingCalculator from '../utility/RankingCalculator';

export default class LeagueResult extends Component{
    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        let rankingCalculator = new RankingCalculator();
        this.state = {
            matchHistory:[],
            playerListWithRanking:[],
        };
        rankingCalculator.loadMatchResult(this.params.leagueId, (err, data) => {
            if (err) alert("err: " + err);
            else {
                let playerListWithRanking = rankingCalculator.rankingCalculate(data.Items, this.params.playerList);
                let matchHistory = [];
                data.Items.forEach((match) => {
                    matchHistory.push({
                        matchId:match.match_id,
                        finishedDate: match.finished_date,
                        venueName: match.venue_name,
                        p1Name: this.getUserName(this.params.playerList, match.player1_id),
                        p2Name: this.getUserName(this.params.playerList, match.player2_id),
                        score: match.score,
                        p1Comment: match.player1_comment,
                        p2Comment: match.player2_comment,
                    })
                });
                this.setState({
                    matchHistory:matchHistory,
                    playerListWithRanking:playerListWithRanking,
                })
            }
        })
    }

    static navigationOptions = {
        title: "League Ranking",
    };

    getUserName = (playerList, userId) => {
        for (let i = 0; i < playerList.length; i++){
            if (playerList[i].playerId === userId) return playerList[i].playerName;
        }
        return "name not found";
    };

    render(){
        return (
            <ScrollView style={this.styles.rootContainer}>
                <View style={this.styles.eachTitle}>
                    <Image
                        style={this.styles.icon}
                        source={require('../image/league.png')}
                    />
                    <Text style={{fontSize:20,paddingLeft:5}}>League Ranking</Text>
                </View>

                <View style={{marginTop:10}}>
                    <View style={this.styles.eachLineContainer}>
                        <View style={{borderRadius:15,borderWidth:1,borderColor:'rgb(60,60,60)',flex:0.55,margin:1,backgroundColor:'rgb(60,60,60)',padding:2}}>
                            <Text style={this.styles.tableHeadText}>Name</Text>
                        </View>
                        <View style={{borderRadius:15,borderWidth:1,borderColor:'rgb(255,64,129)',flex:0.15,margin:1,backgroundColor:'rgb(255,64,129)',padding:2}}>
                            <Text style={this.styles.tableHeadText}>Win</Text>
                        </View>
                        <View style={{borderRadius:15,borderWidth:1,borderColor:'rgb(33,150,243)',flex:0.15,margin:1,backgroundColor:'rgb(33,150,243)',padding:2}}>
                            <Text style={this.styles.tableHeadText}>Lost</Text>
                        </View>
                        <View style={{borderRadius:15,borderWidth:1,borderColor:'rgb(60,60,60)',flex:0.15,margin:1,backgroundColor:'rgb(60,60,60)',padding:2}}>
                            <Text style={this.styles.tableHeadText}>Rank</Text>
                        </View>
                    </View>

                    {this.state.playerListWithRanking.map((player) => {
                        return(
                            <View
                                style={this.styles.eachLineContainer}
                                key = {player.playerId}
                            >
                                <View style={{flex:0.55}}>
                                    <Text style={{marginLeft:10,color:'rgb(60,60,60)',margin:1,textAlign:'left'}}>{player.playerName}</Text>
                                </View>
                                <Text style={{color:'rgb(255,64,129)',margin:1,flex:0.15,textAlign:'center'}}>{player.winTimes}</Text>
                                <Text style={{color:'rgb(33,150,243)',margin:1,flex:0.15,textAlign:'center'}}>{player.lostTimes}</Text>
                                <Text style={{color:'rgb(60,60,60)',margin:1,flex:0.15,textAlign:'center'}}>{player.rank}</Text>
                            </View>
                        )
                    })}

                </View>

                <View style={[this.styles.eachTitle,{marginTop:20}]}>
                    <Image
                        style={this.styles.icon}
                        source={require('../image/ongoing.png')}
                    />
                    <Text style={{fontSize:20,paddingLeft:7}}>Match Histories</Text>
                </View>

                {this.state.matchHistory.map((match) => {
                    return(
                        <View
                            style={{marginTop:8,marginBottom:4,padding:5,flex:1,flexDirection:'column',backgroundColor:'white'}}
                            key={match.matchId}
                        >
                            <View style={this.styles.historyEachLine}>
                                <Text style={this.styles.historyTitle}>Date:</Text>
                                <Text style={this.styles.historyContent}>{match.finishedDate}</Text>
                            </View>
                            <View style={this.styles.historyEachLine}>
                                <Text style={this.styles.historyTitle}>Venue:</Text>
                                <Text style={this.styles.historyContent}>{match.venueName}</Text>
                            </View>
                            <View style={this.styles.historyEachLine}>
                                <Text style={this.styles.historyTitle}>Players:</Text>
                                <Text style={this.styles.historyContent}>{match.p1Name + " vs " + match.p2Name}</Text>
                            </View>
                            <View style={this.styles.historyEachLine}>
                                <Text style={this.styles.historyTitle}>Score:</Text>
                                <Text style={this.styles.historyContent}>{match.score}</Text>
                            </View>
                            <View style={this.styles.historyEachLine}>
                                <Text style={this.styles.historyTitle}>{match.p1Name}:</Text>
                                <Text style={this.styles.historyContent}>{match.p1Comment}</Text>
                            </View>
                            <View style={this.styles.historyEachLine}>
                                <Text style={this.styles.historyTitle}>{match.p2Name}:</Text>
                                <Text style={this.styles.historyContent}>{match.p2Comment}</Text>
                            </View>
                        </View>
                    )
                })}

                <View style={{height:20}}></View>

            </ScrollView>
        )
    }
    styles = StyleSheet.create({
        rootContainer:{
            padding:20,
        },
        eachLineContainer:{
            flexDirection:'row',
            marginTop:4,
        },
        tableHeadText:{
            color:"white",
            textAlign:"center",
            fontWeight:'bold'
        },
        tableFootTextBlue:{
            backgroundColor: 'white',
            color: 'blue',
            margin: 1,
            flex:0.3,
            textAlign:'center',
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
        historyEachLine:{
            marginTop:4,
            flex:1,
            flexDirection:'row',
            justifyContent:'flex-start',
        },
        historyTitle:{
            fontSize:13,
            color:'black',
            flex:0.3,
            fontWeight:'bold',
        },
        historyContent:{
            fontSize:13,
            color:'grey',
            flex:0.7,
        }
    });
}