import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
} from 'react-native';
import UserService from "../utility/UserService";
import DynamoDb from "../utility/DynamoDb";

export default class PlayerInfo extends Component {
    constructor(props){
        super(props);
        this.params = this.props.navigation.state.params;
        this.state = {
            playerName: this.params.playerName,
            playerMail: "",
            club: "",
            url: "",
        };
        let userService = new UserService();
        userService.getUserInfo(this.params.playerId, (err, user) => {
            if (err) alert("err: " + err);
            else {
                let imgKey = user.profile_image;
                this.setState({
                    playerMail:user.email,
                    club:user.club_member,
                });
                if (imgKey !== undefined) this.getImageUrl(imgKey);
            }
        })
    }

    static navigationOptions = {
        title: 'Player Info',
    };

    getImageUrl = (key) => {
        let dynamoDb = new DynamoDb();
        let S3Instance = dynamoDb.getS3Instance();
        let urlParams = {Bucket:'profile-images-tennis-app', Key:key};
        S3Instance.getSignedUrl('getObject',urlParams,(err, url) => {
            console.log(url);
            this.setState({url:url})
        })
    };

    render() {
        return (
            <ScrollView style={this.styles.RootContainer}>
                <View style={{marginTop:10,justifyContent:'center',alignItems:'center',marginBottom:10}}>
                    <Image
                        style={{width:160,height:160,borderRadius:80}}
                        source={this.state.url === "" ? require('../image/league.png') : {uri: this.state.url}}
                    />
                </View>

                <View style={this.styles.eachLine}>
                    <Text style={this.styles.titleText}>Name: </Text>
                    <Text style={this.styles.contentText}>{this.state.playerName}</Text>
                </View>

                <View style={this.styles.eachLine}>
                    <Text style={this.styles.titleText}>E-Mail: </Text>
                    <Text style={this.styles.contentText}>{this.state.playerMail}</Text>
                </View>

                <View style={this.styles.eachLine}>
                    <Text style={this.styles.titleText}>Club: </Text>
                    <Text style={this.styles.contentText}>{this.state.club}</Text>
                </View>

                <View style={{height:20}}></View>

            </ScrollView>
        )
    }
    styles = StyleSheet.create({
        RootContainer:{
            flex:1,
            flexDirection:'column',
            paddingLeft:30,
            paddingRight:30,
        },
        eachLine:{
            justifyContent:'space-between',
            flex:1,
            marginTop:5,
            flexDirection:'row',
            alignItems:'center'
        },
        titleText:{
            marginRight:5,
            textAlign: 'right',
            flex:0.4,
            fontSize: 13,
            fontWeight: 'bold',
            color: 'grey'
        },
        contentText:{
            marginLeft:5,
            textAlign: 'left',
            flex:0.6,
            fontSize: 13,
            color: 'grey'
        },
    });
}