const { Message, Client, MessageEmbed } = require('discord.js')
const commandList = require('./command-list')

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

    if (command.length < 2) {
        const eMsg = new MessageEmbed()
            .setColor('#770000')
            .setTitle('Here I am ~~')
            .setDescription('You have mention me, are you? What do u need?')
            .setAuthor({
                name: 'Eri Vampir Shirone',
                iconURL: process.env.ERI_AVATAR_URL,
            })
            .setThumbnail(process.env.ERI_AVATAR_URL)
            .setDescription(
                'Do U know what does a vampire princess love?\nThat is sweety blood ❤️'
            )
            .addField('\u200b', '\u200b')
            .addField('My Prefix is `eri`', 'Here is something i can do ~~')

        for (let ac of commandList) {
            eMsg.addField(
                ac.command ? ac.command : 'command',
                ac.description ? ac.description : 'description',
                true
            )
        }
        message.reply({ embeds: [eMsg] })
    }

    for (let cp of commandList) {
        if (cp.command == command[1]) {
            cp.execution(command, message, client)
            break
        }
    }
}
