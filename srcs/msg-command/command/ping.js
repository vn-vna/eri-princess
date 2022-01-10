const { Message } = require('discord.js')
const { ServerChache } = require('../../functions/servers-cache')

module.exports = {
    command: 'ping',
    /**
     * @param {string[]} command
     * @param {Message} message
     * @param {Client} client
     */
    execution: (command, message, client) => {
        console.log(ServerChache.serverList)
        message.react('❤️').then((reaction) => {
            if (`${message.author.id}` === process.env.MASTER_UID) {
                message.reply(
                    `Hi my master.\nEri uptime: ${process.uptime()} s\nThere are ${ServerChache.serverList.size} server(s) registered with Eri`
                )
            } else {
                message.reply(`Pong ~`)
            }
        })
    },
    description: 'Ping me',
}
