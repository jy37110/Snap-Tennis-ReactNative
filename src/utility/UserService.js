import DynamoDb from '../utility/DynamoDb';

export default class UserService{
    constructor(){
        this.dbInstance = new DynamoDb();
        this.dbContext = this.dbInstance.getDbContext();
    }

    getUserName(userId, callback) {
        if (userId !== ""){
            let params = {
                TableName:"NZUser",
                Key:{"user_id":userId}
            };
            this.dbContext.get(params,function(err,data){
                if(err){
                    alert(err);
                } else {
                    if(Object.keys(data).length === 0) {
                        callback("")
                    } else {
                        callback(data.Item.first_name)
                    }
                }
            })
        }
    }

    getUserFullName(userId, callback) {
        if (userId !== ""){
            let params = {
                TableName:"NZUser",
                Key:{"user_id":userId}
            };
            this.dbContext.get(params,function(err,data){
                if(err){
                    alert(err);
                } else {
                    if(Object.keys(data).length === 0) {
                        callback(userId,"")
                    } else {
                        callback(userId,data.Item.first_name + " " + data.Item.surname)
                    }
                }
            })
        }
    }
}