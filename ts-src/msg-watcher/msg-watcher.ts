import { Message } from "discord.js";
import EriMessageWatcher from "./watcher-template";
import * as MsgWatcher from "./watcher/watcher"

export default class MessageWatcher {
  protected _watcher: EriMessageWatcher[]

  protected static instance?: MessageWatcher;

  constructor() {
    this._watcher = [
      new MsgWatcher.EriMentionedMsgWatcher()
    ]
  }

  public watch(message: Message) {
    for (let i = 0; i < this._watcher.length; ++i) {
      if (this._watcher.at(i)?.match?.(message)) {
        this._watcher.at(i)?.execution?.(message)
        return
      }
    }
  }

  public static getInstance() {
    if (!MessageWatcher.instance) {
      MessageWatcher.instance = new MessageWatcher()
    }
    return MessageWatcher.instance
  }


}