import DynamoDb from "../utility/DynamoDb";

export default class RankingCalculator {
    constructor() {
        this.dbInstance = new DynamoDb();
        this.dbContext = this.dbInstance.getDbContext();
    }

    loadMatchResult(leagueId, callback){
        let params = {
            TableName:"NZSinglesMatchesPlayed",
            ProjectionExpression:"match_id, latitude, longitude, suburb, finished_date, " +
            "league_id, player1_comment, player1_id, player2_comment, player2_id, score, validated, venue_name, winner",
            FilterExpression: 'league_id = :leagueId and validated = :validated',
            ExpressionAttributeValues: {
                ":leagueId":leagueId,
                ":validated":"Y",
            }
        };
        this.dbContext.scan(params, callback);
    }

}