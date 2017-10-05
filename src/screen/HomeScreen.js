import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import MapView from 'react-native-maps';

export default class HomeScreen extends Component {
    constructor(props){
        super(props);
    }
    static navigationOptions = {
        title: 'Snap Tennis',
    };
    render() {
        const screens = [
            {
                key: 3,
                title: 'One Off Match',
                source: require('../image/profile.png'),
                action: () => {},
            },
            {
                key: 4,
                title: 'Your Local Leagues',
                source: require('../image/league.png'),
                action: () => {navigate('RegisterLeague')},
            },
            {
                key: 5,
                title: 'Find a Tennis Court',
                source: require('../image/map_court.png'),
                action: () => {navigate('Map')},
            },
            {
                key: 6,
                title: 'Develop entry',
                source: require('../image/map_court.png'),
                action: () => {navigate("LeagueReview",{
                    leagueId:this.leagueId,
                    p1Id:"62c88ffd-019b-4bbb-8d17-69427c669ae5",
                    p2Id:"d3d8dc87-2cfc-4f95-9995-c163f082ce9b",
                    p1Name:"Chao",
                    p2Name:"Sam",
                })},
            },
        ];
        const { navigate } = this.props.navigation;
        const renderedButtons = screens.map(b => {
            return (
                <View key={b.key} style={this.styles.ItemsContainer}>
                    <Image
                        style={this.styles.Icon}
                        source={b.source}
                        />
                    <Text key={b.key} onPress={b.action} style={this.styles.Items}>{b.title}</Text>
                </View>
            )
        });
        let markers = [{
            coordinates:{latitude:-36.7271676,
                longitude:174.6970001},
            title:'Albany Domain',
            subtitle:'Cost per hour: 0',
        }];
        return (
            <View style={this.styles.Container}>
                {renderedButtons}
                <View style={this.styles.MapContainer}>
                    <MapView
                        style={this.styles.Map}
                        region={{
                            latitude: -36.732770,
                            longitude: 174.701630,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        >
                        <MapView.Marker
                            coordinate={markers[0].coordinates}
                            title={markers[0].title}
                            description={markers[0].subtitle}
                            />
                    </MapView>

                </View>

                <View style={this.styles.TextContainer}>
                    <Text style={this.styles.Text}>
                        Currently 1000 people have joined to this app! {'\n'}
                        100 people have joined in your Albany region!
                    </Text>
                </View>
            </View>

        );
    }
    styles = StyleSheet.create({
        Container: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: '#F5FCFF',
            //...StyleSheet.absoluteFillObject,
        },
        Items:{
            margin: 20,
            color: 'rgb(120,120,120)',
        },
        ItemsContainer:{
            borderBottomWidth: 1,
            borderBottomColor: 'rgb(180,180,180)',
            flexDirection:'row',
            width: '90%',
            //backgroundColor: 'rgb(200,200,200)',
        },
        Icon:{
            width: 25,
            height: 25,
            marginTop: 16,
            resizeMode: 'contain',
        },
        Text:{
            alignItems: 'center',
            color: 'rgb(120,120,120)',
            fontSize: 14,
            justifyContent: 'flex-end',
            margin: 20,
        },
        TextContainer:{
            flex: 1,
            flexDirection: 'row',
        },
        Map:{
            ...StyleSheet.absoluteFillObject,
            width: '100%',
            height: '100%',
        },
        MapContainer:{
            //...StyleSheet.absoluteFillObject,
            marginTop: 10,
            height: 230,
            width: '90%',
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: 'rgb(120,120,120)',
        }
    });
}