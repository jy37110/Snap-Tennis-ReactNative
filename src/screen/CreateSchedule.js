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
import ScheduleOperation from '../components/ScheduleOperation';
import DynamoDb from '../utility/DynamoDb';

export default class CreateSchedule extends Component {
    constructor(props){
        super(props);
        this.params = this.props.navigation.state.params;
        this.handleCreateNewScheduleSubmit = this.handleCreateNewScheduleSubmit.bind(this);
        this.dbInstance = new DynamoDb();
        this.dbContext = this.dbInstance.getDbContext();
        this.scan = [];
        this.userId = "62c88ffd-019b-4bbb-8d17-69427c669ae5";
        this.leagueId = this.params.leagueId;
        this.selectedDate = this.params.selectedDate;
        this.venueList = this.params.venueList;
        this.pickingTime = 0;
        this.state = {
            isTimePickerVisible:false,
            timeFromPicked:"Click me to select time",
            timeToPicked:"Click me to select time",
        };
    }


    static navigationOptions = {
        title: 'New Schedule',
    };

    handleCreateNewScheduleSubmit (){
        alert("Create new schedule was clicked")
    }


    _showTimePicker = () => this.setState({ isTimePickerVisible: true });

    _hideTimePicker = () => this.setState({ isTimePickerVisible: false });

    _handleTimePicked = (time) => {
        if (this.pickingTime === 1){
            this.setState({
                timeFromPicked:time
            });
        } else if (this.pickingTime === 2){
            this.setState({
                timeToPicked:time
            })
        }
        this.pickingTime = 0;
        this._hideTimePicker();
    };

    render() {
        return (
            <ScrollView style={this.styles.calendarContainer}>
                <Text style={this.styles.text}>
                    To register a new schedule at {this.selectedDate}. Please select the time and the venue that you would like to play.
                </Text>
                <Text style={this.styles.text} onPress={() => {this.pickingTime = 1; this._showTimePicker();}}>
                    Time From: {this.state.timeFromPicked.toString()}
                </Text>
                <Text style={this.styles.text} onPress={() => {this.pickingTime = 2; this._showTimePicker();}}>
                    Time To: {this.state.timeToPicked.toString()}
                </Text>

                {/*<ScheduleOperation*/}

                {/*/>*/}

                <TimePicker
                    mode="time"
                    isVisible={this.state.isTimePickerVisible}
                    onConfirm={this._handleTimePicked}
                    onCancel={this._hideTimePicker}
                />

                <Text style={this.styles.text}>
                    Suburb:
                </Text>
                <Text style={this.styles.text}>
                    Venue:
                </Text>
                <View style={this.styles.createScheduleButtonContainer}>
                    <Button
                        onPress={this.handleCreateNewScheduleSubmit}
                        title="SUBMIT"
                        color={Platform.select({ios:"white", android:"grey"})}
                        // accessibilityLabel="Learn more about this purple button"
                    />
                </View>
                

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
    });
}