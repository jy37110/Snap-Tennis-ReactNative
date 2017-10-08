import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Button,
    Platform,
} from 'react-native';
import TimePicker from 'react-native-modal-datetime-picker';
import DynamoDb from '../utility/DynamoDb';
import LeagueScheduleOperation from "../utility/LeagueScheduleOperation";
import HomeScreen from "./HomeScreen";

export default class CreateSchedule extends Component {
    constructor(props){
        super(props);
        this.params = this.props.navigation.state.params;
        this.handleCreateNewScheduleSubmit = this.handleCreateNewScheduleSubmit.bind(this);
        this.validate = this.validate.bind(this);
        this.submitToDynamo = this.submitToDynamo.bind(this);
        this.getSuburbByVenueName = this.getSuburbByVenueName.bind(this);
        this.dbInstance = new DynamoDb();
        this.dbContext = this.dbInstance.getDbContext();
        this.scan = [];
        this.userId = HomeScreen.userId;
        this.leagueId = this.params.leagueId;
        this.selectedDate = this.params.selectedDate;
        this.venueList = this.params.venueList;
        this.pickingTime = 0;
        this.suburbOfSelectedVenue = "";
        this.latitudeOfSelectedVenue = "";
        this.longitudeOfSelectedVenue = "";
        this.state = {
            isTimePickerVisible:false,
            timeFrom:"",
            timeTo:"",
            timeFromPickedStr:"Click me to select time",
            timeToPickedStr:"Click me to select time",
            timeFromPickedStr24:"",
            timeToPickedStr24:"",
            venueSelected:"",
            errMsg:""
        };
    }

    static navigationOptions = {
        title: "Create Schedule",
    };

    handleCreateNewScheduleSubmit (){
        if(this.validate()){
            this.getSuburbByVenueName(this.state.venueSelected);
        }
    }

    _showTimePicker = () => this.setState({ isTimePickerVisible: true });

    _hideTimePicker = () => this.setState({ isTimePickerVisible: false });

    _handleTimePicked = (time) => {
        let timeStr = this.formatAMPM(time);
        let timeStr24 = this.format24H(time);
        if (this.pickingTime === 1){
            this.setState({
                timeFromPickedStr24:timeStr24,
                timeFromPickedStr:timeStr,
                timeFrom:time
            });
        } else if (this.pickingTime === 2){
            this.setState({
                timeToPickedStr24:timeStr24,
                timeToPickedStr:timeStr,
                timeTo:time
            })
        }
        this.pickingTime = 0;
        this._hideTimePicker();
    };

