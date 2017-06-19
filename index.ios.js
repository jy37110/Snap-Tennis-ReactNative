import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import {
    StackNavigator,
} from 'react-navigation';
import HomeScreen from "./src/screen/HomeScreen";
import DynamoData from "./src/screen/DynamoData";
import LambdaData from "./src/screen/LambdaData";
import MapScreen from "./src/screen/MapScreen";


const App = StackNavigator({
    Home: { screen: HomeScreen },
    DynamoData: { screen: DynamoData },
    LambdaData: { screen: LambdaData },
    Map: { screen: MapScreen},
});

//
// function createMovies() {
//     let params = {
//         TableName : "Movies",
//         KeySchema: [
//             { AttributeName: "year", KeyType: "HASH"},
//             { AttributeName: "title", KeyType: "RANGE" }
//         ],
//         AttributeDefinitions: [
//             { AttributeName: "year", AttributeType: "N" },
//             { AttributeName: "title", AttributeType: "S" }
//         ],
//         ProvisionedThroughput: {
//             ReadCapacityUnits: 5,
//             WriteCapacityUnits: 5
//         }
//     };
//
//     dynamodb.createTable(params, function(err, data) {
//         if (err) {
//             alert("Unable to create table: " + "\n" + JSON.stringify(err, undefined, 2));
//         } else {
//             alert("Created table: " + "\n" + JSON.stringify(data, undefined, 2));
//         }
//     });
// }
//
// const onPressLearnMore = () => {
//     createMovies();
// };

export default class nativeWebStorm extends Component {
  render() {
    return (
        <App />
      //
      // <View style={styles.container}>
      //   <Text style={styles.welcome}>
      //     Hello
      //     Welcome to React Native!
      //   </Text>
      //   <Text style={styles.instructions}>
      //     To get started, edit index.ios.js
      //   </Text>
      //   <Text style={styles.instructions}>
      //     Press Cmd+R to reload,{'\n'}
      //     Cmd+D or shake for dev menu
      //   </Text>
      //   <Button
      //       onPress={onPressLearnMore}
      //       title="Learn More"
      //       color="#841584"
      //       accessibilityLabel="Learn more about this purple button"
      //   />
      // </View>
      //
      //
    );
  }
}

AppRegistry.registerComponent('nativeWebStorm', () => nativeWebStorm);
