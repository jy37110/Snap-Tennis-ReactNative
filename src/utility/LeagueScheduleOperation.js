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
}