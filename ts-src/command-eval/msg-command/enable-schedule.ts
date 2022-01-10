import { MessageEmbed, TextChannel } from "discord.js";
import ScheduleMessage from "../../utils/schedule-message";
import { EriMsgCommand } from "../command-template";

export default class EnableScheduleMsgCommand extends EriMsgCommand {
    constructor() {
        super()
        this._name = "eschedule"
        this._description = "Bật tính năng tin nhắn chu kỳ"
        this._execution = (message) => {
            let channel: TextChannel | undefined
            if (message.mentions.channels.size != 0) {
                channel = (message.mentions.channels.find((channel) => channel.type === "GUILD_TEXT") as (TextChannel | undefined))
            }

            if (channel) {
                if (message.guild && message.channel)
                    ScheduleMessage.getInstance()?.putSchedule(message.guild?.id, channel?.id)
                message.reply(`Tính năng tin nhắn chu kỳ đã được bật trên kênh ${channel.toString()} 👌`)
            } else {
                const eMsg = new MessageEmbed()
                    .setAuthor({ name: "Eri Vampir Shirone", iconURL: process.env.ERI_AVATAR_URL, url: process.env.ERI_TOPGG_URL })
                    .setColor("#dd0000")
                    .setTitle("Đăng kí tin nhắn theo chu kì")
                    .setThumbnail(process.env.ERI_AVATAR_URL ? process.env.ERI_AVATAR_URL : "")
                    .addField("`eschedule #kênh`", `Cần chỉ định kênh để đăng kí`, false)

                message.reply({ embeds: [eMsg] })
            }
        }
    }
}