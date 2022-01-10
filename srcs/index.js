const Global = require("./global-vr")

const FileSystem = require("fs")
const DotEnv = require("dotenv")
if (FileSystem.existsSync(`${__dirname}/../.env`)) DotEnv.config()

const { Client, Intents, TextChannel } = require("discord.js")
const Express = require("express")
const { EriMongo, EriDbConst } = require("./utilities/mongo")
const { ServerChache, loadServerCache } = require("./functions/servers-cache")

const commandEval = require("./msg-command/command-eval")
const messageWatcher = require("./msg-watcher/message-watcher")
const webhookWatcher = require("./webhook/webhook-watcher")

const token = process.env.BOT_TOKEN
const ERI_COMMAND = process.env.ENVIRONMENT == "DEV" ? "_eri" : "eri"

const express = Express()
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
})

const EXPRESS_PORT = process.env.PORT ? process.env.PORT : 3000

//#region EXPRESS SERVER

express.put(`/webhook/:id`, (req, res, next) => {
  webhookWatcher(req.params.id, req, client)
})

express.get(`/`, (req, res, next) => {
  res.status(500).send(`ping pong`)
})

//#endregion

//#region DISCORD CLIENT

client.once("ready", () => {
  // client.guilds.cache.get('907225730977521704').channels.cache.get('907234640216068098').send({ content: "Hello Eri has awaken" })
  client.user.setActivity("with VNA")
  client.user.setStatus("online")
  console.log(`Client ready!!!\nLogged in as ${client.user.tag}`)

  EriMongo.query(async (db) => {
    const docsCount = await db
      .collection(EriDbConst.ERI_COLL_SCHEDULE_NAME)
      .countDocuments()
    console.log(docsCount)
  }).catch((err) => console.log(err))
  loadServerCache(client)
})

client.on("messageCreate", (message) => {
  if (message.content.startsWith(ERI_COMMAND)) {
    let trimmedCmd = []
    const cmdArr = message.content.split(" ").map((val) => {
      if (val && typeof val === "string" && val != "") {
        trimmedCmd.push(val)
      }
    })
    commandEval(trimmedCmd, message, client)
  } else {
    messageWatcher(message, client)
  }
})

//#endregion

client.login(token)

express.listen(EXPRESS_PORT, () => {
  console.log(`EXPRESS SERVER UP ->> port ${EXPRESS_PORT}`)
})
