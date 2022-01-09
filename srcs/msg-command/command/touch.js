const { Message } = require('discord.js')

const REPLY_ARR = [
    ['😨', "Don't touch me human!"],
    ['🙄', 'Hey?'],
    ['🙄', 'なに???'],
    ['😒', 'Go to the hell!!!'],
    ['😒', '死ぬ 😒'],
    ['😫', 'Eh?'],
    ['🤔', '...?'],
]

module.exports = {
    command: 'touch',
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
    description: 'Touch me?',
}
