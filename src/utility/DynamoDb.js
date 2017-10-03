let AWS = require('aws-sdk/dist/aws-sdk-react-native');

export default class DynamoDb{
    constructor(){
        AWS.config.update({
            region: "ap-southeast-2",
            accessKeyId: "AKIAJIRM3S2OV5EJHKLA",
            secretAccessKey: "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"
        });
        this.docClient = new AWS.DynamoDB.DocumentClient({dynamoDbCrc32:false});
    }
    getDbContext(){
        return this.docClient;
    }
}
