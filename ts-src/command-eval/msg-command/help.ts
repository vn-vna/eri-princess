import { MessageEmbed } from "discord.js";
import { EriMsgCommand } from "../command-template";
import CommandEval from "../command-eval"

export default class HelpMsgCommand extends EriMsgCommand {
    constructor() {
        super()
        this._name = "help"
        this._description = "Hiển thị bảng trợ giúp"
        this._execution = (message) => {
            const eMsg = new MessageEmbed()
                .setAuthor({ name: "Eri Vampir Shirone", iconURL: process.env.ERI_AVATAR_URL, url: process.env.ERI_TOPGG_URL })
                .setColor("#dd0000")
                .setTitle("Về Eri")
                .setDescription("Bạn có biết thứ mà ma cà rồng thích nhất là gì không?")
                .setThumbnail(process.env.ERI_AVATAR_URL ? process.env.ERI_AVATAR_URL : "")
                .addField("Eri help central", `Prefix của Eri là ${process.env.ERI_PREFIX}`, false)

            CommandEval.getInstance().msgCmdList.forEach((value) => {
                eMsg.addField(`\`${value.cmdName}\``, `${value.cmdDescription}`, true)
            })

            message.channel.send({ embeds: [eMsg] })
        }
    }
}