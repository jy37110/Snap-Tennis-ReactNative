import DynamoDb from "../utility/DynamoDb";

export default class ReviewService{
    constructor(){
        this.dbInstance = new DynamoDb();
        this.dbContext = this.dbInstance.getDbContext();
    }

    createMatch(matchForm, callback){
        let params = {
            TableName: "NZSinglesMatchesPlayed",
            Item:{
                finished_date: matchForm.finishedDate,
                latitude: matchForm.latitude,
                league_id: matchForm.leagueId,
                longitude: matchForm.longitude,
                match_id: matchForm.matchId,
                player1_comment: matchForm.player1Comment,
                player1_id: matchForm.player1Id,
                player2_comment: matchForm.player2Comment,
                player2_id: matchForm.player2Id,
                score: matchForm.score,
                suburb: matchForm.suburb,
                validated: matchForm.validated,
                venue_name: matchForm.venueName,
                winner: matchForm.winner,
            }
        };
        this.dbContext.put(params,function (err,data) {
            callback(err, data);
        })
    }

    createReview(reviewForm, callback){
        let params = {
            TableName: "NZSinglesPlayerReview",
            Item:{
                comment: reviewForm.comment,
                level_comparison: reviewForm.levelComparison,
                no_show: reviewForm.noShow,
                player_under_review_id: reviewForm.playerUnderReview,
                review_id: reviewForm.reviewId,
                reviewer_id: reviewForm.reviewerId,
                would_play_again: reviewForm.playAgain,
                match_id: reviewForm.matchId,
            }
        };
        this.dbContext.put(params,function(err,data){
            callback(err, data);
        })
    }

    checkMatchHasBeenReviewed(p1Id,p2Id,leagueId,callback){
        let params = {
            TableName:"NZSinglesMatchesPlayed",
            ProjectionExpression:"match_id, player1_comment, player2_comment, validated",
            FilterExpression: 'league_id = :leagueId and player1_id = :player1Id and player2_id = :player2Id',
            ExpressionAttributeValues: {
                ":leagueId":leagueId,
                ":player1Id":p1Id,
                ":player2Id":p2Id,
            }
        };
        this.dbContext.scan(params, function (err, data) {
            callback(err,data);
        });
    }

    updateMatch(matchForm, callback){
        let params = {
            TableName: "NZSinglesMatchesPlayed",
            Key: {match_id: matchForm.matchId},
            UpdateExpression: "set player1_comment = :p1c, player2_comment = :p2c, validated = :val, winner = :win, score = :sco",
            ExpressionAttributeValues: {
                ":p1c": matchForm.player1Comment,
                ":p2c": matchForm.player2Comment,
                ":val": matchForm.validated,
                ":win": matchForm.winner,
                ":sco": matchForm.score,
            }
        };
        this.dbContext.update(params, function(err,data){
            callback(err,data);
        })
    }
}