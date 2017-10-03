import CreateSchedule from './CreateSchedule'
import LeagueScheduleOperation from '../utility/LeagueScheduleOperation'

export default class EditSchedule extends CreateSchedule{
    constructor(props){
        super(props);
    }
    static navigationOptions = {
        title: "Edit Schedule",
    };
    submitToDynamo() {
        let params = {
            TableName:"NZSinglesLeagueRoundMatchSchedule",
            Key:{schedule_id:this.params.scheduleId},
            UpdateExpression:"set latitude = :la, longitude = :lo, suburb = :su, time_from = :tf, time_to = :tt, venue_name = :vn",
            ExpressionAttributeValues:{
                ":la": this.latitudeOfSelectedVenue,
                ":lo": this.longitudeOfSelectedVenue,
                ":su": this.suburbOfSelectedVenue,
                ":tf": this.state.timeFromPickedStr24,
                ":tt": this.state.timeToPickedStr24,
                ":vn": this.state.venueSelected
            }
        };
        let submitOnSuccess = () => {
            this.params.onGoBack();
            this.props.navigation.goBack();
        };
        let scheduleOperationInstance = new LeagueScheduleOperation();
        scheduleOperationInstance.editSchedule(params, submitOnSuccess)
    };
}