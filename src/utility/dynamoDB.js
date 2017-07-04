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
    scanVenue(obj, laFrom, laTo, loFrom, loTo){
        let params = {
            TableName:"NZVenues",
            ProjectionExpression:"#N, cost_per_hour, latitude, longitude, suburb",
            FilterExpression: "latitude between :la1 and :la2 and longitude between :lo1 and :lo2",
            ExpressionAttributeNames:{
                "#N": "name"
            },
            ExpressionAttributeValues: {
                ":la1":(-36.7814943 + 0.15).toString(),
                ":la2":(-36.7814943 - 0.15).toString(),
                ":lo1":(174.70117935 - 0.15).toString(),
                ":lo2":(174.70117935 + 0.15).toString(),
            }
        };

        let scanResult;

        let onScan = (err, data) => {
            if (err) {
                scanResult = "Something wrong" + err;
            } else {
                scanResult = data.Items;
            }
            obj.setState({
                scanResult:scanResult
            });
        };
        this.docClient.scan(params, onScan);
    }

}
