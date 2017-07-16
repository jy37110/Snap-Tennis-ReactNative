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

export default class EachScheduleView extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <View style={this.styles.scheduleContainer}>
                <View style={this.styles.scheduleEachRowContainer}>
                    <Text style={this.styles.scheduleBodyTitleText}>Time:</Text>
                    <Text style={this.styles.scheduleBodyContentText}>{this.props.time}</Text>

                    <Menu>
                        <MenuTrigger>
                            <Image
                                style={this.styles.icon}
                                source={require('../image/menu.png')}
                            />
                        </MenuTrigger>
                        <MenuOptions>
                            <MenuOption onSelect={this.props.requestCallBack} disabled={!this.props.option.request} text={'I want to play with '+ this.props.player1} />
                            <MenuOption onSelect={this.props.editCallBack} disabled={!this.props.option.edit} text='Make a change' />
                            <MenuOption onSelect={this.props.cancelCallBack} disabled={!this.props.option.cancel} text='I want to cancel' />
                            <MenuOption onSelect={this.props.confirmCallBack} disabled={!this.props.option.confirm} text='I want to confirm' />
                        </MenuOptions>
                    </Menu>

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
                    <Text style={this.styles.Player1ContentText}>{this.props.player1}</Text>
                    <Text style={this.styles.Player2TitleText}>Player2:</Text>
                    <Text style={this.styles.Player2ContentText}>{this.props.player2}</Text>
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
    });
}