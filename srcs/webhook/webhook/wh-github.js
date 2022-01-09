const { Request } = require('express')
const { Client } = require('discord.js')
const Express = require('express')

module.exports = {
    hookname: "github",
    /**
     * @param {Request<{id: string}, any, any, qs.ParsedQs, Record<string, any>>} req 
     * @param {Client} dclient
     */
    execution: (req, dclient) => {
        console.log(req.body)
    },
    description: "Webhook that provides informations about project's updates"
}