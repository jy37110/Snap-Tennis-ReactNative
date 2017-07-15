import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    FlatList,
    Image,
    Button,
    Platform,
} from 'react-native';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

export default class CalendarScreen extends Component {
    constructor(props){
        super(props);
        this.handleCreateNewSchedule = this.handleCreateNewSchedule.bind(this);
        this.renderSchedule = this.renderSchedule.bind(this);
        this.state = {
            selectedDate:"",
        };
    }

    static navigationOptions = {
        title: 'Calendar',
    };

    handleCreateNewSchedule (){
        alert("Create new schedule was clicked")
    }

    renderSchedule(){
        if(this.state.selectedDate === "2017-7-21"){
            return(
            <View>
                <View style={this.styles.scheduleContainer}>
                    <View style={this.styles.scheduleEachRowContainer}>
                        <Text style={this.styles.scheduleBodyTitleText}>Time:</Text>
                        <Text style={this.styles.scheduleBodyContentText}>08:00-10:00</Text>

                        <Menu>
                            <MenuTrigger>
                                <Image
                                    style={this.styles.icon}
                                    source={require('../image/menu.png')}
                                />
                            </MenuTrigger>
                            <MenuOptions>
                                <MenuOption onSelect={() => alert(`Send Request`)} disabled={true} text='I want to play with Chao' />
                                <MenuOption onSelect={() => alert(`Go to edit page`)} disabled={false} text='Make a change' />
                                <MenuOption onSelect={() => alert(`Send cancel request`)} disabled={false} text='I want to cancel' />
                                <MenuOption onSelect={() => alert(`Not called`)} disabled={true} text='I want to confirm' />
                            </MenuOptions>
                        </Menu>

                    </View>
                    <View style={this.styles.scheduleEachRowContainer}>
                        <Text style={this.styles.scheduleBodyTitleText}>Location:</Text>
                        <Text style={this.styles.scheduleBodyContentText}
                              numberOfLines={3}
                        >
                            Finlayson Community House Reserve
                        </Text>
                    </View>

                    <View style={this.styles.scheduleEachRowContainer}>
                        <Text style={this.styles.scheduleBodyTitleText}>Status:</Text>
                        <Text style={this.styles.scheduleBodyContentText}
                              numberOfLines={3}
                        >
                            Waiting for player2
                        </Text>
                    </View>

                    <View style={this.styles.playerContainer}>
                        <Text style={this.styles.Player1TitleText}>Player1:</Text>
                        <Text style={this.styles.Player1ContentText}>Chao</Text>
                        <Text style={this.styles.Player2TitleText}>Player2:</Text>
                        <Text style={this.styles.Player2ContentText}>Vacancy</Text>
                    </View>
                </View>


                <View style={this.styles.scheduleContainer}>
                    <View style={this.styles.scheduleEachRowContainer}>
                        <Text style={this.styles.scheduleBodyTitleText}>Time:</Text>
                        <Text style={this.styles.scheduleBodyContentText}>13:00-15:00</Text>

                        <Menu>
                            <MenuTrigger>
                                <Image
                                    style={this.styles.icon}
                                    source={require('../image/menu.png')}
                                />
                            </MenuTrigger>
                            <MenuOptions>
                                <MenuOption onSelect={() => alert(`Send Request`)} disabled={true} text='I want to play with Chao' />
                                <MenuOption onSelect={() => alert(`Go to edit page`)} disabled={false} text='Make a change' />
                                <MenuOption onSelect={() => alert(`Send cancel request`)} disabled={false} text='I want to cancel' />
                                <MenuOption onSelect={() => alert(`Not called`)} disabled={false} text='I want to confirm' />
                            </MenuOptions>
                        </Menu>

                    </View>
                    <View style={this.styles.scheduleEachRowContainer}>
                        <Text style={this.styles.scheduleBodyTitleText}>Location:</Text>
                        <Text style={this.styles.scheduleBodyContentText}
                              numberOfLines={3}
                        >
                            Albany Domain
                        </Text>
                    </View>
                    <View style={this.styles.scheduleEachRowContainer}>
                        <Text style={this.styles.scheduleBodyTitleText}>Status:</Text>
                        <Text style={this.styles.scheduleBodyContentText}
                              numberOfLines={3}
                        >
                            Waiting for confirm
                        </Text>
                    </View>
                    <View style={this.styles.playerContainer}>
                        <Text style={this.styles.Player1TitleText}>Player1:</Text>
                        <Text style={this.styles.Player1ContentText}>Chao</Text>
                        <Text style={this.styles.Player2TitleText}>Player2:</Text>
                        <Text style={this.styles.Player2ContentText}>Tony</Text>
                    </View>
                </View>


                <View style={this.styles.scheduleContainer}>
                    <View style={this.styles.scheduleEachRowContainer}>
                        <Text style={this.styles.scheduleBodyTitleText}>Time:</Text>
                        <Text style={this.styles.scheduleBodyContentText}>15:00-17:00</Text>

                        <Menu>
                            <MenuTrigger>
                                <Image
                                    style={this.styles.icon}
                                    source={require('../image/menu.png')}
                                />
                            </MenuTrigger>
                            <MenuOptions>
                                <MenuOption onSelect={() => alert(`Send Request`)} disabled={true} text='I want to play with Tom' />
                                <MenuOption onSelect={() => alert(`Go to edit page`)} disabled={true} text='Make a change' />
                                <MenuOption onSelect={() => alert(`Send cancel request`)} disabled={true} text='I want to cancel' />
                                <MenuOption onSelect={() => alert(`Not called`)} disabled={true} text='I want to confirm' />
                            </MenuOptions>
                        </Menu>

                    </View>
                    <View style={this.styles.scheduleEachRowContainer}>
                        <Text style={this.styles.scheduleBodyTitleText}>Location:</Text>
                        <Text style={this.styles.scheduleBodyContentText}
                              numberOfLines={3}
                        >
                            Albany Domain
                        </Text>
                    </View>
                    <View style={this.styles.scheduleEachRowContainer}>
                        <Text style={this.styles.scheduleBodyTitleText}>Status:</Text>
                        <Text style={this.styles.scheduleBodyContentText}
                              numberOfLines={3}
                        >
                            Confirmed
                        </Text>
                    </View>
                    <View style={this.styles.playerContainer}>
                        <Text style={this.styles.Player1TitleText}>Player1:</Text>
                        <Text style={this.styles.Player1ContentText}>Tom</Text>
                        <Text style={this.styles.Player2TitleText}>Player2:</Text>
                        <Text style={this.styles.Player2ContentText}>Tony</Text>
                    </View>
                </View>

            </View>
            )
        }
    }

