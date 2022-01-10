import { MessageEmbed } from "discord.js"
import EriMongoDB, {
  defaultServerSettings,
  DiscordServerSettingsT,
} from "../../utils/database"
import { EriMsgCommand } from "../command-template"

export default class RegisterMsgCommand extends EriMsgCommand {
  constructor() {
    super()
    this._name = "register"
    this._description = "Đăng kí server này với máy chủ."
    this._execution = (message) => {
      EriMongoDB.query(async (database) => {
        try {
          const finder = await database
            .collection<DiscordServerSettingsT>(
              EriMongoDB.EriDbConst.ERI_COLL_SERVERS
            )
            .findOne({ server_id: { $eq: message?.guild?.id } })

          if (!finder) {
            const insVal = await database
              .collection<DiscordServerSettingsT>(
                EriMongoDB.EriDbConst.ERI_COLL_SERVERS
              )
              .insertOne({
                ...defaultServerSettings,
                server_id: message.guild?.id,
              })
            const serverRegistered = await database
              .collection(EriMongoDB.EriDbConst.ERI_COLL_SERVERS)
              .countDocuments()
            if (insVal) {
              const eMsg = new MessageEmbed()
                .setColor("#dd0000")
                .setAuthor({
                  name: "Eri",
                  iconURL: process.env.ERI_AVATAR_URL,
                })
                .addField(
                  `Server ${message?.guild?.name} đã tham gia cũng Eri và ${
                    serverRegistered - 1
                  } server khác!!`,
                  `Mọi người ơi, giờ chúng ta đã là bạn rồi ❤️`
                )
              message.reply({ embeds: [eMsg] })
            }
            message.react("👌")
          } else {
            const eMsg = new MessageEmbed()
              .setColor("#dd0000")
              .setAuthor({
                name: "Eri",
                iconURL: process.env.ERI_AVATAR_URL,
              })
              .addField(
                `Server ${message.guild?.name} đã đăng kí trước đó.`,
                `Bạn không cần thực hiện lại bước này~~`
              )
            message.reply({ embeds: [eMsg] })
            message.react("❌")
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
              `Yêu cầu đăng kí đến từ ${message.guild?.name} xuất hiện lỗi.`,
              `Vui lòng liên hệ master để báo lỗi nhé 😫`
            )
          message.reply({ embeds: [eMsg] })
        }
      })
    }
  }
}
