import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import UserService from "../utility/UserService";

export default class EachScheduleView extends Component {
    constructor(props) {
        super(props);
        this.getPlayer1NameCallback = this.getPlayer1NameCallback.bind(this);
        this.getPlayer2NameCallback = this.getPlayer2NameCallback.bind(this);
        let userServiceInstance = new UserService();
        this.state = {
            player1Name:"",
            player2Name:""
        };
        userServiceInstance.getUserName(this.props.player1, this.getPlayer1NameCallback);
        userServiceInstance.getUserName(this.props.player2, this.getPlayer2NameCallback);
    }

    getPlayer1NameCallback(name){
        this.setState({player1Name:name})
    }

    getPlayer2NameCallback(name){
        this.setState({player2Name:name})
    }

    render(){
        return(
            <View style={this.styles.scheduleContainer}>
                <View style={this.styles.scheduleEachRowContainer}>
                    <Text style={this.styles.scheduleBodyTitleText}>Date:</Text>
                    <Text style={this.styles.scheduleBodyContentText}>{this.props.date}</Text>
                    <Menu>
                        <MenuTrigger>
                            <Image
                                style={this.styles.icon}
                                source={require('../image/menu.png')}
                            />
                        </MenuTrigger>
                        <MenuOptions>
                            <MenuOption onSelect={this.props.createCallBack} disabled={!this.props.option.create} text={'Create a new schedule'} />
                            <MenuOption onSelect={() => this.props.requestCallBack(this.props.id)} disabled={!this.props.option.request} text={'I want to play with '+ this.state.player1Name} />
                            <MenuOption onSelect={() => this.props.editCallBack(this.props.id)} disabled={!this.props.option.edit} text='Make a change' />
                            <MenuOption onSelect={() => this.props.cancelCallBack(this.props.id, this.props.player1, this.props.player2)} disabled={!this.props.option.cancel} text='I want to cancel' />
                            <MenuOption onSelect={this.props.resultCallBack} disabled={!this.props.option.result} text='I want to see result' />
                            <MenuOption onSelect={this.props.reviewCallBack} disabled={!this.props.option.review} text='I want to review opponent' />
                        </MenuOptions>
                    </Menu>
                </View>
                <View style={this.styles.scheduleEachRowContainer}>
                    <Text style={this.styles.scheduleBodyTitleText}>Time:</Text>
                    <Text style={this.styles.scheduleBodyContentText}>{this.props.time}</Text>
                </View>
                <View style={this.styles.scheduleEachRowContainer}>
                    <Text style={this.styles.scheduleBodyTitleText}>Location:</Text>
                    <Text style={this.styles.scheduleBodyContentText}
                          numberOfLines={3}
                    >
                        {this.props.location}
                    </Text>
                </View>

                <View style={this.styles.scheduleEachRowContainer}>
                    <Text style={this.styles.scheduleBodyTitleText}>Status:</Text>
                    <Text style={this.styles.scheduleBodyContentText}
                          numberOfLines={3}
                    >
                        {this.props.status}
                    </Text>
                </View>

                <View style={this.styles.playerContainer}>
                    <Text style={this.styles.Player1TitleText}>Player1:</Text>
                    <Text style={this.styles.Player1ContentText}>{this.state.player1Name !== "" ? this.state.player1Name : "Vacancy"}</Text>
                    <Text style={this.styles.Player2TitleText}>Player2:</Text>
                    <Text style={this.styles.Player2ContentText}>{this.state.player2Name !== "" ? this.state.player2Name : "Vacancy"}</Text>
                </View>
            </View>
        )
    }

    styles = StyleSheet.create({
        scheduleContainer:{
            marginTop:8,
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
            width: 28,
            height: 20,
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
    });
}