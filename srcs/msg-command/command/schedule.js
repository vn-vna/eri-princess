const { Message } = require('discord.js')
const { ServerChache, loadServerCache } = require('../../functions/servers-cache')
const ScheduleGT = require('../../functions/schedule_gt')
const { EriDbConst, EriMongo } = require('../../utilities/mongo')

module.exports = {
    command: 'ping',
    /**
     * @param {string[]} command
     * @param {Message} message
     * @param {Client} client
     */
    execution: (command, message, client) => {
        EriMongo.query(async (db) => {
            db.collection(EriDbConst.ERI_COLL_SERVERS).findOne({ schedule_gt: { $eq: message.channel } }).then(cal1 => {
                if (cal1.schedule_gt) {
                    message.reply("Schedule has already been set!!!")
                } else {
                    db.collection(EriDbConst.ERI_COLL_SERVERS).findOneAndUpdate(
                        { server_id: { $eq: message.guild.id } },
                        { schedule_gt: message.channel.id }
                    ).then(val2 => {
                        loadServerCache(client)
                        message.reply("Schedule has been set!!!")
                    })
                }
            })
        })
    },
    description: 'Ping me',
}
