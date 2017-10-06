import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    Button,
} from 'react-native';
import DynamoDb from '../utility/DynamoDb';
import EachScheduleView from '../components/EachScheduleView';
import LeagueScheduleOperation from "../utility/LeagueScheduleOperation";
import ReviewService from '../utility/ReviewService';
import { Calendar } from 'react-native-calendars';

export default class CalendarScreen extends Component {
    constructor(props){
        super(props);
        this.params = this.props.navigation.state.params.params;
        this.leaguePlayerList = this.props.navigation.state.params.playerList;
        this.renderEmptySchedule = this.renderEmptySchedule.bind(this);
        this.handleCreateNewSchedule = this.handleCreateNewSchedule.bind(this);
        this.handleRequestSchedule = this.handleRequestSchedule.bind(this);
        this.handleEditSchedule = this.handleEditSchedule.bind(this);
        this.handleCancelSchedule = this.handleCancelSchedule.bind(this);
        this.handleResultSchedule = this.handleResultSchedule.bind(this);
        this.handleReviewSchedule = this.handleReviewSchedule.bind(this);
        this.refreshContent = this.refreshContent.bind(this);
        this.scheduleOperation = new LeagueScheduleOperation();
        this.dbInstance = new DynamoDb();
        this.dbContext = this.dbInstance.getDbContext();
        this.scan = [];
        this.hasSchedule = false;
        this.userId = "62c88ffd-019b-4bbb-8d17-69427c669ae5";
        this.startDate = this.params.startDate.substr(0,10);
        this.endDate = this.params.endDate.substr(0,10);
        this.leagueId = this.params.id;
        this.currentDate = this.getCurrentDate();
        this.markDates = {};
        this.state = {
            selectedDate:this.currentDate,
            scheduleList:[{}]
        };
        this.getSchedule();
    }

    static navigationOptions = {
        title: 'Calendar',
    };

    refreshContent(){
        this.scan = [];
        this.hasSchedule = false;
        this.currentDate = this.getCurrentDate();
        this.setState({
            selectedDate:this.currentDate,
            scheduleList:[{}]
        });
        this.getSchedule();
    }

    getCurrentDate(){
        let d = new Date();
        let today = d.getFullYear() + "-" + ((d.getMonth() + 1) < 10 ? "0" + (d.getMonth() + 1).toString() : d.getMonth() + 1) + "-" + (d.getDate() < 10 ? "0" + d.getDate() : d.getDate());
        return today;
    }

    handleCreateNewSchedule (){
        const { navigate } = this.props.navigation;
        navigate("CreateSchedule",{
            onGoBack:() => this.refreshContent(),
            selectedDate:this.state.selectedDate,
            leagueId:this.leagueId,
            venueList:this.params.venueList,
            description:"To register a new schedule. Please select the time and the venue that you would like to play.",
        })
    }

    handleRequestSchedule = (scheduleId) => {
        let requestOnSuccess = () => {
            alert("Your request is successful");
            this.refreshContent();
        };
        this.scheduleOperation.requestSchedule(scheduleId, this.userId, requestOnSuccess);
    };

    handleEditSchedule = (scheduleId) => {
        const { navigate } = this.props.navigation;
        navigate("EditSchedule",{
            onGoBack:() => this.refreshContent(),
            selectedDate:this.state.selectedDate,
            leagueId:this.leagueId,
            venueList:this.params.venueList,
            description:"To edit your schedule. Please select the time and the venue that you would like to play.",
            scheduleId:scheduleId,
        })
    };

    handleCancelSchedule = (scheduleId, p1, p2) => {
        let deleteOnSuccess = () => {
            alert("Schedule has been deleted successfully");
            this.props.navigation.goBack();
            // this.refreshContent();
        };
        if(this.userId === p1){
            this.scheduleOperation.deleteSchedule(scheduleId, deleteOnSuccess);
        }
        if (this.userId === p2){
            this.scheduleOperation.deleteScheduleForUser2(scheduleId, deleteOnSuccess);
        }
    };

    handleResultSchedule(){
        const { navigate } = this.props.navigation;
        navigate("LeagueResult",{leagueId:this.leagueId,playerList:this.leaguePlayerList})
    }

    handleReviewSchedule(p1Name,p2Name,matchInfo){
        const { navigate } = this.props.navigation;
        navigate("LeagueReview",{
            onGoBack:() => this.refreshContent(),
            matchInfo:matchInfo,
            p1Name:p1Name,
            p2Name:p2Name,
        })
    }

