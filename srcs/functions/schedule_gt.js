const { Client } = require("discord.js")

const GOODNIGHT_HOUR = Number.parseInt(process.env.GOODNIGHT_HOUR)
const GOODNIGHT_MINUTE = Number.parseInt(process.env.GOODNIGHT_MINUTE)

class ScheduleGT {
  static GOODNIGHT_INTERVALS = []

  /**
   *
   * @param {Client} client
   * @param {} server_detail
   */
  static sendGoodNight(client, server_detail) {
    if (server_detail.schedule_gt) {
      const crrTime = new Date()
      const nextTime = new Date()
      if (
        crrTime.getUTCHours() > GOODNIGHT_HOUR - server_detail.gmt ||
        (crrTime.getUTCHours() == GOODNIGHT_HOUR - server_detail.gmt &&
          crrTime.getUTCMinutes() >= GOODNIGHT_MINUTE)
      ) {
        nextTime.setUTCDate(crrTime.getUTCDate() + 1)
      }
      nextTime.setUTCHours(GOODNIGHT_HOUR - server_detail.gmt)
      nextTime.setUTCMinutes(GOODNIGHT_MINUTE)
      nextTime.setUTCSeconds(0)

      const channel = client.channels.cache.get(server_detail.schedule_gt)

      const timeLeft = nextTime - crrTime
      console.log(
        `Scheduled Event Good night for server id: ${server_detail.server_id} in ${timeLeft} ms`
      )
      ScheduleGT.GOODNIGHT_INTERVALS.push(
        setTimeout(() => {
          channel?.send(`Good night everyone ~`)
          ScheduleGT.sendGoodNight(client, server_detail)
        }, timeLeft)
      )
    }
  }
}

module.exports = ScheduleGT
