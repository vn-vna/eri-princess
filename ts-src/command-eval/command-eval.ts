import { Message } from "discord.js";
import { EriMsgCommand } from "./command-template";
import * as MessageCommand from "./msg-command/commands"

export default class CommandEval {
    protected _msgcmd: EriMsgCommand[]

    private static instance?: CommandEval;

    constructor() {
        this._msgcmd = [
            new MessageCommand.HelpMsgCommand(),
            new MessageCommand.PingMsgCommand(),
            new MessageCommand.TouchMsgCommand(),
            new MessageCommand.RegisterMsgCommand(),
            new MessageCommand.DeRegisterMsgCommand()
        ]
    }

    public eval(cmdarr: string[], message: Message) {
        for (let cmd of this._msgcmd) {
            if (cmdarr[1] === cmd.cmdName) {
                cmd.execute(message)
                return
            }
        }
    }

    public get msgCmdList() {
        return this._msgcmd
    }

    public static getInstance() {
        if (!CommandEval.instance) {
            CommandEval.instance = new CommandEval()
        }
        return CommandEval.instance
    }
}