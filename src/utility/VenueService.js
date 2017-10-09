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

    getVenueReview(venueName, suburb, callback){
        let params = {
            TableName:"NZVenueReview",
            ProjectionExpression:"suburb, venue_name, venue_review_id, comments, reviewer_id",
            FilterExpression: 'suburb = :suburb and venue_name = :venueName',
            ExpressionAttributeValues: {
                ":venueName": venueName,
                ":suburb":suburb,
            }
        };
        this.dbContext.scan(params, function(err, data){
            callback(err,data);
        })
    }

    createReview(reviewInfo,callback){
        let params = {
            TableName: "NZVenueReview",
            Item:{
                venue_review_id: reviewInfo.reviewId,
                comments: reviewInfo.comments,
                reviewer_id: reviewInfo.reviewerId,
                suburb: reviewInfo.suburb,
                venue_name: reviewInfo.venueName,
            }
        };
        this.dbContext.put(params, function (err, data) {
            callback(err,data);
        })
    }
}