    renderEmptySchedule(){
        if (this.hasSchedule === false){
            let scheduleDate = new Date(this.state.selectedDate.replace(/-/g, "/") + " 23:59:59");
            let currentDate = new Date();
            let isPastSchedule = scheduleDate < currentDate.getTime();
            let reviewStatus = "no review";
            return(
                <EachScheduleView
                    date={this.state.selectedDate}
                    time={"-"}
                    location={"-"}
                    status={LeagueScheduleOperation.getSchedulStatus("","",isPastSchedule,reviewStatus)}
                    player1={""}
                    player2={""}
                    option={LeagueScheduleOperation.getAvailableOptionOfSchedule(this.userId,"","",isPastSchedule,reviewStatus)}
                    createCallBack={this.handleCreateNewSchedule}
                    requestCallBack={this.handleRequestSchedule}
                    editCallBack={this.handleEditSchedule}
                    cancelCallBack={this.handleCancelSchedule}
                    resultCallBack={this.handleResultSchedule}
                    reviewCallBack={this.handleReviewSchedule}
                />
            )
        }
    }

    render() {
        return (
            <ScrollView style={this.styles.calendarContainer}>
                <Calendar style={this.styles.calendar}
                    // Initially visible month. Default = Date()
                          current={this.currentDate}
                    // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                          minDate={this.startDate}
                    // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                          maxDate={this.endDate}
                    // Handler which gets executed on day press. Default = undefined
                          onDayPress={(day) => {
                              let selectedDate = day.year + "-" + (day.month < 10 ? "0" + day.month : day.month) + "-" + (day.day < 10 ? "0" + day.day : day.day);
                              this.setState({selectedDate:selectedDate});
                              this.hasSchedule = false;
                          }}
                    // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                          monthFormat={'yyyy MM'}
                    // Handler which gets executed when visible month changes in calendar. Default = undefined
                          onMonthChange={(month) => {console.log('month changed', month)}}
                    // Hide month navigation arrows. Default = false
                    //        hideArrows={true}
                    // Replace default arrows with custom ones (direction can be 'left' or 'right')
                    //        renderArrow={(direction) => (<Arrow />)}
                    // Do not show days of other months in month page. Default = false
                          hideExtraDays={true}
                    // If hideArrows=false and hideExtraDays=false do not swich month when tapping on greyed out
                    // day from another month that is visible in calendar page. Default = false
                          disableMonthChange={true}
                    // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                          firstDay={1}
                          markedDates={this.markDates}
                          markingType={'interactive'}
                />

                {this.state.scheduleList.map((eachSchedule) => {
                    if(this.state.selectedDate === eachSchedule.upcomingDate){
                        this.hasSchedule = true;
                        return(
                            <EachScheduleView
                                key={eachSchedule.scheduleId}
                                leagueId={this.leagueId}
                                id={eachSchedule.scheduleId}
                                date={eachSchedule.upcomingDate}
                                time={eachSchedule.timeFrom + "-" + eachSchedule.timeTo}
                                location={eachSchedule.venueName}
                                status={eachSchedule.status}
                                player1={eachSchedule.user1Id}
                                player2={eachSchedule.user2Id}
                                latitude={eachSchedule.latitude}
                                longitude={eachSchedule.longitude}
                                suburb={eachSchedule.suburb}
                                option={eachSchedule.option}
                                createCallBack={this.handleCreateNewSchedule}
                                requestCallBack={this.handleRequestSchedule}
                                editCallBack={this.handleEditSchedule}
                                cancelCallBack={this.handleCancelSchedule}
                                resultCallBack={this.handleResultSchedule}
                                reviewCallBack={this.handleReviewSchedule}
                            />
                        )
                    }
                })}

                {this.renderEmptySchedule()}

                {/*<View style={this.styles.createScheduleButtonContainer}>*/}
                    {/*<Button*/}
                        {/*onPress={this.testButton}*/}
                        {/*title="CREATE NEW SCHEDULE"*/}
                        {/*color={Platform.select({ios:"white", android:"grey"})}*/}
                    {/*/>*/}
                {/*</View>*/}

            </ScrollView>
        )
    }
    styles = StyleSheet.create({
        calendarContainer:{
            padding:10,
        },
        calendar:{
        },
        title:{
            textAlign:'center'
        },
        text:{
            textAlign:'center',
            fontSize: 18,
        },
        createScheduleButtonContainer:{
            backgroundColor:"grey",
            marginTop:10,
            borderWidth:2,
            borderColor:"grey",
            marginBottom:30,
        },
    });

