import { MessageEmbed } from "discord.js"
import EriMongoDB, {
  defaultServerSettings,
  DiscordServerSettingsT,
} from "../../utils/database"
import { EriMsgCommand } from "../command-template"

export default class UnRegisterMsgCommand extends EriMsgCommand {
  constructor() {
    super()
    this._name = "deregister"
    this._description = "Huỷ đăng kí server này với máy chủ."
    this._execution = (message) => {
      EriMongoDB.query(async (database) => {
        try {
          const finder = await database
            .collection<DiscordServerSettingsT>(
              EriMongoDB.EriDbConst.ERI_COLL_SERVERS
            )
            .findOne({ server_id: { $eq: message.guild?.id } })

          if (!finder) {
            const eMsg = new MessageEmbed()
              .setColor("#dd0000")
              .setAuthor({
                name: "Eri",
                iconURL: process.env.ERI_AVATAR_URL,
              })
              .addField(
                `Server ${message?.guild?.name} chưa thực hiện đăng kí trước đây!`,
                `Sử dụng \`register\` để đăng kí nhé ❤️`
              )
            message.reply({ embeds: [eMsg] })
            message.react("❌")
          } else {
            const del = await database
              .collection<DiscordServerSettingsT>(
                EriMongoDB.EriDbConst.ERI_COLL_SERVERS
              )
              .findOneAndDelete({ server_id: { $eq: message.guild?.id } })
            if (del.ok) {
              const eMsg = new MessageEmbed()
                .setColor("#dd0000")
                .setAuthor({
                  name: "Eri",
                  iconURL: process.env.ERI_AVATAR_URL,
                })
                .addField(
                  `Yêu cầu từ ${message.author.tag}\nServer ${message.guild?.name} đã huỷ thành công kí trước đó.`,
                  `Xin lỗi vì Eri làm phiền mọi người 😭`
                )
              message.reply({ embeds: [eMsg] })
              message.react("😭")
            }
          }
          message.reactions.cache.get("❕")?.remove()
        } catch (err) {
          const eMsg = new MessageEmbed()
            .setColor("#775500")
            .setAuthor({
              name: "Eri Princess",
              iconURL: process.env.ERI_AVATAR_URL,
            })
            .addField(
              `Yêu cầu huỷ đăng kí đến từ ${message.guild?.name} xuất hiện lỗi.`,
              `Vui lòng liên hệ master để báo lỗi nhé 😫`
            )
          message.reply({ embeds: [eMsg] })
        }
      })
    }
  }
}
