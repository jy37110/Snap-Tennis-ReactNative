import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Button,
    Platform,
} from 'react-native';

import EachScheduleView from '../components/EachScheduleView'
import { Calendar } from 'react-native-calendars';

export default class CalendarScreen extends Component {
    constructor(props){
        super(props);
        this.handleCreateNewSchedule = this.handleCreateNewSchedule.bind(this);
        this.handleRequestSchedule = this.handleRequestSchedule.bind(this);
        this.handleEditSchedule = this.handleEditSchedule.bind(this);
        this.handleCancelSchedule = this.handleCancelSchedule.bind(this);
        this.handleConfirmSchedule = this.handleConfirmSchedule.bind(this);
        this.state = {
            selectedDate:"",
            scheduleList:[
                {
                    date:"2017-7-21",
                    schedule:{
                        time:"08:00-10:00",
                        location:"Finlayson Community House Reserve",
                        status:"Waiting for player2",
                        player1:"Chao",
                        player2:"Vacancy",
                        option:{
                            request:false,
                            edit:true,
                            cancel:true,
                            confirm:false,
                        }
                    }
                },
                {
                    date:"2017-7-21",
                    schedule:{
                        time:"13:00-15:00",
                        location:"Albany Domain",
                        status:"Waiting for confirm",
                        player1:"Chao",
                        player2:"Tony",
                        option:{
                            request:false,
                            edit:true,
                            cancel:true,
                            confirm:true,
                        }
                    }
                },
                {
                    date:"2017-7-21",
                    schedule:{
                        time:"15:00-17:00",
                        location:"Albany Domain",
                        status:"Confirmed",
                        player1:"Tom",
                        player2:"Tony",
                        option:{
                            request:false,
                            edit:false,
                            cancel:false,
                            confirm:false,
                        }
                    }
                },
                {
                    date:"2017-7-26",
                    schedule:{
                        time:"08:00-10:00",
                        location:"Finlayson Community House Reserve",
                        status:"Waiting for player2",
                        player1:"Yuki",
                        player2:"Vacancy",
                        option:{
                            request:true,
                            edit:false,
                            cancel:false,
                            confirm:false,
                        }
                    }
                }
            ]
        };
    }

    static navigationOptions = {
        title: 'Calendar',
    };

    handleCreateNewSchedule (){
        alert("Create new schedule was clicked")
    }
    handleRequestSchedule(){
        alert("Go to request page")
    }
    handleEditSchedule(){
        alert("Go to edit page")
    }
    handleCancelSchedule(){
        alert("Send a cancel request")
    }
    handleConfirmSchedule(){
        alert("Send a confirm request")
    }

    render() {
        return (
            <ScrollView style={this.styles.calendarContainer}>
                <Calendar style={this.styles.calendar}
                    // Initially visible month. Default = Date()
                          current={'2017-07-08'}
                    // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                          minDate={'2017-07-03'}
                    // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                          maxDate={'2017-07-29'}
                    // Handler which gets executed on day press. Default = undefined
                          onDayPress={(day) => {this.setState({selectedDate: day.year + "-" + day.month + "-" + day.day})}}
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
                          markedDates={{
                              // '2017-07-22': {selected: true, marked: true},
                              '2017-07-05': [{marked: true}],
                              // '2017-07-24': {disabled: true},

                              // '2017-07-10': [{textColor: 'green'}],
                              // '2017-07-11': [{startingDay: true, color: 'green', textColor: 'white'}],
                              // '2017-07-12': [{startingDay: false, color: 'green', textColor: 'white'}],
                              // '2017-07-13': [{startingDay: false, color: 'green', textColor: 'white'}],
                              // '2017-07-14': [{startingDay: false, color: 'green', textColor: 'white'}],
                              // '2017-07-15': [{endingDay: true, color: 'green', textColor: 'white'}],
                              // '2017-07-22': [{startingDay: true, color: 'yellow'}, {endingDay: true, color: 'yellow'}],
                              // '2017-07-26': [{startingDay: true, color: 'grey'}, {endingDay: true, color: 'grey', textColor: 'white'}],
                              '2017-07-21': [{startingDay: true, color: 'orange'}, {endingDay: true, color: 'orange'}],
                              '2017-07-26': [{startingDay: true, color: 'orange'}, {endingDay: true, color: 'orange'}],

                              // '2017-07-19': [{startingDay: true, color: 'blue'}, {endingDay: true, color: 'blue', textColor: 'white'}],
                          }}
                          markingType={'interactive'}
                />

                {this.state.scheduleList.map((eachSchedule,i) =>{
                    if(this.state.selectedDate === eachSchedule.date){
                        return(
                            <EachScheduleView
                                key={i}
                                time={eachSchedule.schedule.time}
                                location={eachSchedule.schedule.location}
                                status={eachSchedule.schedule.status}
                                player1={eachSchedule.schedule.player1}
                                player2={eachSchedule.schedule.player2}
                                option={eachSchedule.schedule.option}
                                requestCallBack={this.handleRequestSchedule}
                                editCallBack={this.handleEditSchedule}
                                cancelCallBack={this.handleCancelSchedule}
                                confirmCallBack={this.handleConfirmSchedule}
                            />
                        )
                    }
                })}

                <View style={this.styles.createScheduleButtonContainer}>
                    <Button
                        onPress={this.handleCreateNewSchedule}
                        title="CREATE NEW SCHEDULE"
                        color={Platform.select({ios:"white", android:"grey"})}
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>

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
}