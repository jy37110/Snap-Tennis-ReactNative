import DynamoDb from "../utility/DynamoDb";

export default class LeagueRegisterService{
    constructor(){
        this.dbInstance = new DynamoDb();
        this.dbContext = this.dbInstance.getDbContext();
    }

    getCurrentRegistrationInfo(suburb, capability, callback){
        let params = {
            TableName:"NZClusterCandidatesForSinglesLeagueRound",
            ProjectionExpression:"suburb, user_id, capability, city, confirmed, eoi_date, opponent_pref, uui",
            FilterExpression: 'suburb = :suburb and capability = :cap',
            ExpressionAttributeValues: {
                ":suburb": suburb,
                ":cap": Number(capability),
            }
        };
        this.dbContext.scan(params, function(err, data){
            callback(err,data);
        })
    }


}