import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Button,
    TextInput,
    Platform,
    FlatList,
} from 'react-native';
import VenueService from '../utility/VenueService';
import UserService from "../utility/UserService";
import HomeScreen from "./HomeScreen";

export default class VenueDetail extends Component {
    constructor(props){
        super(props);
        this.userId = HomeScreen.userId;
        this.venueInfo = this.props.navigation.state.params;
        this.venueService = new VenueService();
        this.commentContent = "";
        this.state = {
            venueReview:[],
            isValid:true,
            errMsg:"",
        };
        this.loadVenueReview();
    }

    static navigationOptions = {
        title: 'Venue Details',
    };

    loadVenueReview = () => {
        this.venueService.getVenueReview(this.venueInfo.name,this.venueInfo.suburb,(err, reviewData) => {
            if (err) alert("err: " + err);
            else {
                // alert(JSON.stringify(reviewData));
                let userService = new UserService();
                if (reviewData.Items.length > 0) {
                    let tempReviewInfo = [];
                    for (let i = 0; i < reviewData.Items.length; i++){
                        userService.getUserName(reviewData.Items[i].reviewer_id, (firstName) => {
                            if (firstName !== "") {
                                tempReviewInfo.push({reviewerName: firstName, comments: reviewData.Items[i].comments, key: reviewData.Items[i].venue_review_id});
                                this.setState({venueReview:tempReviewInfo});
                            } else {

                            }
                        })
                    }
                }
            }
        });
    };

    handleSubmit = () => {
        if (this.validate(this.commentContent)){
            let reviewInfo = {
                reviewerId: this.userId,
                comments: this.commentContent,
                suburb: this.venueInfo.suburb,
                venueName: this.venueInfo.name,
                reviewId: "VR" + this.userId + new Date().toString(),
            };
            this.venueService.createReview(reviewInfo,(err, data) => {
                if (err) alert("err: " + err);
                else {
                    alert("Your submit is successful");
                    this.loadVenueReview();
                }
            })
        }
    };

    validate = (userInputContent) => {
        if (userInputContent.trim() === "") {
            this.setState({isValid:false, errMsg:"Please tell me something about your experience"});
            return false;
        } else {
            this.setState({isValid:true, errMsg:""});
            return true;
        }
    };

    renderReviewComponent = () => {
        if (this.userId !== "") {
            return (
                <View style = {{marginTop:10}}>
                    <View style={{paddingLeft:30}}>
                        <TextInput
                            style={{height: 40, fontSize:13}}
                            onChangeText={(text) => this.commentContent = text}
                            multiline={true}
                            placeholder="Write your comments here"
                        />
                    </View>

                    {this.state.isValid ? null : <Text style={{color:"red",fontSize:13,marginTop:4,fontWeight:'bold',marginLeft:30,marginBottom:5}}>{this.state.errMsg}</Text>}

                    <View style={this.styles.submitReviewButtonContainer}>
                        <Button
                            onPress={this.handleSubmit}
                            title="SUBMIT YOUR COMMENT"
                            color={Platform.select({ios:"white", android:"grey"})}
                        />
                    </View>
                </View>
            )
        }
    };

    render() {
        const { params } = this.props.navigation.state;
        let commentContent = this.state.venueReview.length > 0 ? "" : "No comments for this venue.";
        return (
            <ScrollView style={this.styles.VenueDetailContainer}>
                <Text style={this.styles.title}>TENNIS COURT INFORMATION</Text>
                <FlatList
                    data={[
                        {key: "Name:", value: params.name},
                        {key: 'Number of Courts:', value: params.numberOfCourts},
                        {key: 'Access:', value: params.access},
                        {key: 'Average Rating:', value: params.averageRating},
                        {key: 'Condition:', value: params.condition},
                        {key: 'Cost per Hour:', value: params.costPerHour},
                        {key: 'Designation:', value: params.designation},
                        {key: 'Suburb:', value: params.suburb},
                        {key: 'Region:', value: params.region},
                        {key: 'Address:', value: params.address},
                        {key: 'Comments:', value: commentContent},
                    ]}
                    renderItem={({item}) =>
                    <View style={this.styles.eachLine}>
                        <Text style={this.styles.attributeName}>{item.key}</Text>
                        <Text style={this.styles.attributeValue} numberOfLines={4}>{item.value}</Text>
                    </View>
                    }
                />

                {this.state.venueReview.map((eachReview) => {
                    return (
                        <View style={{flex:1,flexDirection:'row',marginTop:5,marginLeft:30}} key={eachReview.key}>
                            <Text style={{flex:0.2,fontSize:13,color:'grey',fontWeight:'bold'}}>{eachReview.reviewerName}: </Text>
                            <Text style={{flex:0.8,fontSize:13,color:'grey'}}>{eachReview.comments}</Text>
                        </View>
                    )
                })}

                {this.renderReviewComponent()}

                <View style={{height:20}}></View>

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
        attributeName:{
            marginLeft: 30,
            flex:0.4,
            fontSize: 13,
            fontWeight:'bold',
            color: 'rgb(80,80,80)',
        },
        attributeValue:{
            marginLeft: 0,
            flex:0.6,
            fontSize: 13,
            color: 'rgb(80,80,80)',
        },
        eachLine:{
            marginTop: 10,
            flex: 1,
            flexDirection: 'row'
        },
        submitReviewButtonContainer:{
            marginLeft:10,
            marginRight:10,
            backgroundColor:"grey",
            borderWidth:2,
            borderColor:"grey",
        },
    });
}