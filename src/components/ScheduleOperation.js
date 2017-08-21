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
import DynamoDb from '../utility/DynamoDb';

export default class ScheduleOperation extends Component {
    constructor(props){
        super(props);
        this.handleCreateNewSchedule = this.handleCreateNewSchedule.bind(this);
        this.dbInstance = new DynamoDb();
        this.dbContext = this.dbInstance.getDbContext();
        this.scan = [];
        this.userId = "62c88ffd-019b-4bbb-8d17-69427c669ae5";
        this.state = {
        };
    }

    handleCreateNewSchedule (){
        alert("Create new schedule was clicked")
    }

    onDateChange(){

    }

    render() {
        return (
            <ScrollView style={this.styles.schedule()}>
                <View style={this.styles.scheduleEachRowContainer}>
                    <Text style={this.styles.scheduleBodyTitleText}>Time:</Text>
                    <Text style={this.styles.scheduleBodyContentText}>{this.props.time}</Text>
                </View>


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