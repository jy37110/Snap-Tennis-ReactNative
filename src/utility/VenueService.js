import DynamoDb from "../utility/DynamoDb";

export default class VenueService{
    constructor(){
        this.dbInstance = new DynamoDb();
        this.dbContext = this.dbInstance.getDbContext();
    }

    getSuburbByVenueName(venue, callback){
        let params = {
            TableName:"NZVenues",
            ProjectionExpression:"suburb, #N",
            FilterExpression: '#N = :na',
            ExpressionAttributeNames:{
                "#N":"name",
            },
            ExpressionAttributeValues: {
                ":na": venue,
            }
        };
        this.dbContext.scan(params, function(err, data){
            callback(err,data);
        })
    }
}