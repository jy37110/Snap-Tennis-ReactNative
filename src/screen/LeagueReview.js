import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Button,
    Platform,
    Switch,
    TextInput,
    Text,
} from 'react-native';
import ReviewService from '../utility/ReviewService';

export default class LeagueReview extends Component {
    constructor(props){
        super(props);
        this.params = this.props.navigation.state.params;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.userId = "62c88ffd-019b-4bbb-8d17-69427c669ae5";
        this.NZSinglesMatchesPlayedForm = {};
        this.NZSinglesPlayerReview = {};
        this.isP1Review = this.userId === this.params.matchInfo.player1Id;
        this.reviewService = new ReviewService();
        this.toBeUpdatedMatchId = "";
        this.previousComment = "";
        this.matchIsUnderFirstReview = true;
        this.commentContent = "";
        this.state = {
            titleText:"Please comment your match experience. It will help us to find a better match for you next time.",
            switchValue:false,
            score:"",
            isValid:true,
            errMsg:"",
            selectedWinner:"",
            selectedLevel:"",
            selectedPlayAgain:"",
        };
        this.reviewService.checkMatchHasBeenReviewed(this.params.matchInfo.player1Id, this.params.matchInfo.player2Id, this.params.matchInfo.leagueId,(err,data) => {
            if (err) alert("err: " + err);
            else {
                if (data.Count < 1){
                    this.matchIsUnderFirstReview = true;
                } else {
                    this.matchIsUnderFirstReview = false;
                    this.toBeUpdatedMatchId = data.Items[0].match_id;
                    this.previousComment = this.isP1Review ? data.Items[0].player2_comment : data.Items[0].player1_comment;
                }
            }
        })
    }

    static navigationOptions = {
        title: 'Review match',
    };

    handleSubmit(){
        const { navigate } = this.props.navigation;
        if (this.state.switchValue){
            this.NZSinglesMatchesPlayedForm = {
                matchId: "M" + this.userId + new Date().toString(),
                finishedDate: this.params.matchInfo.finishedDate.replace(/-/g,""),
                latitude: this.params.matchInfo.latitude,
                leagueId: this.params.matchInfo.leagueId,
                longitude: this.params.matchInfo.longitude,
                player1Comment: this.isP1Review ? "This guy didn't come. " + this.commentContent : "null",
                player1Id: this.params.matchInfo.player1Id,
                player2Comment: this.isP1Review ? "null" : "This guy didn't come. " + this.commentContent,
                player2Id: this.params.matchInfo.player2Id,
                score: "none",
                suburb: this.params.matchInfo.suburb,
                validated: this.matchIsUnderFirstReview ? "N" : "Y",
                venueName: this.params.matchInfo.venueName,
                winner: "none",
            };
            this.NZSinglesPlayerReview = {
                reviewId: "R" + this.userId + new Date().toString(),
                comment: "This guy didn't come. " + this.commentContent,
                levelComparison: "none",
                noShow: "Y",
                playerUnderReview: this.isP1Review ? this.params.matchInfo.player2Id : this.params.matchInfo.player1Id,
                reviewerId: this.isP1Review ? this.params.matchInfo.player1Id : this.params.matchInfo.player2Id,
                playAgain: this.state.selectedPlayAgain === "" ? "Preferably Not" : this.state.selectedPlayAgain,
                matchId: this.NZSinglesMatchesPlayedForm.matchId,
            };
        } else {
            this.NZSinglesMatchesPlayedForm = {
                matchId: "M" + this.userId + new Date().toString(),
                finishedDate: this.params.matchInfo.finishedDate.replace(/-/g,""),
                latitude: this.params.matchInfo.latitude,
                leagueId: this.params.matchInfo.leagueId,
                longitude: this.params.matchInfo.longitude,
                player1Comment: this.isP1Review ? this.commentContent : "null",
                player1Id: this.params.matchInfo.player1Id,
                player2Comment: this.isP1Review ? "null" : this.commentContent,
                player2Id: this.params.matchInfo.player2Id,
                score: this.state.score,
                suburb: this.params.matchInfo.suburb,
                validated: this.matchIsUnderFirstReview ? "N" : "Y",
                venueName: this.params.matchInfo.venueName,
                winner: this.state.selectedWinner,
            };
            this.NZSinglesPlayerReview = {
                reviewId: "R" + this.userId + new Date().toString(),
                comment: this.commentContent,
                levelComparison: this.state.selectedLevel,
                noShow: "N",
                playerUnderReview: this.isP1Review ? this.params.matchInfo.player2Id : this.params.matchInfo.player1Id,
                reviewerId: this.isP1Review ? this.params.matchInfo.player1Id : this.params.matchInfo.player2Id,
                playAgain: this.state.selectedPlayAgain,
                matchId: this.NZSinglesMatchesPlayedForm.matchId,
            };
        }

        if (this.validate(this.NZSinglesMatchesPlayedForm,this.NZSinglesPlayerReview)){
            if (this.matchIsUnderFirstReview) {
                this.reviewService.createMatch(this.NZSinglesMatchesPlayedForm,(err,data) => {
                    if (err) alert("err:" + err);
                    else {
                        this.reviewService.createReview(this.NZSinglesPlayerReview,(err, data) => {
                            if (err) alert("err:" + err);
                            else {
                                alert("Thanks for your comment");
                                this.params.onGoBack();
                                this.props.navigation.goBack();
                            }
                        })
                    }
                })
            } else {
                this.NZSinglesMatchesPlayedForm.matchId = this.toBeUpdatedMatchId;
                if (this.isP1Review){
                    this.NZSinglesMatchesPlayedForm.player2Comment = this.previousComment;
                } else {
                    this.NZSinglesMatchesPlayedForm.player1Comment = this.previousComment;
                }
                this.reviewService.updateMatch(this.NZSinglesMatchesPlayedForm,(err, data) => {
                    if (err) alert("err: " + err);
                    else {
                        this.reviewService.createReview(this.NZSinglesPlayerReview,(err, data) => {
                            if (err) alert("err:" + err);
                            else {
                                alert("Thanks for your comment");
                                this.params.onGoBack();
                                this.props.navigation.goBack();
                            }
                        })
                    }
                });
            }
        }
    }

