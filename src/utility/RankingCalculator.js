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

    rankingCalculate(matchResultList, playerList){
        let tempPlayerList = [];
        for (let i = 0; i < playerList.length; i++){
            let currentPlayerId = playerList[i].playerId;
            let winTimes = 0;
            let lostTimes = 0;
            for (let j = 0; j < matchResultList.length; j ++){
                if (matchResultList[j].winner === currentPlayerId) winTimes++;
                if ((matchResultList[j].player1_id === currentPlayerId || matchResultList[j].player2_id === currentPlayerId) && matchResultList[j].winner !== currentPlayerId) lostTimes++;
            }
            tempPlayerList.push({
                playerId: currentPlayerId,
                playerName: playerList[i].playerName,
                winTimes: winTimes,
                lostTimes: lostTimes,
            })
        }
        tempPlayerList = tempPlayerList.sort((a, b) => {return b.winTimes - a.winTimes});
        let rank = 0;
        let previousWinTimes = -1;
        for (let i = 0; i < tempPlayerList.length; i++){
            if (tempPlayerList[i].winTimes === previousWinTimes){
                tempPlayerList[i].rank = rank;
            } else {
                rank++;
                tempPlayerList[i].rank = rank;
                previousWinTimes = tempPlayerList[i].winTimes;
            }
        }
        return tempPlayerList;
    }
}