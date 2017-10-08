import DynamoDb from "../utility/DynamoDb";

export default class ProfileService{
    constructor(){
        this.dbInstance = new DynamoDb();
        this.dbContext = this.dbInstance.getDbContext();
    }

    getUserProfile(userId, callback) {
        if (userId !== ""){
            let params = {
                TableName:"NZUserProfile",
                Key:{"user_id":userId}
            };
            this.dbContext.get(params, function(err, data){
                callback(err,data);
            })
        }
    }
}