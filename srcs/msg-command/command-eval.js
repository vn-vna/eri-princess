const { Message, Client } = require('discord.js')
const commandList = require("./command-list")

/**
 *
 * @param {Array<string>} command
 * @param {Message} message
 * @param {Client} client
 */
module.exports = (command, message, client) => {
    // console.log(command)
    for (let i = 0; i < command.length; ++i) {
        command[i] = command[i].toLowerCase()
    }

    for (let cp of commandList) {
        if (cp.command == command[1]) {
            cp.execution(command, message, client)
            break
        }
    }
}
