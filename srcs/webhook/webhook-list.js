const { Request } = require('express')
const { Client } = require('discord.js')
const FileSystem = require('fs')

const WEBHOOK_FILES = FileSystem.readdirSync(`${__dirname}/webhook`)

/**
 * @type {{hookname: string, execution: (req: Request<{id: string}, any, any, qs.ParsedQs, Record<string, any>>, dclient: Client) => any, description: string}[]}
 */
let webhookList = []
for (let file of WEBHOOK_FILES) {
    webhookList.push(require(`./webhook/${file}`))
}

module.exports = webhookList