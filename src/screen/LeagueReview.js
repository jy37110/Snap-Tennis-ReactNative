import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Button,
    Platform,
    Switch,
    TextInput,
    Text,
} from 'react-native';
import DynamoDb from '../utility/DynamoDb';
import EachScheduleView from '../components/EachScheduleView';
import LeagueScheduleOperation from "../utility/LeagueScheduleOperation";

export default class LeagueReview extends Component {
    constructor(props){
        super(props);
        this.params = this.props.navigation.state.params;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.userId = "62c88ffd-019b-4bbb-8d17-69427c669ae5";
        this.state = {
            titleText:"Please commit your match experience. It will help us to find a better match for you next time.",
            text:"Example:7-6",
            isValid:true,
            errMsg:"",
        };
    }

    static navigationOptions = {
        title: 'Review match',
    };

    handleSubmit(){
        const { navigate } = this.props.navigation;
        this.validate();
    }

    validate(){
        let errmsge = "";
        let pass = true;
        this.setState({
            errMsg:"something wrong",
            isValid:false,
        })
    }
    

    render() {
        return (
            <ScrollView style={{padding:10}}>
                <View style={this.styles.BodyViewContainer}>
                    <View style={{marginBottom:10}}>
                        <Text style={{fontSize:12,color:'grey',textAlign:'left'}}>{this.state.titleText}</Text>
                    </View>

                    <View style={this.styles.eachRowContainer}>
                        <Text style={[this.styles.bodyTitleText,{marginTop:8}]}>Opponent did not show:</Text>
                        <Switch
                            style={{transform: [{ scaleX: .6 }, { scaleY: .6 }]}}
                            onValueChange={(value) => this.setState({switchValue: value ? "Yes" : "No"})}
                            value = {false}
                        />
                    </View>

                    <View style={this.styles.eachRowContainer}>
                        <Text style={this.styles.bodyTitleText}>Winner:</Text>
                        <Text style={this.styles.bodyContentText}>Yuki</Text>
                        <Text style={this.styles.bodyContentText}>Chao</Text>
                    </View>

                    <View style={this.styles.eachRowContainer}>
                        <Text style={[this.styles.bodyTitleText,{flex:0.2}]}>Score:</Text>
                        <TextInput
                            style={{height: 12, flex:0.8, fontSize:12}}
                            onChangeText={(text) => this.setState({text})}
                            placeholder="Example:9-7 9-8"
                        />
                    </View>

                    <View style={this.styles.eachRowContainer}>
                        <Text style={this.styles.bodyTitleText}>How would you like to describe your opponent's level compared to you:</Text>
                    </View>
                    <View style={this.styles.eachRowContainer}>
                        <Text style={this.styles.bodyContentText}>Weaker</Text>
                        <Text style={this.styles.bodyContentText}>Comparable</Text>
                        <Text style={this.styles.bodyContentText}>Stronger</Text>
                    </View>

                    <View style={this.styles.eachRowContainer}>
                        <Text style={this.styles.bodyTitleText}>Would you like to play with this player again in the future?</Text>
                    </View>
                    <View style={{marginTop:10,flex:1,flexDirection:'row',justifyContent:'space-around'}}>
                        <Text style={this.styles.bodyContentText}>Sure</Text>
                        <Text style={this.styles.bodyContentText}>Preferably Not</Text>
                    </View>

                    <View style={this.styles.eachRowContainer}>
                        <Text style={this.styles.bodyTitleText}>How would you like to commit this match?</Text>
                    </View>
                    <View style={this.styles.eachRowContainer}>
                        <TextInput
                            style={{height: 60, flex:1, fontSize:12}}
                            onChangeText={(text) => this.setState({text})}
                            multiline={true}
                            placeholder="Good match"
                        />
                    </View>

                </View>

                {this.state.isValid === true ? null : <Text style={this.styles.err}>{this.state.errMsg}</Text>}

                <View style={this.styles.submitReviewButtonContainer}>
                    <Button
                        onPress={this.handleSubmit}
                        title="SUBMIT"
                        color={Platform.select({ios:"white", android:"grey"})}
                    />
                </View>

            </ScrollView>
        )
    }
    styles = StyleSheet.create({
        BodyViewContainer:{
            padding:10,
            flex:1,
            flexDirection:"column",
            backgroundColor:"white",
        },
        eachRowContainer:{
            marginTop:10,
            flex:1,
            flexDirection:"row",
            justifyContent:"space-between",
        },
        text:{
            textAlign:'center',
            fontSize: 12,
        },
        bodyTitleText:{
            fontSize:12,
            color:"black",
            fontWeight:"bold",
        },
        bodyContentText:{
            fontSize:12,
            color:"grey",
        },
        submitReviewButtonContainer:{
            backgroundColor:"grey",
            marginTop:10,
            borderWidth:2,
            borderColor:"grey",
            marginBottom:30,
        },
        err:{
            color:"red",
            fontSize:15,
            marginTop:4,
            fontWeight:"bold",
        },
    });

}