    validate(matchForm,reviewForm){
        let errMsg = "";
        let pass = true;
        if (this.state.switchValue) return true;
        if (matchForm.score.trim() === "") {
            errMsg = "Please tell me the score";
            pass = false;
        } else if (reviewForm.comment.trim() === "") {
            errMsg = "Please tell me something about the match";
            pass = false;
        } else if (matchForm.winner === "") {
            errMsg = "Please select a winner";
            pass = false;
        } else if (reviewForm.levelComparison === "") {
            errMsg = "Please select your opponent's level";
            pass = false;
        } else if (reviewForm.playAgain === "") {
            errMsg = "Please select whether you want to play with this opponent again";
            pass = false;
        }
        this.setState({
            errMsg:errMsg,
            isValid:pass,
        });
        return pass;
    }


    render() {
        return (
            <ScrollView style={{padding:10}}>
                <View style={this.styles.BodyViewContainer}>
                    <View style={{marginBottom:10}}>
                        <Text style={{fontSize:12,color:'grey',textAlign:'left'}}>{this.state.titleText}</Text>
                    </View>

                    <View style={this.styles.eachRowContainer}>
                        <Text style={[this.styles.bodyTitleText,{marginTop:8}]}>Opponent did not show:</Text>
                        <Switch
                            style={{transform: [{ scaleX: .6 }, { scaleY: .6 }]}}
                            onValueChange={(value) => this.setState({switchValue: value})}
                            value = {this.state.switchValue}
                        />
                    </View>

                    <View style={this.styles.eachRowContainer}>
                        <Text style={this.styles.bodyTitleText}>Winner:</Text>
                        <Text
                            style={this.state.selectedWinner === this.params.matchInfo.player1Id ? this.styles.highLightBodyContentText:this.styles.bodyContentText}
                            onPress={() => this.setState({
                                selectedWinner:this.params.matchInfo.player1Id
                            })}
                        >
                            {this.params.p1Name}
                        </Text>
                        <Text
                            style={this.state.selectedWinner === this.params.matchInfo.player2Id ? this.styles.highLightBodyContentText:this.styles.bodyContentText}
                            onPress={() => this.setState({
                                selectedWinner:this.params.matchInfo.player2Id
                            })}
                        >
                            {this.params.p2Name}
                        </Text>
                    </View>

                    <View style={this.styles.eachRowContainer}>
                        <Text style={[this.styles.bodyTitleText,{flex:0.2}]}>Score:</Text>
                        <TextInput
                            style={{height: 12, flex:0.8, fontSize:12}}
                            onChangeText={(text) => this.setState({score:text})}
                            placeholder="Example:9-7 9-8"
                        />
                    </View>

                    <View style={this.styles.eachRowContainer}>
                        <Text style={this.styles.bodyTitleText}>How would you like to describe your opponent's level compared to you:</Text>
                    </View>
                    <View style={this.styles.eachRowContainer}>
                        <Text
                            style={this.state.selectedLevel === "Weaker" ? this.styles.highLightBodyContentText:this.styles.bodyContentText}
                            onPress={() => this.setState({selectedLevel:"Weaker"})}
                        >Weaker</Text>
                        <Text
                            style={this.state.selectedLevel === "Comparable" ? this.styles.highLightBodyContentText:this.styles.bodyContentText}
                            onPress={() => this.setState({selectedLevel:"Comparable"})}
                        >Comparable</Text>
                        <Text
                            style={this.state.selectedLevel === "Stronger" ? this.styles.highLightBodyContentText:this.styles.bodyContentText}
                            onPress={() => this.setState({selectedLevel:"Stronger"})}
                        >Stronger</Text>
                    </View>

                    <View style={this.styles.eachRowContainer}>
                        <Text style={this.styles.bodyTitleText}>Would you like to play with this player again in the future?</Text>
                    </View>
                    <View style={{marginTop:10,flex:1,flexDirection:'row',justifyContent:'space-around'}}>
                        <Text
                            style={this.state.selectedPlayAgain === "Sure" ? this.styles.highLightBodyContentText:this.styles.bodyContentText}
                            onPress={() => this.setState({selectedPlayAgain:"Sure"})}
                        >Sure</Text>
                        <Text
                            style={this.state.selectedPlayAgain === "Preferably Not" ? this.styles.highLightBodyContentText:this.styles.bodyContentText}
                            onPress={() => this.setState({selectedPlayAgain:"Preferably Not"})}
                        >Preferably Not</Text>
                    </View>

                    <View style={this.styles.eachRowContainer}>
                        <Text style={this.styles.bodyTitleText}>How would you like to comment this match?</Text>
                    </View>
                    <View style={this.styles.eachRowContainer}>
                        <TextInput
                            style={{height: 60, flex:1, fontSize:12}}
                            onChangeText={(text) => this.commentContent = text}
                            multiline={true}
                            placeholder="Good match"
                        />
                    </View>

                </View>

                {this.state.isValid === true ? null : <Text style={this.styles.err}>{this.state.errMsg}</Text>}

                <View style={this.styles.submitReviewButtonContainer}>
                    <Button
                        onPress={this.handleSubmit}
                        title="SUBMIT"
                        color={Platform.select({ios:"white", android:"grey"})}
                    />
                </View>

            </ScrollView>
        )
    }
    styles = StyleSheet.create({
        BodyViewContainer:{
            padding:10,
            flex:1,
            flexDirection:"column",
            backgroundColor:"white",
        },
        eachRowContainer:{
            marginTop:10,
            flex:1,
            flexDirection:"row",
            justifyContent:"space-between",
        },
        text:{
            textAlign:'center',
            fontSize: 12,
        },
        bodyTitleText:{
            fontSize:12,
            color:"black",
            fontWeight:"bold",
        },
        bodyContentText:{
            fontSize:12,
            color:"grey",
        },
        highLightBodyContentText:{
            fontSize:12,
            color:"green",
        },
        submitReviewButtonContainer:{
            backgroundColor:"grey",
            marginTop:10,
            borderWidth:2,
            borderColor:"grey",
            marginBottom:30,
        },
        err:{
            color:"red",
            fontSize:15,
            marginTop:4,
            fontWeight:"bold",
        },
    });
}