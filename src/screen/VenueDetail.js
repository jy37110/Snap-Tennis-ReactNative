import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    FlatList,
} from 'react-native';

export default class VenueDetail extends Component {
    constructor(props){
        super(props);
    }

    static navigationOptions = {
        title: 'Back',
    };

    render() {
        const { params } = this.props.navigation.state;
        return (
            <ScrollView style={this.styles.VenueDetailContainer}>
                <Text style={this.styles.title}>TENNIS COURT INFORMATION</Text>
                <FlatList
                    data={[
                        {key: "Name:", value: params.name},
                        {key: 'Number of Courts:', value: params.numberOfCourts},
                        {key: 'Access:', value: params.access},
                        {key: 'Average Rating:', value: params.averageRating},
                        {key: 'Condition:', value: params.condition},
                        {key: 'Cost per Hour::', value: params.costPerHour},
                        {key: 'Designation:', value: params.designation},
                        {key: 'Suburb:', value: params.suburb},
                        {key: 'Region:', value: params.region},
                        {key: 'Address:', value: params.address},
                        {key: 'Comments:', value: "No any review at the moment"},

                    ]}
                    renderItem={({item}) =>
                    <View style={this.styles.eachLine}>
                        <Text style={this.styles.attributeName}>{item.key}</Text>
                        <Text style={this.styles.attributeValue} numberOfLines={4}>{item.value}</Text>
                    </View>
                    }
                />
            </ScrollView>
        )
    }
    styles = StyleSheet.create({
        VenueDetailContainer:{
            flex:1,
            flexDirection:'column',
        },
        title:{
            textAlign: 'center',
            marginTop: 20,
            marginBottom: 10,
            fontSize: 18,
            fontWeight: 'bold',
            color: 'grey'
        },
        attributeName:{
            marginLeft: 30,
            width: 150,
            fontSize: 13,
            fontWeight:'bold',
            color: 'rgb(80,80,80)',
        },
        attributeValue:{
            marginLeft: 0,
            width: 180,
            fontSize: 13,
            color: 'rgb(80,80,80)',

        },
        eachLine:{
            marginTop: 10,
            flex: 1,
            flexDirection: 'row'
        },
    });
}