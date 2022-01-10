import { TextChannel } from "discord.js"
import { EriBot } from "../main"
import EriMongoDB, { DiscordServerSettingsT } from "./database"

export default class ScheduleMessage {
  protected _goodNightMpx: Map<string, NodeJS.Timeout | undefined>

  protected static GOODNIGHT_HOUR?: number
  protected static GOODNIGHT_MINUTE?: number
  protected static instance?: ScheduleMessage

  constructor() {
    this._goodNightMpx = new Map()
    ScheduleMessage.GOODNIGHT_HOUR = Number.parseInt(
      process.env.GOODNIGHT_HOUR ?? ""
    )
    ScheduleMessage.GOODNIGHT_MINUTE = Number.parseInt(
      process.env.GOODNIGHT_MINUTE ?? ""
    )
  }

  public putSchedule(serverId: string, channelId: string) {
    let crrInterval = this._goodNightMpx.get(serverId)
    if (crrInterval) {
      clearInterval(crrInterval)
      this._goodNightMpx.delete(serverId)
    }

    EriMongoDB.query(async (db) => {
      const modify = await db
        .collection<DiscordServerSettingsT>(
          EriMongoDB.EriDbConst.ERI_COLL_SERVERS
        )
        .findOneAndUpdate(
          { server_id: { $eq: serverId } },
          { $set: { schedule_gt: channelId } }
        )

      if (modify.ok) {
        const result = await db
          .collection<DiscordServerSettingsT>(
            EriMongoDB.EriDbConst.ERI_COLL_SERVERS
          )
          .findOne({ server_id: { $eq: serverId } })

        const crrTime = new Date()
        const nextTime = new Date()
        if (
          !result?.gmt ||
          !ScheduleMessage.GOODNIGHT_HOUR ||
          !ScheduleMessage.GOODNIGHT_MINUTE
        )
          return
        if (
          crrTime.getUTCHours() > ScheduleMessage.GOODNIGHT_HOUR - result.gmt ||
          (crrTime.getUTCHours() ==
            ScheduleMessage.GOODNIGHT_HOUR - result.gmt &&
            crrTime.getUTCMinutes() >= ScheduleMessage.GOODNIGHT_MINUTE)
        ) {
          nextTime.setUTCDate(crrTime.getUTCDate() + 1)
        }
        nextTime.setUTCHours(ScheduleMessage.GOODNIGHT_HOUR - result.gmt)
        nextTime.setUTCMinutes(ScheduleMessage.GOODNIGHT_MINUTE)
        nextTime.setUTCSeconds(0)

        const delta = nextTime.getTime() - crrTime.getTime()

        const server = EriBot.getInstance().djsClient.guilds.cache.get(serverId)
        const channel = server?.channels.cache.get(channelId) as
          | TextChannel
          | undefined
          | null
        console.log(
          `Scheduled on server ${server?.toString()} in channel ${channel?.toString()} message in ${delta} ms`
        )
        this._goodNightMpx.set(
          serverId,
          setTimeout(() => {
            channel?.send(
              "Eri chúc tất cả mọi người ngủ ngon, có những giấc mơ thật tuyệt vời nha ❤️"
            )
          }, delta)
        )
      }
    })
  }

  public removeSchedule(serverId: string) {
    let crrInterval = this._goodNightMpx.get(serverId)
    if (crrInterval) {
      clearInterval(crrInterval)
      this._goodNightMpx.delete(serverId)

      EriMongoDB.query(async (db) => {
        const modify = await db
          .collection<DiscordServerSettingsT>(
            EriMongoDB.EriDbConst.ERI_COLL_SERVERS
          )
          .findOneAndUpdate(
            { server_id: { $eq: serverId } },
            { $set: { schedule_gt: null } }
          )

        if (modify.ok) {
          const server =
            EriBot.getInstance().djsClient.guilds.cache.get(serverId)
          console.log(`Schedule on ${server?.toString()} has been canceled`)
        }
      })
    }
  }

  public loadSchedule() {
    EriMongoDB.query(async (db) => {
      const serverArr = await db
        .collection<DiscordServerSettingsT>(
          EriMongoDB.EriDbConst.ERI_COLL_SERVERS
        )
        .find()
        .toArray()

      serverArr.forEach((server) => {
        if (server.server_id && server.schedule_gt) {
          this.putSchedule(server.server_id, server.schedule_gt)
        }
      })
    })
  }

  public static getInstance() {
    if (!this.instance) {
      ScheduleMessage.instance = new ScheduleMessage()
    }
    return ScheduleMessage.instance
  }
}
