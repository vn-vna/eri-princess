import { Message } from "discord.js"
import { EriMsgCommand } from "../command-template"

export default class PingMsgCommand extends EriMsgCommand {
  private static PING_REPLY = [
    "Eh? Eri vẫn luôn ở đây nè",
    "Hi ~",
    "Tên ta là Eri Vampir Shirone ~~",
    "Eri?",
    "Hmmm... gì vậy?",
  ]

  constructor() {
    super()
    this._name = "ping"
    this._description = "Ping Eri 🙄"
    this._execution = (message: Message) => {
      message.react("❤️")
      message.reply(
        PingMsgCommand.PING_REPLY[
          Math.floor(Math.random() * PingMsgCommand.PING_REPLY.length)
        ]
      )
    }
  }
}
