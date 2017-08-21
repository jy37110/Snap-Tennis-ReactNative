import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    DatePickerIOS,
    View,
    ScrollView,
    Button,
    Platform,
} from 'react-native';
import ScheduleOperation from '../components/ScheduleOperation';
import DynamoDb from '../utility/DynamoDb';

export default class CreateSchedule extends Component {
    constructor(props){
        super(props);
        this.params = this.props.navigation.state.params;
        this.handleCreateNewSchedule = this.handleCreateNewSchedule.bind(this);
        this.dbInstance = new DynamoDb();
        this.dbContext = this.dbInstance.getDbContext();
        this.scan = [];
        this.userId = "62c88ffd-019b-4bbb-8d17-69427c669ae5";
        this.leagueId = this.params.leagueId;
        this.selectedDate = this.params.selectedDate;
        this.venueList= this.params.venueList;
        this.state = {
        };
    }


    static navigationOptions = {
        title: 'New Schedule',
    };

    handleCreateNewSchedule (){
        alert("Create new schedule was clicked")
    }

    onDateChange(){

    }

    render() {
        return (
            <ScrollView style={this.styles.calendarContainer}>
                <Text style={this.styles.text}>
                    {this.leagueId}
                </Text>
                <Text style={this.styles.text}>
                    {this.selectedDate}
                </Text>
                <Text style={this.styles.text}>
                    {this.venueList[1]}
                </Text>

                <ScheduleOperation

                />

                {/*<DatePickerIOS>*/}
                    {/*date={this.selectedDate}*/}
                    {/*mode="time"*/}
                    {/*minuteInterval={1}*/}
                    {/*onDateChange = {this.onDateChange}*/}
                    {/*minimumDate = {this.selectedDate}*/}
                {/*</DatePickerIOS>*/}

            </ScrollView>
        )
    }
    styles = StyleSheet.create({
        calendarContainer:{
            padding:10,
        },
        text:{

        }
    });
}