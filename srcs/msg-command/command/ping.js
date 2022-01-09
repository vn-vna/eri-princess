const { Message } = require('discord.js')

module.exports = {
    command: 'ping',
    /**
     * @param {string[]} command
     * @param {Message} message
     * @param {Client} client
     */
    execution: (command, message, client) => {
        message.react('❤️').then((reaction) => {
            console.log(`${message.author.username}#${message.author.id}`)
            if (`${message.author.id}` === `731473542872432720`) {
                message.reply(`Hi my master.`)
            }
        })
    },
    description: 'Ping me',
}
