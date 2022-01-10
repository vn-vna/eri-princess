import { Message } from "discord.js"

export class EriMsgCommand {
    protected _name?: string
    protected _execution?: (message: Message) => any
    protected _description?: string

    public get cmdName() {
        return this._name
    }

    public get cmdDescription() {
        return this._description
    }

    public execute(message: Message) {
        this._execution?.(message)
    }
}