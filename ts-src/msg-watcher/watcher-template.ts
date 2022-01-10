import { Message } from "discord.js";

export default class EriMessageWatcher {
  protected _matcher?: (message: Message) => any
  protected _execution?: (message: Message) => any

  public get match() {
    return this._matcher
  }

  public get execution() {
    return this._execution;
  }
}