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

    editSchedule(params, callback){
        this.dbContext.update(params, function(err,date){
            if(err){
                alert("err: " + err);
            } else {
                callback();
            }
        })
    }

    static getAvailableOptionOfSchedule(currentUserId,user1,user2,isPastSchedule,reviewStatus,scheduleList){
        let playerHasBeenMatchedBefore = false;       //Handle players can only play with others for one time in one single league.
        if (user1 !== "" && user2 === "-1"){
            scheduleList.Items.forEach((schedule) =>{
                if (schedule.user1_id === user1 && schedule.user2_id === currentUserId) playerHasBeenMatchedBefore = true;
            })
        }

        let create = false;
        let request = false;
        let edit = false;
        let cancel = false;
        let result = false;
        let review = false;

        if (isPastSchedule){
            if ((currentUserId === user1 || currentUserId === user2) && user2 !== "-1"){
                result = true;
                review = true;
            }
            if (user2 === "-1" && currentUserId === user1){
                cancel = true;
            }
            if (reviewStatus === "review finished" || reviewStatus === "wait for opponent review") review = false;
        } else {
            create = true;
            if (currentUserId !== user1 && user2 === "-1" && !playerHasBeenMatchedBefore){
                request = true;
            }
            if (currentUserId === user1){
                edit = true;
                cancel = true;
            } else if (currentUserId === user2){
                edit = false;
                cancel = true;
            }
        }
        if (user1 === "" && user2 === ""){
            request = false;
            edit = false;
            cancel = false;
        }

        return{
            create:create,
            request:request,
            edit:edit,
            cancel:cancel,
            result:result,
            review:review,
        }
    }

    static getSchedulStatus(user1,user2,isPastSchedule,reviewStatus){
        let status = "";
        if (isPastSchedule){
            if (user1 === "" && user2 === "") status = "Invalid";
            else if (user2 === "-1") status = "Expired";
            else if (reviewStatus === "no review") status = "Ready for review";
            else if (reviewStatus === "review finished") status = "Finished";
            else if (reviewStatus === "wait for opponent review") status = "Waiting for opponent review";
            else if (reviewStatus === "wait for my review") status = "Ready for review";
            else status = "Unknown status";
        } else {
            if (user1 === "" && user2 === "") status = "Waiting for new player";
            else if (user2 === '-1') status = "Waiting for player2";
            else status = "Confirmed";
        }
        return status;
    }
}