    render() {
        let renderSchedule = this.state.renderSchedule;
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
                              // '2017-07-19': [{startingDay: true, color: 'blue'}, {endingDay: true, color: 'blue', textColor: 'white'}],
                          }}
                          markingType={'interactive'}
                />
                {/*<Text style={this.styles.text}>{this.state.selectedDate}</Text>*/}
                {/*<View style={this.styles.scheduleContainer}>*/}
                    {/*<View style={this.styles.scheduleEachRowContainer}>*/}
                        {/*<Text style={this.styles.scheduleBodyTitleText}>Schedule Time:</Text>*/}
                        {/*<Text style={this.styles.scheduleBodyContentText}>06:00-22:00</Text>*/}

                        {/*<Menu>*/}
                            {/*<MenuTrigger>*/}
                                {/*<Image*/}
                                    {/*style={this.styles.icon}*/}
                                    {/*source={require('../image/menu.png')}*/}
                                {/*/>*/}
                            {/*</MenuTrigger>*/}
                            {/*<MenuOptions>*/}
                                {/*<MenuOption onSelect={() => alert(`Send Request`)} disabled={true} text='I want to play with Chao' />*/}
                                {/*<MenuOption onSelect={() => alert(`Go to edit page`)} disabled={false} text='Make a change' />*/}
                                {/*<MenuOption onSelect={() => alert(`Send cancel request`)} disabled={false} text='I want to cancel' />*/}
                                {/*<MenuOption onSelect={() => alert(`Not called`)} disabled={true} text='I want to confirm' />*/}
                            {/*</MenuOptions>*/}
                        {/*</Menu>*/}

                    {/*</View>*/}
                    {/*<View style={this.styles.scheduleEachRowContainer}>*/}
                        {/*<Text style={this.styles.scheduleBodyTitleText}>Schedule Location:</Text>*/}
                        {/*<Text style={this.styles.scheduleBodyContentText}*/}
                              {/*numberOfLines={3}*/}
                        {/*>*/}
                            {/*Albany Domain*/}
                        {/*</Text>*/}
                    {/*</View>*/}
                    {/*<View style={this.styles.playerContainer}>*/}
                        {/*<Text style={this.styles.Player1TitleText}>Player1:</Text>*/}
                        {/*<Text style={this.styles.Player1ContentText}>Chao</Text>*/}
                        {/*<Text style={this.styles.Player2TitleText}>Player2:</Text>*/}
                        {/*<Text style={this.styles.Player2ContentText}>Vacancy</Text>*/}
                    {/*</View>*/}
                {/*</View>*/}

                {this.renderSchedule()}

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
        scheduleContainer:{
            marginTop:10,
            borderWidth:2,
            borderColor:"grey",
            padding:5,
            flex:1,
            flexDirection:"column",
            backgroundColor:"white",
        },
        scheduleEachRowContainer:{
            marginTop:2,
            flex:1,
            flexDirection:"row",
            justifyContent:"flex-start",
        },
        icon:{
            width: 22,
            height: 17,
            resizeMode: 'contain',
        },
        scheduleBodyTitleText:{
            width:70,
            fontSize:13,
            color:"black",
            fontWeight:"bold",
        },
        scheduleBodyContentText:{
            fontSize:13,
            color:"grey",
            flex:0.8,
        },
        playerContainer:{
            marginTop:2,
            flex:1,
            flexDirection:"row",
            justifyContent:"space-between",
        },
        Player1TitleText:{
            fontSize:13,
            color:"red",
            fontWeight:"bold",
        },
        Player1ContentText:{
            fontSize:13,
            color:"red",
        },
        Player2TitleText:{
            fontSize:13,
            color:"blue",
            fontWeight:"bold",
        },
        Player2ContentText:{
            fontSize:13,
            color:"blue",
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