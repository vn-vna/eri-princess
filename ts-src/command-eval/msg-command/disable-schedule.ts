import { TextChannel } from "discord.js";
import ScheduleMessage from "../../utils/schedule-message";
import { EriMsgCommand } from "../command-template";

export default class DisableScheduleMsgCommand extends EriMsgCommand {
    constructor() {
        super()
        this._name = "dschedule"
        this._description = "Bật tính năng tin nhắn chu kỳ"
        this._execution = (message) => {
            if (message.guild && message.channel)
                ScheduleMessage.getInstance()?.removeSchedule(message.guild?.id)
            message.reply(`Tính năng tin nhắn chu kỳ đã được ${message.author.tag} yêu cầu tắt 😨`)
        }
    }
}