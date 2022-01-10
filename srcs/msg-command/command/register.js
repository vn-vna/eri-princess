const { Message, Guild, MessageEmbed } = require("discord.js")
const { EriDbConst, EriMongo } = require("../../utilities/mongo")

const defaultServerSettings = {
  server_id: null,
  missingu: null,
  schedule_gt: null,
  gmt: +7,
}

/**
 *
 * @param {Message} message
 */
const signServerIn = (message) => {
  EriMongo.query(async (database) => {
    try {
      const finder = await database
        .collection(EriDbConst.ERI_COLL_SERVERS)
        .findOne({ server_id: { $eq: message.guild.id } })

      if (!finder) {
        const insVal = await database
          .collection(EriDbConst.ERI_COLL_SERVERS)
          .insertOne({ ...defaultServerSettings, server_id: message.guild.id })
        const serverRegistered = await database
          .collection(EriDbConst.ERI_COLL_SERVERS)
          .countDocuments()
        if (insVal) {
          const eMsg = new MessageEmbed()
            .setColor("#770000")
            .setAuthor({
              name: "Eri Princess",
              iconURL: process.env.ERI_AVATAR_URL,
            })
            .addField(
              `Server ${message.guild.name} has joined with Eri and ${
                serverRegistered - 1
              } other servers!!`,
              `Thank you very much.\nFeel free for call me now ❤️`
            )
          message.reply({ embeds: [eMsg] })
        }
        message.react("👌")
      } else {
        const eMsg = new MessageEmbed()
          .setColor("#770000")
          .setAuthor({
            name: "Eri Princess",
            iconURL: process.env.ERI_AVATAR_URL,
          })
          .addField(
            `Server ${message.guild.name} has been registered berfore.`,
            `You no need to do it again ~~`
          )
        message.reply({ embeds: [eMsg] })
        message.react("⭕")
      }
      message.reactions.cache.get("❕").remove()
    } catch (err) {
      const eMsg = new MessageEmbed()
        .setColor("#775500")
        .setAuthor({
          name: "Eri Princess",
          iconURL: process.env.ERI_AVATAR_URL,
        })
        .addField(
          `Command register from ${message.guild.name} has been ERROR.`,
          `I'm sorry for that 😫`
        )
      message.reply({ embeds: [eMsg] })
    }
  })
}

module.exports = {
  command: "register",
  /**
   * @param {string[]} command
   * @param {Message} message
   * @param {Client} client
   */
  execution: (command, message, client) => {
    message.react("❕").then((reaction) => {
      signServerIn(message)
    })
  },
  description: "Sign this server in",
}
