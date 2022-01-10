const { Message, Client } = require('discord.js')

const ERI_ANSWERS = [
    `Hi ~`,
    `Eririri ☆*: .｡. o(≧▽≦)o .｡.:*☆`,
    `🤔`,
    `Moshi moshi`,
    `Do U miss Eri ~`,
    `🙄`,
    `What do u need?`,
    `You want to play a game, do you?`,
    `Eri Vampir Shirone is here 😊`,
    `Eri wants to sleep 😴`,
    `Eh?`
]

module.exports = {
    /**
     *
     * @param {Message} message
     * @param {Client} client
     */
    match: (message, client) => {
        return message.mentions.has(client.user) && !message.reference
    },
    /**
     *
     * @param {Message} message
     * @param {Client} client
     */
    execution: (message, client) => {
        message.reply(`${ERI_ANSWERS[Math.floor(Math.random() * ERI_ANSWERS.length)]}`)
    },
}
