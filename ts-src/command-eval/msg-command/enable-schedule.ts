import ScheduleMessage from "../../utils/schedule-message";
import { EriMsgCommand } from "../command-template";

export default class EnableScheduleMsgCommand extends EriMsgCommand {
    constructor() {
        super()
        this._name = "eschedule"
        this._description = "Bật tính năng tin nhắn chu kỳ"
        this._execution = (message) => {
            if (message.guild && message.channel)
                ScheduleMessage.getInstance()?.putSchedule(message.guild?.id, message.channel?.id)
            
            message.reply("Tính năng tin nhắn chu kỳ đã được bật 👌")
        }
    }
}