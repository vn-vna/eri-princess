const { Message } = require("discord.js")

const REPLY_ARR = [
  ["😫", "Eh?"],
  ["🙄", "Hey?"],
  ["🤔", "...?"],
  ["🙄", "なに???"],
  ["😒", "死ぬ 😒"],
  ["😒", "Go to the hell!!!"],
  ["😨", "Don't touch me human!"],
]

module.exports = {
  command: "touch",
  /**
   * @param {string[]} command
   * @param {Message} message
   * @param {Client} client
   */
  execution: (command, message, client) => {
    const REPLY = REPLY_ARR.at(Math.floor(Math.random() * REPLY_ARR.length))
    REPLY &&
      message.react(REPLY[0]).then((reaction) => {
        message.reply(REPLY[1])
      })
  },
  description: "Touch me?",
}
