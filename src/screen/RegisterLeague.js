import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Switch,
    ScrollView,
} from 'react-native';

export default class RegisterLeague extends Component {
    constructor(props){
        super(props);
        this.userId = "62c88ffd-019b-4bbb-8d17-69427c669ae5";
        this.state = {
            ongoingLeague:[
                {
                    id:'efaa0eb1-362c-4e3b-a514-16be15599be0', city:"Auckland", endDate:"2017-08-30 02:51:25.772839",
                    players:["36b5246d-13cd-498a-9797-14dcec784950","62c88ffd-019b-4bbb-8d17-69427c669ae5"],
                    startDate:"2017-08-03 02:51:25.772828", suburbs:["Albany Domain"],
                },
                {
                    id:'d4e503e8-e686-4146-8a2c-eb141333a22c', city:"Auckland", endDate:"2017-08-05 03:05:05.459131",
                    players:["33a12b21-aeda-4f3a-9758-a46b729a1f3f","62c88ffd-019b-4bbb-8d17-69427c669ae5"],
                    startDate:"2017-07-22 03:05:05.459119", suburbs:["Albany Domain","Malcolm Hahn Memorial Reserve","Totara Park"],
                }
            ],
            completeLeague:[
                {id:'7c22869c-f29a-4453-b1ab-c8650623c8a7', description:"Auckland, closed 30 Thu Mar 00"}
            ],
            switchValue: "No",
        }
    }

    static navigationOptions = {
        title: 'Play Local League',
    };

    render() {

        const { navigate } = this.props.navigation;
        return (
            <ScrollView style={this.styles.RegisterLeagueContainer}>
                <View style={{flex: 1, flexDirection:'row'}}>
                    <Text style={this.styles.title}>Register for Local League</Text>
                    <Switch
                        style={this.styles.switchBar}
                        onValueChange={(value) => this.setState({switchValue: value ? "Yes" : "No"})}
                        value = {this.state.switchValue === "Yes"}
                    />
                    <Text style={{fontSize: 13, color: 'grey', marginLeft: 10, marginTop: 5}}>
                        {this.state.switchValue}
                    </Text>
                </View>

                <View style={this.styles.tableContainer}>
                    <View style={this.styles.tableHeadContainer}>
                        <View style={this.styles.suburbView}>
                            <Text style={this.styles.tableHeadText}>Suburb</Text>
                        </View>
                        <View style={this.styles.interestedView}>
                            <Text style={this.styles.tableHeadText}>Interested</Text>
                        </View>
                        <View style={this.styles.confirmedView}>
                            <Text style={this.styles.tableHeadText}>Confirmed</Text>
                        </View>
                    </View>

                    <View style={this.styles.tableHeadContainer}>
                        <Text style={this.styles.tableBodyTextBlack}>Albany</Text>
                        <Text style={this.styles.tableBodyTextRed}>3</Text>
                        <Text style={this.styles.tableBodyTextBlue}>0</Text>
                    </View>
                    <View style={this.styles.tableHeadContainer}>
                        <Text style={this.styles.tableBodyTextBlack}>Narrow Neck</Text>
                        <Text style={this.styles.tableBodyTextRed}>1</Text>
                        <Text style={this.styles.tableBodyTextBlue}>0</Text>
                    </View>
                    <View style={this.styles.tableHeadContainer}>
                        <Text style={this.styles.tableFootTextBlack}>Total</Text>
                        <Text style={this.styles.tableFootTextRed}>4</Text>
                        <Text style={this.styles.tableFootTextBlue}>0</Text>
                    </View>

                </View>

                <View style={this.styles.ongoingLeagueContainer}>
                    <Text style={this.styles.subTitle}>
                        {this.state.ongoingLeague.length > 0 ? "Current ongoing leagues:" : "Currently no on going leagues"}
                    </Text>
                    {this.state.ongoingLeague.map((eachLeague, i) =>{
                        let leagueDescription = eachLeague.city + ", closes " + eachLeague.endDate.substr(0,10);
                        return(
                            <Text
                                style={this.styles.text}
                                key={i}
                                onPress={()=>{navigate("LeagueInfo",this.state.ongoingLeague[i])}}
                            >
                                {"(" + (i+1).toString() + ") " + leagueDescription}
                            </Text>
                            )
                    })}
                </View>

                <View style={this.styles.completeLeagueContainer}>
                    <Text style={this.styles.subTitle}>
                        {this.state.completeLeague.length > 0 ? "Your completed leagues:" : "Currently no completed leagues"}
                    </Text>
                    {this.state.completeLeague.map((eachLeague, i) =>{
                        return(
                            <Text
                                style={this.styles.text}
                                key={i}
                            >
                                {"(" + (i+1).toString() + ") " + eachLeague.description}
                            </Text>
                        )
                    })}
                </View>

            </ScrollView>
        )
    }
    styles = StyleSheet.create({
        RegisterLeagueContainer:{
            flex:1,
            flexDirection:'column',
            padding:20,
        },
        switchBar:{
            marginLeft: 20
        },
        title:{
            marginTop: 4,
            fontSize: 15,
            fontWeight: 'bold',
            color: 'black'
        },
        subTitle:{
            marginTop: 4,
            fontSize: 13,
            color: 'black'
        },
        text:{
            marginTop: 10,
            fontSize: 13,
            color:'grey'
        },
        ongoingLeagueContainer:{
            marginTop: 20,
        },
        completeLeagueContainer:{
            marginTop: 20,
        },
        tableContainer:{
            marginTop: 20,
        },
        tableHeadContainer:{
            flexDirection:'row',
        },
        interestedView:{
            borderRadius:15,
            borderWidth: 1,
            borderColor: "red",
            flex:0.3,
            margin: 1,
            backgroundColor: "red",
            padding: 2,
        },
        confirmedView:{
            backgroundColor: "blue",
            borderRadius:15,
            borderWidth: 1,
            borderColor: "blue",
            flex:0.3,
            margin: 1,
            padding: 2,
        },
        suburbView:{
            backgroundColor: "black",
            borderRadius:15,
            borderWidth: 1,
            borderColor: "black",
            flex:0.3,
            margin: 1,
            padding: 2,
        },
        tableHeadText:{
            color:"white",
            textAlign:"center",
        },
        tableBodyTextBlack:{
            backgroundColor: 'rgb(180,180,180)',
            color: 'black',
            margin: 1,
            flex:0.3,
            textAlign:'center',
        },
        tableBodyTextRed:{
            backgroundColor: 'rgb(180,180,180)',
            color: 'red',
            margin: 1,
            flex:0.3,
            textAlign:'center',
        },
        tableBodyTextBlue:{
            backgroundColor: 'rgb(180,180,180)',
            color: 'blue',
            margin: 1,
            flex:0.3,
            textAlign:'center',
        },
        tableFootTextBlack:{
            backgroundColor: 'white',
            color: 'black',
            margin: 1,
            flex:0.3,
            textAlign:'center',
        },
        tableFootTextRed:{
            backgroundColor: 'white',
            color: 'red',
            margin: 1,
            flex:0.3,
            textAlign:'center',
        },
        tableFootTextBlue:{
            backgroundColor: 'white',
            color: 'blue',
            margin: 1,
            flex:0.3,
            textAlign:'center',
        },
    });
}