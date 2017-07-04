let AWS = require('aws-sdk/dist/aws-sdk-react-native');

export default class DynamoDB{
    constructor(){
        AWS.config.update({
            region: "ap-southeast-2",
            accessKeyId: "AKIAJIRM3S2OV5EJHKLA",
            secretAccessKey: "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"
        });
        this.docClient = new AWS.DynamoDB.DocumentClient();
    }
    scanNearbyVenue(obj){
        let params = {
            TableName:"NZVenues",
            ProjectionExpression:"#N, cost_per_hour, latitude, longitude, suburb",
            FilterExpression: "latitude between :la1 and :la2 and longitude between :lo1 and :lo2",
            ExpressionAttributeNames:{
                "#N": "name"
            },
            ExpressionAttributeValues: {
                ":la1":(obj.state.userLocation.latitude + 0.1).toString(),
                ":la2":(obj.state.userLocation.latitude - 0.1).toString(),
                ":lo1":(obj.state.userLocation.longitude - 0.1).toString(),
                ":lo2":(obj.state.userLocation.longitude + 0.1).toString(),
            }
        };

        let scanResult = [];
        let onScan = (err, data) => {
            if (err) {
                scanResult = "Something wrong" + err;
            } else {
                //this.scan = data.Items;
                data.Items.forEach((value) => {
                    let temp = {
                        title:value.name,
                        suburb:value.suburb,
                        latlng:{
                            latitude:Number(value.latitude),
                            longitude:Number(value.longitude),
                        },
                        description:value.cost_per_hour.toString()
                    };
                    obj.scan.push(temp);
                });


                // this.setState({
                //     markers: this.state.markers.concat(markers)
                // })


                // this.setState({
                //     scanResult:[this.state.scanResult, this.scan]
                // });
            }

            // this.setState({
            //     scanResult:this.scan
            // });
        };
        this.docClient.scan(params, onScan);
    }
}
