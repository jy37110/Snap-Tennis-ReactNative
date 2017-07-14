import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Dimensions,
    FlatList,
} from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

export default class CalendarScreen extends Component {
    constructor(props){
        super(props);
        this.screenWidth = Dimensions.get('window').width;
        this.state = {
            selectedDate:""
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
                <Text style={this.styles.text}>{this.state.selectedDate}</Text>
                <View style={this.styles.scheduleContainer}>
                    <View style={this.styles.scheduleEachRowContainer}>
                        <Text style={this.styles.scheduleBodyTitleText}>Schedule Time:</Text>
                        <Text style={this.styles.scheduleBodyContentText}>06:00-22:00</Text>
                    </View>
                    <View style={this.styles.scheduleEachRowContainer}>
                        <Text style={this.styles.scheduleBodyTitleText}>Schedule Location:</Text>
                        <Text style={this.styles.scheduleBodyContentText}
                              numberOfLines={3}
                        >
                            Albany Domain slk;d jflska jdfl ksjdf lksjkdlf
                        </Text>
                    </View>
                    <View style={this.styles.playerContainer}>
                        <Text style={this.styles.Player1TitleText}>Player1:</Text>
                        <Text style={this.styles.Player1ContentText}>Yuki</Text>
                        <Text style={this.styles.Player2TitleText}>Player2:</Text>
                        <Text style={this.styles.Player2ContentText}>Chao</Text>
                    </View>
                </View>
                <Text>{this.screenWidth}</Text>

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
        },

        scheduleContainer:{
            borderWidth:2,
            borderColor:"grey",
            padding:5,
            flex:1,
            flexDirection:"column",
            backgroundColor:"white",
        },
        scheduleEachRowContainer:{
            marginTop:5,
            flex:1,
            flexDirection:"row",
            justifyContent:"flex-start",
        },
        scheduleBodyTitleText:{
            // flex:0.35,
            width:130,
            fontSize:13,
            color:"black",
            fontWeight:"bold",
        },
        scheduleBodyContentText:{
            fontSize:13,
            color:"grey",
            flex:0.7,
        },
        playerContainer:{
            marginTop:5,
            flex:1,
            flexDirection:"row",
            justifyContent:"space-between",
        },
        Player1TitleText:{
            // flex:0.15,
            fontSize:13,
            color:"red",
            fontWeight:"bold",
        },
        Player1ContentText:{
            fontSize:13,
            color:"red",
            // flex:0.2,
        },
        Player2TitleText:{
            // flex:0.15,
            fontSize:13,
            color:"blue",
            fontWeight:"bold",
        },
        Player2ContentText:{
            fontSize:13,
            color:"blue",
            // flex:0.2,
        },
    });
}