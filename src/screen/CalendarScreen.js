import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    FlatList,
} from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

export default class CalendarScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            text:""
        };
    }

    static navigationOptions = {
        title: 'Calendar',
    };

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
                          onDayPress={(day) => {this.setState({text: day.year + "-" + day.month + "-" + day.day})}}
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

                              '2017-07-10': [{textColor: 'green'}],
                              '2017-07-11': [{startingDay: true, color: 'green', textColor: 'white'}],
                              '2017-07-12': [{startingDay: false, color: 'green', textColor: 'white'}],
                              '2017-07-13': [{startingDay: false, color: 'green', textColor: 'white'}],
                              '2017-07-14': [{startingDay: false, color: 'green', textColor: 'white'}],
                              '2017-07-15': [{endingDay: true, color: 'green', textColor: 'white'}],
                              '2017-07-22': [{startingDay: true, color: 'yellow'}, {endingDay: true, color: 'yellow'}],
                              '2017-07-26': [{startingDay: true, color: 'grey'}, {endingDay: true, color: 'grey', textColor: 'white'}],
                              '2017-07-21': [{startingDay: true, color: 'orange'}, {endingDay: true, color: 'orange'}],
                              '2017-07-19': [{startingDay: true, color: 'blue'}, {endingDay: true, color: 'blue', textColor: 'white'}],
                          }}
                          markingType={'interactive'}
                />
                <Text style={this.styles.text}>{this.state.text}</Text>


            </ScrollView>
        )
    }
    styles = StyleSheet.create({
        calendarContainer:{

        },
        calendar:{
        },
        title:{
            textAlign:'center'
        },
        text:{
            textAlign:'center',
            fontSize: 18,
        }
    });
}