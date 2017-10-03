import DynamoDb from "../utility/DynamoDb";

export default class LeagueScheduleOperation{
    constructor(){
        this.dbInstance = new DynamoDb();
        this.dbContext = this.dbInstance.getDbContext();
    }

    createSchedule(params, callback){
        this.dbContext.put(params,function(err, data){
            if(err){
                alert("err: " + err)
            } else {
                callback();
            }
        })
    }

    deleteSchedule(scheduleId, callback){
        let params = {
            TableName: "NZSinglesLeagueRoundMatchSchedule",
            Key:{schedule_id:scheduleId},
        };
        this.dbContext.delete(params,function(err,data){
            if(err){
                alert("err: " + err)
            } else {
                callback();
            }
        })
    }

    deleteScheduleForUser2(scheduleId, callback){
        let params = {
            TableName:"NZSinglesLeagueRoundMatchSchedule",
            Key:{schedule_id:scheduleId},
            UpdateExpression:"set user2_id = :u2",
            ExpressionAttributeValues:{
                ":u2": "-1"
            }
        };
        this.dbContext.update(params, function(err,date){
            if(err){
                alert("err: " + err);
            } else {
                callback();
            }
        })
    }

    requestSchedule(scheduleId, player2Id, callback){
        let params = {
            TableName:"NZSinglesLeagueRoundMatchSchedule",
            Key:{schedule_id:scheduleId},
            UpdateExpression:"set user2_id = :u2",
            ExpressionAttributeValues:{
                ":u2": player2Id
            }
        };
        this.dbContext.update(params, function(err,date){
            if(err){
                alert("err: " + err);
            } else {
                callback();
            }
        })
    }

    loadSchedule(leagueId, callback){
        let params = {
            TableName:"NZSinglesLeagueRoundMatchSchedule",
            ProjectionExpression:"schedule_id, latitude, longitude, suburb, time_from, " +
            "time_to, upcoming_date, user1_id, user2_id, venue_name",
            FilterExpression: 'league_id = :leagueId',
            ExpressionAttributeValues: {
                ":leagueId":leagueId,
            }
        };
        this.dbContext.scan(params, callback);
    }
}