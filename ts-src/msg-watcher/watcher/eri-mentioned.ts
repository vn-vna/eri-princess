import { EriBot } from "../../main";
import EriMessageWatcher from "../watcher-template";

export default class SelfMensionedMsgWatcher extends EriMessageWatcher {
  constructor() {
    super()

    this._matcher = (message) => {
      const eriUsr = EriBot.getInstance().djsClient.user
      if (!eriUsr) return false
      const isMentionedEri = message.mentions.users.get(eriUsr.id)
      const isReplyMsg = message.reference
      const isMentionFirst = message.content.split(" ").at(0) == `<@!${eriUsr.id}>`
      return isMentionedEri && !isReplyMsg && isMentionFirst
    }

    this._execution = (message) => {
      message.reply("Eri is here ~")
    }
  }
}