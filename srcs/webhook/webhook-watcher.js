const { Client } = require('discord.js')
const { Request } = require('express')
const webhookList = require('./webhook-list')

/**
 * 
 * @param {string} hook 
 * @param {Request<{id: string}, any, any, qs.ParsedQs, Record<string, any>>} req 
 * @param {Client} dclient
 */
module.exports = (hook, req, dclient) => {
    for (let hookprops of webhookList) {
        if (hookprops?.hookname === hook) {
            hookprops?.execution?.(req, dclient)
        }
    }
}