const { EriDbConst, EriMongo } = require('../utilities/mongo')
const ScheduleGT = require('./schedule_gt')

class ServerChache {
    static serverList = new Map()
}

function loadServerCache(client) {
    for (let i = 0; i < ScheduleGT.GOODNIGHT_INTERVALS.length; ++i) {
        clearInterval(ScheduleGT.GOODNIGHT_INTERVALS[i])
    }
    ScheduleGT.GOODNIGHT_INTERVALS = []
    EriMongo.query(async (db) => {
        const serverArr = await db.collection(EriDbConst.ERI_COLL_SERVERS).find().toArray()
        serverArr.forEach(serverProps => {
            ServerChache.serverList.set(serverProps.server_id, { ...serverProps, _id: undefined })
            if (serverProps.schedule_gt) {
                ScheduleGT.sendGoodNight(client, serverProps)
            }
        })
    })
}

module.exports = {
    ServerChache, loadServerCache
}