    format24H = (date) => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let strTime24 = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes);
        return strTime24;
    };

    formatAMPM = (date) => { // This is to display 12 hour format like you asked
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+ minutes : minutes;
        let strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    };

    validate(){
        let msg = "";
        let pass = true;
        let selectedStartDateTime = new Date(this.selectedDate.replace(/-/g,"/") + " " + this.state.timeFromPickedStr24);
        let currentDate = new Date();
        if (selectedStartDateTime <= currentDate.getTime()){
            msg = "The date and time that you have selected is pasted.";
            pass = false;
        }
        if (this.state.timeTo <= this.state.timeFrom){
            msg = "The time range you selected is not valid.";
            pass = false;
        }
        if (this.state.venueSelected === "") {
            msg = "Please select a venue by click the venue in the venue list";
            pass = false;
        }
        if (this.state.timeFromPickedStr === "Click me to select time" || this.state.timeToPickedStr === "Click me to select time"){
            msg = "Please select a time range that you wish to play";
            pass = false;
        }
        this.setState({
            errMsg:msg
        });
        return pass;
    }

    getSuburbByVenueName(venueName){
        let params = {
            TableName:"NZVenues",
            ProjectionExpression:"suburb,latitude,longitude",
            FilterExpression: '#na = :venueName',
            ExpressionAttributeNames:{
                "#na": "name"
            },
            ExpressionAttributeValues: {
                ":venueName":venueName
            }
        };

        this.dbContext.scan(params, function(err, data) {
            if (err) {
                alert("Unable to read item: " + "\n" + JSON.stringify(err, undefined, 2));
            } else {
                if(data.Items.length > 0){
                    this.suburbOfSelectedVenue = data.Items[0].suburb;
                    this.latitudeOfSelectedVenue = data.Items[0].latitude;
                    this.longitudeOfSelectedVenue = data.Items[0].longitude;
                    this.submitToDynamo();
                }
            }
        }.bind(this));
    }

    submitToDynamo() {
        let params = {
            TableName:"NZSinglesLeagueRoundMatchSchedule",
            Item:{
                "latitude":this.latitudeOfSelectedVenue,
                "league_id":this.leagueId,
                "longitude":this.longitudeOfSelectedVenue,
                "schedule_id":"S" + this.userId + new Date().toString(),
                "suburb":this.suburbOfSelectedVenue,
                "time_from":this.state.timeFromPickedStr24,
                "time_to":this.state.timeToPickedStr24,
                "upcoming_date":this.selectedDate.replace(/-/g,''),
                "user1_id":this.userId,
                "user2_id":"-1",
                "venue_name":this.state.venueSelected,
            }
        };
        let submitOnSuccess = () => {
            this.params.onGoBack();
            this.props.navigation.goBack();
        };
        let scheduleOperationInstance = new LeagueScheduleOperation();
        scheduleOperationInstance.createSchedule(params, submitOnSuccess)
    };

    render() {
        return (
            <ScrollView style={this.styles.calendarContainer}>
                <Text style={this.styles.text}>
                    {this.params.description}
                </Text>

                <View style={this.styles.scheduleContainer}>
                    <View style={this.styles.scheduleEachRowContainer}>
                        <Text style={this.styles.scheduleBodyTitleText}>Date:</Text>
                        <Text style={this.styles.scheduleBodyContentText}>{this.selectedDate}</Text>
                    </View>
                    <View style={this.styles.scheduleEachRowContainer}>
                        <Text style={this.styles.scheduleBodyTitleText}>Time From:</Text>
                        <Text style={this.styles.scheduleBodyContentText} onPress={() => {this.pickingTime = 1; this._showTimePicker();}}>
                             {this.state.timeFromPickedStr}
                        </Text>
                    </View>
                    <View style={this.styles.scheduleEachRowContainer}>
                        <Text style={this.styles.scheduleBodyTitleText}>Time To:</Text>
                        <Text style={this.styles.scheduleBodyContentText} onPress={() => {this.pickingTime = 2; this._showTimePicker();}}>
                             {this.state.timeToPickedStr}
                        </Text>
                    </View>
                    <View style={this.styles.scheduleEachRowContainer}>
                        <Text style={this.styles.scheduleBodyTitleText}>Venue:</Text>
                        <View style={this.styles.venueList}>
                        {this.venueList.map((eachVenue, i) => {
                                return(
                                    <Text style = {this.state.venueSelected === eachVenue ? this.styles.highlightVenue : this.styles.eachVenue}
                                          key = {i}
                                          onPress={() => this.setState({
                                              venueSelected:eachVenue
                                          })}
                                    >
                                        {eachVenue}
                                    </Text>
                                )
                        })}
                        </View>
                    </View>
                </View>

                <TimePicker
                    mode="time"
                    isVisible={this.state.isTimePickerVisible}
                    onConfirm={this._handleTimePicked}
                    onCancel={this._hideTimePicker}
                />

                {this.state.errMsg === "" ? null : <Text style={this.styles.err}>{this.state.errMsg}</Text>}

                <View style={this.styles.createScheduleButtonContainer}>
                    <Button
                        onPress={this.handleCreateNewScheduleSubmit}
                        title="SUBMIT"
                        color={Platform.select({ios:"white", android:"grey"})}
                    />
                </View>

                <View style={{height:20}}></View>
            </ScrollView>
        )
    }
    styles = StyleSheet.create({
        calendarContainer:{
            padding:10,
        },
        text:{

        },
        createScheduleButtonContainer:{
            backgroundColor:"grey",
            marginTop:10,
            borderWidth:2,
            borderColor:"grey",
            marginBottom:30,
        },
        scheduleContainer:{
            marginTop:8,
            padding:5,
            flex:1,
            flexDirection:"column",
            backgroundColor:"white",
        },
        scheduleEachRowContainer:{
            marginTop:4,
            flex:1,
            flexDirection:"row",
            justifyContent:"flex-start",
        },
        scheduleBodyTitleText:{
            width:90,
            fontSize:13,
            color:"black",
            fontWeight:"bold",
        },
        scheduleBodyContentText:{
            fontSize:13,
            color:"grey",
            flex:0.8,
        },
        venueList:{
            flex:1,
            flexDirection:'column',
            justifyContent:'space-between'
        },
        eachVenue:{
            fontSize:13,
            color:"grey",
            marginTop:2,
        },
        highlightVenue:{
            fontSize:13,
            color:"green",
            marginTop:2,
        },
        err:{
            color:"red",
            fontSize:15,
            marginTop:4,
            fontWeight:"bold",
        }
    });
}