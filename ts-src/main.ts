import CommandEval from './command-eval/command-eval'
import { Client, Intents } from 'discord.js'
import { config as DotEnvCfg } from 'dotenv'
import ScheduleMessage from './utils/schedule-message'

export class EriBot {
    public _djsClient: Client
    public _commandEvaler: CommandEval

    private static instance: EriBot | undefined;

    constructor() {
        DotEnvCfg()
        // console.log(process.env)

        this._commandEvaler = CommandEval.getInstance()

        this._djsClient = new Client({
            intents: [
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.GUILDS
            ]
        })
        this._djsClient.user?.setStatus("online")
        this._djsClient.user?.setActivity("with VNA")
        this._djsClient.once("ready", (client) => {
            console.log(`Application logged in as ${client.user.tag}`)
            ScheduleMessage.getInstance()?.loadSchedule()
        })
        this._djsClient.on("messageCreate", (message) => {
            const commandArr = message.content.split(" ")
            if (commandArr[0] == process.env.ERI_PREFIX) {
                this._commandEvaler.eval(commandArr, message)
            } else {

            }
        })
    }

    public run() {
        this._djsClient.login(process.env.BOT_TOKEN)
    }

    public static getInstance() {
        if (!EriBot.instance) {
            EriBot.instance = new EriBot()
        }
        return EriBot.instance
    }

    public get djsClient() {
        return this._djsClient
    }

    public get commandEvaler() {
        return this._commandEvaler
    }
}