    getSchedule = () => {
        let onScan = (err, data) => {
            if (err) {
                this.scan = "Something wrong" + err;
                alert("err: " + err);
            } else {
                let isPastSchedule = false;
                data.Items.forEach((value) => {
                    let scheduleDateStr = value.upcoming_date.substr(0,4) + "/" + value.upcoming_date.substr(4,2) + "/" + value.upcoming_date.substr(6,2);
                    let scheduleDate = new Date(scheduleDateStr + " " + value.time_to);
                    let currentDate = new Date();
                    isPastSchedule = scheduleDate < currentDate.getTime();

                    let reviewStatus = "no review";
                    let reviewService = new ReviewService();
                    if (isPastSchedule && value.user2_id !== "-1"){
                        reviewService.checkMatchHasBeenReviewed(value.user1_id, value.user2_id, this.leagueId, (err, data) =>{
                            if (err) alert("err: " + err);
                            else {
                                if (data.Count > 0) {
                                    if (data.Items[0].validated === "Y") {reviewStatus = "review finished"}
                                    else {
                                        if ((this.userId === value.user1_id && data.Items[0].player2_comment === "null") || (this.userId === value.user2_id && data.Items[0].player1_comment === "null")) {reviewStatus = "wait for opponent review"}
                                        else {reviewStatus = "wait for my review"}
                                    }
                                }
                                let temp = {
                                    upcomingDate: value.upcoming_date.substr(0,4) + "-" + value.upcoming_date.substr(4,2) + "-" + value.upcoming_date.substr(6,2),
                                    scheduleId: value.schedule_id,
                                    suburb: value.suburb,
                                    latitude: value.latitude,
                                    longitude: value.longitude,
                                    timeFrom: value.time_from,
                                    timeTo: value.time_to,
                                    user1Id: value.user1_id,
                                    user2Id: value.user2_id,
                                    venueName: value.venue_name,
                                    status: LeagueScheduleOperation.getSchedulStatus(value.user1_id,value.user2_id,true,reviewStatus),
                                    option: LeagueScheduleOperation.getAvailableOptionOfSchedule(this.userId,value.user1_id,value.user2_id,true,reviewStatus,data)
                                };
                                this.scan.push(temp);
                                let t = {};
                                t[temp.upcomingDate] = [{startingDay: true, color: 'grey'}, {endingDay: true, color: 'grey'}];
                                this.markDates = Object.assign(t,this.markDates);
                                this.setState({scheduleList:this.scan,},);
                            }
                        });
                    } else {
                        let temp = {
                            upcomingDate: value.upcoming_date.substr(0,4) + "-" + value.upcoming_date.substr(4,2) + "-" + value.upcoming_date.substr(6,2),
                            scheduleId: value.schedule_id,
                            suburb: value.suburb,
                            latitude: value.latitude,
                            longitude: value.longitude,
                            timeFrom: value.time_from,
                            timeTo: value.time_to,
                            user1Id: value.user1_id,
                            user2Id: value.user2_id,
                            venueName: value.venue_name,
                            status: LeagueScheduleOperation.getSchedulStatus(value.user1_id,value.user2_id,isPastSchedule,reviewStatus),
                            option: LeagueScheduleOperation.getAvailableOptionOfSchedule(this.userId,value.user1_id,value.user2_id,isPastSchedule,reviewStatus,data)
                        };
                        this.scan.push(temp);
                        let checkRepeatDate = Object.keys(this.markDates);
                        let t = {};
                        if (isPastSchedule){
                             t[temp.upcomingDate] = [{startingDay: true, color: 'grey'}, {endingDay: true, color: 'grey'}];
                        } else {
                            if (temp.user2Id === "-1"){
                                t[temp.upcomingDate] = [{startingDay: true, color: 'green'}, {endingDay: true, color: 'green'}];
                            } else if (temp.user2Id !== "-1" && !checkRepeatDate.includes(temp.upcomingDate)){
                                t[temp.upcomingDate] = [{startingDay: true, color: 'orange'}, {endingDay: true, color: 'orange'}]
                            }
                        }
                        this.markDates = Object.assign(t,this.markDates);
                    }
                });
                this.setState({scheduleList:this.scan,},);
            }
        };
        this.scheduleOperation.loadSchedule(this.leagueId,onScan);
    };
}