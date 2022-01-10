import { EriMsgCommand } from "../command-template"

type TouchTimesT = { interval?: NodeJS.Timeout; times: number }

export default class TouchMsgCommand extends EriMsgCommand {
  protected static REPLY_ARR = [
    ["😫", "Eh?"],
    ["🙄", "Nani???"],
    ["😒", "Dừng lại nào 😒"],
    ["😒", "Đừng chạm vào Eri!!!"],
    ["😒", "Xuống địa ngục đi!!!"],
    ["😨", "Đừng chạm vào ta con người kia."],
  ]

  protected static TOUCH_TIMES: Map<string, TouchTimesT> = new Map()

  constructor() {
    super()
    this._name = "touch"
    this._description = "Chạm vào Eri?"
    this._execution = (message) => {
      let tx = TouchMsgCommand.TOUCH_TIMES.get(message.author.id)
      if (!tx) {
        TouchMsgCommand.TOUCH_TIMES.set(message.author.id, {
          interval: undefined,
          times: 0,
        })
      }

      tx = TouchMsgCommand.TOUCH_TIMES.get(message.author.id)

      if (!tx) return
      message.react(
        TouchMsgCommand.REPLY_ARR[
          Math.min(TouchMsgCommand.REPLY_ARR.length, tx.times)
        ][0]
      )
      message.reply(
        TouchMsgCommand.REPLY_ARR[
          Math.min(TouchMsgCommand.REPLY_ARR.length, tx.times)
        ][1]
      )
      ++tx.times

      if (tx.interval) clearTimeout(tx.interval)
      tx.interval = setTimeout(
        () => TouchMsgCommand.TOUCH_TIMES.delete(message.author.id),
        120000
      )
    }
  }
}
