const { Message, Client } = require('discord.js')
const FileSystem = require('fs')

const WATCHER_FILES = FileSystem.readdirSync(`${__dirname}/watcher/`)

/**
 * @type {{match: (message: Message, client: Client) => boolean, execution: (message: Message, client: Client) => any}[]}
 */
let watchers = []

for (let file of WATCHER_FILES) {
    watchers.push(require(`./watcher/${file}`))
}

/**
 *
 * @param {Message} message
 * @param {Client} client
 */
module.exports = (message, client) => {
    for (let watcher of watchers) {
        if (watcher.match(message, client)) {
            watcher.execution(message, client)
        }
    }
}
