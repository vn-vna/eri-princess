import { Message } from "discord.js"
import { EriMsgCommand } from "./command-template"
import * as MessageCommand from "./msg-command/commands"

export default class EriCommandEvaler {
  protected _msgcmd: EriMsgCommand[]

  private static instance?: EriCommandEvaler

  constructor() {
    this._msgcmd = [
      new MessageCommand.HelpMsgCommand(),
      new MessageCommand.PingMsgCommand(),
      new MessageCommand.TouchMsgCommand(),
      new MessageCommand.RegisterMsgCommand(),
      new MessageCommand.DeRegisterMsgCommand(),
      new MessageCommand.EnableScheduleMsgCommand(),
      new MessageCommand.DisableScheduleMsgCommand(),
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
    if (!EriCommandEvaler.instance) {
      EriCommandEvaler.instance = new EriCommandEvaler()
    }
    return EriCommandEvaler.instance
  }
}
